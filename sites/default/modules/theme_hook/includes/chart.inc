<?php

abstract class ThemeChart
{
    /**
     * Librairies JS
     * @var dossier => version
     */
    public static $librariesJS = array(
        'd3' => 'v3',
        'd3-queue' => '1.0.7',
        'leaflet' => '1.0.2',
        'nv' => 'd3.1.8.4',
        'topojson' => '1.6.19'
    );

    /**
     * Librairies CSS
     * @var dossier
     */
    public static $librariesCSS = array(
        'leaflet',
        'nv'
    );

    /**
     * Tags JS
     * @var variable => render
     */
    public static $convertTags = array(
        'chartId' => 'chart-%nid%',
        'chartFormId' => 'chart-form-%nid%',
        'chartContainerId' => 'chart-container-%nid%',
        'jsonData' => '%jsonData%'
    );

    /**
     * Ajout des librairies pour les graphiques
     */
    public static function addLibraries()
    {
        if (!empty(self::$librariesJS)) {
            foreach (self::$librariesJS as $library => $version) {
                $libraryPath = libraries_get_path($library);
                drupal_add_js($libraryPath . '/' . $library . '.' . $version . '.min.js');

                if (in_array($library, self::$librariesCSS)) {
                    drupal_add_css($libraryPath . '/' . $library . '.' . $version . '.min.css');
                }

            }
        }
    }

    /**
     * Récupération des données pour le graphique
     *
     * @param  [type] $node [description]
     * @return [type]       [description]
     */
    public static function getJsonData(DrupNode $node)
    {
        $data = array();

        if ($filters = $node->getText('filters')) {
            $data = hackaton_api_connectors_get_multiple_columns($filters->value);
        }

        return json_encode($data);
    }

    /**
     * Ajout les fichiers JS
     *
     * @param object $node Object DrupNode
     * @param stting $json Données json du graphique à écrire dans le fichier
     */
    public static function addFiles(DrupNode $node, $json)
    {
        if ($model = $node->getEntityReference('dataviz_model')) {
            $model = new DrupNode($model);

            if ($files = $model->getMultipleField('dataviz_file')) {
                if (!empty($files)) {
                    foreach ($files as $file) {
                        $fileData = file_get_contents($file->uri);

                        self::convertTagsToData($fileData, array(
                            'json' => $json,
                            'node' => $node
                        ));

                        drupal_add_js('
                            <!--//--><![CDATA[//><!--
                            jQuery(document).ready(function($) {
                                ' . $fileData . '
                            });
                            //--><!]]>
                        ', array(
                            'type' => 'inline',
                            'defer' => true,
                            'preprocess' => false
                        ));
                    }
                }
            }
        }
    }

    /**
     * Rendu d'un graphique
     */
    public static function render(DrupNode $node, $options = array())
    {
        $out = null;

        $json = self::getJsonData($node);

        self::addFiles($node, $json);

        $out = theme_render_template(path_to_theme() . '/templates/partials/chart.tpl.php', array(
            'node' => $node,
            'json' => $json
        ));

        return $out;
    }

    /**
     * Covnersion des tags dans la data depuis les sources
     *
     * @param  [type] &$node [description]
     * @return [type]        [description]
     */
    public static function convertTagsToData(&$data, $sources)
    {
        // Conversion des tags
        foreach (self::$convertTags as $tag => $value) {
            if (!empty($sources['node'])) {
                self::$convertTags[$tag] = str_replace('%nid%', $sources['node']->getId(), $value);
            }
            if (!empty($sources['json'])) {
                self::$convertTags['jsonData'] = str_replace('%jsonData%', $sources['json'], $value);
            }
        }

        // Conversion des données
        foreach (self::$convertTags as $convertTag => $convertValue) {
            if (!empty($data)) {
                $data = str_replace('%' . $convertTag . '%', $convertValue, $data);
            }
        }
    }

    /**
     * [formAlter description]
     * @param  [type] &$form       [description]
     * @param  [type] &$form_state [description]
     * @return [type]              [description]
     */
    public static function formAlter(&$form, &$form_state)
    {
        $defaultDescription = $form['field_dataviz_file'][LANGUAGE_NONE]['#description'];
        $form['field_dataviz_file'][LANGUAGE_NONE]['#description'] = ((!empty($defaultDescription)) ? $defaultDescription .'<br />' : '') . 'Tags disponibles : %' . implode('%, %', array_keys(self::$convertTags)) . '%';
    }
}
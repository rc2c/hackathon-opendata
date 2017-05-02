<?php

abstract class DrupTools
{
    /**
     * Slugify d'une chaîne
     * @param  [type]  $path             [description]
     * @param  boolean $allowSlashes     [description]
     * @param  boolean $allowUnderscores [description]
     * @param  string  $betweenWords     [description]
     * @return [type]                    [description]
     */
    public static function slugify($path, $allowSlashes = false, $allowUnderscores = false, $betweenWords = '-')
    {
        $char_map = array(
            'À' => 'A', 'Á' => 'A', 'Â' => 'A', 'Ã' => 'A', 'Ä' => 'A', 'Å' => 'A', 'Æ' => 'AE', 'Ç' => 'C',
            'È' => 'E', 'É' => 'E', 'Ê' => 'E', 'Ë' => 'E', 'Ì' => 'I', 'Í' => 'I', 'Î' => 'I', 'Ï' => 'I',
            'Ð' => 'D', 'Ñ' => 'N', 'Ò' => 'O', 'Ó' => 'O', 'Ô' => 'O', 'Õ' => 'O', 'Ö' => 'O', 'Ő' => 'O',
            'Ø' => 'O', 'Ù' => 'U', 'Ú' => 'U', 'Û' => 'U', 'Ü' => 'U', 'Ű' => 'U', 'Ý' => 'Y', 'Þ' => 'TH',
            'ß' => 'ss',
            'à' => 'a', 'á' => 'a', 'â' => 'a', 'ã' => 'a', 'ä' => 'a', 'å' => 'a', 'æ' => 'ae', 'ç' => 'c',
            'è' => 'e', 'é' => 'e', 'ê' => 'e', 'ë' => 'e', 'ì' => 'i', 'í' => 'i', 'î' => 'i', 'ï' => 'i',
            'ð' => 'd', 'ñ' => 'n', 'ò' => 'o', 'ó' => 'o', 'ô' => 'o', 'õ' => 'o', 'ö' => 'o', 'ő' => 'o',
            'ø' => 'o', 'ù' => 'u', 'ú' => 'u', 'û' => 'u', 'ü' => 'u', 'ű' => 'u', 'ý' => 'y', 'þ' => 'th',
            'ÿ' => 'y'
        );
        $path = str_replace(array_keys($char_map), $char_map, $path);

        // This is the inverse of the method above
        if (function_exists('mb_strtolower')) {
            // UTF-8 capable replacement for \W. Works fine for English and also for Greek, etc.
            // ... Except when PCRE is built without unicode properties and PHP can't tell! We'll
            // put that in servercheck.php
            $alnum = '\p{L}\p{N}' . ($allowUnderscores ? '_' : '');
            $modifier = 'u';
        } else {
            $alnum = $allowUnderscores ? '\w' : '[A-Za-z0-9]';
            $modifier = '';
        }
        if ($allowSlashes) {
            $alnum .= '\/';
        }
        // Removing - here expands flexibility and shouldn't hurt because it's the replacement anyway
        $regexp = "/[^$alnum]+/$modifier";
        $path = mb_strtolower(preg_replace($regexp, $betweenWords, $path));
        if ($allowSlashes) {
            // No multiple consecutive /
            $path = preg_replace("/\/+/$modifier", "/", $path);
            // No trailing / unless it's the homepage
            if ($path !== '/') {
                $path = preg_replace("/\/$/$modifier", '', $path);
            }
        }
        // No consecutive dashes
        $path = preg_replace("/$betweenWords+/$modifier", $betweenWords, $path);
        // Leading and trailing dashes are silly. This has the effect of trim()
        // among other sensible things
        $path = preg_replace("/^-*(.*?)-*$/$modifier", '$1', $path);

        return $path;
    }

    /**
     * Détermine si la page courante correspond au slug
     * @param  string  $string -> Slug : medias ou medias/*, etc
     * @return boolean
     */
    public static function isSlug($string)
    {
        $path = drupal_strtolower(drupal_get_path_alias($_GET['q']));
        $page_match = drupal_match_path($path, $string);

        if ($path != $_GET['q']) {
            $page_match = $page_match || drupal_match_path($_GET['q'], $string);
        }

        return $page_match;
    }

    /**
     * Ajoute les balises og metas (type, share_url, title) à appeler dans le hook_preprocess_html
     * @param array $vars [description]
     */
    public static function addDefaultMeta(array $vars)
    {
        global $base_url;

        // Lang
        $path = drupal_is_front_page() ? '<front>' : $_GET['q'];
        $translations = i18n_get_path_translations($path);
        $languages = language_list('enabled');

        if (!empty($languages[0])){
           foreach ($languages[0] as $language) {
               unset($translations[$language->language]);
           }
        }

        if (!empty($translations)) {
           foreach ($translations as $lang => $translation) {
               $attributes = array(
                   'href' => $base_url . url($translation['href'], array_merge($translation, array('language' => i18n_language($lang)))),
                   'rel' => 'alternate',
                   'hreflang' => $lang
               );
               drupal_add_html_head_link($attributes);
           }
        }

        // Responsive
        drupal_add_html_head(array(
            '#tag'        => 'meta',
            '#attributes' => array(
                'content' => 'width=device-width, user-scalable=no, maximum-scale=1.0',
                'name'    => 'viewport'
            ),
            '#weight' => 50,
        ), 'viewport');

        // OG minimum
        drupal_add_html_head(array(
            '#tag' => 'meta',
            '#attributes' => array(
                'property' => 'og:type',
                'content' => 'website'
            )
        ), 'og_type');
        drupal_add_html_head(array(
            '#tag' => 'meta',
            '#attributes' => array(
                'property' => 'og:share_url',
                'content' => url(drupal_lookup_path('alias', current_path()), array('absolute' => true))
            )
        ), 'og_url');
        $ogTitle = strlen(drupal_get_title()) != 0 ? drupal_get_title() : $vars['head_title'];
        $ogTitle .= (variable_get('site_name')) ? ' | ' . variable_get('site_name') : '';
        drupal_add_html_head(array(
            '#tag' => 'meta',
            '#attributes' => array(
                'property' => 'og:title',
                'content' => $ogTitle
            )
        ), 'og_title');
    }

    /**
     * Ajoute les balises og metas (description et images) à appeler dans le hook_preprocess_page
     * @param [type] $vars [description]
     */
    public static function addOGMeta(array $vars, $fields = array())
    {
        global $base_url;

        $fieldsDefault = array(
            'image' => 'image',
            'body' => 'body'
        );
        $fields = array_merge($fieldsDefault, $fields);

        // Logo du site
        $img = array();
        if (!empty($vars['logo'])) {
            list($width, $height) = getimagesize($vars['logo']);
            $img = array(
                'url'       => $vars['logo'],
                'extension' => pathinfo($vars['logo'], PATHINFO_EXTENSION),
                'width'     => $width,
                'height'    => $height
            );
        }
        $description = null;

        if (isset($vars['node'])) {
            $fieldImage = field_view_field('node', $vars['node'], 'field_' . $fields['image']);
            $fieldBody = field_get_items('node', $vars['node'], 'field_' . $fields['body']);
        }

        if (!empty($fieldImage) && isset($fieldImage['#items'][0]['sid'])) {
            $atom = scald_atom_load($fieldImage['#items'][0]['sid']);
            if ($atom !== false) {
                $img = array(
                    'url'       => image_style_url('medium', $atom->file_source),
                    'extension' => pathinfo($atom->title, PATHINFO_EXTENSION),
                    'width'     => '200',
                    'height'    => '200'
                );
            }
        }

        if (!empty($fieldBody[0])) {
            $description = strip_tags(self::cleanBodyString($fieldBody[0]['safe_value']));
            $description = self::trimBodyString($description, 300, false, array(
                'ellipsis' => false
            ));
        }

        if (null !== $description) {
            drupal_add_html_head(array(
                '#tag' => 'meta',
                '#attributes' => array(
                    'property' => 'og:description',
                    'content' => $description
                )
            ), 'og_description');
        }

        if (!empty($img)) {
            drupal_add_html_head(array(
                '#tag' => 'meta',
                '#attributes' => array(
                    'property' => 'og:image',
                    'content' => $img['url']
                )
            ), 'og_image');
            drupal_add_html_head(array(
                '#tag' => 'meta',
                '#attributes' => array(
                    'property' => 'og:image:width',
                    'content' => $img['width']
                )
            ), 'og_image_height');
            drupal_add_html_head(array(
                '#tag' => 'meta',
                '#attributes' => array(
                    'property' => 'og:image:height',
                    'content' => $img['height']
                )
            ), 'og_image_width');
            drupal_add_html_head(array(
                '#tag' => 'meta',
                '#attributes' => array(
                    'property' => 'og:image:format',
                    'content' => $img['extension']
                )
            ), 'og_image_format');
        }
    }

    /**
     * Retourne l'id du noeud courant
     *
     * @return int
     */
    public static function getNid() {
        if (arg(0) === 'node' && is_numeric(arg(1))) {
            return (int) arg(1);
        }

        return null;
    }

    /**
     * Détermine si le noeud courant est en mode "vue"
     * @return boolean
     */
    public static function isNodeView() {
        if (arg(0) === 'node' && is_numeric(arg(1)) && arg(2) === null) {
            return true;
        }

        return false;
    }

    /**
     * Détermine si le term de taxonomy courant est en mode "vue"
     * @return boolean
     */
    public static function isTermView() {
        if (arg(0) === 'taxonomy' && arg(1) === 'term' && is_numeric(arg(2))) {
            return true;
        }

        return false;
    }

    /**
     * Retourne l'id du noeud de l'url en paramètre
     * @param  [type] $url [description]
     * @return [type]      [description]
     */
    public static function parseNodeUrl($url)
    {
        $url = explode('/', $url);

        if (isset($url[1]) && !empty($url[1])) {
            return $url[1];
        }

        return null;
    }

    /**
     * Retourne les liens enfant du noeud courant pour créer un sommaire
     *
     * @param  DrupNode $node [description]
     * @return [type]         [description]
     */
    public static function getNodeChildren()
    {
        $children  = array();
        $parent = menu_link_get_preferred('node/' . self::getNid());
        //dsm($parent);
        $parameters = array(
            'active_trail' => array($parent['plid']),
            'only_active_trail' => false,
            'min_depth' => $parent['depth'] + 1, 
            'max_depth' => $parent['depth'] + 1, 
            'conditions' => array('plid' => $parent['mlid']),
        );
        $children = menu_build_tree($parent['menu_name'], $parameters);
        //dsm($parent);
        //$children = menu_tree_all_data($parent['menu_name'], $parent, 1);
       // dsm($children);

        return $children;
    }

    /**
     * Retourne le champs du noeud/taxonomie voulu
     *
     * @param  string $entity_type -> node ou taxonomy_term
     * @param  object $entity      -> L'objet de l'entité
     * @param  string $field_name  -> Le nom du champ à charger
     * @return array
     */
    public static function getField($entity_type, $entity, $field_name)
    {
        $field = array();
        $bundleName = null;

        if ($entity_type === 'node' && isset($entity->type)) {
            $bundleName = $entity->type;
        } elseif ($entity_type === 'taxonomy_term' && isset($entity->vocabulary_machine_name)) {
            $bundleName = $entity->vocabulary_machine_name;
        } elseif ($entity_type === 'scald_atom' && isset($entity->type)) {
            $bundleName = $entity->type;
        }

        if (!is_null(field_info_instance($entity_type, $field_name, $bundleName))) {
            $field = field_view_field($entity_type, $entity, $field_name);
        }

        return $field;
    }

    /**
    * Ajout des favicons
    *
    * @param array  $settings    -> Paramètres des favicons à ajouter
    * @param string $pathToTheme -> Chemin vers le theme courant
    * @param int    $version     -> Numéro de version pour mettre à jour le cache en cas de changement
    */
    public static function addFavicons($settings, $pathToTheme, $version = 0)
    {
        if (!empty($settings)) {
            foreach ($settings as $settingType => $settingData) {
                switch ($settingType) {
                    case 'apple':
                        if (is_array($settingData) && !empty($settingData)) {
                            foreach ($settingData as $size) {
                                drupal_add_html_head(array(
                                    '#tag'        => 'link',
                                    '#attributes' => array(
                                        'rel'   => 'apple-touch-icon',
                                        'sizes' => $size . 'x' . $size,
                                        'href'  => '/' . $pathToTheme . '/images/favicons/apple-touch-icon-' . $size . 'x' . $size . '.png?v=' . $version
                                    ),
                                ), 'apple-touch-icon-' . $size);
                            }
                        }
                        break;

                    case 'classic':
                        if (is_array($settingData) && !empty($settingData)) {
                            foreach ($settingData as $size) {
                                drupal_add_html_head(array(
                                    '#tag'        => 'link',
                                    '#attributes' => array(
                                        'rel'  => 'icon',
                                        'type' => 'image/png',
                                        'href' => '/' . $pathToTheme . '/images/favicons/favicon-' . $size . 'x' . $size . '.png?v=' . $version,
                                        'sizes'    => $size . 'x' . $size
                                    ),
                                ), 'favicon-' . $size);
                            }
                        }
                        break;

                    case 'chrome':
                        if (is_array($settingData) && !empty($settingData)) {
                            foreach ($settingData as $size) {
                                drupal_add_html_head(array(
                                    '#tag'        => 'link',
                                    '#attributes' => array(
                                        'rel'  => 'icon',
                                        'type' => 'image/png',
                                        'href' => '/' . $pathToTheme . '/images/favicons/android-chrome-' . $size . 'x' . $size . '.png?v=' . $version,
                                        'sizes'    => $size . 'x' . $size
                                    ),
                                ), 'android-chrome-' . $size);
                            }

                            drupal_add_html_head(array(
                                '#tag'        => 'link',
                                '#attributes' => array(
                                    'rel'  => 'manifest',
                                    'href' => '/' . $pathToTheme . '/images/favicons/manifest.json?v=' . $version
                                ),
                            ), 'android-manifest-json');
                        }
                        break;

                    case 'safari':
                        if (is_array($settingData) && !empty($settingData)) {
                            drupal_add_html_head(array(
                                '#tag'        => 'link',
                                '#attributes' => array(
                                    'rel'   => 'mask-icon',
                                    'href'  => '/' . $pathToTheme . '/images/favicons/safari-pinned-tab.svg?v=' . $version,
                                    'color' => $settingData['color']
                                ),
                            ), 'safari-mask-icon');
                        }
                        break;

                    case 'microsoft':
                        if (is_array($settingData) && !empty($settingData)) {
                            foreach ($settingData as $metaName => $metaContent) {
                                drupal_add_html_head(array(
                                    '#tag'        => 'meta',
                                    '#attributes' => array(
                                        'name'    => $metaName,
                                        'content' => ($metaName === 'msapplication-TileImage') ? '/' . $pathToTheme . '/images/favicons/mstile-' . $metaContent . 'x' . $metaContent . '.png?v=' . $version : $metaContent
                                    ),
                                ), $metaName);
                            }
                        }
                        break;
                }
            }
        }
    }

    /**
     * Nettoie le contenu d'une description longue pour afficher en liste
     * Enlève les tags scalD et autorise certaines balises HTML (p,i,strong)
     *
     * @param  string $string -> Contenu description
     */
    public static function cleanBodyString($string)
    {
        $out = null;
        $result = preg_replace('/\[scald=.*\]/i', '', $string);

        $out = strip_tags($result, '<p><b><strong><i>');

        return $out;
    }
    /**
     * Tronque le contenu d'une description longue en conservant le HTML
     *
     * @param  [type] $string    [description]
     * @param  [type] $maxlength [description]
     * @param  [type] $options   [description]
     * @return [type]            [description]
     */
    public static function trimBodyString($string, $maxlength, $clean = true, $options = array())
    {
        $out = null;

        $defaultOptions = array(
            'word_boundary' => true,
            'ellipsis' => true,
            'html' => true
        );
        $viewsTrimTextOptions = array_merge(array('max_length' => $maxlength), $defaultOptions, $options);

        if ($clean) {
            $string = self::cleanBodyString($string);
        }

        $out = views_trim_text($viewsTrimTextOptions, $string);

        return $out;
    }

    /**
     * Retourne l'url embed du provider scald correspondant
     */
    public static function scaldGetEmbedUrl($atom)
    {
        switch ($atom->provider) {
            case 'scald_vimeo':
                $out = '//player.vimeo.com/video/' . $atom->base_id . '?autoplay=1&color=db4151';
                break;
            case 'scald_youtube':
                $out = '//www.youtube.com/embed/' . $atom->base_id . '?autoplay=1';
                break;
            case 'scald_calameo':
                $out = '//v.calameo.com/?bkcode=' . $atom->base_id;
                break;
            default:
                $out = null;
                break;
        }

        return $out;
    }

    /**
     * Converti des données GPS en Degrés
     */
    public static function GPStoDSM($gps, $type = 'lat')
    {
        $vars = explode('.', $gps);
        $deg = abs((int) $vars[0]);
        $tempma = '0.' . $vars[1];

        $tempma = $tempma * 3600;
        $min = floor($tempma / 60);
        $sec = round($tempma - ($min*60));

        $type = ($type === 'lat') ? 'N' : 'W';

        return $deg . '°' . $min . "'" . $sec . '" ' . $type;
    }
}
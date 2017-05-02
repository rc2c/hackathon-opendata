<?php
/**
 * Gestion du Routing côté back
 */
abstract class DrupRouterAdmin extends DrupRouter
{
    /**
     * Ajout d'un item de menu
     *
     * @param  [type] &$items [description]
     * @return [type]         [description]
     */
    public static function menuItem(&$items)
    {
        $items['admin/config/routing'] = array(
            'title'            => 'Routing',
            'description'      => 'Configuration des routes',
            'page callback'    => 'drupal_get_form',
            'page arguments'   => array('drup_router_page_admin'),
            'access arguments' => array('administer site configuration'),
        );
    }

    /**
     * Formulaire d'administration
     *
     * @return $form
     */
    public static function getForm()
    {
        // List of languages enabled
        $languages = self::getLanguages();

        // Types
        $nodeTypes = array_keys(node_type_get_types());

        // Tableau : header
        $headerHtml = '<thead></tr>';
            $headerHtml .= '<th>' . t('Name') . '</th>';
            foreach ($languages as $language) {
                $headerHtml .= '<th>' . $language->native . '</th>';
            }
        $headerHtml .= '</tr></thead>';

        // Tableau : rows
        $currentRoutes = parent::getRoutes();
        $form = array(
            'routes' => array(
                "#tree"   => true,
                '#prefix' => '<table>' . $headerHtml . '<tbody>',
                '#suffix' => '</tbody></table>'
            )
        );

        // Pour chaque route existante
        if (!empty($currentRoutes)) {
            foreach ($currentRoutes as $routeName => $values) {
                $form['routes'][$routeName] = array(
                    '#tree'        => true,
                    '#attributes'  => array('class' => array('container-inline')),
                    '#collapsible' => false,
                    '#collapsed'   => false,
                    '#prefix'      => '<tr class="container-inline">',
                    '#suffix'      => '</tr>',
                    'name' => array(
                        '#prefix' => '<td>',
                        '#suffix' => '</td>',
                        '#markup' => $routeName
                    )
                );

                foreach ($languages as $language) {
                    $form['routes'][$routeName][$language->language] = array(
                        '#prefix'          => '<td>',
                        '#suffix'          => '</td>',
                        '#type'            => 'entityreference',
                        '#era_entity_type' => 'node',
                        '#era_bundles'     => $nodeTypes,
                        '#era_cardinality' => -1,
                        '#default_value'   => (isset($values[$language->language])) ? $values[$language->language] : array()
                    );
                }
            }
        }

        // Nouvelle route
        $form['routes']['_new_route'] = array(
            '#type'        => 'fieldset',
            '#tree'        => true,
            '#attributes'  => array('class' => array('container-inline')),
            '#title'       => 'Ajouter une route',
            '#collapsible' => false,
            '#collapsed'   => false,
            'name' => array(
                '#type' => 'textfield',
                '#title' => 'Nom'
            )
        );
        foreach ($languages as $language) {
            $form['routes']['_new_route'][$language->language] = array(
                '#type'            => 'entityreference',
                '#title'           => 'Relié à : (' . $language->native . ')',
                '#era_entity_type' => 'node',
                '#era_bundles'     => $nodeTypes,
                '#era_cardinality' => -1
            );
        }

        // Form actions
        $form['actions']['#type'] = 'actions';
        $form['actions']['submit'] = array(
            '#type' => 'submit',
            '#value' => t('Save configuration')
        );
        $form['#submit'][] = array('DrupRouterAdmin', 'submitForm');

        return $form;
    }

    public static function submitForm($form, &$form_state)
    {
        $routes = array();
        $languages = self::getLanguages();
        $submittedValues = $form_state['values']['routes'];

        foreach ($submittedValues as $key => $routeValues) {
            if (isset($submittedValues[$key], $submittedValues[$key]['name']) && $submittedValues[$key]['name'] !== '' && $key === '_new_route') {
                $routeName = $submittedValues[$key]['name'];
            } else {
                $routeName = $key;
            }
            $values = self::getEntityValues($languages, $routeValues);

            if (!empty($values)) {
                $routes[$routeName] = $values;
            }
        }

        parent::setRoutes($routes);
    }

    /**
     * Alter du form de confirmation de suppression
     *
     * @param  [type] &$form       [description]
     * @param  [type] &$form_state [description]
     * @return [type]              [description]
     */
    public static function deleteConfirmAlter(&$form, &$form_state)
    {
        global $user;
        $routing = self::getRoutes();
        $nid = $form['nid']['#value'];
        $isRoute = self::getRouteName($nid);

        // On autorise la suppression pour le super admin
        if (in_array('super_admin', $user->roles)) {
            $isRoute = false;
        }

        // Interdiction de supprimer
        if (false !== $isRoute) {
            drupal_set_title(t('Access denied'));
            $form['description']['#markup'] = 'La suppression de la page <em>' . $form['#node']->title . '</em> est interdit car elle est associée à un template d\'affichage spécifique.<br /><br />';
            unset($form['actions']['submit'], $form['description']);
        }
    }

    /**
     * Retourne la liste des langues
     *
     * @return array
     */
    public static function getLanguages()
    {
        $enabledLanguages = language_list('enabled');

        return (!empty($enabledLanguages[1])) ? $enabledLanguages[1] : array();
    }

    /**
     * Extrait les nid des données soumises pour chaque langue
     *
     * @param  [type] $languages       [description]
     * @param  [type] $submittedValues [description]
     * @return [type]                  [description]
     */
    public static function getEntityValues($languages, $submittedValues)
    {
        $values = array();

        if (!empty($languages)) {
            foreach ($languages as $language) {
                if (!empty($submittedValues[$language->language])) {
                    $values[$language->language] = array_shift($submittedValues[$language->language]);
                }
            }
        }

        return $values;
    }
}

/**
 * Hooks
 */
function drup_menu()
{
    $items = array();

    DrupRouterAdmin::menuItem($items);

    return $items;
}
function drup_router_page_admin()
{
    return DrupRouterAdmin::getForm();
}
function drup_form_node_delete_confirm_alter(&$form, &$form_state, $form_id)
{
    DrupRouterAdmin::deleteConfirmAlter($form, $form_state);
}
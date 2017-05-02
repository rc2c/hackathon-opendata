<?php
/**
 * Preprocess HTML
 * Appel des fichiers CSS/JS, gestion des classes body
 */
function parent_preprocess_html(&$vars) 
{
    $pathToTheme = drupal_get_path('theme', 'parent');

    if (is_null(drupal_get_http_header('X-UA-Compatible'))) {
        drupal_add_http_header('X-UA-Compatible', 'IE=edge,chrome=1');
    }
    $vars['skip_link_anchor'] = 'main-menu';
    $vars['skip_link_text']   = t('Jump to navigation');

    // Attributes for html element.
    $vars['html_attributes_array'] = array(
        'lang' => $vars['language']->language,
        'dir' => $vars['language']->dir
    );

    // Serialize RDF Namespaces into an RDFa 1.1 prefix attribute.
    if ($vars['rdf_namespaces']) {
        $prefixes = array();
        foreach (explode("\n  ", ltrim($vars['rdf_namespaces'])) as $namespace) {
            // Remove xlmns: and ending quote and fix prefix formatting.
            $prefixes[] = str_replace('="', ': ', substr($namespace, 6, -1));
        }
        $vars['rdf_namespaces'] = ' prefix="' . implode(' ', $prefixes) . '"';
    }

    // Classes for body element. Allows advanced theming based on context
    // (home page, node of certain type, etc.)
    if (!$vars['is_front']) {
        // Add unique class for each page.
        $path = drupal_get_path_alias($_GET['q']);
        // Add unique class for each website section.
        list($section, ) = explode('/', $path, 2);
        $arg = explode('/', $_GET['q']);
        if ($arg[0] == 'node' && isset($arg[1])) {
            if ($arg[1] == 'add') {
                $section = 'node-add';
            } elseif (isset($arg[2]) && is_numeric($arg[1]) && ($arg[2] == 'edit' || $arg[2] == 'delete')) {
                $section = 'node-' . $arg[2];
            }
        }
        $vars['classes_array'][] = drupal_html_class('section-' . $section);
    }

    // Classes layout
    $replace = array('sidebar-first', 'sidebar-second');
    foreach ($vars['classes_array'] as $classId => $className) {
        if (in_array($className, $replace)) {
            $vars['classes_array'][$classId] = str_replace($className, 'l-'.$className, $className);
        }
    }

    if ($vars['logged_in']) {
        // CSS
        $adminCSS = array(
            //'admin.css',
            'admin-menu.css'
        );
        foreach ($adminCSS as $filename) {
            drupal_add_css($pathToTheme . '/styles/' . $filename, array(
                'group' => CSS_THEME,
            ));
        }
        // JS
        drupal_add_js($pathToTheme . '/js/parent-admin.js');
        
        // Rôle
        if (!empty($vars['user']->roles)) {
            foreach ($vars['user']->roles as $roleId => $roleName) {
                $vars['classes_array'][] = 'role-' . drupal_html_id($roleName);
            }
        }
        $params = arg();
        if (isset($params[1]) && $params[1] === 'add') {
            $params[1] = 'type';
            $vars['classes_array'][] = implode('-', $params);
        }
    }
}

/**
 * Process HTML
 */
function parent_process_html(&$vars, $hook) {
    $vars['html_attributes'] = drupal_attributes($vars['html_attributes_array']);
}
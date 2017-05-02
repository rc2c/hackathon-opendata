<?php

/**
 * Preprocess HTML
 * Appel des fichiers CSS/JS, gestion des classes body
 */
function child_preprocess_html(&$vars)
{
    $pathToTheme = path_to_theme();
    drupal_add_js(array('child' => array('pathToTheme' => $pathToTheme)), 'setting');

    // Meta responsive
    drupal_add_html_head(array(
        '#tag'        => 'meta',
        '#attributes' => array(
            'content' => 'width=device-width, initial-scale=1, shrink-to-fit=no',
            'name'    => 'viewport'
        ),
        '#weight' => 50,
    ), 'viewport');

    // METAS OG (title, url, type)
    DrupTools::addDefaultMeta($vars);

    // Add JS si connecté
    if ($vars['logged_in']) {
        drupal_add_js($pathToTheme . '/js/theme-admin.js');

        if (ThemeData::isNodeAdminSlug()) {
            $vars['classes_array'][] = 'node-data-admin';
        }
    }

    // Add classes
    if (DrupTools::isNodeView() || DrupTools::isTermView()) {
        if ($routeName = DrupRouter::getRouteName()) {
            $vars['classes_array'][] = 'template-' . strtolower($routeName);
        } else {
            $vars['classes_array'][] = 'template-default';
        }
    }


    // $vars['classes_array'] = array();
    $vars['classes_array'][] = 'app';
    $vars['classes_array'][] = 'header-fixed';
    $vars['classes_array'][] = 'sidebar-fixed';

    // $vars['classes_array'][] = "aside-menu-fixed";
    // $vars['classes_array'][] = "aside-menu-hidden";

    // $vars['classes_array'][] = "navbar-fixed";
    // $vars['classes_array'][] = "sidebar-nav";
    // $vars['classes_array'][] = "fixed-nav";

    // Favicons
    /*DrupTools::addFavicons(array(
        'apple' => array(
            57, 60, 72, 76, 114, 120, 144, 152, 180
        ),
        'classic' => array(
            16, 32, 96, 194
        ),
        'chrome' => array(
            192
        ),
        'safari' => array(
            'color' => '#e08316'
        ),
        'microsoft' => array(
            'msapplication-TileColor' => '#da532c',
            'msapplication-TileImage' => 144,
            'theme-color' => '#ffffff'
        )
    ), $pathToTheme, 1);*/
}
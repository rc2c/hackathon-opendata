<?php

/**
 * Preprocess PAGE
 * Gestion des contenus dans les pages (contient header, main et footer)
 */
function child_preprocess_page(&$vars)
{
    $vars['layout'] = null;
    $vars['path_to_theme'] = path_to_theme();

/*    $vars['site_infos'] = array(
        'email'   => variable_get('site_mail', ''),
        'phone'   => variable_get('site_phone', ''),
        'fax'     => variable_get('site_fax', ''),
        'address' => variable_get('site_address', ''),
        'about'   => variable_get('site_about', '')
    );*/

    // Titre page recherche
    /*if (DrupTools::isSlug('search/*')) {
        $breadcrumb   = array();
        $breadcrumb[] = l(t('Home'), $GLOBALS['base_url'] . '/');
        drupal_set_breadcrumb($breadcrumb);
        drupal_set_title(t('Search results'));
    }*/

    // On n'affiche pas de message s'il n'y a pas de contenu pour le terme
    if (isset($vars['page']['content']['system_main']['no_content'])) {
        unset($vars['page']['content']['system_main']['no_content']);
    }

    // Templates
    //if (DrupTools::isRoutes(array('news'))) {
    //    $vars['theme_hook_suggestions'][] = 'page__aside_inner';
    //}

    // METAS OG (description, image)
    DrupTools::addOGMeta($vars, array(
        'body' => 'body_top'
    ));

    // Get node type
    if (!empty($vars['node'])) {
        $vars['page']['node'] = $vars['node'];
        $vars['page']['node']->has_sidebar = isset($vars['page']['#has_sidebar']) ? $vars['page']['#has_sidebar'] : false;

        if ($vars['page']['node']->type === 'data') {
            ThemeChart::addLibraries();
        }
    }
}
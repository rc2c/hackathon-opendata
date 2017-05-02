<?php

/**
 * Suppression des CSS des modules
 */
function child_css_alter(&$css)
{
    $removeStylesPrefix = array(
        // 'sites/all/modules/contrib/admin_menu/admin_menu'
    );

    if (!empty($removeStylesPrefix)) {
        foreach ($css as $filename => $fileOptions) {
            foreach ($removeStylesPrefix as $path) {
                if (strstr($filename, $path)) {
                    unset($css[$filename]);
                }
            }
        }
    }
}

/**
 * Alter Admin-Menu
 */
function child_admin_menu_output_alter(&$content)
{
    global $user;
    $isAdmin = in_array('admin', $user->roles);

    // Déplacement glossaire
    $content['menu']['admin/content']['admin/structure/taxonomy/glossary']['#weight'] = 0; // Permet de remettre l'ordre alpha
    $content['menu']['admin/content']['node/add']['admin/structure/taxonomy/glossary'] = $content['menu']['admin/content']['admin/structure/taxonomy/glossary'];
    unset($content['menu']['admin/content']['admin/structure/taxonomy/glossary']);

    // Admin
    if ($isAdmin) {
        // Déplacement taxonomies à la racine du menu
        $content['menu']['admin/structure/taxonomy'] = $content['menu']['admin/structure']['admin/structure/taxonomy'];
        $content['menu']['admin/structure/taxonomy']['#title'] = t('Taxonomies');
        $content['menu']['admin/structure/taxonomy']['#attributes']['class'] = $content['menu']['admin/structure']['#attributes']['class'];

        unset(
            $content['menu']['admin/structure'],
            $content['menu']['admin/structure/taxonomy']['admin/structure/taxonomy/add'],
            $content['menu']['admin/structure/taxonomy']['admin/structure/taxonomy/scald_authors'],
            $content['menu']['admin/structure/taxonomy']['admin/structure/taxonomy/export'],
            $content['menu']['admin/structure/taxonomy']['admin/structure/taxonomy/newsletter'],
            $content['menu']['admin/structure/taxonomy']['admin/structure/taxonomy/scald_tags'],
            $content['menu']['admin/structure/taxonomy']['admin/structure/taxonomy/tags'],
            $content['menu']['admin/structure/taxonomy']['admin/structure/taxonomy/news'],
            $content['menu']['admin/structure/taxonomy']['admin/structure/taxonomy/faq']['admin/structure/taxonomy/faq/edit'],
            $content['menu']['admin/structure/taxonomy']['admin/structure/taxonomy/faq']['admin/structure/taxonomy/faq/fields'],
            $content['menu']['admin/structure/taxonomy']['admin/structure/taxonomy/faq']['admin/structure/taxonomy/faq/display'],
            $content['menu']['admin/people']['admin/people/permissions']
        );
    }
}
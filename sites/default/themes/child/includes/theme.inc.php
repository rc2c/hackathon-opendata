<?php

/**
 * Breadcrumb personnalisé
 */
function child_breadcrumb($vars)
{
    if (!empty($vars['breadcrumb'])) {
        return theme_render_template(path_to_theme().'/templates/partials/breadcrumb.tpl.php', array('breadcrumb' => $vars['breadcrumb']));
    }
}

/**
 * Ajout de l'option HTML à true sur tous les liens
 */
function child_link($variables)
{
    $variables['options']['html'] = true;

    return '<a href="' . check_plain(url($variables['path'], $variables['options'])) . '"' . drupal_attributes($variables['options']['attributes']) . '>' . ($variables['options']['html'] ? $variables['text'] : check_plain($variables['text'])) . '</a>';
}
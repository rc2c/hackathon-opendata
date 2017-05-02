<?php

/**
 * Preprocess PAGE
 * Gestion des contenus dans #page (header, main, footer)
 */
function parent_preprocess_page(&$vars)
{
    if ($vars['is_front']) {

        // Meta description
        if (isset($vars['page']['content']['metatags']['global:frontpage']['description'])) {
            $meta_description = array(
                '#tag' => 'meta',
                '#attributes' => array(
                    'name' => 'description',
                    'content' =>  $vars['page']['content']['metatags']['global:frontpage']['description']['#attached']['drupal_add_html_head'][0][0]['#value']
                )
            );
            drupal_add_html_head($meta_description, 'meta_description');
        }
        
        // On désactive le block system main
        $vars['page']['content']['system_main'] = array();
    }
}
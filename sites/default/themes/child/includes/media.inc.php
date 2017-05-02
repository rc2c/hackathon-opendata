<?php

function child_preprocess_image(&$vars) {

    if (isset($vars['style_name'])) {
        $responsive_styles = array('list_grid', 'list_third');

        if (in_array($vars['style_name'], $responsive_styles)) {
            unset($vars['height']);
            $vars['attributes']['class'][] = 'is-responsive';
        }
    }
}

function child_js_alter(&$javascript)
{
  // Swap out jQuery to use an updated version of the library. 
  //$javascript['misc/jquery.js']['data'] = path_to_theme() . '/vendors/core_ui_drupal/js/jquery.min.js';
}
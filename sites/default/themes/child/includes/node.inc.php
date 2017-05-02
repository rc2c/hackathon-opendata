<?php

/**
 * Preprocess NODE
 */
function child_preprocess_node(&$vars)
{
    $vars['path_to_theme'] = path_to_theme();
}
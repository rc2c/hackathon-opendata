<?php

/**
 * Preprocess NODE
 */
function parent_preprocess_node(&$vars, $hook)
{
    $vars['unpublished'] = (!$vars['status']) ? true : false;
}
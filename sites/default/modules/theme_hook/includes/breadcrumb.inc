<?php
/**
 * Fil d'ariane
 */
function theme_hook_menu_breadcrumb_alter(&$active_trail, $item)
{
    if (isset($active_trail[0]) && isset($active_trail[1]) && $active_trail[0]['href'] == $active_trail[1]['href']) {
        unset($active_trail[1]);
    }

    // Exclusion
    $types = array('admin');


    if (!in_array($item['map'][0], $types)) {
        if (isset($item['map'][1]) && isset($item['map'][1]->type)) {

            $node = $item['map'][1];
            $drupNode = new DrupNode($node);
            if ($term = $drupNode->getTaxonomyTerm('thematic')) {
                theme_hook_add_item_breadcrumb($active_trail, $term->getName(), $term->getPath());
            }

            switch ($node->type) {
                // Actualités
                case 'news':
                    $news = node_load(DrupRouter::getId('news', false));
                    if ($news !== false) {
                        theme_hook_add_item_breadcrumb($active_trail, $news->title, 'node/'.$news->nid);
                    }
                    break;
            }
        } 
        /*else if (isset($item['map'][1]) && $item['map'][1] === 'term') {
            if ($link = taxonomy_term_uri($item['map'][2])) {
                if ($term = $item['map'][2]) {
                    dsm($item['map'][2]);
                    dsm($link);
                    theme_hook_add_item_breadcrumb($active_trail, $term->name, $link['path']);
                }
            }
        }*/
    }
}

function theme_hook_add_item_breadcrumb(&$active_trail, $title, $link)
{
    $item                         = array();
    $item[1]['title']             = $title;
    $item[1]['href']              = drupal_get_path_alias($link);
    $item[1]['link_path']         = '';
    $item[1]['localized_options'] = array();
    $item[1]['type']              = '';

    array_splice($active_trail, 1, 0, $item);
}
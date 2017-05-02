<?php
/**
 * Theme du pager-loadmore
 */
function commun_views_load_more_pager($vars)
{
    global $pager_page_array, $pager_total;
    $nid = DrupTools::getNid();

    if (DrupRouter::isRoute('news', $nid)) {
        $text_end = t('Load more news');
    } else {
        $text_end = t('Load more');
    }

    $tags = $vars['tags'];
    $element = $vars['element'];
    $parameters = $vars['parameters'];
    $li_next = theme('pager_next',
        array(
          'text' => (isset($tags[3]) ? $tags[3] : $text_end),
          'element' => $element,
          'interval' => 1,
          'parameters' => $parameters,
        )
    );
    if (empty($li_next)) {
        return;
    }

    if ($pager_total[$element] > 1) {

        $li_next = str_replace('href', 'class="btn btn-primary btn-big" href', $li_next);

        $items[] = array(
          'class' => array('pager-next'),
          'data' => $li_next,
        );

        return theme('item_list',
              array(
                'items' => $items,
                'title' => NULL,
                'type' => 'ul',
                'attributes' => array('class' => array('pager', 'pager-load-more')),
              )
        );
    }
}
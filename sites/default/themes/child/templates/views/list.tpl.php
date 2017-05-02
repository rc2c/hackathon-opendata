<?php
    switch ($view->current_display) {
        case 'block_lastpublished':
        case 'block_end_soon':
            $layout = 'l-half';
            break;
        
        default:
            $layout = 'l-third';
            break;
    }

    $imageCrop = ('block_news_list' === $view->current_display) ? 'list_third' : 'list_grid';
    $listClasses = array('list', 'list--primary');
    $pathToTheme = path_to_theme();
?>
<ul class="<?php echo trim(implode(' ', $listClasses)); ?>">
    <?php $i = 0; ?>
    <?php foreach ($view->result as $result): ?>
        <?php
            echo theme_render_template($pathToTheme . '/templates/partials/list-item.tpl.php', array(
                'i'           => $i,
                'entity'      => $result->_field_data['nid']['entity'],
                'layout'      => $layout,
                'crop'        => $imageCrop
            ));

            $i++;
        ?>
    <?php endforeach; ?>
</ul>
<div class="clear"></div>
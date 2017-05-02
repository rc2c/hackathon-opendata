<?php
    $layout = 'col-md-6';
    //$layout .= ' col-xl-4'

    $imageCrop = ('block_news_list' === $view->current_display) ? 'list_third' : 'list_grid';
    $listClasses = array('list', 'list--primary');
    $pathToTheme = path_to_theme();
?>

<div class="row">
    <?php $i = 0; ?>
    <?php foreach ($view->result as $result): ?>
        <?php
            echo theme_render_template($pathToTheme . '/templates/partials/fiche-item.tpl.php', array(
                'i'           => $i,
                'entity'      => $result->_field_data['nid']['entity'],
                'layout'      => $layout,
                'crop'        => $imageCrop
            ));

            $i++;
        ?>
    <?php endforeach; ?>
    <div class="clearfix"></div>
</div>
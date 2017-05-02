<?php
    $pathToTheme = path_to_theme();
    require $pathToTheme.'/includes/views.inc.php';
?>
<div class="<?php print $classes; ?>">
    <?php print render($title_prefix); ?>
    <?php if ($title): ?>
        <h2 class="h3"><?php print $title; ?></h2>
        <hr/>
    <?php endif; ?>
    <?php print render($title_suffix); ?>
    <?php if ($header): ?>
        <div class="view-header">
            <?php print $header; ?>
        </div>
    <?php endif; ?>
    <?php if ($exposed): ?>
        <?php
            $filtersClasses = array('view-filters', 'filters');
        ?>
        <div class="<?php echo implode(' ', $filtersClasses); ?>">
            <?php print $exposed; ?>
        </div>
    <?php endif; ?>
    <?php if ($attachment_before): ?>
        <div class="attachment attachment-before">
            <?php print $attachment_before; ?>
        </div>
    <?php endif; ?>

    <div class="view-content">
        <?php if (!empty($viewTemplate)): ?>
            <?php echo $viewTemplate; ?>
        <?php elseif ($rows): ?>
            <?php echo $rows; ?>
        <?php endif; ?>
    </div>
    
    <?php if ($pager): ?>
        <?php print $pager; ?>
    <?php endif; ?>

    <?php if ($attachment_after): ?>
        <div class="attachment attachment-after">
            <?php print $attachment_after; ?>
        </div>
    <?php endif; ?>
    <?php if ($more): ?>
        <?php print $more; ?>
    <?php endif; ?>
    
    <?php if ($footer): ?>
        <div class="view-footer">
            <?php print $footer; ?>
        </div>
    <?php endif; ?>
    <?php if ($feed_icon): ?>
        <div class="feed-icon">
            <?php print $feed_icon; ?>
        </div>
    <?php endif; ?>
</div><?php /* class view */ ?>
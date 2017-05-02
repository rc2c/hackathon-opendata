<?php
    $drupNode = new DrupNode($node);
?>

<article class="card node-<?php echo $node->nid; ?> <?php echo $classes; ?>"<?php echo $attributes; ?>>

    <?php if ($title_prefix || $title_suffix || $display_submitted || $unpublished || !$page && $title): ?>
        <header>
            <?php echo render($title_prefix); ?>
            <?php if (!$page && $title): ?>
                <h2<?php echo $title_attributes; ?>><a href="<?php echo $node_url; ?>"><?php echo $title; ?></a></h2>
            <?php endif; ?>
            <?php echo render($title_suffix); ?>

            <?php if ($unpublished): ?>
                <mark class="unpublished"><?php echo t('Unpublished'); ?></mark>
            <?php endif; ?>
        </header>
    <?php endif; ?>

    <?php /*<div class="card-header">Coucou</div>*/ ?>

    <div class="card-block">

        <?php echo theme_render_template($path_to_theme.'/templates/partials/node-header.tpl.php', array(
            'drupNode' => $drupNode
        )); ?>

        <?php echo ThemeChart::render($drupNode); ?>

        <?php if (!empty($resultBody->value)): ?>
            <div class="node-body">
                <?php echo render($resultBody->value); ?>
            </div>
        <?php endif; ?>
    </div>


    <footer class="card-footer">
        <button type="button" class="btn btn btn-outline-success" data-toggle="modal" data-target="#modalShareFiche"><i class="icon-share"></i> Partager</button>
        <button type="button" class="btn btn btn-outline-success" data-toggle="modal" data-target="#modalExportFiche"><i class="fa fa-file-pdf-o"></i> Exporter</button>

        <button type="button" class="btn btn-outline-danger float-right">45 <i class="fa fa-heart-o"></i></button>
        <span class="float-right p-h">123 <i class="fa fa-eye"></i></span>
    </footer>


</article>

<?php if ($drupNode->getText('dataviz_showtable')->value == 1): ?>
    <div class="card">
        <header class="card-header">Tableau interactif</header>
        <div class="card-block"></div>
    </div>
<?php endif; ?>

<div class="card mt-3 mb-3">
    <header class="card-header">Commenter</header>
    <div class="card-block"></div>
</div>

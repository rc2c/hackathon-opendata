<?php
    $drupNode = new DrupNode($node);
    $resultBody = $drupNode->getRichText('body');
    $nodeType = $drupNode->getType();
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

        <?php if (!empty($resultBody->value)): ?>
            <div class="node-body">
                <?php echo render($resultBody->value); ?>
            </div>
        <?php endif; ?>

        <?php if ('webform' === $nodeType): ?>
            <?php echo render($content); ?>
        <?php endif; ?>
    </div>

</article>

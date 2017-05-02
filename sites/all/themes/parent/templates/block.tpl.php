<?php
/**
 * @file
 * Returns the HTML for a block.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728246
 */
?>
<?php if ($logged_in): ?>
    <?php if (isset($block_menu)): ?>
        <nav id="<?php echo $block_html_id; ?>" <?php echo $attributes; ?>>
            <?php echo $content; ?>
        </nav>
    <?php else: ?>
        <?php if (in_array('block-admin', $classes_array)): ?>
            <div class="<?php echo $classes; ?>">
                <?php echo render($title_prefix); ?>
                <?php echo render($title_suffix); ?>
                
                <?php echo $content; ?>
            </div>
        <?php else: ?>
            <?php echo $content; ?>
        <?php endif; ?>
    <?php endif; ?>
<?php else: ?>
    <?php if (isset($block_menu)): ?>
        <nav id="<?php echo $block_html_id; ?>" <?php echo $attributes; ?>>
            <?php echo $content; ?>
        </nav>
    <?php else: ?>
        <?php echo $content; ?>
    <?php endif; ?>
<?php endif; ?>
<?php
/**
 * Fil d'ariane
 *
 * @param array breadcrumb -> Valeur 'breadcrumb' du hook breadcrumb
 * 
 * @see includes/theme.inc.php
 */
?>

<ol class="breadcrumb">
    <?php foreach ($breadcrumb as $itemId => $item): ?>
        <li class="breadcrumb-item<?php echo ($itemId === 0) ? ' is-home' : ''; ?>">
            <?php echo $item; ?>
        </li>
    <?php  endforeach; ?>

    <li class="breadcrumb-item active">
        <?php echo drupal_get_title(); ?>
    </li>
</ol>
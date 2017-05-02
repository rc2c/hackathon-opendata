<?php
/**
 * Élément d'une liste d'items
 *
 * @param int    i           -> Index de l'item
 * @param object entity      -> L'objet complet du noeud
 * @param string layout      -> Layout specifique ?
 * @param string crop        -> Image crop
 *
 * @see views/list.tpl.php
 */

$node = new DrupNode($entity);

// Classes
$rowClasses = array('fiche');
$rowClasses[] = 'item-'.($i+1);
$rowClasses[] = (isset($layout)) ? $layout : null;

?>
<div class="<?php echo implode(' ', $rowClasses); ?>">
    <article class="card">
        <header class="card-header">
            <h3 class="card-title h5 float-left">
                <?php echo l($node->getTitle(), 'node/'.$node->getId()); ?>
            </h3>
            <div class="float-right">
                <span class=""> <?php echo rand(20, 30); ?> <i class="fa fa-eye"></i> </span>&nbsp;
                <span class=""> <?php echo rand(30, 50); ?> <i class="fa fa-heart-o"></i> </span>
            </div>

        </header>

        <div class="card-block p-0">
            <?php if ($image = $node->getMedia('dataviz_image')): ?>
                <div class="item-image float-left m-1">
                    <?php echo l($image->render($crop), 'node/'.$node->getId()); ?>
                </div>
            <?php endif; ?>

            <div class="p-1">
                <?php if ($resultSubtitle = $node->getText('subtitle')): ?>
                    <p class="item-subtitle"><?php echo $resultSubtitle->value; ?></p>
                <?php endif; ?>

                <footer class="item-footer">
                    <?php echo l(t('Consulter'), 'node/'.$node->getId(), array('attributes' => array('class' => array('btn', 'btn-outline-primary')))) ?>
                </footer>
            </div>
        </div>
    </article>
</div>
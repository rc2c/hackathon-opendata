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
$rowClasses = array('list-item', 'card');
$rowClasses[] = 'item-'.($i+1);
$rowClasses[] = (isset($layout)) ? $layout : null;

?>
<li class="<?php echo implode(' ', $rowClasses); ?>">
    <article class="item-wrapper">
        <header class="item-header">
            <h3 class="item-title"><?php echo l($node->getTitle(), 'node/'.$node->getId()); ?></h3>
            <?php if ($resultSubtitle = $node->getText('subtitle')): ?>
                <p class="item-subtitle"><?php echo $resultSubtitle->value; ?></p>
            <?php endif; ?>
        </header>

        <?php if ($image = $node->getMedia('image')): ?>
            <div class="item-image">
                <?php echo $image->render($crop); ?>
            </div>
        <?php endif; ?>

        <?php if ($date = $node->getDate('date')): ?>
            <p class="item-date date">
                <span class="date-day"><?php echo $date->day; ?></span>
                <span class="date-month"><?php echo $date->month; ?></span>
            </p>
        <?php endif; ?>

        <?php if ($resultBody = $node->getSummary('body')): ?>
            <div class="item-body">
                <?php echo DrupTools::trimBodyString($resultBody, 180); ?>
            </div>
        <?php endif; ?>

        <footer class="item-footer">
            <?php echo l(t('See more'), 'node/'.$node->getId(), array('attributes' => array('class' => array('btn', 'btn--more')))) ?>
        </footer>
    </article>
</li>
<?php
/**
 * Liste des termes d'une taxonomie
 *
 * @see 
 */
?>

<?php
    $currentTermId = '';
    if ($nid = DrupTools::getNid()) {
        $drupNode = new DrupNode($nid);
        if ($term = $drupNode->getTaxonomyTerm('thematic')) {
            $currentTermId = $term->getId();
        }
    }
?>

<ul class="nav">

    <li class="nav-item">
        <?php echo l(
            '<i class="icon-speedometer"></i> Toutes les données', 
            DrupRouter::get('list_all'), 
            array('attributes' => array('class' => array('nav-link')))
        ); ?>
    </li>

    <?php if (isset($vocabulary->name)): ?>
        <li class="nav-item nav-title">
            <?php echo $vocabulary->name; ?>
        </li>
    <?php endif; ?>

    <?php if (!empty($terms)): ?>
    	<?php foreach ($terms as $termID => $term): ?>

    		<?php
    			$drupTerm = new DrupTerm($term);
    			$iconClass = (isset($term->field_thematique_icon[LANGUAGE_NONE])) ? 
                    $term->field_thematique_icon[LANGUAGE_NONE][0]['value'] : 
                    'icon-speedometer';

    			$link = taxonomy_term_uri($term);

                $liClasses = array('nav-item');
                //$liClasses[] = (!empty($itemValue['below'])) ? 'nav-dropdown open' : '';
                //$liClasses[] = (isset($activeTrail[$i]['href']) && $activeTrail[$i]['href'] == $itemValue['link']['href']) ? 'active' : '';
                
                $linkClasses = array('nav-link');
                $linkClasses[] = ($currentTermId == $drupTerm->getId()) ? 'active' : '';
                //$linkClasses[] = (!empty($itemValue['below'])) ? 'nav-dropdown-toggle' : '';

            ?>

    		<li class="<?php echo trim(implode(' ', $liClasses)); ?>">
                <?php echo l(
                	'<i class="'.$iconClass.'"></i>' . $drupTerm->getName(), 
                	$link['path'], 
                	array('attributes' => array('class' => $linkClasses))
                ); ?>
            </li>
    	<?php endforeach; ?>
    <?php endif; ?>
</ul>
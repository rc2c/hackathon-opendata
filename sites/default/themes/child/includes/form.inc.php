<?php

/**
 * Hook Form alter
 * 
 * Ne pas déplacer dans theme_hook
 */
function child_form_alter(&$form, &$form_state, $form_id)
{
	$form['#attributes']['class'][] = 'form';

	$form['#prefix'] = '<div class="card">';
		$form['#prefix'] .= '<div class="card-block">';
		$form['#suffix'] = '</div>';
	$form['#suffix'] .= '</div>';

	//dsm($form);

	$form['actions']['submit']['#attributes'] = array('class' => array('btn', 'btn-primary'));
	$form['actions']['preview']['#attributes'] = array('class' => array('btn', 'btn-warning'));
	$form['actions']['delete']['#attributes'] = array('class' => array('btn', 'btn-danger'));
}

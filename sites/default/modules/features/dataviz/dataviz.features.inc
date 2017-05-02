<?php
/**
 * @file
 * dataviz.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function dataviz_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function dataviz_node_info() {
  $items = array(
    'dataviz' => array(
      'name' => t('Modèle de représentation'),
      'base' => 'node_content',
      'description' => t('Permet d\'appliquer un modèle pour représenter les données.'),
      'has_title' => '1',
      'title_label' => t('Titre'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}

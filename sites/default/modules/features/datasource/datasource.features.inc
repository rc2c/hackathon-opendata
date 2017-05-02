<?php
/**
 * @file
 * datasource.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function datasource_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function datasource_node_info() {
  $items = array(
    'datasource' => array(
      'name' => t('Source de données'),
      'base' => 'node_content',
      'description' => t('Permet d\'identifier la source des données.'),
      'has_title' => '1',
      'title_label' => t('Titre'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}

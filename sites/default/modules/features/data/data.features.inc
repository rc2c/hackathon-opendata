<?php
/**
 * @file
 * data.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function data_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function data_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_image_default_styles().
 */
function data_image_default_styles() {
  $styles = array();

  // Exported image style: list_grid.
  $styles['list_grid'] = array(
    'label' => 'list_grid',
    'effects' => array(
      7 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 270,
          'height' => 200,
        ),
        'weight' => 1,
      ),
    ),
  );

  return $styles;
}

/**
 * Implements hook_node_info().
 */
function data_node_info() {
  $items = array(
    'data' => array(
      'name' => t('Fiche de données'),
      'base' => 'node_content',
      'description' => t('Permet de créer une fiche de données.'),
      'has_title' => '1',
      'title_label' => t('Titre'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}

<?php
/**
 * @file
 * data.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function data_field_group_info() {
  $field_groups = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_data_tabs|node|data|form';
  $field_group->group_name = 'group_data_tabs';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'data';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Onglets',
    'weight' => '0',
    'children' => array(
      0 => 'group_dataviz',
      1 => 'group_data',
      2 => 'group_description',
    ),
    'format_type' => 'htabs',
    'format_settings' => array(
      'formatter' => '',
      'instance_settings' => array(
        'classes' => 'group-data-tabs field-group-htabs',
        'id' => '',
      ),
    ),
  );
  $field_groups['group_data_tabs|node|data|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_dataviz|node|data|form';
  $field_group->group_name = 'group_dataviz';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'data';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_data_tabs';
  $field_group->data = array(
    'label' => 'Visualisation',
    'weight' => '15',
    'children' => array(
      0 => 'field_dataviz_model',
      1 => 'field_dataviz_showtable',
      2 => 'field_dataviz_realtime',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'label' => 'Visualisation',
      'instance_settings' => array(
        'required_fields' => 0,
        'classes' => 'group-dataviz field-group-htab',
        'description' => '',
      ),
      'formatter' => 'closed',
    ),
  );
  $field_groups['group_dataviz|node|data|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_data|node|data|form';
  $field_group->group_name = 'group_data';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'data';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_data_tabs';
  $field_group->data = array(
    'label' => 'Filtrage des données',
    'weight' => '13',
    'children' => array(
      0 => 'field_data_thematic',
      1 => 'field_data_tables',
      2 => 'field_data_columns',
      3 => 'field_data_filters',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'label' => 'Filtrage des données',
      'instance_settings' => array(
        'required_fields' => 0,
        'classes' => 'group-data field-group-htab',
        'description' => '',
      ),
      'formatter' => 'open',
    ),
  );
  $field_groups['group_data|node|data|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_description|node|data|form';
  $field_group->group_name = 'group_description';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'data';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_data_tabs';
  $field_group->data = array(
    'label' => 'Description',
    'weight' => '16',
    'children' => array(
      0 => 'field_data_subtitle',
      1 => 'field_dataviz_image',
      2 => 'field_dataviz_legend',
      3 => 'title',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-description field-group-htab',
        'required_fields' => 1,
      ),
    ),
  );
  $field_groups['group_description|node|data|form'] = $field_group;

  // Translatables
  // Included for use with string extractors like potx.
  t('Description');
  t('Filtrage des données');
  t('Onglets');
  t('Visualisation');

  return $field_groups;
}

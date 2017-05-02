<?php
/**
 * @file
 * data.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function data_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'data';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Contenu d\'une fiche de données';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'plus';
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Appliquer';
  $handler->display->display_options['exposed_form']['options']['reset_button_label'] = 'Réinitialiser';
  $handler->display->display_options['exposed_form']['options']['exposed_sorts_label'] = 'Trier par';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Champ: Contenu : Titre */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Critère de tri: Contenu : Date de publication */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filtre contextuel: Contenu : Thématique (field_data_thematic) */
  $handler->display->display_options['arguments']['field_data_thematic_tid']['id'] = 'field_data_thematic_tid';
  $handler->display->display_options['arguments']['field_data_thematic_tid']['table'] = 'field_data_field_data_thematic';
  $handler->display->display_options['arguments']['field_data_thematic_tid']['field'] = 'field_data_thematic_tid';
  $handler->display->display_options['arguments']['field_data_thematic_tid']['default_action'] = 'not found';
  $handler->display->display_options['arguments']['field_data_thematic_tid']['exception']['title'] = 'Tout';
  $handler->display->display_options['arguments']['field_data_thematic_tid']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['field_data_thematic_tid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_data_thematic_tid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_data_thematic_tid']['summary_options']['items_per_page'] = '25';
  /* Critère de filtrage: Contenu : Publié */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Critère de filtrage: Contenu : Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'data' => 'data',
  );

  /* Display: Données associées */
  $handler = $view->new_display('block', 'Données associées', 'block');
  $translatables['data'] = array(
    t('Master'),
    t('plus'),
    t('Appliquer'),
    t('Réinitialiser'),
    t('Trier par'),
    t('Asc'),
    t('Desc'),
    t('Tout'),
    t('Données associées'),
  );
  $export['data'] = $view;

  $view = new view();
  $view->name = 'thematique';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Contenu d\'une thématique';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_ajax'] = TRUE;
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'plus';
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Appliquer';
  $handler->display->display_options['exposed_form']['options']['reset_button_label'] = 'Réinitialiser';
  $handler->display->display_options['exposed_form']['options']['exposed_sorts_label'] = 'Trier par';
  $handler->display->display_options['exposed_form']['options']['sort_asc_label'] = 'A - Z';
  $handler->display->display_options['exposed_form']['options']['sort_desc_label'] = 'Z - A';
  $handler->display->display_options['exposed_form']['options']['autosubmit'] = TRUE;
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Champ: Contenu : Titre */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Champ: Contenu : Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  /* Champ: Contenu : Corps */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  /* Critère de tri: Contenu : Date de publication */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  $handler->display->display_options['sorts']['created']['exposed'] = TRUE;
  $handler->display->display_options['sorts']['created']['expose']['label'] = 'Date de publication';
  /* Filtre contextuel: Contenu : Possède un identifiant (ID) de terme de taxonomie */
  $handler->display->display_options['arguments']['tid']['id'] = 'tid';
  $handler->display->display_options['arguments']['tid']['table'] = 'taxonomy_index';
  $handler->display->display_options['arguments']['tid']['field'] = 'tid';
  $handler->display->display_options['arguments']['tid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['tid']['exception']['title'] = 'Tout';
  $handler->display->display_options['arguments']['tid']['default_argument_type'] = 'taxonomy_tid';
  $handler->display->display_options['arguments']['tid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['tid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['tid']['summary_options']['items_per_page'] = '25';
  /* Critère de filtrage: Contenu : Publié */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Critère de filtrage: Contenu : Type (field_dataviz_type) */
  $handler->display->display_options['filters']['field_dataviz_type_value']['id'] = 'field_dataviz_type_value';
  $handler->display->display_options['filters']['field_dataviz_type_value']['table'] = 'field_data_field_dataviz_type';
  $handler->display->display_options['filters']['field_dataviz_type_value']['field'] = 'field_dataviz_type_value';
  $handler->display->display_options['filters']['field_dataviz_type_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_dataviz_type_value']['expose']['operator_id'] = 'field_dataviz_type_value_op';
  $handler->display->display_options['filters']['field_dataviz_type_value']['expose']['label'] = 'Type ';
  $handler->display->display_options['filters']['field_dataviz_type_value']['expose']['operator'] = 'field_dataviz_type_value_op';
  $handler->display->display_options['filters']['field_dataviz_type_value']['expose']['identifier'] = 'field_dataviz_type_value';
  $handler->display->display_options['filters']['field_dataviz_type_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    4 => 0,
    3 => 0,
    6 => 0,
    5 => 0,
  );
  /* Critère de filtrage: Contenu : Titre */
  $handler->display->display_options['filters']['title']['id'] = 'title';
  $handler->display->display_options['filters']['title']['table'] = 'node';
  $handler->display->display_options['filters']['title']['field'] = 'title';
  $handler->display->display_options['filters']['title']['operator'] = 'contains';
  $handler->display->display_options['filters']['title']['exposed'] = TRUE;
  $handler->display->display_options['filters']['title']['expose']['operator_id'] = 'title_op';
  $handler->display->display_options['filters']['title']['expose']['label'] = 'Titre';
  $handler->display->display_options['filters']['title']['expose']['operator'] = 'title_op';
  $handler->display->display_options['filters']['title']['expose']['identifier'] = 'title';
  $handler->display->display_options['filters']['title']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    4 => 0,
    3 => 0,
    6 => 0,
    5 => 0,
  );
  /* Critère de filtrage: Contenu : Cette donnée se traite en temps réel (field_dataviz_realtime) */
  $handler->display->display_options['filters']['field_dataviz_realtime_value']['id'] = 'field_dataviz_realtime_value';
  $handler->display->display_options['filters']['field_dataviz_realtime_value']['table'] = 'field_data_field_dataviz_realtime';
  $handler->display->display_options['filters']['field_dataviz_realtime_value']['field'] = 'field_dataviz_realtime_value';
  $handler->display->display_options['filters']['field_dataviz_realtime_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_dataviz_realtime_value']['expose']['operator_id'] = 'field_dataviz_realtime_value_op';
  $handler->display->display_options['filters']['field_dataviz_realtime_value']['expose']['label'] = 'Temps réel';
  $handler->display->display_options['filters']['field_dataviz_realtime_value']['expose']['operator'] = 'field_dataviz_realtime_value_op';
  $handler->display->display_options['filters']['field_dataviz_realtime_value']['expose']['identifier'] = 'field_dataviz_realtime_value';
  $handler->display->display_options['filters']['field_dataviz_realtime_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    4 => 0,
    3 => 0,
    6 => 0,
    5 => 0,
  );
  /* Critère de filtrage: Contenu : Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'data' => 'data',
  );

  /* Display: Liste thématique */
  $handler = $view->new_display('block', 'Liste thématique', 'list');
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Critère de tri: Contenu : Date de publication */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  $handler->display->display_options['sorts']['created']['exposed'] = TRUE;
  $handler->display->display_options['sorts']['created']['expose']['label'] = 'Date de publication';
  /* Critère de tri: Contenu : Titre */
  $handler->display->display_options['sorts']['title']['id'] = 'title';
  $handler->display->display_options['sorts']['title']['table'] = 'node';
  $handler->display->display_options['sorts']['title']['field'] = 'title';
  $handler->display->display_options['sorts']['title']['exposed'] = TRUE;
  $handler->display->display_options['sorts']['title']['expose']['label'] = 'Titre';
  /* Critère de tri: Contenu : Nombre de vues (field_data_views) */
  $handler->display->display_options['sorts']['field_data_views_value']['id'] = 'field_data_views_value';
  $handler->display->display_options['sorts']['field_data_views_value']['table'] = 'field_data_field_data_views';
  $handler->display->display_options['sorts']['field_data_views_value']['field'] = 'field_data_views_value';
  $handler->display->display_options['sorts']['field_data_views_value']['exposed'] = TRUE;
  $handler->display->display_options['sorts']['field_data_views_value']['expose']['label'] = 'Vues';
  /* Critère de tri: Contenu : Nombre de likes (field_data_likes) */
  $handler->display->display_options['sorts']['field_data_likes_value']['id'] = 'field_data_likes_value';
  $handler->display->display_options['sorts']['field_data_likes_value']['table'] = 'field_data_field_data_likes';
  $handler->display->display_options['sorts']['field_data_likes_value']['field'] = 'field_data_likes_value';
  $handler->display->display_options['sorts']['field_data_likes_value']['exposed'] = TRUE;
  $handler->display->display_options['sorts']['field_data_likes_value']['expose']['label'] = 'Likes';

  /* Display: Matching */
  $handler = $view->new_display('block', 'Matching', 'list_matching');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '4';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Critère de tri: Global : Au hasard */
  $handler->display->display_options['sorts']['random']['id'] = 'random';
  $handler->display->display_options['sorts']['random']['table'] = 'views';
  $handler->display->display_options['sorts']['random']['field'] = 'random';
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Filtre contextuel: Contenu : Nid */
  $handler->display->display_options['arguments']['nid']['id'] = 'nid';
  $handler->display->display_options['arguments']['nid']['table'] = 'node';
  $handler->display->display_options['arguments']['nid']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['nid']['exception']['title'] = 'Tout';
  $handler->display->display_options['arguments']['nid']['default_argument_type'] = 'node';
  $handler->display->display_options['arguments']['nid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['nid']['not'] = TRUE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Critère de filtrage: Contenu : Publié */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Critère de filtrage: Contenu : Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'data' => 'data',
  );

  /* Display: User */
  $handler = $view->new_display('block', 'User', 'list_user');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '4';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relation: Contenu : Auteur */
  $handler->display->display_options['relationships']['uid']['id'] = 'uid';
  $handler->display->display_options['relationships']['uid']['table'] = 'node';
  $handler->display->display_options['relationships']['uid']['field'] = 'uid';
  $handler->display->display_options['relationships']['uid']['required'] = TRUE;
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Critère de tri: Global : Au hasard */
  $handler->display->display_options['sorts']['random']['id'] = 'random';
  $handler->display->display_options['sorts']['random']['table'] = 'views';
  $handler->display->display_options['sorts']['random']['field'] = 'random';
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Filtre contextuel: Contenu : uid de l'auteur */
  $handler->display->display_options['arguments']['uid']['id'] = 'uid';
  $handler->display->display_options['arguments']['uid']['table'] = 'node';
  $handler->display->display_options['arguments']['uid']['field'] = 'uid';
  $handler->display->display_options['arguments']['uid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['uid']['exception']['title'] = 'Tout';
  $handler->display->display_options['arguments']['uid']['default_argument_type'] = 'user';
  $handler->display->display_options['arguments']['uid']['default_argument_options']['user'] = FALSE;
  $handler->display->display_options['arguments']['uid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['uid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['uid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Critère de filtrage: Contenu : Publié */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Critère de filtrage: Contenu : Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'data' => 'data',
  );

  /* Display: User favoris */
  $handler = $view->new_display('block', 'User favoris', 'user_favorites');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '2';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relation: Contenu : Auteur */
  $handler->display->display_options['relationships']['uid']['id'] = 'uid';
  $handler->display->display_options['relationships']['uid']['table'] = 'node';
  $handler->display->display_options['relationships']['uid']['field'] = 'uid';
  $handler->display->display_options['relationships']['uid']['required'] = TRUE;
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Critère de tri: Global : Au hasard */
  $handler->display->display_options['sorts']['random']['id'] = 'random';
  $handler->display->display_options['sorts']['random']['table'] = 'views';
  $handler->display->display_options['sorts']['random']['field'] = 'random';
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Filtre contextuel: Utilisateur : Uid */
  $handler->display->display_options['arguments']['uid']['id'] = 'uid';
  $handler->display->display_options['arguments']['uid']['table'] = 'users';
  $handler->display->display_options['arguments']['uid']['field'] = 'uid';
  $handler->display->display_options['arguments']['uid']['relationship'] = 'uid';
  $handler->display->display_options['arguments']['uid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['uid']['exception']['title'] = 'Tout';
  $handler->display->display_options['arguments']['uid']['default_argument_type'] = 'current_user';
  $handler->display->display_options['arguments']['uid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['uid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['uid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Critère de filtrage: Contenu : Publié */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Critère de filtrage: Contenu : Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'data' => 'data',
  );

  /* Display: Liste complète */
  $handler = $view->new_display('block', 'Liste complète', 'list_all');
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Critère de tri: Contenu : Date de publication */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  $handler->display->display_options['sorts']['created']['exposed'] = TRUE;
  $handler->display->display_options['sorts']['created']['expose']['label'] = 'Date de publication';
  /* Critère de tri: Contenu : Titre */
  $handler->display->display_options['sorts']['title']['id'] = 'title';
  $handler->display->display_options['sorts']['title']['table'] = 'node';
  $handler->display->display_options['sorts']['title']['field'] = 'title';
  $handler->display->display_options['sorts']['title']['exposed'] = TRUE;
  $handler->display->display_options['sorts']['title']['expose']['label'] = 'Titre';
  /* Critère de tri: Contenu : Nombre de vues (field_data_views) */
  $handler->display->display_options['sorts']['field_data_views_value']['id'] = 'field_data_views_value';
  $handler->display->display_options['sorts']['field_data_views_value']['table'] = 'field_data_field_data_views';
  $handler->display->display_options['sorts']['field_data_views_value']['field'] = 'field_data_views_value';
  $handler->display->display_options['sorts']['field_data_views_value']['exposed'] = TRUE;
  $handler->display->display_options['sorts']['field_data_views_value']['expose']['label'] = 'Vues';
  /* Critère de tri: Contenu : Nombre de likes (field_data_likes) */
  $handler->display->display_options['sorts']['field_data_likes_value']['id'] = 'field_data_likes_value';
  $handler->display->display_options['sorts']['field_data_likes_value']['table'] = 'field_data_field_data_likes';
  $handler->display->display_options['sorts']['field_data_likes_value']['field'] = 'field_data_likes_value';
  $handler->display->display_options['sorts']['field_data_likes_value']['exposed'] = TRUE;
  $handler->display->display_options['sorts']['field_data_likes_value']['expose']['label'] = 'Likes';
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Critère de filtrage: Contenu : Publié */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Critère de filtrage: Contenu : Type (field_dataviz_type) */
  $handler->display->display_options['filters']['field_dataviz_type_value']['id'] = 'field_dataviz_type_value';
  $handler->display->display_options['filters']['field_dataviz_type_value']['table'] = 'field_data_field_dataviz_type';
  $handler->display->display_options['filters']['field_dataviz_type_value']['field'] = 'field_dataviz_type_value';
  $handler->display->display_options['filters']['field_dataviz_type_value']['group'] = 1;
  $handler->display->display_options['filters']['field_dataviz_type_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_dataviz_type_value']['expose']['operator_id'] = 'field_dataviz_type_value_op';
  $handler->display->display_options['filters']['field_dataviz_type_value']['expose']['label'] = 'Type ';
  $handler->display->display_options['filters']['field_dataviz_type_value']['expose']['operator'] = 'field_dataviz_type_value_op';
  $handler->display->display_options['filters']['field_dataviz_type_value']['expose']['identifier'] = 'field_dataviz_type_value';
  $handler->display->display_options['filters']['field_dataviz_type_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    4 => 0,
    3 => 0,
    6 => 0,
    5 => 0,
  );
  /* Critère de filtrage: Contenu : Thématique (field_data_thematic) */
  $handler->display->display_options['filters']['field_data_thematic_tid']['id'] = 'field_data_thematic_tid';
  $handler->display->display_options['filters']['field_data_thematic_tid']['table'] = 'field_data_field_data_thematic';
  $handler->display->display_options['filters']['field_data_thematic_tid']['field'] = 'field_data_thematic_tid';
  $handler->display->display_options['filters']['field_data_thematic_tid']['group'] = 1;
  $handler->display->display_options['filters']['field_data_thematic_tid']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_data_thematic_tid']['expose']['operator_id'] = 'field_data_thematic_tid_op';
  $handler->display->display_options['filters']['field_data_thematic_tid']['expose']['label'] = 'Thématique ';
  $handler->display->display_options['filters']['field_data_thematic_tid']['expose']['operator'] = 'field_data_thematic_tid_op';
  $handler->display->display_options['filters']['field_data_thematic_tid']['expose']['identifier'] = 'field_data_thematic_tid';
  $handler->display->display_options['filters']['field_data_thematic_tid']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    4 => 0,
    3 => 0,
    6 => 0,
    5 => 0,
  );
  $handler->display->display_options['filters']['field_data_thematic_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_data_thematic_tid']['vocabulary'] = 'thematique';
  /* Critère de filtrage: Contenu : Titre */
  $handler->display->display_options['filters']['title']['id'] = 'title';
  $handler->display->display_options['filters']['title']['table'] = 'node';
  $handler->display->display_options['filters']['title']['field'] = 'title';
  $handler->display->display_options['filters']['title']['operator'] = 'contains';
  $handler->display->display_options['filters']['title']['group'] = 1;
  $handler->display->display_options['filters']['title']['exposed'] = TRUE;
  $handler->display->display_options['filters']['title']['expose']['operator_id'] = 'title_op';
  $handler->display->display_options['filters']['title']['expose']['label'] = 'Titre';
  $handler->display->display_options['filters']['title']['expose']['operator'] = 'title_op';
  $handler->display->display_options['filters']['title']['expose']['identifier'] = 'title';
  $handler->display->display_options['filters']['title']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    4 => 0,
    3 => 0,
    6 => 0,
    5 => 0,
  );
  /* Critère de filtrage: Contenu : Cette donnée se traite en temps réel (field_dataviz_realtime) */
  $handler->display->display_options['filters']['field_dataviz_realtime_value']['id'] = 'field_dataviz_realtime_value';
  $handler->display->display_options['filters']['field_dataviz_realtime_value']['table'] = 'field_data_field_dataviz_realtime';
  $handler->display->display_options['filters']['field_dataviz_realtime_value']['field'] = 'field_dataviz_realtime_value';
  $handler->display->display_options['filters']['field_dataviz_realtime_value']['group'] = 1;
  $handler->display->display_options['filters']['field_dataviz_realtime_value']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_dataviz_realtime_value']['expose']['operator_id'] = 'field_dataviz_realtime_value_op';
  $handler->display->display_options['filters']['field_dataviz_realtime_value']['expose']['label'] = 'Temps réel';
  $handler->display->display_options['filters']['field_dataviz_realtime_value']['expose']['operator'] = 'field_dataviz_realtime_value_op';
  $handler->display->display_options['filters']['field_dataviz_realtime_value']['expose']['identifier'] = 'field_dataviz_realtime_value';
  $handler->display->display_options['filters']['field_dataviz_realtime_value']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    4 => 0,
    3 => 0,
    6 => 0,
    5 => 0,
  );
  /* Critère de filtrage: Contenu : Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'data' => 'data',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;

  /* Display: Dernier graphique */
  $handler = $view->new_display('block', 'Dernier graphique', 'last_graphic');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '1';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Critère de tri: Contenu : Date de mise à jour */
  $handler->display->display_options['sorts']['changed']['id'] = 'changed';
  $handler->display->display_options['sorts']['changed']['table'] = 'node';
  $handler->display->display_options['sorts']['changed']['field'] = 'changed';
  $handler->display->display_options['sorts']['changed']['order'] = 'DESC';
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Critère de filtrage: Contenu : Publié */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Critère de filtrage: Contenu : Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'data' => 'data',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;

  /* Display: Dernière map */
  $handler = $view->new_display('block', 'Dernière map', 'last_map');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '1';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Critère de tri: Contenu : Date de mise à jour */
  $handler->display->display_options['sorts']['changed']['id'] = 'changed';
  $handler->display->display_options['sorts']['changed']['table'] = 'node';
  $handler->display->display_options['sorts']['changed']['field'] = 'changed';
  $handler->display->display_options['sorts']['changed']['order'] = 'DESC';
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Critère de filtrage: Contenu : Publié */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Critère de filtrage: Contenu : Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'data' => 'data',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;

  /* Display: En temps réel */
  $handler = $view->new_display('block', 'En temps réel', 'realtime');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '2';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Critère de tri: Contenu : Date de mise à jour */
  $handler->display->display_options['sorts']['changed']['id'] = 'changed';
  $handler->display->display_options['sorts']['changed']['table'] = 'node';
  $handler->display->display_options['sorts']['changed']['field'] = 'changed';
  $handler->display->display_options['sorts']['changed']['order'] = 'DESC';
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Critère de filtrage: Contenu : Publié */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Critère de filtrage: Contenu : Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'data' => 'data',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Critère de filtrage: Contenu : Cette donnée se traite en temps réel (field_dataviz_dynamic) */
  $handler->display->display_options['filters']['field_dataviz_dynamic_value']['id'] = 'field_dataviz_dynamic_value';
  $handler->display->display_options['filters']['field_dataviz_dynamic_value']['table'] = 'field_data_field_dataviz_dynamic';
  $handler->display->display_options['filters']['field_dataviz_dynamic_value']['field'] = 'field_dataviz_dynamic_value';
  $handler->display->display_options['filters']['field_dataviz_dynamic_value']['value'] = array(
    1 => '1',
  );
  $translatables['thematique'] = array(
    t('Master'),
    t('plus'),
    t('Appliquer'),
    t('Réinitialiser'),
    t('Trier par'),
    t('A - Z'),
    t('Z - A'),
    t('Nid'),
    t('Date de publication'),
    t('Tout'),
    t('Type '),
    t('Titre'),
    t('Temps réel'),
    t('Liste thématique'),
    t('Vues'),
    t('Likes'),
    t('Matching'),
    t('User'),
    t('auteur'),
    t('User favoris'),
    t('Liste complète'),
    t('Thématique '),
    t('Dernier graphique'),
    t('Dernière map'),
    t('En temps réel'),
  );
  $export['thematique'] = $view;

  return $export;
}

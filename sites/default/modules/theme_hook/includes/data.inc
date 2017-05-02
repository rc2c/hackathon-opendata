<?php

abstract class ThemeData
{
    /**
     * [formAlter description]
     * @param  [type] &$form       [description]
     * @param  [type] &$form_state [description]
     * @return [type]              [description]
     */
    public static function formAlter(&$form, &$form_state)
    {
        // Max tables
        $fieldTablesInfo = field_info_field($form['field_data_tables'][LANGUAGE_NONE]['#field_name']);
        $form['field_data_tables']['#attributes']['data-max'] = $fieldTablesInfo['cardinality'];
    }

    /**
     * Test si on est dans l'admin d'un noeud du type data
     *
     * @return boolean
     */
    public static function isNodeAdminSlug()
    {
        return (DrupRouter::isSlug('node/add/data') || DrupRouter::isSlug('node/*/edit'));
    }
}
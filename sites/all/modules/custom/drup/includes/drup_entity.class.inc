<?php

abstract class DrupEntity
{
	/**
     * Retourne le nom du champ
     *
     * @param  object $node
     * @param  string $field Nom du champ (sans field_ et sans le type de contenu)
     * @return string
     */
    protected function getFormatField($node, $field)
    {
        $prefix = 'field_';
        $fieldName =  $prefix . $node->type . '_' . $field;

        if (!isset($node->{$fieldName})) {
            $fieldName = $prefix . $field;
        }

        return $fieldName;
    }

    /**
     * Retourne le champs du noeud/taxonomie voulu
     *
     * @param  string $entityType node ou taxonomy_term
     * @param  object $entity     L'objet de l'entité
     * @param  string $fieldName  Le nom du champ à charger
     * @param  bool   $full       Object complet, sinon seulements les items
     * @return array
     */
    protected function getField($entityType, $entity, $fieldName, $full = false)
    {
		$field      = array();
		$bundleName = null;

        if ($entityType === 'node' && isset($entity->type)) {
            $bundleName = $entity->type;
        } elseif ($entityType === 'taxonomy_term' && isset($entity->vocabulary_machine_name)) {
            $bundleName = $entity->vocabulary_machine_name;
        } elseif ($entityType === 'user' && isset($entity->uid)) {
            $bundleName = 'user';
        }

        if (!is_null(field_info_instance($entityType, $fieldName, $bundleName))) {
            $funcName = ($full) ? 'field_view_field' : 'field_get_items';

            $field = $funcName($entityType, $entity, $fieldName);
        }

        return $field;
    }

    /**
     * [arrayToObject description]
     * @param  array  $array [description]
     * @return [type]        [description]
     */
    protected function arrayToObject($array = array())
    {
        $object = new StdClass;
        foreach ($array as $key => $value) {
            $object->$key = $value;
        }

        return $object;
    }

    /**
     * [getItem description]
     * @param  [type] $data [description]
     * @return [type]       [description]
     */
    protected function getItem($data)
    {
        return $this->arrayToObject($data);
    }

    /**
     * [formatItems description]
     * @param  [type] $items [description]
     * @return [type]        [description]
     */
    protected function formatItems($items)
    {
        if ($items && count($items) === 1) {
            return $items[0];
        }

        return $items;
    }
}
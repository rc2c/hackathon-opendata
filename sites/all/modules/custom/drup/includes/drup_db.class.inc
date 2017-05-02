<?php

class DrupDatabase extends DrupEntity
{
    /**
     * [__construct description]
     * @param StdClass $user [description]
     */
    public function __construct() {}

    /**
     * Met à jour un champ dans la table data et revision
     *
     * @param  DrupNode $entity Instance DrupNode() ou DrupUser()
     * @param  string   $fieldSuffix Suffix du champ (champ du noeud/user). Ex pour field_project_state, mettre "state"
     * @param  array    $fieldsValues Tableau associatif array(suffix colonne SQL. Ex pour field_project_state_value, mettre "value" => la valeur de la colonne à mettre à jour);
     */
    public function updateField($entity, $fieldSuffix, $fieldsValues)
    {
        $formatField = parent::getFormatField($entity->getData(), $fieldSuffix);
        $fields = array();

        if (!empty($fieldsValues)) {
            foreach ($fieldsValues as $field => $value) {
                $fields[$formatField . '_' . $field] = $value;
            }
        }

        if (!empty($fields)) {
            db_update('field_data_' . $formatField)
                ->fields($fields)
                ->condition('entity_id', $entity->getId(), '=')
                ->execute();

            db_update('field_revision_' . $formatField)
                ->fields($fields)
                ->condition('revision_id', $entity->getRevisionId(), '=')
                ->execute();
        }
    }
}
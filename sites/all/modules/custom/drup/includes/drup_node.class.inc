<?php

class DrupNode extends DrupEntity
{
    private $id;
    private $title;
    private $status;
    private $type;
    private $sticky;
    private $promote;
    private $created;
    private $changed;
    private $data;

    /**
     * Constructeur
     *
     * @param mixed $node Node ou NID
     */
    public function __construct($node)
    {
        // Charger le noeud s'il n'est pas donnée
        if (!is_object($node)) {
            $node = node_load($node);
        }

        $this->data    = $node;
        $this->id      = (int)$this->getData()->nid;
        $this->title   = $this->getData()->title;
        $this->status  = (int)$this->getData()->status;
        $this->type    = $this->getData()->type;
        $this->sticky  = (bool)$this->getData()->sticky;
        $this->promote = (bool)$this->getData()->promote;
        $this->created = (int)$this->getData()->created;
        $this->changed = (int)$this->getData()->changed;
    }

    /**
     * [getData description]
     * @return [type] [description]
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * [getId description]
     * @return [type] [description]
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * [getId description]
     * @return [type] [description]
     */
    public function getRevisionId()
    {
        return $this->getData()->vid;
    }

    /**
     * [getTitle description]
     * @return [type] [description]
     */
    public function getTitle()
    {
        return $this->getData()->title;
    }

    /**
     * [getStatus description]
     * @return [type] [description]
     */
    public function getStatus()
    {
        return $this->getData()->status;
    }

    /**
     * [getType description]
     * @return [type] [description]
     */
    public function getType()
    {
        return $this->getData()->type;
    }

    /**
     * [getSticky description]
     * @return [type] [description]
     */
    public function getSticky()
    {
        return $this->getData()->sticky;
    }

    /**
     * [getPromote description]
     * @return [type] [description]
     */
    public function getPromote()
    {
        return $this->getData()->promote;
    }

    /**
     * [getCreated description]
     * @return [type] [description]
     */
    public function getCreated()
    {
        return $this->getData()->created;
    }

    /**
     * [getChanged description]
     * @return [type] [description]
     */
    public function getChanged()
    {
        return $this->getData()->changed;
    }

    /**
     * [getAuthor description]
     * @return [type] [description]
     */
    public function getAuthor()
    {
        return new DrupUser($this->getData()->uid);
    }

    /**
     * [getText description]
     * @param  [type] $field [description]
     * @return [type]        [description]
     */
    public function getText($field)
    {
        $field   = $this->getDataField($field);
        $results = $this->getObjects($field);
        $items   = array();

        if ($results) {
            foreach ($results as $result) {
                $item        = new StdClass;
                $item->value = $result->value;
                $items[]     = $item;
            }

            return parent::formatItems($items);
        }

        return false;
    }

    /**
     * [getRichText description]
     * @param  [type] $field [description]
     * @return [type]        [description]
     */
    public function getRichText($field)
    {
        $field = $this->getDataField($field, true);
        $results = $this->getObjectsFull($field);

        if ($results) {
            foreach ($results as $item) {
                if ($item->format === 'full_html') {
                    $item->value = render($item->markup);
                }
            }

            return parent::formatItems($results);
        }

        return false;
    }

    /**
     * [getSummary description]
     * @param  [type]  $field    [description]
     * @param  boolean $fallback [description]
     * @return [type]            [description]
     */
    public function getSummary($field, $fallback = true)
    {
        $content = $this->getRichText($field);
        $item    = false;

        if (is_object($content)) {
            $summary = $content->summary;
            if ($fallback) {
                $item = new DrupResult;
                $item->value = empty($summary) ? $content->value : $summary;
            }
        }
        return $item;
    }

    /**
     * [getSelectOption description]
     * @param  [type] $field [description]
     * @return [type]        [description]
     */
    public function getSelectOption($field)
    {
        $field   = $this->getDataField($field, true);
        $results = $this->getObjectsFull($field);
        $items   = array();

        if ($results) {
            foreach ($results as $result) {
                $item        = new StdClass;
                $item->key   = $result->value;
                $item->value = $result->markup;
                $items[]     = $item;
            }

            return parent::formatItems($items);
        }

        return false;
    }

    /**
     * [getMedia description]
     * @param  [type] $field [description]
     * @return [type]        [description]
     */
    public function getMedia($field)
    {
        $field        = $this->getDataField($field);
        $fieldContent = !empty($field[0]) ? $field[0] : null;

        if (!empty($fieldContent)) {
            // Si c'est un atom scald
            if (isset($fieldContent['sid'])) {
                $atom = scald_atom_load($fieldContent['sid']);

                if ($atom !== false) {
                    $class = 'Drup' . ucfirst($atom->type);

                    if (class_exists($class)) {
                        return new $class($atom);
                    }
                }
            } else {
                return new DrupMediaBaseEntity($fieldContent);

            }
        }

        return false;
    }

    /**
     * [getTaxonomy description]
     * @param  string $field [description]
     * @return [type]        [description]
     */
    public function getTaxonomyTerm($field)
    {
        $field        = $this->getDataField($field);
        $fieldContent = !empty($field[0]['tid']) ? taxonomy_term_load($field[0]['tid']) : null;

        if (!empty($fieldContent)) {
            return new DrupTerm($fieldContent);
        }

        return false;
    }

    /**
     * [getTaxonomyTerms description]
     * @param  [type] $field [description]
     * @return [type]        [description]
     */
    public function getTaxonomyTerms($field)
    {
        $field = $this->getDataField($field);
        $terms = array();

        if (!empty($field)) {
            foreach ($field as $i => $data) {
                $term = (!empty($data['tid'])) ? taxonomy_term_load($data['tid']) : null;

                if (!empty($term)) {
                    $terms[] = new DrupTerm($term);
                }
            }

            return $terms;
        }

        return false;
    }

    /**
     * [getDate description]
     * @param  string $field  [description]
     * @param  string $format [description]
     * @return object         [description]
     */
    public function getDate($field, $format = 'd F Y')
    {
        $field         = $this->getDataField($field);
        $fieldContent  = !empty($field[0]) ? $field[0] : null;
        $fieldValues   = array();
        $fieldValues[] = (isset($fieldContent['value'])) ? $fieldContent['value'] : null;
        $fieldValues[] = (isset($fieldContent['value2']) && ($fieldContent['value'] != $fieldContent['value2'])) ? $fieldContent['value2'] : null;
        $result        =  array();

        foreach ($fieldValues as $id => $value) {
            if (isset($value)) {
                $timestamp                = strtotime($value);
                $datetime                 = new DateTime($value);
                $result[$id]              = new StdClass;
                $result[$id]->value       = format_date($timestamp, 'custom', $format);
                $result[$id]->datetime    = $datetime;
                $result[$id]->timestamp   = $timestamp;
                $result[$id]->year        = $datetime->format('Y');
                $result[$id]->month       = $datetime->format('m');
                $result[$id]->monthLetter = format_date($timestamp, 'custom', 'M');
                $result[$id]->day         = $datetime->format('d');
                $result[$id]->hour        = $datetime->format('H');
                $result[$id]->minute      = $datetime->format('i');
                $result[$id]->second      = $datetime->format('s');
            }
        }

        if (count($result) === 1) {
            $result = current($result);
        }

        return $result;
    }

    /**
     * [getUrl description]
     * @param  [type] $field [description]
     * @return [type]        [description]
     */
    public function getUrl($field)
    {
        $field   = $this->getDataField($field);
        $results = $this->getObjects($field);
        $items   = false;

        if (!empty($results)) {
            foreach ($results as $result) {
                $item = new StdClass;
                $item->value = $result->value;
                $item->title = $result->title;
                $items[]     = $item;
            }
        }

        return parent::formatItems($items);
    }

    /**
     * [getEntityReference description]
     * @param  [type] $field [description]
     * @return [type]        [description]
     */
    public function getEntityReference($field)
    {
        $field   = $this->getDataField($field);
        $fieldContent = !empty($field[0]) ? $field[0] : null;

        if (!empty($fieldContent)) {
            $item = new StdClass;

            if (isset($fieldContent['entity'])) {
                return $fieldContent['entity'];
            } else {
                return $fieldContent['target_id'];
            }
        }

        return false;
    }

    /**
     * [getUrl description]
     * @param  [type] $field [description]
     * @return [type]        [description]
     */
    public function getMultipleField($field)
    {
        $field = $this->getDataField($field);
        return $this->getObjects($field);
    }

    /**
     * [getDataField description]
     * @param  [type]  $field
     * @param  boolean $full  Si true, on récupére l'objet complet sinon seulement les items
     * @return [type]         [description]
     */
    protected function getDataField($field, $full = false)
    {
        return parent::getField('node', $this->getData(), $this->getFormatField($this->getData(), $field), $full);
    }

    /**
     * [getObject description]
     * @param  [type] $node [description]
     * @return [type]       [description]
     */
    protected function getObject($node)
    {
        return new DrupNode($node);
    }

    /**
     * [getObjects description]
     * @param  [type] $field [description]
     * @return [type]        [description]
     */
    protected function getObjects($field)
    {
        $objects = false;
        if (!empty($field)) {
            foreach ($field as $item) {
                if (isset($item['entity'])) {
                    $objects[] = $this->getObject($item['entity']);
                } else {
                    $objects[] = parent::getItem($item);
                }
            }
        }

        return $objects;
    }

    /**
     * [getObjectsMarkup description]
     * @param  [type] $field [description]
     * @return [type]        [description]
     */
    protected function getObjectsFull($field)
    {
        $objects = false;
        if (!empty($field['#items'])) {
            foreach ($field['#items'] as $i => $item) {
                // Item
                $objects[$i] = parent::getItem($item);

                // Ajout des données
                $objects[$i]->markup = $field[$i]['#markup'];
            }
        }

        return $objects;
    }
}

/**
*
*/
class DrupResult
{
    public function __toString()
    {
        return (property_exists($this, 'value')) ? $this->value : false;
    }
}
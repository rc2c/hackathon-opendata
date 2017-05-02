<?php

class DrupTerm extends DrupEntity
{
    private $id;
    private $vid;
    private $name;
    private $vocabulary;
    private $description;
    
    /**
     * [__construct description]
     * @param StdClass $node [description]
     */
    public function __construct(StdClass $term)
    {
        $this->data        = $term;
        $this->id          = (int)$this->getData()->tid;
        $this->vid         = (int)$this->getData()->vid;
        $this->name        = $this->getData()->name;
        $this->vocabulary  = $this->getData()->vocabulary_machine_name;
        $this->description = $this->getData()->description;
    }

    /**
     * [getId description]
     * @return [type] [description]
     */
    public function getId()
    {
    	return $this->id;
    }

    public function getVid()
    {
        return $this->vid;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getData()
    {
        return $this->data;
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
        $items   = false;
        
        if ($results) {
            foreach ($results as $result) {
                $item        = new StdClass;
                $item->value = $result->value;
                $items[]     = $item;
            }
        }

        return parent::formatItems($items);
    }

    /**
     * [getPath description]
     * @param  [type] $field [description]
     * @return [type]        [description]
     */
    public function getPath()
    {
        $path = taxonomy_term_uri($this->data);
        return (isset($path['path'])) ? $path['path'] : null;
    }

    /**
     * [getField description]
     * @param  [type] $field [description]
     * @return [type]        [description]
     */
    protected function getDataField($field)
    {
        return parent::getField('taxonomy_term', $this->getData(), 'field_' . $field);
    }
    
    /**
     * [getObject description]
     * @param  [type] $term [description]
     * @return [type]       [description]
     */
    protected function getObject($term)
    {
        return new DrupTerm($term);
    }

    /**
     * [getObjects description]
     * @param  [type] $field [description]
     * @return [type]        [description]
     */
    protected function getObjects($field)
    {
        $objects = false;
        if (isset($field['#items'])) {
            foreach ($field['#items'] as $item) {
                if (isset($item['entity'])) {
                    $objects[] = $this->getObject($item['entity']);
                } else {
                    $objects[] = parent::getItem($item);
                }
            }
        }

        return $objects;
    }

}
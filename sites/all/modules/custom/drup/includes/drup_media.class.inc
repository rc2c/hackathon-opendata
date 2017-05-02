<?php

class DrupMedia
{
    private $id;
    private $title;
    private $description;
    private $type;
    private $filename;
    private $file;
    private $infos;
    private $created;
    private $changed;
    private $data;

    /**
     * [__construct description]
     * @param StdClass $atom [description]
     */
    public function __construct(StdClass $atom)
    {
        $this->data        = $atom;
        $this->id          = (int)$this->getData()->sid;
        $this->title       = $this->getData()->title;
        $this->description = $this->getData()->description;
        $this->type        = $this->getData()->type;
        $this->filename    = $this->getData()->base_entity->filename;
        $this->file        = $this->getData()->file_source;
        $this->infos       = $this->getInfos();
        $this->created     = (int)$this->getData()->created;
        $this->changed     = (int)$this->getData()->changed;
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
     * [getTitle description]
     * @return [type] [description]
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * [getDescription description]
     * @return [type] [description]
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * [getType description]
     * @return [type] [description]
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * [getFilename description]
     * @return [type] [description]
     */
    public function getFilename()
    {
        return $this->filename;
    }

    /**
     * [getFile description]
     * @return [type] [description]
     */
    public function getFile()
    {
        return $this->file;
    }

    /**
     * [getInfos description]
     * @return [type] [description]
     */
    public function getInfos()
    {
        return array(
            'size'      => $this->getData()->base_entity->filesize,
            'mime_type' => $this->getData()->base_entity->filemime
        );
    }

    /**
     * [getCreated description]
     * @return [type] [description]
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * [getChanged description]
     * @return [type] [description]
     */
    public function getChanged()
    {
        return $this->changed;
    }
}
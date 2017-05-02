<?php

class DrupMediaBaseEntity
{
    private $data;

    /**
     * [__construct description]
     * @param StdClass $atom [description]
     */
    public function __construct(array $entity)
    {
        $this->data = $entity;
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
     * [getThumb description]
     * @return [type] [description]
     */
    public function getThumb()
    {
        return $this->getData()['uri'];
    }

    /**
     * [getInfos description]
     * @return [type] [description]
     */
    public function getInfos()
    {
        $infos = array(
            'width'     => $this->getData()['width'],
            'height'    => $this->getData()['height']
        );

        return $infos;
    }

    /**
     * [getTextAlt description]
     * @return [type] [description]
     */
    public function getTextAlt()
    {
        return (isset($this->getData()['field_file_image_alt_text'])) ? $this->getData()['field_file_image_alt_text'] : $this->getData()['alt'];
    }
    /**
     * [getTextTitle description]
     * @return [type] [description]
     */
    public function getTextTitle()
    {
        return (!empty($this->getData()['field_file_image_title_text'])) ? $this->getData()['field_file_image_title_text'] : $this->getData()['title'];
    }

    /**
     * [render description]
     * @param  string $format [description]
     * @param  array  $params [description]
     * @return [type]         [description]
     */
    public function render($format = 'list', $params = array())
    {
        $alt    = isset($params['alt']) ? $params['alt'] : $this->getTextAlt();
        $width  = isset($params['width']) ? $params['width'] : null;
        $height = isset($params['height']) ? $params['height'] : null;

        return theme_image_style(array(
            'style_name' => $format,
            'path'       => $this->getThumb(),
            'width'      => $width,
            'height'     => $height,
            'alt'        => $alt
        ));
    }
}
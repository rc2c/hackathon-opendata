<?php

class DrupImage extends DrupMedia
{
    private $thumb;

    /**
     * [__construct description]
     * @param StdClass/int $atom [description]
     */
    public function __construct($atom)
    {
        if (gettype($atom) !== 'object') {
            $atom = scald_atom_load($atom);
        }
        parent::__construct($atom);
        $this->thumb = $this->getData()->thumbnail_source;
    }

    /**
     * [getThumb description]
     * @return [type] [description]
     */
    public function getThumb()
    {
        return $this->thumb;
    }

    /**
     * [getTextAlt description]
     * @return [type] [description]
     */
    public function getTextAlt()
    {
        return ($this->getData()->base_entity->alt !== '') ? $this->getData()->base_entity->alt : $this->getTitle();
    }
    
    /**
     * [getInfos description]
     * @return [type] [description]
     */
    public function getInfos()
    {
        $mediaInfos = parent::getInfos();
        $infos = array(
            'width'     => $this->getData()->base_entity->width,
            'height'    => $this->getData()->base_entity->height
        );

        return array_merge($mediaInfos, $infos);
    }

    /**
     * [render description]
     * @param  string $format [description]
     * @param  array  $params [description]
     * @return [type]         [description]
     */
    public function render($format = 'list_grid', $params = array())
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

    /**
     * [render description]
     * @param  string $format [description]
     * @return [type]         [description]
     */
    public function getUri($format = 'list_grid')
    {
        return image_style_url($format, $this->thumb);
    }
}
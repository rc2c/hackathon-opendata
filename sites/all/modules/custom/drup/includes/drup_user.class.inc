<?php

class DrupUser extends DrupEntity
{
    private $uid;
    private $roles;

    /**
     * [__construct description]
     * @param StdClass $user [description]
     */
    public function __construct($uid)
    {
        $user = user_load($uid);
        $this->data  = $user;
        $this->uid   = (int) $this->getData()->uid;
        $this->roles = $this->getData()->roles;
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
    	return $this->uid;
    }

    /**
     * [getRevisionId description]
     * @return [type] [description]
     */
    public function getRevisionId()
    {
        return $this->getId();
    }

    /**
     * Type de l'entité
     * @return [type] [description]
     */
    public function getType()
    {
        return 'user';
    }


    /**
     * [getName description]
     * @return [type] [description]
     */
    public function getName()
    {
        return $this->getData()->name;
    }

    /**
     * [getMail description]
     * @return [type] [description]
     */
    public function getMail()
    {
        return $this->getData()->mail;
    }

    /**
     * [getCreated description]
     * @return [type] [description]
     */
    public function getCreated()
    {
        return  $this->getData()->created;
    }

    /**
     * [getRoles description]
     * @return [type] [description]
     */
    public function getRoles()
    {
        return $this->roles;
    }

    /**
     * [getStatus description]
     * @return [type] [description]
     */
    public function getStatus()
    {
        return (int) $this->getData()->status;
    }

    /**
     * [getPicture description]
     * @return [type] [description]
     */
    public function getPicture()
    {
        return $this->getData()->picture;
    }

    /**
     * Retourne l'image utilisateur au $format
     * @param  string $format -> Nom machine du format d'image
     * @param  array  $params -> Paramètres de la fonction theme_image_style()
     * @return html <img/>
     */
    public function renderPicture($format = 'thumbnail', $params = array())
    {
        if ($image = $this->getPicture()) {
            $alt    = isset($params['alt']) ? $params['alt'] : $this->getName();
            $width  = isset($params['width']) ? $params['width'] : null;
            $height = isset($params['height']) ? $params['height'] : null;

            return theme_image_style(array(
                'style_name' => $format,
                'path'       => $this->getPicture()->uri,
                'width'      => $width,
                'height'     => $height,
                'alt'        => $alt
            ));
        } else {
            return null;
        }
    }

    public function getSignature()
    {
        return $this->getData()->signature;
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
     * [getTaxonomy description]
     * @param  string $field [description]
     * @return [type]        [description]
     */
    public function getTaxonomyTerm($field)
    {
        $field        = $this->getDataField($field);
        $fieldContent = !empty($field['#items'][0]['taxonomy_term']) ? $field['#items'][0]['taxonomy_term'] : null;

        if (!empty($fieldContent)) {
            return new DrupTerm($fieldContent);
        }

        return false;
    }

    /**
     * Urls
     */
    public function getUrlView()
    {
        return 'user/' . $this->getId();
    }
    public function getUrlEdit()
    {
        return 'user/' . $this->getId() . '/edit';
    }
    public function getUrlLogin()
    {
        return 'user';
    }
    public function getUrlLogout()
    {
        return 'user/logout';
    }
    public function getUrlRegister()
    {
        return 'user/register';
    }
    public function getUrlPassword()
    {
        return 'user/password';
    }

    /**
     * Détermine si l'utilisateur est connecté
     * @return bool
     */
    public function isLoggedIn()
    {
        return (bool) $this->getId();
    }

    /**
     * [getField description]
     * @param  [type] $field [description]
     * @return [type]        [description]
     */
    protected function getDataField($field)
    {
        return parent::getField('user', $this->getData(), 'field_user_' . $field);
    }

    /**
     * [getObject description]
     * @param  [type] $user [description]
     * @return [type]       [description]
     */
    protected function getObject($user)
    {
        return new DrupUser($user);
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
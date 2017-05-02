<?php

/**
 * Permet d'ajouter facilement une configuration personnalisée dans la config Drupal
 *
 * @example
 * DrupConf::setScope('mon-theme');
 * DrupConf::set('public', array('data' => 'donnée'));
 * DrupConf::get('data') => donnée
 */
abstract class DrupConf
{
    /**
     * Définition du scope
     * @var [type]
     */
    private static $scope;

    /**
     * Ajout du scope dans la config $conf
     *
     * @param string $scope Clé du scope pour lire/ecrire la configuration
     */
    public static function setScope($scope)
    {
        global $conf;
        self::$scope = $scope;

        $conf[self::$scope] = array(
            'public' => array(),
            'private' => array()
        );
    }

    /**
     * Permet de récupérer le scope
     *
     * @return string
     */
    public static function getScope()
    {
        return self::$scope;
    }

    /**
     * Ajout la configuration en public ou private
     *
     * @param  string $type public/private
     * @param  array  $data Données à ajouter
     * @return bool
     */
    public static function set($type, $data)
    {
        global $conf;

        if (isset($conf[self::$scope]) && isset($conf[self::$scope][$type])) {
            $conf[self::$scope][$type] = array_merge($conf[self::$scope][$type], $data);
            return true;
        }

        return false;
    }

    /**
     * Récupération de la configuration en fonction du clé
     *
     * @param  string $key La clé de la config à récup
     * @return mixed, donnée de la config si trouvé sinon false
     */
    public static function get($key)
    {
        global $conf;

        if (!empty($conf[self::$scope])) {
            return self::find($key, $conf[self::$scope]);
        }

        return false;
    }

    /**
     * Récupération d'une configuration globale stockée dans $conf
     *
     * @param  string $key La clé de la config à récup
     * @return mixed, donnée de la config si trouvé sinon false
     */
    public static function getGlobal($key)
    {
        global $conf;

        if (isset($conf[$key])) {
            return $conf[$key];
        }

        return false;
    }

    /**
     * Cherche la clé dans la configuration en récursif
     *
     * @param  string $key   Clé
     * @param  array  $level Niveau de la configuration
     * @return mixed, donnée si trouvé sinon null
     */
    private static function find($key, $level)
    {
        if (!empty($level)) {
            foreach ($level as $levelKey => $levelData) {
                if ($key === $levelKey) {
                    return $levelData;

                } elseif (is_array($levelData)) {
                    $result = self::find($key, $levelData);

                    if ($result === null) {
                        continue;
                    }

                    return $result;
                }
            }

            return null;
        }
    }

    /**
     * Ajout la configuration publique à Drupal en JS
     */
    public static function setConfigToJS()
    {
        $configPublic = self::get('public');

        if (!empty($configPublic)) {
            drupal_add_js(array(self::$scope => $configPublic), 'setting');
        }
    }
}

/**
 * Ajout de la config publique dans le JS Drupal
 *
 * @param  [type] &$vars [description]
 * @return [type]        [description]
 */
function drup_preprocess_html(&$vars)
{
    DrupConf::setConfigToJS();
}
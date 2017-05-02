<?php

/**
 * Gestion du Routing côté front
 */
abstract class DrupRouter {
    /**
     * Nom du champ en cache
     *
     * @var string
     */
    private static $cacheFieldName = 'druprouter_routes';

    /**
     * Récupère la liste des routes configurées
     *
     * @return array
     */
    public static function getRoutes()
    {
        return variable_get(self::$cacheFieldName, array());
    }

    /**
     * Enregistre la liste des routes configurées
     *
     * @param bool
     */
    public static function setRoutes($routes)
    {
        return variable_set(self::$cacheFieldName, $routes);
    }

    /**
     * Récupérer une route
     *
     * @param  string $route   Nom de la route
     * @return string node/nid si trouvée sinon node/
     */
    public static function get($route)
    {
        return 'node/' . self::getId($route);
    }

    /**
     * Récupère l'identifiant du noeud de la route
     *
     * @param  string $route   Nom de la route
     * @return mixed : int si trouvée, sinon null
     */
    public static function getId($route)
    {
        global $language;
        $routes = self::getRoutes();

        return (isset($routes[$route][$language->language]['entity_id'])) ? (int) $routes[$route][$language->language]['entity_id'] : null;
    }

    /**
     * Récupère toutes les données de la route
     *
     * @param  string $route Nom de la route
     * @return array
     */
    public static function getData($route)
    {
        $routes = self::getRoutes();

        return (isset($routes[$route][$language->language])) ? (int) $routes[$route][$language->language] : null;
    }

    /**
     * Détermine si l'une des routes correspond au nid
     *
     * @param  array  $routes Liste des routes à tester
     * @param  int    $nid    Id du noeud
     * @return bool
     */
    public static function isRoutes($routes, $nid = null)
    {
        self::getNid($nid);

        if (!empty($routes) && $nid !== null) {
            foreach ($routes as $route) {
                if (self::isRoute($route, $nid) === true) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Détermine si la route correspond au nid
     *
     * @param  string $route Nom de la route à tester
     * @param  int    $nid   Id du noeud
     * @return boolean
     */
    public static function isRoute($route, $nid = null)
    {
        self::getNid($nid);

        if (self::getId($route) === $nid) {
            return true;
        }

        return false;
    }

    /**
     * Récupère la nom de la route courante
     *
     * @param  int $nid ID du noeud
     * @return string
     */
    public static function getRouteName($nid = null)
    {
        $routes = self::getRoutes();
        self::getNid($nid);

        if (!empty($routes)) {
            foreach ($routes as $routeName => $routeData) {
                if (self::getId($routeName) === $nid) {
                    return $routeName;
                }
            }
        }

        return null;
    }

    /**
     * Détermine si la page courante correspond au slug
     * @param  string  $string Slug : medias ou medias/*, etc
     * @return boolean
     */
    public static function isSlug($string)
    {
        $path = drupal_strtolower(drupal_get_path_alias($_GET['q']));
        $page_match = drupal_match_path($path, $string);

        if ($path != $_GET['q']) {
            $page_match = $page_match || drupal_match_path($_GET['q'], $string);
        }

        return $page_match;
    }

    /**
     * Fallback pour récupérer le nid s'il n'est pas renseigné
     *
     * @param  int &$nid Identifiant du noeud
     * @return mixed
     */
    private static function getNid(&$nid)
    {
        if ($nid === null) {
            $nid = DrupTools::getNid();
        }

        return $nid;
    }
}
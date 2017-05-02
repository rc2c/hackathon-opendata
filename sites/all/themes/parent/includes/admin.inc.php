<?php

/**
 * Alter Admin-Menu
 */
function parent_admin_menu_output_alter(&$content)
{
    global $user;

    // Suppresion de liens inutile
    if (in_array('super_admin', $user->roles)) {
        unset(
            $content['icon']['icon']['drupal.org'],
            $content['icon']['icon']['devel'],
            $content['icon']['icon']['toggle-modules']
        );
    } else {
        unset(
            $content['icon']['icon']['admin/index'],
            $content['icon']['icon']['devel'],
            $content['icon']['icon']['cron'],
            $content['menu']['admin/config']
        );
    }
}

<?php
/**
 * @file
 * feature_user.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function feature_user_user_default_roles() {
  $roles = array();

  // Exported role: admin.
  $roles['admin'] = array(
    'name' => 'admin',
    'weight' => 2,
  );

  // Exported role: contributeur.
  $roles['contributeur'] = array(
    'name' => 'contributeur',
    'weight' => 4,
  );

  // Exported role: moderateur.
  $roles['moderateur'] = array(
    'name' => 'moderateur',
    'weight' => 3,
  );

  // Exported role: super_admin.
  $roles['super_admin'] = array(
    'name' => 'super_admin',
    'weight' => 1,
  );

  return $roles;
}

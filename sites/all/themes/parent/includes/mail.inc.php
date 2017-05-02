<?php

function parent_preprocess_mimemail_message(&$vars)
{
    global $base_url;
    $theme = mailsystem_get_mail_theme();

    $vars['base_url'] = $base_url;
    $vars['theme'] = $theme;
    $vars['theme_path'] = drupal_get_path('theme', $theme);
    $vars['logo'] = theme_get_setting('logo', $theme);
    $vars['site_name'] = variable_get('site_name');
    $vars['site_slogan'] = variable_get('site_slogan');
}
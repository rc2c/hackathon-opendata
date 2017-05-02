<?php

/**
 * Paramètres du site
 *
 * @param  [type] &$form       [description]
 * @param  [type] &$form_state [description]
 * @return [type]              [description]
 */
function theme_hook_form_system_site_information_settings_alter(&$form, &$form_state)
{
    $form['site_information']['site_phone'] = array(
        '#type'          => 'textfield',
        '#title'         => t('Téléphone'),
        '#default_value' => variable_get('site_phone', '')
    );
    $form['site_information']['site_fax'] = array(
        '#type'          => 'textfield',
        '#title'         => t('Fax'),
        '#default_value' => variable_get('site_fax', '')
    );
    $form['site_information']['site_address'] = array(
        '#type'          => 'textarea',
        '#title'         => t('Adresse'),
        '#default_value' => variable_get('site_address', '')
    );
    $form['site_information']['site_lat'] = array(
        '#type'          => 'textfield',
        '#title'         => t('Latitude'),
        '#default_value' => variable_get('site_lat', '')
    );
    $form['site_information']['site_lng'] = array(
        '#type'          => 'textfield',
        '#title'         => t('Longitude'),
        '#default_value' => variable_get('site_lng', '')
    );

    // Réseaux sociaux
    // $form['social_network'] = array(
    //     '#type'        => 'fieldset',
    //     '#title'       => t('Réseaux sociaux'),
    //     '#weight'      => 100,
    //     '#collapsible' => FALSE,
    //     '#collapsed'   => FALSE,
    // );
    // $form['social_network']['site_facebook'] = array(
    //     '#type'          => 'textfield',
    //     '#title'         => t('Facebook'),
    //     '#default_value' => variable_get('site_facebook', '')
    // );
    // $form['social_network']['site_twitter'] = array(
    //     '#type'          => 'textfield',
    //     '#title'         => t('Twitter'),
    //     '#default_value' => variable_get('site_twitter', '')
    // );
    // $form['social_network']['site_googleplus'] = array(
    //     '#type'          => 'textfield',
    //     '#title'         => t('Google+'),
    //     '#default_value' => variable_get('site_googleplus', '')
    // );
    // $form['social_network']['site_viadeo'] = array(
    //     '#type'          => 'textfield',
    //     '#title'         => t('Viadeo'),
    //     '#default_value' => variable_get('site_viadeo', '')
    // );
    // $form['social_network']['site_linkedin'] = array(
    //     '#type'          => 'textfield',
    //     '#title'         => t('LinkedIn'),
    //     '#default_value' => variable_get('site_linkedin', '')
    // );
}
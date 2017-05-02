<?php

abstract class ThemeUser
{
    public static function formProfileAlter(&$form, &$form_state)
    {
        // Supp champs peu importe le compte
        unset(
            $form['timezone'],
            $form['mimemail']
        );

        // Account
        $form['account']['mail']['#title'] = 'Adresse email';

        // Fields
        $form['field_user_cgu'][LANGUAGE_NONE]['#description'] = l('Consulter les CGU', DrupRouter::get('cgu'), array('attributes' => array('target' => '_blank')));
    }
}
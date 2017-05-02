<?php

/**
 * Alter des formulaires
 */
function parent_form_alter(&$form, &$form_state, $form_id)
{
    // Recherche
    if ($form_id === 'search_block_form') {
        $form['search_block_form']['#size'] = 20;
        $form['actions']['submit']['#value'] = 'OK';
        $form['search_block_form']['#attributes']['placeholder'] = t('Search') . ' ...';
    }

    // Login
    if ($form_id === 'user_login' || $form_id === 'user_pass') {
        $form['#attributes']['class'][] = 'form--userLogin';
    }

    // Webform
    if (isset($form['#node']) && $form['#node']->type === 'webform' && !empty($form['#node']->webform['emails'])) {
        $pathToTheme = drupal_get_path('theme', variable_get('theme_default', null));
        global $base_url;

        foreach ($form['#node']->webform['emails'] as $emailId => $emailEntity) {
            $nidTplPath = $pathToTheme . '/templates/emails/webform-mail--' . $form['#node']->nid . '.tpl.php';
            if (file_exists($nidTplPath)) {
                $tplPath = $nidTplPath;
            } else {
                $tplPath = $pathToTheme . '/templates/emails/webform-mail.tpl.php';
            }
            
            if (file_exists($tplPath)) {
                $form['#node']->webform['emails'][$emailId]['template'] = theme_render_template($tplPath, array(
                    'values'      => $form_state['input'],
                    'components'  => $form['#node']->webform['components'],
                    'pathToTheme' => $base_url . '/' . $pathToTheme
                ));
            }
        }
    }

    // Scald
    /*if (module_exists('scald') && $form_id === 'views_exposed_form') {
        $args = arg();
        if (isset($args[0]) && $args[0] === 'admin' && isset($args[1]) && $args[1] === 'content' && isset($args[2]) && $args[2] === 'atoms') {
            unset($form['uid']['#description']);
            $form['type']['#description'] = t('Select multiple options with CTRL + click');
        }
    }*/
}
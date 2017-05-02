<?php

/**
 * Returns HTML for a marker for new or updated content.
 */
function parent_mark($vars)
{
    $type = $vars['type'];

    if ($type == MARK_NEW) {
        return ' <mark class="new">' . t('new') . '</mark>';
    } elseif ($type == MARK_UPDATED) {
        return ' <mark class="updated">' . t('updated') . '</mark>';
    }
}

/**
 * Returns HTML for status and/or error messages, grouped by type.
 */
function parent_status_messages($vars)
{
    $display = $vars['display'];
    $output = '';

    $status_heading = array(
        'status' => t('Status message'),
        'error' => t('Error message'),
        'warning' => t('Warning message')
    );
    $boostrap_matches = array(
        'status' => 'success',
        'error' => 'danger',
        'warning' => 'warning'
    );
    foreach (drupal_get_messages($display) as $type => $messages) {
        $output .= "<div class=\"card card-$boostrap_matches[$type] messages--$type messages $type\">\n";
        if (!empty($status_heading[$type])) {
            $output .= '<h2 class="element-invisible">' . $status_heading[$type] . "</h2>\n";
        }
        $output .= '<div class="card-block">';
        if (count($messages) > 1) {
            $output .= " <ul class=\"messages__list\">\n";
            foreach ($messages as $message) {
                $output .= '  <li class=\"messages__item\">' . $message . "</li>\n";
            }
            $output .= " </ul>\n";
        } else {
            $output .= $messages[0];
        }
        $output .= '</div>';
        $output .= "</div>\n";
    }
    
    return $output;
}


/**
 * Returns HTML for primary and secondary local tasks.
 *
 * @ingroup themeable
 */
function parent_menu_local_tasks(&$vars)
{
    $output = '';

    // Add theme hook suggestions for tab type.
    foreach (array('primary', 'secondary') as $type) {
        if (!empty($vars[$type])) {
            foreach (array_keys($vars[$type]) as $key) {
                if (isset($vars[$type][$key]['#theme']) && ($vars[$type][$key]['#theme'] == 'menu_local_task' || is_array($vars[$type][$key]['#theme']) && in_array('menu_local_task', $vars[$type][$key]['#theme']))) {
                    $vars[$type][$key]['#theme'] = array('menu_local_task__' . $type, 'menu_local_task');
                }
            }
        }
    }

    if (!empty($vars['primary'])) {
        $vars['primary']['#prefix'] = '<h2 class="element-invisible">' . t('Primary tabs') . '</h2>';
        $vars['primary']['#prefix'] .= '<ul class="nav nav-pills">';
        $vars['primary']['#suffix'] = '</ul>';
        $output .= drupal_render($vars['primary']);
    }
    if (!empty($vars['secondary'])) {
        $vars['secondary']['#prefix'] = '<h2 class="element-invisible">' . t('Secondary tabs') . '</h2>';
        $vars['secondary']['#prefix'] .= '<ul class="tabs--admin tabs--secondary">';
        $vars['secondary']['#suffix'] = '</ul>';
        $output .= drupal_render($vars['secondary']);
    }

    return $output;
}

/**
 * Returns HTML for a single local task link.
 *
 * @ingroup themeable
 */
function parent_menu_local_task($vars)
{
    $type = $class = FALSE;

    $link = $vars['element']['#link'];
    $link_text = $link['title'];

    // Check for tab type set in zen_menu_local_tasks().
    if (is_array($vars['element']['#theme'])) {
        $type = in_array('menu_local_task__secondary', $vars['element']['#theme']) ? 'tabs--secondary' : 'tabs--primary';
    }

    // Add SMACSS-style class names.
    if ($type) {
        $link['localized_options']['attributes']['class'][] = 'nav-link';
        $class = 'nav-item';
    }

    if (!empty($variables['element']['#active'])) {
        // Add text to indicate active tab for non-visual users.
        $active = ' <span class="element-invisible">' . t('(active tab)') . '</span>';
    
        // If the link does not contain HTML already, check_plain() it now.
        // After we set 'html'=TRUE the link will not be sanitized by l().
        if (empty($link['localized_options']['html'])) {
            $link['title'] = check_plain($link['title']);
        }
        $link['localized_options']['html'] = TRUE;
        $link_text = t('!local-task-title!active', array('!local-task-title' => $link['title'], '!active' => $active));

        if (!$type) {
            $class = 'active';
        } else {
            $link['localized_options']['attributes']['class'][] = 'is-active';
            $class .= ' is-active';
        }
    }

    return '<li' . ($class ? ' class="' . $class . '"' : '') . '>' . l($link_text, $link['href'], $link['localized_options']) . "</li>\n";
}


function parent_menu_local_action($variables) {
    $link = $variables['element']['#link'];
    $link['localized_options']['attributes']['class'][] = 'btn';
    $output = '<li>';
    if (isset($link['href'])) {
        $output .= l($link['title'], $link['href'], isset($link['localized_options']) ? $link['localized_options'] : array());
    }
    elseif (!empty($link['localized_options']['html'])) {
        $output .= $link['title'];
    }
    else {
        $output .= check_plain($link['title']);
    }
    $output .= "</li>\n";

    return $output;
}
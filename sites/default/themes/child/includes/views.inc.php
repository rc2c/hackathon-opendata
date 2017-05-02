<?php
/**
 * Variables available:
 * - $classes_array: An array of classes determined in
 *   template_preprocess_views_view(). Default classes are:
 *     .view
 *     .view-[css_name]
 *     .view-id-[view_name]
 *     .view-display-id-[display_name]
 *     .view-dom-id-[dom_id]
 * - $classes: A string version of $classes_array for use in the class attribute
 * - $css_name: A css-safe version of the view name.
 * - $css_class: The user-specified classes names, if any
 * - $header: The view header
 * - $footer: The view footer
 * - $rows: The results of the view query, if any
 * - $empty: The empty text to display if the view is empty
 * - $pager: The pager next/prev links to display, if any
 * - $exposed: Exposed widget form/info to display
 * - $feed_icon: Feed icon to display, if any
 * - $more: A link to view more, if any
 * - $pathToTheme : path_to_theme();
 *
 *
 * @return string $viewTemplate HTML à afficher
 */
$viewTemplate = null;

if (!empty($view)) {
    switch ($view->name) {
        case 'thematique':
            switch ($view->current_display) {
                case 'list_matching':
                    $title = 'Données connexes';
                    break;
                case 'user_favorites':
                    $title = 'Mes favoris';
                    break;
                case 'realtime':
                    $title = 'En temps réel';
                    break;
                case 'last_graphic':
                    $title = 'Le dernier graphique';
                    break;
                case 'last_map':
                    $title = 'La dernière carte';
                    break;
            
            }
        	$hasRow = true;
            $classes .= ' col-md-12';
            $viewTemplate .= theme_render_template($pathToTheme . '/templates/views/list--fiches.tpl.php', array('view' => $view, 'pager' => 'loadmore'));
        break;
    }
}
?>
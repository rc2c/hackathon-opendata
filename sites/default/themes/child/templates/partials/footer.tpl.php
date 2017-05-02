<?php
/**
 * Footer principal
 *
 * @see page.tpl.php
 */
?>

<footer class="app-footer">
	<div class="float-left">
		<?php echo render($page['footer']); ?>
	</div>
    <?php /*<a href="http://coreui.io">CoreUI</a> © 2017 creativeLabs. */ ?>
    <span class="float-right">Plus de données sur <a href="https://opendata.larochelle.fr/" target="_blank">La Rochelle OpenData</a></span>

    <div class="clearfix"></div>
</footer>

<?php echo theme_render_template(drupal_get_path('theme', 'parent') . '/templates/cookie-legal-notice.tpl.php', array()); ?>

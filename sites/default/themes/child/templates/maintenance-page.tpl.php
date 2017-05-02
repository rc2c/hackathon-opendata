<?php

/**
 * @file
 * Default theme implementation to display a single Drupal page while offline.
 *
 * All the available variables are mirrored in html.tpl.php and page.tpl.php.
 * Some may be blank but they are provided for consistency.
 *
 * @see template_preprocess()
 * @see template_preprocess_maintenance_page()
 *
 * @ingroup themeable
 */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language ?>" lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">

<head>
  <title><?php print $head_title; ?></title>
  <?php print $head; ?>
  <?php print $styles; ?>
  <?php print $scripts; ?>
</head>
<body class="<?php print $classes; ?>">
  <div id="page">

    <header class="mainHeader" role="banner">
      <div class="mainHeader-inner">
        <div class="site-logo">
            <?php if (!$is_front): ?>
                <a href="<?php echo $front_page; ?>" title="<?php echo t('Back to home page'); ?>" rel="home">
            <?php endif; ?>
                <img src="<?php echo $logo; ?>" alt="Logo <?php echo check_plain($site_name); ?>" />
            <?php if (!$is_front): ?>
                </a>
            <?php endif; ?>
        </div>
        <?php if ($site_slogan): ?>
            <div class="site-baseline is-visuallyHidden">
                <?php if ($is_front): ?>
                    <h1 class="site-desc"><?php echo $site_slogan; ?></h1>
                <?php else: ?>
                    <p class="site-desc"><?php echo $site_slogan; ?></p>
                <?php endif; ?>
            </div>
        <?php endif; ?>
      </div>
    </header>

    <main class="main">
    
        <div class="content-header">
            <?php echo $breadcrumb; ?>
        </div>

        <div class="content row row--small">
            <a id="main-content"></a>

            <?php echo render($title_prefix); ?>
            <?php if ($title): ?>
                <h1 class="page-title"><?php echo $title; ?></h1>
            <?php endif; ?>
            <?php echo render($title_suffix); ?>

            <?php echo $messages; ?>

            <?php echo render($tabs); ?>

            <div class="clear"></div>

            <?php echo $content; ?>
        </div>
        
        <div class="clear"></div>
    </main>

  </div> <!-- /page -->

</body>
</html>

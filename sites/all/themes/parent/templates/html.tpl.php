<?php
/**
 * @file
 * Returns the HTML for the basic html structure of a single Drupal page.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728208
 */
?>
<!DOCTYPE html>
<!--[if IEMobile 7]><html class="iem7" <?php echo $html_attributes; ?>><![endif]-->
<!--[if lte IE 6]><html class="lt-ie9 lt-ie8 lt-ie7" <?php echo $html_attributes; ?>><![endif]-->
<!--[if (IE 7)&(!IEMobile)]><html class="lt-ie9 lt-ie8" <?php echo $html_attributes; ?>><![endif]-->
<!--[if IE 8]><html class="lt-ie9" <?php echo $html_attributes; ?>><![endif]-->
<!--[if (gte IE 9)|(gt IEMobile 7)]><!--><html <?php echo $html_attributes . $rdf_namespaces; ?>><!--<![endif]-->
    <head>
        <?php echo $head; ?>
        <title><?php echo $head_title; ?></title>
        <?php echo $styles; ?>
        <?php echo $scripts; ?>
    </head>
    <body class="<?php echo $classes; ?>" <?php echo $attributes;?>>
        <?php if ($skip_link_text && $skip_link_anchor): ?>
            <p id="skip-link">
                <a href="#<?php echo $skip_link_anchor; ?>" class="element-invisible element-focusable" tabindex="1"><?php echo $skip_link_text; ?></a>
            </p>
        <?php endif; ?>
        <?php echo $page_top; ?>
        <?php echo $page; ?>
        <?php echo $page_bottom; ?>
    </body>
</html>
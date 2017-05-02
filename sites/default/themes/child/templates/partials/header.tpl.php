<?php
/**
 * Header principal
 *
 * @see page.tpl.php
 */
?>

<header class="app-header navbar">

    <button class="navbar-toggler mobile-sidebar-toggler hidden-lg-up" type="button">☰</button>

    <a class="navbar-brand" href="<?php echo $front_page; ?>" title="<?php echo t('Back to home page'); ?>" rel="home" style="">
        <img src="<?php echo $logo; ?>" alt="Logo <?php echo check_plain($site_name); ?>" />
    </a>

    <div class="site-slogan text-muted text-uppercase font-weight-bold small"><?php echo $site_slogan; ?></div>
<!--     <ul class="nav navbar-nav hidden-md-down">
        <li class="nav-item">
            <a class="nav-link navbar-toggler sidebar-toggler" href="#">☰</a>
        </li>
        <li class="nav-item px-1">
            <a class="nav-link" href="#">Dashboard</a>
        </li>
        <li class="nav-item px-1">
            <a class="nav-link" href="#">Users</a>
        </li>
        <li class="nav-item px-1">
            <a class="nav-link" href="#">Settings</a>
        </li>
    </ul> -->

    <?php echo render($page['header']); ?>
</header>


<?php //echo render($page['header']); ?>
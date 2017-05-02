
<?php echo theme_render_template($path_to_theme.'/templates/partials/header.tpl.php', array(
    'page'        => $page,
    'is_front'    => $is_front,
    'front_page'  => $front_page,
    'logo'        => $logo,
    'site_name'   => $site_name,
    'site_slogan' => $site_slogan,
)); ?>

<div class="app-body">
    <div class="sidebar">
      <nav class="sidebar-nav">
            <?php echo render($page['navigation']); ?>
        </nav>
    </div>

    <main class="main">

        <?php echo $breadcrumb; ?>

        <div class="container-fluid">
            <div class="animated fadeIn">
                <div class="row">

                    <a id="main-content"></a>

                    <div class="col-md-12">
                        <div class="card">

                            <?php echo render($tabs); ?>

                            <?php echo render($title_prefix); ?>
                            <?php if ($title): ?>
                                <div class="card-block">
                                    <h1 class="page-title"><?php echo $title; ?></h1>
                                </div>
                            <?php endif; ?>
                            <?php echo render($title_suffix); ?>


                            <?php if ($action_links): ?>
                                <ul class="action-links"><?php echo render($action_links); ?></ul>
                            <?php endif; ?>
                        </div>
                        
                        <?php echo $messages; ?>
                    </div>


                    <?php if ($content_top = $page['content_top']): ?>
                        <div class="col-md-12">
                            <?php echo render($content_top); ?>
                        </div>
                    <?php endif; ?>

                    <?php if ($content = $page['content']): ?>
                        <div class="col-md-12">
                            <?php echo render($content); ?>
                        </div>
                    <?php endif; ?>

                    <?php if ($content_views = $page['content_views']): ?>
                        <?php echo render($page['content_views']); ?>
                    <?php endif; ?>

                    <?php if ($content_bottom = $page['content_bottom']): ?>
                        <div class="region region-contentBottom">
                            <?php echo render($page['content_bottom']); ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>

    </main>
</div>

<?php echo theme_render_template($path_to_theme.'/templates/partials/footer.tpl.php', array(
    'page'         => $page,
    'site_infos'   => $site_infos
)); ?>


<?php echo render($page['bottom']); ?>
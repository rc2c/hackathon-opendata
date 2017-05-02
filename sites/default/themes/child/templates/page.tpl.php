
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


        <?php if (!$is_front): ?>
            <div class="page-header">
                <div class="container-fluid">
                    <h1 class="h2 page-title"><?php echo $title; ?></h1>
                    <?php /*<p class="text-muted page-desc">Welcome to ROOT Bootstrap 4 Admin Template.</p>*/ ?>
                </div>
            </div>

            <?php echo $breadcrumb; ?>
        <?php endif; ?>

        <div class="container-fluid">
            <div class="animated fadeIn">
                <div class="row">

                    <a id="main-content"></a>

                    <div class="col-md-12">

                        <div class="card">

                            <?php echo render($tabs); ?>

                            <?php /*echo render($title_prefix); ?>
                            <?php if ($title): ?>
                                <div class="card-block">
                                    <h1 class="page-title h4"><?php echo $title; ?></h1>
                                </div>
                            <?php endif; ?>
                            <?php echo render($title_suffix);*/ ?>


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

                    <?php $contentCols = (!empty($page['sidebar_first'])) ? 9 : 12; ?>
                    <div class="col-md-<?php echo $contentCols; ?>">
                        <?php echo render($page['content']); ?>
                    </div>

                    <?php if ($sidebar = $page['sidebar_first']): ?>
                        <div class="col-md-3">
                            <?php echo render($sidebar); ?>
                        </div>
                    <?php endif; ?>
                    <div class="clearfix"></div>

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
    'page'         => $page
)); ?>

<?php echo theme_render_template($path_to_theme.'/templates/partials/modal-share.tpl.php', array(
)); ?>
<?php echo theme_render_template($path_to_theme.'/templates/partials/modal-export.tpl.php', array(
)); ?>


<?php echo render($page['bottom']); ?>


<div class="modal fade" id="modalShareFiche" tabindex="-1" role="dialog" aria-labelledby="modalShareFiche" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Partager cette fiche</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <?php 
                    global $base_url;
                    $url = $base_url . $_SERVER['REQUEST_URI'];
                    $title = drupal_get_title();
                ?>
                <p>
                    <?php 
                        $fbParams = array(
                            'u' => $url,
                            'title' => drupal_get_title(),
                            'description' => drupal_get_title()
                        );
                    ?>
                    <a href="https://www.facebook.com/sharer/sharer.php?<?php echo http_build_query($fbParams); ?>" target="_blank" class="btn btn-sm btn-facebook">
                        <span>Facebook</span>
                    </a>
                    <?php
                        $title = str_replace(' ', '%20', drupal_get_title());
                    ?>
                    <a href="https://twitter.com/intent/tweet?url=<?php echo $url; ?>/&text=<?php echo $title; ?>" target="_blank" class="btn btn-sm btn-twitter">
                        <span>Twitter</span>
                    </a>
                    <a href="#button" class="btn btn-sm btn-mail">
                        <span>Mail</span>
                    </a>
                    <a href="#button" class="btn btn-sm btn-iframe">
                        <span>Iframe</span>
                    </a>
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
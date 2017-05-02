<div class="row">
    <div class="col-sm-9">

        <?php /* <h4 class="card-title">Mon graphique</h4> ¨*/ ?>
        <?php if ($resultSubtitle = $drupNode->getText('subtitle')): ?>
            <p class="item-subtitle font-weight-bold"><?php echo $resultSubtitle->value; ?></p>
        <?php endif; ?>
        <?php if ($legend = $drupNode->getText('dataviz_legend')): ?>
            <div class="node-legend mt-1"><?php echo $legend->value; ?></div>
        <?php endif; ?>
        <hr/>
    </div>
    <!--/.col-->
    <div class="col-sm-3">
        <div class="node-toolbar float-right" role="toolbar" aria-label="Toolbar with button groups">
            <button type="button" class="btn btn-sm btn-block btn-link" data-toggle="modal" data-target="#modalShareFiche">Aide <i class="fa fa-question"></i></button>
            <button type="button" class="btn btn-sm btn-block btn-link" data-toggle="modal" data-target="#modalShareFiche">Signaler <i class="fa fa-bell-o"></i></button>
            <button type="button" class="btn btn-sm btn-block btn-link">Favoris <i class="fa fa-paperclip"></i></button>
        </div>
    </div>
    <!--/.col-->
</div>
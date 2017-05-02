<?php
    $nid = DrupTools::getNid();
    $drupNode = new DrupNode($nid);
    $drupUser = $drupNode->getAuthor();
    $userDatas = $drupUser->getData();

    $roles = $drupUser->getRoles();
    $role = array_values($roles)[0];

    $picture = $drupUser->renderPicture();
?>

<div class="card">
    <div class="card-block p-1 clearfix">
        <i class="fa fa-calendar-check-o bg-faded p-1 font-2xl mr-1 float-left"></i>
        <div class="h5 mb-0 mt-h">24/09/2014</div>
        <div class="text-muted text-uppercase font-weight-bold font-xs">Mise à jour</div>
    </div>
</div>


<div class="card card-user">
    <header class="card-header">Fiche proposée par</header>
    <div class="card-block">
        <div class="h1 text-muted">
            <?php if ($picture): ?>
                <?php echo $drupUser->renderPicture(); ?>
            <?php else: ?>
                <i class="icon-user-follow"></i>
            <?php endif; ?>
        </div>
        <div class="h4 mb-0"><?php echo $drupUser->getName(); ?></div>
        <small class="text-muted text-uppercase font-weight-bold"><?php echo $role; ?></small>
        <div class="progress progress-xs mt-1">
            <div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <?php if (isset($userDatas->field_user_privacy[LANGUAGE_NONE]) && $userDatas->field_user_privacy[LANGUAGE_NONE][0]['value'] === '1'): ?>
            <?php echo l('Consulter son profil', $drupUser->getUrlView(), array('attributes' => array('class' => array('btn', 'btn-outline-success', 'mt-1')))) ?>
        <?php endif; ?>
    </div>
</div>
<?php 
    global $user;
?>

<?php if ($user->uid): ?>
    <?php $drupUser = new DrupUser($user->uid); ?>

    <ul class="nav navbar-nav nav-user">

        <?php /*<li class="nav-item hidden-md-down">
            <a class="nav-link" href="#"><i class="icon-bell"></i><span class="badge badge-pill badge-danger">5</span></a>
        </li>*/ ?>

        <li class="nav-item dropdown">
        
            <a class="nav-link dropdown-toggle nav-link-user" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                <?php if ($picture = $drupUser->renderPicture()): ?>
                    <?php echo $picture; ?>
                <?php else: ?>
                    <i class="icon-user-follow"></i>
                <?php endif; ?>
                <span class="hidden-md-down"><?php echo $user->name; ?></span>
            </a>
            
            <div class="dropdown-menu dropdown-menu-right">

                <div class="dropdown-header text-center">
                    <strong>Mes données</strong>
                </div>

                <a class="dropdown-item" href="#"><i class="fa fa-pencil"></i> Brouillons<span class="badge badge-info">42</span></a>
                <a class="dropdown-item" href="#"><i class="fa fa-clock-o"></i> En attente de <br/>modération<span class="badge badge-danger">42</span></a>
                <a class="dropdown-item" href="#"><i class="fa fa-check"></i> Publiés<span class="badge badge-warning">42</span></a>
                <a class="dropdown-item" href="#"><i class="fa fa-paperclip"></i> Mes favoris<span class="badge badge-success">42</span></a>
                <a class="dropdown-item" href="#"><i class="fa fa-comment-o"></i> Mes commentaires<span class="badge badge-default">2</span></a>

                <div class="dropdown-header text-center">
                    <strong>Mon compte</strong>
                </div>
                <a class="dropdown-item" href="/user"><i class="fa fa-user"></i> Profil</a>
                <a class="dropdown-item" href="/user/<?php echo $user->uid; ?>/edit"><i class="fa fa-wrench"></i> Préférences</a>
                <a class="dropdown-item" href="/user/logout"><i class="fa fa-lock"></i> Déconnexion</a>
            </div>
        </li>
    </ul>
<?php else: ?>

    <ul class="nav navbar-nav nav-user">

        <li class="nav-item">
            <a class="nav-link" href="/user" role="button">
                <i class="icon-user-follow"></i>
                <span class="hidden-md-down">Me connecter</span>
            </a>
        </li>
    </ul>

<?php endif; ?>
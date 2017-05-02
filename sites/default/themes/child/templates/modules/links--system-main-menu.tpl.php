<?php $menuMain = $variables['links']; ?>
<?php if (!empty($menuMain)): ?>

    <ul class="nav navbar-nav hidden-md-down">

        <?php
            $countLinks = count($menuMain);
            $activeTrail = menu_get_active_trail();
            $i = 0;
            $menuId = $heading['menu_id'];
        ?>
        
        <?php /*if ($menuId === 'nav--main'): ?>
            <li class="nav-item">
                <a class="nav-link navbar-toggler sidebar-toggler" href="#">☰</a>
            </li>
        <?php endif;*/ ?>

        <?php foreach ($menuMain as $itemKey => $itemValue): ?>
            <?php
                if ($itemValue['link']['hidden']) {
                    continue;
                }
                $liClasses   = array('nav-item', 'px-1');
                //$liClasses[] = (!empty($itemValue['below'])) ? 'nav-dropdown open' : '';
                $liClasses[] = (isset($activeTrail[$i]['href']) && $activeTrail[$i]['href'] == $itemValue['link']['href']) ? 'active' : '';

                //$itemValue['link']['title'] = '<i class="icon-speedometer"></i>' . $itemValue['link']['title'];
                $linkClasses = array('nav-link');
                //$linkClasses[] = ($menuId !== 'nav--footer') ? 'nav-link' : '';
                //$linkClasses[] = (!empty($itemValue['below'])) ? 'nav-dropdown-toggle' : '';

            ?>
            <li class="<?php echo trim(implode(' ', $liClasses)); ?>">
                <?php echo l($itemValue['link']['title'], $itemValue['link']['href'], array('attributes' => array('class' => $linkClasses))); ?>

                <?php /*if (!empty($itemValue['below'])): ?>
                    <ul class="nav-dropdown-items">
                        <?php foreach ($itemValue['below'] as $belowKey => $belowValue): ?>
                            <?php 
                                $linkClasses = array('nav-link');
                                $linkClasses[] = (isset($activeTrail[$i]['href']) && $activeTrail[$i]['href'] == $belowValue['link']['href']) ? 'active' : '';

                                $belowValue['link']['title'] = '<i class="icon-speedometer"></i>' . $belowValue['link']['title'];
                            ?>
                            <li class="nav-item">
                                <?php echo l($belowValue['link']['title'], $belowValue['link']['href'], array('attributes' => array('class' => $linkClasses))); ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                <?php endif; */?>
            </li>
            <?php $i++; ?>
        <?php endforeach; ?>
    </ul>
<?php endif; ?>
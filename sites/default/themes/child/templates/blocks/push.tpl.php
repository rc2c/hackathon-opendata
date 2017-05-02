<div class="block block--push">
    <?php if (user_is_logged_in() && $title === ''): ?>
        <p class="block-is-empty"><?php echo t('Add a push'); ?></p>
    <?php elseif ($title !== ''): ?>
        <article>
            <header class="block-header">
                <h2 class="block-title title--h1"><?php echo $title; ?></h2>
            </header>

            <?php if (!empty($body)): ?>
                <div class="block-body">
                    <p><?php echo $body; ?></p>
                </div>
            <?php endif; ?>
        </article>
    <?php endif; ?>
</div>
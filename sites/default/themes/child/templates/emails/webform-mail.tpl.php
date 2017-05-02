<table>
    <tr>
        <td width="32"></td>
        <td>
            <table>
                <?php if (!empty($components)): ?>
                    <?php foreach ($components as $componentId => $component): ?>
                        <tr>
                            <?php if ($component['type'] === 'fieldset'): ?>
                                <td class="mail-label" colspan="2">
                                    <font><?php echo $component['name']; ?> :</font>
                                </td>
                            <?php else: ?>
                                <td class="mail-label">
                                    <font><?php echo $component['name']; ?> :</font>
                                </td>
                                <td class="mail-value">
                                    <font>
                                        <?php if ($component['pid'] !== '0'): ?>
                                            <?php $parent = $components[$component['pid']]; ?>
                                            %value[<?php echo $parent['form_key']; ?>][<?php echo $component['form_key']; ?>]
                                        <?php else: ?>
                                            %value[<?php echo $component['form_key']; ?>]
                                        <?php endif; ?>
                                    </font>
                                </td>
                            <?php endif; ?>
                        </tr>
                        <tr><td height="10"></td></tr>
                    <?php endforeach; ?>
                <?php else: ?>
                    <tr>
                        <td>
                            <font><?php echo t('No webform component configured.'); ?></font>
                        </td>
                    </tr>
                <?php endif; ?>
            </table>
        </td>
        <td width="32"></td>
    </tr>
</table>
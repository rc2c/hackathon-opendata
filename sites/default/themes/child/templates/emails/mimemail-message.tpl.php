<?php

/**
 * @file
 * Default theme implementation to format an HTML mail.
 *
 * Copy this file in your default theme folder to create a custom themed mail.
 * Rename it to mimemail-message--[module]--[key].tpl.php to override it for a
 * specific mail.
 *
 * Available variables:
 * - $recipient: The recipient of the message
 * - $subject: The message subject
 * - $body: The message body
 * - $css: Internal style sheets
 * - $module: The sending module
 * - $key: The message identifier
 *
 * @see template_preprocess_mimemail_message()
 */

$mailContent = (!empty($module) && $module == 'webform') ? $body : nl2br($body);

?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <?php if ($css): ?>
            <style type="text/css">
                <!--
                <?php print $css ?>
                -->
            </style>
        <?php endif; ?>
    </head>
    <body id="mimemail-body" class="mail-mainBody<?php echo (!empty($module) && !empty($key)) ? ' '.$module.'-'.$key : ''; ?>">
                
    <table class="mail-table mail-body">
        <tr><td height="30"></td></tr>
        <tr><td>
        <center>
        <table class="mail-table mail-container">
            <!-- HEADER -->
            <tr><td height="4" class="mail-border-primary"></td></tr>
            <tr><td height="15"></td></tr>
            <tr>
                <td class="mail-header">
                    <table class="mail-table">
                        <tr>
                            <td>
                                <a class="mail-link" href="<?php echo $base_url; ?>" target="_blank">
                                    <img class="mail-image" src="<?php echo $logo; ?>" alt="<?php echo $site_name; ?>" />
                                </a>
                            </td>
                        </tr>
                        <tr><td height="10"></td></tr>
                        <tr>
                            <td class="mail-site-baseline">
                                <span class="mail-text">
                                    <?php echo $site_slogan; ?>
                                </span>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr><td height="15"></td></tr>
            <tr><td height="1" class="mail-border-secondary"></td></tr>
            <!-- #HEADER -->

            <!-- CONTENT -->
            <tr><td height="15"></td></tr>
            <tr>
                <td class="mail-content">
                    <table class="mail-table">
                        <tr><td height="20"></td></tr>
                        <tr>
                            <td>
                                <table class="mail-table">
                                    <tr>
                                        <td width="30"></td>
                                        <td>
                                            <table class="mail-table">
                                                <tr>
                                                    <td>
                                                        <?php echo $mailContent; ?>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td width="30"></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr><td height="20"></td></tr>
                    </table>
                </td>
            </tr>
            <!-- #CONTENT -->

            <!-- FOOTER -->
            <tr>
                <td class="mail-footer">
                    <table class="mail-table">
                        <tr><td height="10"></td></tr>
                        <tr>
                            <td>
                                <table class="mail-table">
                                    <tr>
                                        <td width="10"></td>
                                        <td>
                                            <span class="mail-text">Envoyé depuis le site <a class="mail-link" href="<?php echo $base_url; ?>" target="_blank"><?php echo str_replace(array('http://', 'https://'), '', $base_url); ?></a>.</span>
                                        </td>
                                        <td width="10"></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr><td height="10"></td></tr>
                    </table>
                </td>
            </tr>
            <!-- #FOOTER -->
        </table>
        </center>
        </td></tr>
    </table>
    </body>
</html>
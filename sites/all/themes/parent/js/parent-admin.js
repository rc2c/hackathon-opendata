(function($) {
    'use strict';

    $.Admin = function() {
        // Élements commun
        this.elements = {
            body: $('body'),
            featuresExportAdvanced: $('#features-export-advanced'),
            verticalTabs: $('div.vertical-tabs'),
            revisionInput: $('#edit-revision'),
            blockAdmin: $('div.block-admin')
        };

        if (this.elements.body.hasClass('logged-in')) {
            // Module features : page create
            this.featuresCreate();

            // Vertical tabs : remonter l'onglet "options de publication" en haut
            this.verticalTabsHandler();

            // Activation des révisions
            if (this.elements.revisionInput.length) {
                this.elements.revisionInput.trigger('click');
            }

            // Contextual links
            if (this.elements.blockAdmin.length) {
                this.elements.blockAdmin.each(function() {
                    var blockAdmin = $(this);
                    var contextualLinks = blockAdmin.children('div.contextual-links-wrapper');
                    var blockFront = blockAdmin.find('.block');

                    blockAdmin.removeClass('contextual-links-region');
                    contextualLinks.appendTo(blockFront);
                    blockFront.addClass('contextual-links-region');
                });
            }
        }
    };

    $.Admin.prototype = {
        featuresCreate: function() {
            if (this.elements.featuresExportAdvanced.length) {
                this.elements.featuresExportAdvanced
                    .children('fieldset').removeClass('collapsed')
                    .children('.fieldset-wrapper').show();
            }
        },
        verticalTabsHandler: function() {
            // Options de publication
            if (this.elements.verticalTabs.closest('form').hasClass('node-form')) {
                this.elements.verticalTabs.find('li')
                    .removeClass('selected')
                    .removeClass('first')
                    .removeClass('last')
                    .filter(':last')
                        .prependTo(this.elements.verticalTabs.find('ul'))
                        .addClass('selected')
                        .find('a').trigger('click');
            }
        }
    };

    /**
     * onReady
     */
    $(document).ready(function() {
        new $.Admin();
    });

    /**
     * Drupal Ajax Behaviors
     */
    Drupal.behaviors.rc2c = {
        attach: function () {
            // Traduction Scald
            if (Drupal.locale.strings !== undefined) {
                var drupalLocalStrings = Drupal.locale.strings[''];
                var i18n = $('html').attr('lang');

                // FR
                if (i18n === 'fr') {
                    drupalLocalStrings['Close'] = 'Fermer';
                    drupalLocalStrings['Thumbnail'] = 'Miniature';
                    drupalLocalStrings['Edit atom properties'] = 'Éditer les propriétés du média';
                    drupalLocalStrings['View'] = 'Voir';
                    drupalLocalStrings['Edit'] = '&Eacute;diter';
                    drupalLocalStrings['Refresh'] = 'Rafraîchir';
                    drupalLocalStrings['Copy'] = 'Copier';
                    drupalLocalStrings['Cut'] = 'Couper';
                    drupalLocalStrings['Paste'] = 'Coller';
                    drupalLocalStrings['Delete'] = 'Supprimer';
                    drupalLocalStrings['Please select an atom first'] = 'Vous devez d\'abord sélectionner le média';
                    drupalLocalStrings['Add a caption'] = 'Ajouter une légende';
                    drupalLocalStrings['CSS Classes'] = 'Classes CSS';
                    drupalLocalStrings['Context'] = 'Contexte';
                    drupalLocalStrings['Alignment'] = 'Alignement';
                    drupalLocalStrings['Advanced'] = 'Avancé';
                    drupalLocalStrings['Atom Properties'] = 'Propriétés du média';
                    drupalLocalStrings['None'] = 'Aucun';
                    drupalLocalStrings['Left'] = 'Gauche';
                    drupalLocalStrings['Right'] = 'Droite';
                    drupalLocalStrings['Center'] = 'Centré';
                    drupalLocalStrings['This option is currently available for Image Atoms only.'] = 'Cette option est actuellement disponible pour les médias de type "image" seulement.';
                }
            }
        }
    };
})(jQuery);
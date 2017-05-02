(function($) {
    'use strict';

    $.Theme = function() {
        // Élements commun
        this.elements = {
            body: $('body')
        };

        return this;
    };

    $.Theme.prototype = {
        init: function() {
            var self = this;

            // Variables par défaut
            self.pageFunction = {
                pageFront: 'front'
            };
            //self.device = new $.DeviceDetect().getDevices();
            self.userIsLoggedIn = self.elements.body.hasClass('logged-in');

            // Pour toutes les pages
            self.pageAll();

            // Pour chaque page
            $.each(self.pageFunction, function(funcName, className) {
                if (self.elements.body.hasClass(className)) {
                    self[funcName]();
                }
            });
        },
        pageAll: function()
        {
            var self = this;
            $.extend(self.elements, {
                cookieLegalNotice: $('#cookie-legal-notice'),
                anchorLink: $('a[href*="#"]:not([href="#"])'),
                externalLink: $('a[rel="external"], a[rel="document"], a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"], a[href$=".odt"], a[href$=".xls"], a[href$=".txt"]'),
                overlay: $('.l-overlay')
            });

            //self.bootstrapForms();

            // Spinner
            self.ajaxSpinner();

            // Cookie notice
            self.elements.cookieLegalNotice.cookieNotice();

            // Scroll doux
            //self.elements.anchorLink.smoothScroll();

            // Liens externes
            //self.elements.externalLink.openLinkInNewTab();

            // Overlay des liens
            //self.elements.overlay.linkOverlay();
        },

        /**
         * Gestion d'un loader sur toutes les requêtes ajax
         */
        ajaxSpinner: function() {
            var self = this;

            // Ne pas afficher le spinner sur ces urls ajax
            self.spinnerExceptions = ['/features/', '/modules/file/', '/atom/'];

            // Init Spinner
            self.spinner = self.elements.body.spinner();

            // Events global ajax
            $(document)
                .ajaxSend(function(event, jqXHR, ajaxOptions) {
                    var toShow = true;
                    $.each(self.spinnerExceptions, function() {
                        if (ajaxOptions.url.indexOf(this) !== -1) {
                            toShow = false;
                        }
                    });

                    if (toShow) {
                        self.spinner.show();
                    }
                })
                .ajaxStop(function() {
                    self.spinner.hide();
                });
        },

        bootstrapForms: function()
        {
            // Form items
            $('.form-item:not(.form-type-radio):not(.form-type-checkbox)').addClass('form-group');
            $('.form-text, .form-select, textarea').addClass('form-control');
            //$('form label').addClass('h6');
            // Tables
            $('table.sticky-enabled, .node-body table').addClass('table table-hover table-outline').find('thead').addClass('thead-default');
            // Fieldsets
            $('fieldset.collapsible').addClass('card').children('legend').addClass('card-header h5').next().addClass('card-block');
            // Btns
            $('.form-submit').addClass('btn btn-outline-primary');
            $('.action-links .btn').addClass('btn-outline-primary');
            $('.form-actions .btn-primary ~ input:not(.btn)').addClass('btn btn-warning');
            $('form > div > .form-submit').addClass('btn btn-primary').nextAll('input').addClass('btn btn-warning');
            // Pager
            $('.pager').addClass('pagination').children().addClass('page-item').children('a').addClass('page-link');

            var nodeCard = $('.region-content .node > .card-block');
            //console.log(nodeCard.html().trim().length);
            if (nodeCard.length && nodeCard.html().trim().length === 0) {
                $('.region-content').hide();
            }

            $('.horizontal-tab-button a').addClass('p-1');
            $('.horizontal-tabs-panes').addClass('p-h');
            $('.vertical-tabs-pane').addClass('p-1');
        },

        /**
         * Page d'accueil
         */
        pageFront: function()
        {
            $.extend(this.elements, {

            });
        }
    };

    Drupal.Theme = {};

    /**
     * onReady
     */
    $(document).ready(function() {
        Drupal.Theme = new $.Theme();
        Drupal.Theme.init();
    });

    /**
     * Drupal Ajax Behaviors
     */
    Drupal.behaviors.theme = {
        attach: function () {

            var Theme = new $.Theme();
            Theme.bootstrapForms();

        }
    };
})(jQuery);
(function($) {
    'use strict';

    /**
     * Permet de cliquer sur la zone du sélecteur
     */
    $.fn.linkOverlay = function(selector) {
        $(this).live('click mousedown', function(event) {
            if (!$('body').hasClass('owl-drag')) {
                var element = $(this);

                if (element.hasClass('btn')) {
                    selector = 'input[type="submit"]';
                } else {
                    if (selector === undefined) {
                        selector = 'a:last';
                    }
                }
                var link = $(this).find(selector);

                if (link.length) {
                    if (link.is(':submit') && event.type === 'click' && event.button === 0) {
                        link.closest('form').submit();
                    } else {
                        var href = link.attr('href');
                        var isBlank = (link.attr('target') === '_blank') ? true : false;

                        if ((event.type === 'click' && event.button === 0 && isBlank) || (event.type === 'click' && event.ctrlKey) || (event.type === 'mousedown' && event.button === 1)) {
                            window.open(href);
                        } else if (event.type === 'click') {
                            location.href = href;
                        }
                    }
                }
            }
        });
    };

    /**
     * Ouvre des liens dans un nouvel onglet
     */
    $.fn.openLinkInNewTab = function() {
        $(this).each(function() {
            var link = $(this);
            var title = link.attr('title');
            var href = link.attr('href');

            link.attr('title', ((title) ? title : href) + ' (Nouvelle fenêtre)')
                .click(function(event) {
                    event.preventDefault();
                    window.open(href);
                });
        });
    };

    /**
     * Smooth scroll
     */
    $.fn.smoothScroll = function() {
        $(this).click(function(event) {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

                if (target.length) {
                    event.preventDefault();

                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                }
            }
        });
    };

    /**
     * Initialisation meta viewport
     */
    $.fn.initViewport = function() {
        var viewportMetaContent = $(this).attr('content'),
            width = screen.width;
        
        if (viewportMetaContent.indexOf('initial-scale') === -1) {
            $(this).attr('content', viewportMetaContent + ', initial-scale=' + ((width >= 768 && width < 1024) ? 0.75 : 1.0));
        }
    };

    var viewportMeta = $('head').find('meta[name="viewport"]');
    if (viewportMeta.length) {
        viewportMeta.initViewport();
        $(window).bind('orientationchange', function() {
            viewportMeta.initViewport();
        });
    }

    /**
     * Récupérer le contenu d'un cookie
     * @param string name -> nom du cookie
     */
    $.getCookie = function(name) {
        var oRegex = new RegExp('(?:; )?' + name + '=([^;]*);?');

        if (oRegex.test(document.cookie)) {
            return decodeURIComponent(RegExp['$1']);
        } else {
            return null;
        }
    };
    /**
     * Écrire une cookie
     * @param string name     -> nom du cookie
     * @param mixed  value    -> valeur du cookie  
     * @param int    duration -> nombre de jour avant expiration
     */
    $.setCookie = function(name, value, duration) {
        var today = new Date(),
            expires = new Date(),
            expiresValue = duration;

        if (duration !== 0) {
            expires.setTime(today.getTime() + (duration*24*60*60*1000));
            expiresValue = expires.toGMTString();
        }
        document.cookie = name + '=' + value + ';expires=' + expiresValue + ';path=/;';
    };

    /**
     * Gestion des champs conditionnels
     *
     * @object context jQuery -> Parent de l'input déclencheur
     * 
     * @param fieldsConfig object   -> {'valeur_input': ['.selecteur_a_afficher']}
     */
    $.fn.conditionalFields = function(fieldsConfig) {
        var context = $(this);
        var hideFields = function(exceptCondition) {
            $.each(fieldsConfig, function(condition, fields) {
                if (exceptCondition !== undefined && exceptCondition === true) {
                    $.each(fields, function() {
                        if (context.find('input[value="' + condition + '"]').filter(':checked').val() !== condition) {
                            $(this).slideUp('fast');
                        }
                    });
                } else {
                    $.each(fields, function() {
                        $(this).slideUp('fast');
                    });
                }
            });
        };

        hideFields(true);

        $.each(fieldsConfig, function(condition, fields) {
            // OnClick, show
            context.find('input[value="' + condition + '"]').click(function() {
                hideFields();

                $.each(fields, function() {
                    $(this).slideToggle('fast');
                });
            });
        });
    };

    /**
     * Ajout un état requis au champ
     *
     * $('.form-item').requiredField();
     */
    $.fn.requiredField = function() {
        var required = $('<span>', {
            'class': 'form-required',
            html: '*'
        });

        var formItem = $(this);
        formItem.find('label').append(required);
        formItem.find('input').prop('required', true);
    };
})(jQuery);
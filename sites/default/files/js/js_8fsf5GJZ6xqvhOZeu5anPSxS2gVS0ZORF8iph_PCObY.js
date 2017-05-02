/*global jQuery */
/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement('div');
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );
;
/**
 * CookieNotice
 * Permet d'afficher une notice sur les cookies
 * @version 2.0 (04/01/2017)
 */
!function(e){"use strict";e.CookieNotice=function(t,i){e.extend(this.settings={},e.CookieNotice.defaults,i),this.elements={body:e("body"),notice:t,button:this.settings.button,link:this.settings.link},this.load()},e.CookieNotice.defaults={button:function(e){return e.find("button")},link:function(e){return e.find('a[target!="_blank"]')},classOpen:"is-cookieNoticeOpen",cookieName:"cookienotice-agree",cookieDuration:390,afterEventsHandler:void 0,onAgree:void 0,onDisagree:void 0},e.CookieNotice.agree=!1,e.CookieNotice.prototype={load:function(){return 0!==this.elements.notice.length&&void("true"===this.getCookie(this.settings.cookieName)?e.CookieNotice.agree=!0:this.disagree())},agree:function(){e.CookieNotice.agree=!0,this.elements.body.removeClass(this.settings.classOpen),this.setCookie(this.settings.cookieName,!0,this.settings.cookieDuration),this.removeEvents(),void 0!==this.settings.onAgree&&this.settings.onAgree.call({CookieNotice:this,body:this.elements.body})},disagree:function(){e.CookieNotice.agree=!1,this.elements.body.addClass(this.settings.classOpen),"true"===this.getCookie(this.settings.cookieName)&&this.setCookie(this.settings.cookieName,"",-1),void 0!==this.settings.onDisagree&&this.settings.onDisagree.call({CookieNotice:this,body:this.elements.body}),this.eventsHandler()},eventsHandler:function(){var e=this;e.elements.button(e.elements.notice).one("click.cookienotice.button",function(){e.agree()}),e.elements.link(e.elements.body).not(e.elements.notice.find("a")).one("click.cookienotice.link",function(){e.agree()}),void 0!==e.settings.afterEventsHandler&&e.settings.afterEventsHandler.call({CookieNotice:e,elements:e.elements})},removeEvents:function(){this.elements.button(this.elements.notice).off("click.cookienotice.button"),this.elements.link(this.elements.body).off("click.cookienotice.link")},getCookie:function(e){var t=new RegExp("(?:; )?"+e+"=([^;]*);?");return t.test(document.cookie)?decodeURIComponent(RegExp.$1):null},setCookie:function(e,t,i){var o=new Date,n=new Date;n.setTime(o.getTime()+24*i*60*60*1e3),document.cookie=e+"="+t+";expires="+n.toGMTString()+";path=/;"}},e.fn.cookieNotice=function(t){return!!navigator.cookieEnabled&&new e.CookieNotice(e(this),t)}}(jQuery);;
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
})(jQuery);;
!function(t){"use strict";t.Spinner=function(e,s){return this.elements={container:e},t.extend(!0,this.settings={},t.Spinner.defaults,s),this.timeout=null,this.prepareOptions()&&this.init(),this},t.Spinner.defaults={type:"overlay",spinner:!0,text:void 0,timeout:1e4,classes:{prefix:"spinner",wrapper:"{prefix}-wrapper",wrapperInner:"{prefix}-wrapperInner",text:"{prefix}-text",spinner:"l-spinner",loading:"is-loading"},beforeWrap:void 0,onShow:void 0,onHide:void 0},t.Spinner.prototype={prepareOptions:function(){var e=this;return t.each(e.settings.classes,function(t,s){"string"==typeof s&&(e.settings.classes[t]=s.replace(/{prefix}/,e.settings.classes.prefix))}),t.each(e.settings,function(t){var s=e.elements.container.attr("data-"+e.settings.classes.prefix+"-"+t);void 0!==s&&s.length&&(e.settings[t]="spinner"===t?!s:s)}),!0},setOptions:function(e){t.extend(!0,this.settings,e),this.refresh()},init:function(){return this.elements.container.hasClass(this.settings.classes.prefix)||(this.elements.container.addClass(this.settings.classes.prefix+" "+this.settings.classes.prefix+"--"+this.settings.type+" "+(this.settings.spinner===!0?this.settings.classes.spinner:"")),this.elements.wrapper=t("<"+("button"===this.settings.type?"span":"div")+">",{class:this.settings.classes.wrapper}),this.wrap()),this},destroy:function(){var e=this;return e.elements.container.removeClass(function(){var s=e.elements.container.attr("class").split(" "),n=null;if(s.length&&t.each(s,function(t,s){s.indexOf(e.settings.classes.prefix)!==-1&&(n+=" "+s)}),null!==n)return n.trim()}),0===e.elements.container.attr("class").length&&e.elements.container.removeAttr("class"),e.elements.wrapper.remove(),e},refresh:function(){return this.destroy(),this.init(),this},wrap:function(){this.elements.wrapper.empty(),this.elements.wrapperInner=t("<div>",{class:this.settings.classes.wrapperInner}),void 0!==this.settings.text&&"button"!==this.settings.type&&(this.elements.text=t("<p>",{class:this.settings.classes.text,html:this.settings.text})),void 0!==this.settings.beforeWrap&&this.settings.beforeWrap.call({Spinner:this,elements:this.elements}),this.elements.wrapper["overlay"===this.settings.type?"appendTo":"prependTo"](this.elements.container),this.elements.wrapperInner.appendTo(this.elements.wrapper),void 0!==this.elements.text&&this.elements.text.appendTo(this.elements.wrapperInner)},show:function(t){return this.elements.container.addClass(this.settings.classes.loading),"button"===this.settings.type&&null!==this.settings.text&&(this.elements.wrapper.remove(),this.elements.buttontext=this.elements.container.html(),this.elements.container.text(this.settings.text),this.wrap()),void 0!==this.settings.onShow&&this.settings.onShow.call({Spinner:this,container:this.elements.container}),void 0!==t&&t.call({Spinner:this,container:this.elements.container}),this.setTimeout(),this},hide:function(t){return clearTimeout(this.timeout),this.elements.container.removeClass(this.settings.classes.loading),"button"===this.settings.type&&null!==this.settings.text&&void 0!==this.elements.buttontext&&(this.elements.container.html(this.elements.buttontext),this.wrap()),void 0!==this.settings.onHide&&this.settings.onHide.call({Spinner:this,container:this.elements.container}),void 0!==t&&t.call({Spinner:this,container:this.elements.container}),this},setTimeout:function(){var t=this;void 0!==t.settings.timeout&&t.settings.timeout>0&&(t.timeout=setTimeout(function(){t.hide()},t.settings.timeout))}},t.fn.spinner=function(e){return new t.Spinner(t(this),e)}}(jQuery);;
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
            // Tables
            $('table.sticky-enabled, .node-body table').addClass('table table-hover table-outline').find('thead').addClass('thead-default');
            // Fieldsets
            $('fieldset.collapsible').addClass('card').children('legend').addClass('card-header').next().addClass('card-block');
            // Btns
            $('.form-submit').addClass('btn btn-outline-primary');
            $('.action-links .btn').addClass('btn-outline-primary');
            $('.form-actions .btn-primary ~ input:not(.btn)').addClass('btn btn-warning');
            $('form > div > .form-submit').addClass('btn btn-primary').nextAll('input').addClass('btn btn-warning');
            // Pager
            $('.pager').addClass('pagination').children().addClass('page-item').children('a').addClass('page-link');
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
})(jQuery);;
!function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e(require,exports,module):t.Tether=e()}(this,function(t,e,o){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t){var e=t.getBoundingClientRect(),o={};for(var i in e)o[i]=e[i];if(t.ownerDocument!==document){var r=t.ownerDocument.defaultView.frameElement;if(r){var s=n(r);o.top+=s.top,o.bottom+=s.top,o.left+=s.left,o.right+=s.left}}return o}function r(t){var e=getComputedStyle(t)||{},o=e.position,i=[];if("fixed"===o)return[t];for(var n=t;(n=n.parentNode)&&n&&1===n.nodeType;){var r=void 0;try{r=getComputedStyle(n)}catch(s){}if("undefined"==typeof r||null===r)return i.push(n),i;var a=r,f=a.overflow,l=a.overflowX,h=a.overflowY;/(auto|scroll)/.test(f+h+l)&&("absolute"!==o||["relative","absolute","fixed"].indexOf(r.position)>=0)&&i.push(n)}return i.push(t.ownerDocument.body),t.ownerDocument!==document&&i.push(t.ownerDocument.defaultView),i}function s(){A&&document.body.removeChild(A),A=null}function a(t){var e=void 0;t===document?(e=document,t=document.documentElement):e=t.ownerDocument;var o=e.documentElement,i=n(t),r=P();return i.top-=r.top,i.left-=r.left,"undefined"==typeof i.width&&(i.width=document.body.scrollWidth-i.left-i.right),"undefined"==typeof i.height&&(i.height=document.body.scrollHeight-i.top-i.bottom),i.top=i.top-o.clientTop,i.left=i.left-o.clientLeft,i.right=e.body.clientWidth-i.width-i.left,i.bottom=e.body.clientHeight-i.height-i.top,i}function f(t){return t.offsetParent||document.documentElement}function l(){if(M)return M;var t=document.createElement("div");t.style.width="100%",t.style.height="200px";var e=document.createElement("div");h(e.style,{position:"absolute",top:0,left:0,pointerEvents:"none",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),e.appendChild(t),document.body.appendChild(e);var o=t.offsetWidth;e.style.overflow="scroll";var i=t.offsetWidth;o===i&&(i=e.clientWidth),document.body.removeChild(e);var n=o-i;return M={width:n,height:n}}function h(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=[];return Array.prototype.push.apply(e,arguments),e.slice(1).forEach(function(e){if(e)for(var o in e)({}).hasOwnProperty.call(e,o)&&(t[o]=e[o])}),t}function d(t,e){if("undefined"!=typeof t.classList)e.split(" ").forEach(function(e){e.trim()&&t.classList.remove(e)});else{var o=new RegExp("(^| )"+e.split(" ").join("|")+"( |$)","gi"),i=c(t).replace(o," ");g(t,i)}}function p(t,e){if("undefined"!=typeof t.classList)e.split(" ").forEach(function(e){e.trim()&&t.classList.add(e)});else{d(t,e);var o=c(t)+(" "+e);g(t,o)}}function u(t,e){if("undefined"!=typeof t.classList)return t.classList.contains(e);var o=c(t);return new RegExp("(^| )"+e+"( |$)","gi").test(o)}function c(t){return t.className instanceof t.ownerDocument.defaultView.SVGAnimatedString?t.className.baseVal:t.className}function g(t,e){t.setAttribute("class",e)}function m(t,e,o){o.forEach(function(o){e.indexOf(o)===-1&&u(t,o)&&d(t,o)}),e.forEach(function(e){u(t,e)||p(t,e)})}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function v(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function y(t,e){var o=arguments.length<=2||void 0===arguments[2]?1:arguments[2];return t+o>=e&&e>=t-o}function b(){return"undefined"!=typeof performance&&"undefined"!=typeof performance.now?performance.now():+new Date}function w(){for(var t={top:0,left:0},e=arguments.length,o=Array(e),i=0;i<e;i++)o[i]=arguments[i];return o.forEach(function(e){var o=e.top,i=e.left;"string"==typeof o&&(o=parseFloat(o,10)),"string"==typeof i&&(i=parseFloat(i,10)),t.top+=o,t.left+=i}),t}function C(t,e){return"string"==typeof t.left&&t.left.indexOf("%")!==-1&&(t.left=parseFloat(t.left,10)/100*e.width),"string"==typeof t.top&&t.top.indexOf("%")!==-1&&(t.top=parseFloat(t.top,10)/100*e.height),t}function O(t,e){return"scrollParent"===e?e=t.scrollParents[0]:"window"===e&&(e=[pageXOffset,pageYOffset,innerWidth+pageXOffset,innerHeight+pageYOffset]),e===document&&(e=e.documentElement),"undefined"!=typeof e.nodeType&&!function(){var t=e,o=a(e),i=o,n=getComputedStyle(e);if(e=[i.left,i.top,o.width+i.left,o.height+i.top],t.ownerDocument!==document){var r=t.ownerDocument.defaultView;e[0]+=r.pageXOffset,e[1]+=r.pageYOffset,e[2]+=r.pageXOffset,e[3]+=r.pageYOffset}G.forEach(function(t,o){t=t[0].toUpperCase()+t.substr(1),"Top"===t||"Left"===t?e[o]+=parseFloat(n["border"+t+"Width"]):e[o]-=parseFloat(n["border"+t+"Width"])})}(),e}var E=function(){function t(t,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,o,i){return o&&t(e.prototype,o),i&&t(e,i),e}}(),x=void 0;"undefined"==typeof x&&(x={modules:[]});var A=null,T=function(){var t=0;return function(){return++t}}(),S={},P=function(){var t=A;t&&document.body.contains(t)||(t=document.createElement("div"),t.setAttribute("data-tether-id",T()),h(t.style,{top:0,left:0,position:"absolute"}),document.body.appendChild(t),A=t);var e=t.getAttribute("data-tether-id");return"undefined"==typeof S[e]&&(S[e]=n(t),k(function(){delete S[e]})),S[e]},M=null,W=[],k=function(t){W.push(t)},_=function(){for(var t=void 0;t=W.pop();)t()},B=function(){function t(){i(this,t)}return E(t,[{key:"on",value:function(t,e,o){var i=!(arguments.length<=3||void 0===arguments[3])&&arguments[3];"undefined"==typeof this.bindings&&(this.bindings={}),"undefined"==typeof this.bindings[t]&&(this.bindings[t]=[]),this.bindings[t].push({handler:e,ctx:o,once:i})}},{key:"once",value:function(t,e,o){this.on(t,e,o,!0)}},{key:"off",value:function(t,e){if("undefined"!=typeof this.bindings&&"undefined"!=typeof this.bindings[t])if("undefined"==typeof e)delete this.bindings[t];else for(var o=0;o<this.bindings[t].length;)this.bindings[t][o].handler===e?this.bindings[t].splice(o,1):++o}},{key:"trigger",value:function(t){if("undefined"!=typeof this.bindings&&this.bindings[t]){for(var e=0,o=arguments.length,i=Array(o>1?o-1:0),n=1;n<o;n++)i[n-1]=arguments[n];for(;e<this.bindings[t].length;){var r=this.bindings[t][e],s=r.handler,a=r.ctx,f=r.once,l=a;"undefined"==typeof l&&(l=this),s.apply(l,i),f?this.bindings[t].splice(e,1):++e}}}}]),t}();x.Utils={getActualBoundingClientRect:n,getScrollParents:r,getBounds:a,getOffsetParent:f,extend:h,addClass:p,removeClass:d,hasClass:u,updateClasses:m,defer:k,flush:_,uniqueId:T,Evented:B,getScrollBarSize:l,removeUtilElements:s};var z=function(){function t(t,e){var o=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);i=!0);}catch(f){n=!0,r=f}finally{try{!i&&a["return"]&&a["return"]()}finally{if(n)throw r}}return o}return function(e,o){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,o);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),E=function(){function t(t,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,o,i){return o&&t(e.prototype,o),i&&t(e,i),e}}(),j=function(t,e,o){for(var i=!0;i;){var n=t,r=e,s=o;i=!1,null===n&&(n=Function.prototype);var a=Object.getOwnPropertyDescriptor(n,r);if(void 0!==a){if("value"in a)return a.value;var f=a.get;if(void 0===f)return;return f.call(s)}var l=Object.getPrototypeOf(n);if(null===l)return;t=l,e=r,o=s,i=!0,a=l=void 0}};if("undefined"==typeof x)throw new Error("You must include the utils.js file before tether.js");var Y=x.Utils,r=Y.getScrollParents,a=Y.getBounds,f=Y.getOffsetParent,h=Y.extend,p=Y.addClass,d=Y.removeClass,m=Y.updateClasses,k=Y.defer,_=Y.flush,l=Y.getScrollBarSize,s=Y.removeUtilElements,L=function(){if("undefined"==typeof document)return"";for(var t=document.createElement("div"),e=["transform","WebkitTransform","OTransform","MozTransform","msTransform"],o=0;o<e.length;++o){var i=e[o];if(void 0!==t.style[i])return i}}(),D=[],X=function(){D.forEach(function(t){t.position(!1)}),_()};!function(){var t=null,e=null,o=null,i=function n(){return"undefined"!=typeof e&&e>16?(e=Math.min(e-16,250),void(o=setTimeout(n,250))):void("undefined"!=typeof t&&b()-t<10||(null!=o&&(clearTimeout(o),o=null),t=b(),X(),e=b()-t))};"undefined"!=typeof window&&"undefined"!=typeof window.addEventListener&&["resize","scroll","touchmove"].forEach(function(t){window.addEventListener(t,i)})}();var F={center:"center",left:"right",right:"left"},H={middle:"middle",top:"bottom",bottom:"top"},N={top:0,left:0,middle:"50%",center:"50%",bottom:"100%",right:"100%"},U=function(t,e){var o=t.left,i=t.top;return"auto"===o&&(o=F[e.left]),"auto"===i&&(i=H[e.top]),{left:o,top:i}},V=function(t){var e=t.left,o=t.top;return"undefined"!=typeof N[t.left]&&(e=N[t.left]),"undefined"!=typeof N[t.top]&&(o=N[t.top]),{left:e,top:o}},R=function(t){var e=t.split(" "),o=z(e,2),i=o[0],n=o[1];return{top:i,left:n}},q=R,I=function(t){function e(t){var o=this;i(this,e),j(Object.getPrototypeOf(e.prototype),"constructor",this).call(this),this.position=this.position.bind(this),D.push(this),this.history=[],this.setOptions(t,!1),x.modules.forEach(function(t){"undefined"!=typeof t.initialize&&t.initialize.call(o)}),this.position()}return v(e,t),E(e,[{key:"getClass",value:function(){var t=arguments.length<=0||void 0===arguments[0]?"":arguments[0],e=this.options.classes;return"undefined"!=typeof e&&e[t]?this.options.classes[t]:this.options.classPrefix?this.options.classPrefix+"-"+t:t}},{key:"setOptions",value:function(t){var e=this,o=arguments.length<=1||void 0===arguments[1]||arguments[1],i={offset:"0 0",targetOffset:"0 0",targetAttachment:"auto auto",classPrefix:"tether"};this.options=h(i,t);var n=this.options,s=n.element,a=n.target,f=n.targetModifier;if(this.element=s,this.target=a,this.targetModifier=f,"viewport"===this.target?(this.target=document.body,this.targetModifier="visible"):"scroll-handle"===this.target&&(this.target=document.body,this.targetModifier="scroll-handle"),["element","target"].forEach(function(t){if("undefined"==typeof e[t])throw new Error("Tether Error: Both element and target must be defined");"undefined"!=typeof e[t].jquery?e[t]=e[t][0]:"string"==typeof e[t]&&(e[t]=document.querySelector(e[t]))}),p(this.element,this.getClass("element")),this.options.addTargetClasses!==!1&&p(this.target,this.getClass("target")),!this.options.attachment)throw new Error("Tether Error: You must provide an attachment");this.targetAttachment=q(this.options.targetAttachment),this.attachment=q(this.options.attachment),this.offset=R(this.options.offset),this.targetOffset=R(this.options.targetOffset),"undefined"!=typeof this.scrollParents&&this.disable(),"scroll-handle"===this.targetModifier?this.scrollParents=[this.target]:this.scrollParents=r(this.target),this.options.enabled!==!1&&this.enable(o)}},{key:"getTargetBounds",value:function(){if("undefined"==typeof this.targetModifier)return a(this.target);if("visible"===this.targetModifier){if(this.target===document.body)return{top:pageYOffset,left:pageXOffset,height:innerHeight,width:innerWidth};var t=a(this.target),e={height:t.height,width:t.width,top:t.top,left:t.left};return e.height=Math.min(e.height,t.height-(pageYOffset-t.top)),e.height=Math.min(e.height,t.height-(t.top+t.height-(pageYOffset+innerHeight))),e.height=Math.min(innerHeight,e.height),e.height-=2,e.width=Math.min(e.width,t.width-(pageXOffset-t.left)),e.width=Math.min(e.width,t.width-(t.left+t.width-(pageXOffset+innerWidth))),e.width=Math.min(innerWidth,e.width),e.width-=2,e.top<pageYOffset&&(e.top=pageYOffset),e.left<pageXOffset&&(e.left=pageXOffset),e}if("scroll-handle"===this.targetModifier){var t=void 0,o=this.target;o===document.body?(o=document.documentElement,t={left:pageXOffset,top:pageYOffset,height:innerHeight,width:innerWidth}):t=a(o);var i=getComputedStyle(o),n=o.scrollWidth>o.clientWidth||[i.overflow,i.overflowX].indexOf("scroll")>=0||this.target!==document.body,r=0;n&&(r=15);var s=t.height-parseFloat(i.borderTopWidth)-parseFloat(i.borderBottomWidth)-r,e={width:15,height:.975*s*(s/o.scrollHeight),left:t.left+t.width-parseFloat(i.borderLeftWidth)-15},f=0;s<408&&this.target===document.body&&(f=-11e-5*Math.pow(s,2)-.00727*s+22.58),this.target!==document.body&&(e.height=Math.max(e.height,24));var l=this.target.scrollTop/(o.scrollHeight-s);return e.top=l*(s-e.height-f)+t.top+parseFloat(i.borderTopWidth),this.target===document.body&&(e.height=Math.max(e.height,24)),e}}},{key:"clearCache",value:function(){this._cache={}}},{key:"cache",value:function(t,e){return"undefined"==typeof this._cache&&(this._cache={}),"undefined"==typeof this._cache[t]&&(this._cache[t]=e.call(this)),this._cache[t]}},{key:"enable",value:function(){var t=this,e=arguments.length<=0||void 0===arguments[0]||arguments[0];this.options.addTargetClasses!==!1&&p(this.target,this.getClass("enabled")),p(this.element,this.getClass("enabled")),this.enabled=!0,this.scrollParents.forEach(function(e){e!==t.target.ownerDocument&&e.addEventListener("scroll",t.position)}),e&&this.position()}},{key:"disable",value:function(){var t=this;d(this.target,this.getClass("enabled")),d(this.element,this.getClass("enabled")),this.enabled=!1,"undefined"!=typeof this.scrollParents&&this.scrollParents.forEach(function(e){e.removeEventListener("scroll",t.position)})}},{key:"destroy",value:function(){var t=this;this.disable(),D.forEach(function(e,o){e===t&&D.splice(o,1)}),0===D.length&&s()}},{key:"updateAttachClasses",value:function(t,e){var o=this;t=t||this.attachment,e=e||this.targetAttachment;var i=["left","top","bottom","right","middle","center"];"undefined"!=typeof this._addAttachClasses&&this._addAttachClasses.length&&this._addAttachClasses.splice(0,this._addAttachClasses.length),"undefined"==typeof this._addAttachClasses&&(this._addAttachClasses=[]);var n=this._addAttachClasses;t.top&&n.push(this.getClass("element-attached")+"-"+t.top),t.left&&n.push(this.getClass("element-attached")+"-"+t.left),e.top&&n.push(this.getClass("target-attached")+"-"+e.top),e.left&&n.push(this.getClass("target-attached")+"-"+e.left);var r=[];i.forEach(function(t){r.push(o.getClass("element-attached")+"-"+t),r.push(o.getClass("target-attached")+"-"+t)}),k(function(){"undefined"!=typeof o._addAttachClasses&&(m(o.element,o._addAttachClasses,r),o.options.addTargetClasses!==!1&&m(o.target,o._addAttachClasses,r),delete o._addAttachClasses)})}},{key:"position",value:function(){var t=this,e=arguments.length<=0||void 0===arguments[0]||arguments[0];if(this.enabled){this.clearCache();var o=U(this.targetAttachment,this.attachment);this.updateAttachClasses(this.attachment,o);var i=this.cache("element-bounds",function(){return a(t.element)}),n=i.width,r=i.height;if(0===n&&0===r&&"undefined"!=typeof this.lastSize){var s=this.lastSize;n=s.width,r=s.height}else this.lastSize={width:n,height:r};var h=this.cache("target-bounds",function(){return t.getTargetBounds()}),d=h,p=C(V(this.attachment),{width:n,height:r}),u=C(V(o),d),c=C(this.offset,{width:n,height:r}),g=C(this.targetOffset,d);p=w(p,c),u=w(u,g);for(var m=h.left+u.left-p.left,v=h.top+u.top-p.top,y=0;y<x.modules.length;++y){var b=x.modules[y],O=b.position.call(this,{left:m,top:v,targetAttachment:o,targetPos:h,elementPos:i,offset:p,targetOffset:u,manualOffset:c,manualTargetOffset:g,scrollbarSize:S,attachment:this.attachment});if(O===!1)return!1;"undefined"!=typeof O&&"object"==typeof O&&(v=O.top,m=O.left)}var E={page:{top:v,left:m},viewport:{top:v-pageYOffset,bottom:pageYOffset-v-r+innerHeight,left:m-pageXOffset,right:pageXOffset-m-n+innerWidth}},A=this.target.ownerDocument,T=A.defaultView,S=void 0;return T.innerHeight>A.documentElement.clientHeight&&(S=this.cache("scrollbar-size",l),E.viewport.bottom-=S.height),T.innerWidth>A.documentElement.clientWidth&&(S=this.cache("scrollbar-size",l),E.viewport.right-=S.width),["","static"].indexOf(A.body.style.position)!==-1&&["","static"].indexOf(A.body.parentElement.style.position)!==-1||(E.page.bottom=A.body.scrollHeight-v-r,E.page.right=A.body.scrollWidth-m-n),"undefined"!=typeof this.options.optimizations&&this.options.optimizations.moveElement!==!1&&"undefined"==typeof this.targetModifier&&!function(){var e=t.cache("target-offsetparent",function(){return f(t.target)}),o=t.cache("target-offsetparent-bounds",function(){return a(e)}),i=getComputedStyle(e),n=o,r={};if(["Top","Left","Bottom","Right"].forEach(function(t){r[t.toLowerCase()]=parseFloat(i["border"+t+"Width"])}),o.right=A.body.scrollWidth-o.left-n.width+r.right,o.bottom=A.body.scrollHeight-o.top-n.height+r.bottom,E.page.top>=o.top+r.top&&E.page.bottom>=o.bottom&&E.page.left>=o.left+r.left&&E.page.right>=o.right){var s=e.scrollTop,l=e.scrollLeft;E.offset={top:E.page.top-o.top+s-r.top,left:E.page.left-o.left+l-r.left}}}(),this.move(E),this.history.unshift(E),this.history.length>3&&this.history.pop(),e&&_(),!0}}},{key:"move",value:function(t){var e=this;if("undefined"!=typeof this.element.parentNode){var o={};for(var i in t){o[i]={};for(var n in t[i]){for(var r=!1,s=0;s<this.history.length;++s){var a=this.history[s];if("undefined"!=typeof a[i]&&!y(a[i][n],t[i][n])){r=!0;break}}r||(o[i][n]=!0)}}var l={top:"",left:"",right:"",bottom:""},d=function(t,o){var i="undefined"!=typeof e.options.optimizations,n=i?e.options.optimizations.gpu:null;if(n!==!1){var r=void 0,s=void 0;if(t.top?(l.top=0,r=o.top):(l.bottom=0,r=-o.bottom),t.left?(l.left=0,s=o.left):(l.right=0,s=-o.right),window.matchMedia){var a=window.matchMedia("only screen and (min-resolution: 1.3dppx)").matches||window.matchMedia("only screen and (-webkit-min-device-pixel-ratio: 1.3)").matches;a||(s=Math.round(s),r=Math.round(r))}l[L]="translateX("+s+"px) translateY("+r+"px)","msTransform"!==L&&(l[L]+=" translateZ(0)")}else t.top?l.top=o.top+"px":l.bottom=o.bottom+"px",t.left?l.left=o.left+"px":l.right=o.right+"px"},p=!1;if((o.page.top||o.page.bottom)&&(o.page.left||o.page.right)?(l.position="absolute",d(o.page,t.page)):(o.viewport.top||o.viewport.bottom)&&(o.viewport.left||o.viewport.right)?(l.position="fixed",d(o.viewport,t.viewport)):"undefined"!=typeof o.offset&&o.offset.top&&o.offset.left?!function(){l.position="absolute";var i=e.cache("target-offsetparent",function(){return f(e.target)});f(e.element)!==i&&k(function(){e.element.parentNode.removeChild(e.element),i.appendChild(e.element)}),d(o.offset,t.offset),p=!0}():(l.position="absolute",d({top:!0,left:!0},t.page)),!p)if(this.options.bodyElement)this.options.bodyElement.appendChild(this.element);else{for(var u=!0,c=this.element.parentNode;c&&1===c.nodeType&&"BODY"!==c.tagName;){if("static"!==getComputedStyle(c).position){u=!1;break}c=c.parentNode}u||(this.element.parentNode.removeChild(this.element),this.element.ownerDocument.body.appendChild(this.element))}var g={},m=!1;for(var n in l){var v=l[n],b=this.element.style[n];b!==v&&(m=!0,g[n]=v)}m&&k(function(){h(e.element.style,g),e.trigger("repositioned")})}}}]),e}(B);I.modules=[],x.position=X;var $=h(I,x),z=function(){function t(t,e){var o=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);i=!0);}catch(f){n=!0,r=f}finally{try{!i&&a["return"]&&a["return"]()}finally{if(n)throw r}}return o}return function(e,o){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,o);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),Y=x.Utils,a=Y.getBounds,h=Y.extend,m=Y.updateClasses,k=Y.defer,G=["left","top","right","bottom"];x.modules.push({position:function(t){var e=this,o=t.top,i=t.left,n=t.targetAttachment;if(!this.options.constraints)return!0;var r=this.cache("element-bounds",function(){return a(e.element)}),s=r.height,f=r.width;if(0===f&&0===s&&"undefined"!=typeof this.lastSize){var l=this.lastSize;f=l.width,s=l.height}var d=this.cache("target-bounds",function(){return e.getTargetBounds()}),p=d.height,u=d.width,c=[this.getClass("pinned"),this.getClass("out-of-bounds")];this.options.constraints.forEach(function(t){var e=t.outOfBoundsClass,o=t.pinnedClass;e&&c.push(e),o&&c.push(o)}),c.forEach(function(t){["left","top","right","bottom"].forEach(function(e){c.push(t+"-"+e)})});var g=[],v=h({},n),y=h({},this.attachment);return this.options.constraints.forEach(function(t){var r=t.to,a=t.attachment,l=t.pin;"undefined"==typeof a&&(a="");var h=void 0,d=void 0;if(a.indexOf(" ")>=0){var c=a.split(" "),m=z(c,2);d=m[0],h=m[1]}else h=d=a;var b=O(e,r);"target"!==d&&"both"!==d||(o<b[1]&&"top"===v.top&&(o+=p,v.top="bottom"),o+s>b[3]&&"bottom"===v.top&&(o-=p,v.top="top")),"together"===d&&("top"===v.top&&("bottom"===y.top&&o<b[1]?(o+=p,v.top="bottom",o+=s,y.top="top"):"top"===y.top&&o+s>b[3]&&o-(s-p)>=b[1]&&(o-=s-p,v.top="bottom",y.top="bottom")),"bottom"===v.top&&("top"===y.top&&o+s>b[3]?(o-=p,v.top="top",o-=s,y.top="bottom"):"bottom"===y.top&&o<b[1]&&o+(2*s-p)<=b[3]&&(o+=s-p,v.top="top",y.top="top")),"middle"===v.top&&(o+s>b[3]&&"top"===y.top?(o-=s,y.top="bottom"):o<b[1]&&"bottom"===y.top&&(o+=s,y.top="top"))),"target"!==h&&"both"!==h||(i<b[0]&&"left"===v.left&&(i+=u,v.left="right"),i+f>b[2]&&"right"===v.left&&(i-=u,v.left="left")),"together"===h&&(i<b[0]&&"left"===v.left?"right"===y.left?(i+=u,v.left="right",i+=f,y.left="left"):"left"===y.left&&(i+=u,v.left="right",i-=f,y.left="right"):i+f>b[2]&&"right"===v.left?"left"===y.left?(i-=u,v.left="left",i-=f,y.left="right"):"right"===y.left&&(i-=u,v.left="left",i+=f,y.left="left"):"center"===v.left&&(i+f>b[2]&&"left"===y.left?(i-=f,y.left="right"):i<b[0]&&"right"===y.left&&(i+=f,y.left="left"))),"element"!==d&&"both"!==d||(o<b[1]&&"bottom"===y.top&&(o+=s,y.top="top"),o+s>b[3]&&"top"===y.top&&(o-=s,y.top="bottom")),"element"!==h&&"both"!==h||(i<b[0]&&("right"===y.left?(i+=f,y.left="left"):"center"===y.left&&(i+=f/2,y.left="left")),i+f>b[2]&&("left"===y.left?(i-=f,y.left="right"):"center"===y.left&&(i-=f/2,y.left="right"))),"string"==typeof l?l=l.split(",").map(function(t){return t.trim()}):l===!0&&(l=["top","left","right","bottom"]),l=l||[];var w=[],C=[];o<b[1]&&(l.indexOf("top")>=0?(o=b[1],w.push("top")):C.push("top")),o+s>b[3]&&(l.indexOf("bottom")>=0?(o=b[3]-s,w.push("bottom")):C.push("bottom")),i<b[0]&&(l.indexOf("left")>=0?(i=b[0],w.push("left")):C.push("left")),i+f>b[2]&&(l.indexOf("right")>=0?(i=b[2]-f,w.push("right")):C.push("right")),w.length&&!function(){var t=void 0;t="undefined"!=typeof e.options.pinnedClass?e.options.pinnedClass:e.getClass("pinned"),g.push(t),w.forEach(function(e){g.push(t+"-"+e)})}(),C.length&&!function(){var t=void 0;t="undefined"!=typeof e.options.outOfBoundsClass?e.options.outOfBoundsClass:e.getClass("out-of-bounds"),g.push(t),C.forEach(function(e){g.push(t+"-"+e)})}(),(w.indexOf("left")>=0||w.indexOf("right")>=0)&&(y.left=v.left=!1),(w.indexOf("top")>=0||w.indexOf("bottom")>=0)&&(y.top=v.top=!1),v.top===n.top&&v.left===n.left&&y.top===e.attachment.top&&y.left===e.attachment.left||(e.updateAttachClasses(y,v),e.trigger("update",{attachment:y,targetAttachment:v}))}),k(function(){e.options.addTargetClasses!==!1&&m(e.target,g,c),m(e.element,g,c)}),{top:o,left:i}}});var Y=x.Utils,a=Y.getBounds,m=Y.updateClasses,k=Y.defer;x.modules.push({position:function(t){var e=this,o=t.top,i=t.left,n=this.cache("element-bounds",function(){return a(e.element)}),r=n.height,s=n.width,f=this.getTargetBounds(),l=o+r,h=i+s,d=[];o<=f.bottom&&l>=f.top&&["left","right"].forEach(function(t){var e=f[t];e!==i&&e!==h||d.push(t)}),i<=f.right&&h>=f.left&&["top","bottom"].forEach(function(t){var e=f[t];e!==o&&e!==l||d.push(t)});var p=[],u=[],c=["left","top","right","bottom"];return p.push(this.getClass("abutted")),c.forEach(function(t){p.push(e.getClass("abutted")+"-"+t)}),d.length&&u.push(this.getClass("abutted")),d.forEach(function(t){u.push(e.getClass("abutted")+"-"+t)}),k(function(){e.options.addTargetClasses!==!1&&m(e.target,u,p),m(e.element,u,p)}),!0}});var z=function(){function t(t,e){var o=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);i=!0);}catch(f){n=!0,r=f}finally{try{!i&&a["return"]&&a["return"]()}finally{if(n)throw r}}return o}return function(e,o){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,o);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();return x.modules.push({position:function(t){var e=t.top,o=t.left;if(this.options.shift){var i=this.options.shift;"function"==typeof this.options.shift&&(i=this.options.shift.call(this,{top:e,left:o}));var n=void 0,r=void 0;if("string"==typeof i){i=i.split(" "),i[1]=i[1]||i[0];var s=i,a=z(s,2);n=a[0],r=a[1],n=parseFloat(n,10),r=parseFloat(r,10)}else n=i.top,r=i.left;return e+=n,o+=r,{top:e,left:o}}}}),$});;
/*!
 * Bootstrap v4.0.0-alpha.6 (https://getbootstrap.com)
 * Copyright 2011-2017 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");+function(t){var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1||e[0]>=4)throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}(jQuery),+function(){function t(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function e(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=function(t){function e(t){return{}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function n(t){return(t[0]||t).nodeType}function i(){return{bindType:a.end,delegateType:a.end,handle:function(e){if(t(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}}function o(){if(window.QUnit)return!1;var t=document.createElement("bootstrap");for(var e in h)if(void 0!==t.style[e])return{end:h[e]};return!1}function r(e){var n=this,i=!1;return t(this).one(c.TRANSITION_END,function(){i=!0}),setTimeout(function(){i||c.triggerTransitionEnd(n)},e),this}function s(){a=o(),t.fn.emulateTransitionEnd=r,c.supportsTransitionEnd()&&(t.event.special[c.TRANSITION_END]=i())}var a=!1,l=1e6,h={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},c={TRANSITION_END:"bsTransitionEnd",getUID:function(t){do t+=~~(Math.random()*l);while(document.getElementById(t));return t},getSelectorFromElement:function(t){var e=t.getAttribute("data-target");return e||(e=t.getAttribute("href")||"",e=/^#[a-z]/i.test(e)?e:null),e},reflow:function(t){return t.offsetHeight},triggerTransitionEnd:function(e){t(e).trigger(a.end)},supportsTransitionEnd:function(){return Boolean(a)},typeCheckConfig:function(t,i,o){for(var r in o)if(o.hasOwnProperty(r)){var s=o[r],a=i[r],l=a&&n(a)?"element":e(a);if(!new RegExp(s).test(l))throw new Error(t.toUpperCase()+": "+('Option "'+r+'" provided type "'+l+'" ')+('but expected type "'+s+'".'))}}};return s(),c}(jQuery),s=(function(t){var e="alert",i="4.0.0-alpha.6",s="bs.alert",a="."+s,l=".data-api",h=t.fn[e],c=150,u={DISMISS:'[data-dismiss="alert"]'},d={CLOSE:"close"+a,CLOSED:"closed"+a,CLICK_DATA_API:"click"+a+l},f={ALERT:"alert",FADE:"fade",SHOW:"show"},_=function(){function e(t){n(this,e),this._element=t}return e.prototype.close=function(t){t=t||this._element;var e=this._getRootElement(t),n=this._triggerCloseEvent(e);n.isDefaultPrevented()||this._removeElement(e)},e.prototype.dispose=function(){t.removeData(this._element,s),this._element=null},e.prototype._getRootElement=function(e){var n=r.getSelectorFromElement(e),i=!1;return n&&(i=t(n)[0]),i||(i=t(e).closest("."+f.ALERT)[0]),i},e.prototype._triggerCloseEvent=function(e){var n=t.Event(d.CLOSE);return t(e).trigger(n),n},e.prototype._removeElement=function(e){var n=this;return t(e).removeClass(f.SHOW),r.supportsTransitionEnd()&&t(e).hasClass(f.FADE)?void t(e).one(r.TRANSITION_END,function(t){return n._destroyElement(e,t)}).emulateTransitionEnd(c):void this._destroyElement(e)},e.prototype._destroyElement=function(e){t(e).detach().trigger(d.CLOSED).remove()},e._jQueryInterface=function(n){return this.each(function(){var i=t(this),o=i.data(s);o||(o=new e(this),i.data(s,o)),"close"===n&&o[n](this)})},e._handleDismiss=function(t){return function(e){e&&e.preventDefault(),t.close(this)}},o(e,null,[{key:"VERSION",get:function(){return i}}]),e}();return t(document).on(d.CLICK_DATA_API,u.DISMISS,_._handleDismiss(new _)),t.fn[e]=_._jQueryInterface,t.fn[e].Constructor=_,t.fn[e].noConflict=function(){return t.fn[e]=h,_._jQueryInterface},_}(jQuery),function(t){var e="button",i="4.0.0-alpha.6",r="bs.button",s="."+r,a=".data-api",l=t.fn[e],h={ACTIVE:"active",BUTTON:"btn",FOCUS:"focus"},c={DATA_TOGGLE_CARROT:'[data-toggle^="button"]',DATA_TOGGLE:'[data-toggle="buttons"]',INPUT:"input",ACTIVE:".active",BUTTON:".btn"},u={CLICK_DATA_API:"click"+s+a,FOCUS_BLUR_DATA_API:"focus"+s+a+" "+("blur"+s+a)},d=function(){function e(t){n(this,e),this._element=t}return e.prototype.toggle=function(){var e=!0,n=t(this._element).closest(c.DATA_TOGGLE)[0];if(n){var i=t(this._element).find(c.INPUT)[0];if(i){if("radio"===i.type)if(i.checked&&t(this._element).hasClass(h.ACTIVE))e=!1;else{var o=t(n).find(c.ACTIVE)[0];o&&t(o).removeClass(h.ACTIVE)}e&&(i.checked=!t(this._element).hasClass(h.ACTIVE),t(i).trigger("change")),i.focus()}}this._element.setAttribute("aria-pressed",!t(this._element).hasClass(h.ACTIVE)),e&&t(this._element).toggleClass(h.ACTIVE)},e.prototype.dispose=function(){t.removeData(this._element,r),this._element=null},e._jQueryInterface=function(n){return this.each(function(){var i=t(this).data(r);i||(i=new e(this),t(this).data(r,i)),"toggle"===n&&i[n]()})},o(e,null,[{key:"VERSION",get:function(){return i}}]),e}();return t(document).on(u.CLICK_DATA_API,c.DATA_TOGGLE_CARROT,function(e){e.preventDefault();var n=e.target;t(n).hasClass(h.BUTTON)||(n=t(n).closest(c.BUTTON)),d._jQueryInterface.call(t(n),"toggle")}).on(u.FOCUS_BLUR_DATA_API,c.DATA_TOGGLE_CARROT,function(e){var n=t(e.target).closest(c.BUTTON)[0];t(n).toggleClass(h.FOCUS,/^focus(in)?$/.test(e.type))}),t.fn[e]=d._jQueryInterface,t.fn[e].Constructor=d,t.fn[e].noConflict=function(){return t.fn[e]=l,d._jQueryInterface},d}(jQuery),function(t){var e="carousel",s="4.0.0-alpha.6",a="bs.carousel",l="."+a,h=".data-api",c=t.fn[e],u=600,d=37,f=39,_={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0},g={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean"},p={NEXT:"next",PREV:"prev",LEFT:"left",RIGHT:"right"},m={SLIDE:"slide"+l,SLID:"slid"+l,KEYDOWN:"keydown"+l,MOUSEENTER:"mouseenter"+l,MOUSELEAVE:"mouseleave"+l,LOAD_DATA_API:"load"+l+h,CLICK_DATA_API:"click"+l+h},E={CAROUSEL:"carousel",ACTIVE:"active",SLIDE:"slide",RIGHT:"carousel-item-right",LEFT:"carousel-item-left",NEXT:"carousel-item-next",PREV:"carousel-item-prev",ITEM:"carousel-item"},v={ACTIVE:".active",ACTIVE_ITEM:".active.carousel-item",ITEM:".carousel-item",NEXT_PREV:".carousel-item-next, .carousel-item-prev",INDICATORS:".carousel-indicators",DATA_SLIDE:"[data-slide], [data-slide-to]",DATA_RIDE:'[data-ride="carousel"]'},T=function(){function h(e,i){n(this,h),this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this._config=this._getConfig(i),this._element=t(e)[0],this._indicatorsElement=t(this._element).find(v.INDICATORS)[0],this._addEventListeners()}return h.prototype.next=function(){if(this._isSliding)throw new Error("Carousel is sliding");this._slide(p.NEXT)},h.prototype.nextWhenVisible=function(){document.hidden||this.next()},h.prototype.prev=function(){if(this._isSliding)throw new Error("Carousel is sliding");this._slide(p.PREVIOUS)},h.prototype.pause=function(e){e||(this._isPaused=!0),t(this._element).find(v.NEXT_PREV)[0]&&r.supportsTransitionEnd()&&(r.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},h.prototype.cycle=function(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},h.prototype.to=function(e){var n=this;this._activeElement=t(this._element).find(v.ACTIVE_ITEM)[0];var i=this._getItemIndex(this._activeElement);if(!(e>this._items.length-1||e<0)){if(this._isSliding)return void t(this._element).one(m.SLID,function(){return n.to(e)});if(i===e)return this.pause(),void this.cycle();var o=e>i?p.NEXT:p.PREVIOUS;this._slide(o,this._items[e])}},h.prototype.dispose=function(){t(this._element).off(l),t.removeData(this._element,a),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},h.prototype._getConfig=function(n){return n=t.extend({},_,n),r.typeCheckConfig(e,n,g),n},h.prototype._addEventListeners=function(){var e=this;this._config.keyboard&&t(this._element).on(m.KEYDOWN,function(t){return e._keydown(t)}),"hover"!==this._config.pause||"ontouchstart"in document.documentElement||t(this._element).on(m.MOUSEENTER,function(t){return e.pause(t)}).on(m.MOUSELEAVE,function(t){return e.cycle(t)})},h.prototype._keydown=function(t){if(!/input|textarea/i.test(t.target.tagName))switch(t.which){case d:t.preventDefault(),this.prev();break;case f:t.preventDefault(),this.next();break;default:return}},h.prototype._getItemIndex=function(e){return this._items=t.makeArray(t(e).parent().find(v.ITEM)),this._items.indexOf(e)},h.prototype._getItemByDirection=function(t,e){var n=t===p.NEXT,i=t===p.PREVIOUS,o=this._getItemIndex(e),r=this._items.length-1,s=i&&0===o||n&&o===r;if(s&&!this._config.wrap)return e;var a=t===p.PREVIOUS?-1:1,l=(o+a)%this._items.length;return l===-1?this._items[this._items.length-1]:this._items[l]},h.prototype._triggerSlideEvent=function(e,n){var i=t.Event(m.SLIDE,{relatedTarget:e,direction:n});return t(this._element).trigger(i),i},h.prototype._setActiveIndicatorElement=function(e){if(this._indicatorsElement){t(this._indicatorsElement).find(v.ACTIVE).removeClass(E.ACTIVE);var n=this._indicatorsElement.children[this._getItemIndex(e)];n&&t(n).addClass(E.ACTIVE)}},h.prototype._slide=function(e,n){var i=this,o=t(this._element).find(v.ACTIVE_ITEM)[0],s=n||o&&this._getItemByDirection(e,o),a=Boolean(this._interval),l=void 0,h=void 0,c=void 0;if(e===p.NEXT?(l=E.LEFT,h=E.NEXT,c=p.LEFT):(l=E.RIGHT,h=E.PREV,c=p.RIGHT),s&&t(s).hasClass(E.ACTIVE))return void(this._isSliding=!1);var d=this._triggerSlideEvent(s,c);if(!d.isDefaultPrevented()&&o&&s){this._isSliding=!0,a&&this.pause(),this._setActiveIndicatorElement(s);var f=t.Event(m.SLID,{relatedTarget:s,direction:c});r.supportsTransitionEnd()&&t(this._element).hasClass(E.SLIDE)?(t(s).addClass(h),r.reflow(s),t(o).addClass(l),t(s).addClass(l),t(o).one(r.TRANSITION_END,function(){t(s).removeClass(l+" "+h).addClass(E.ACTIVE),t(o).removeClass(E.ACTIVE+" "+h+" "+l),i._isSliding=!1,setTimeout(function(){return t(i._element).trigger(f)},0)}).emulateTransitionEnd(u)):(t(o).removeClass(E.ACTIVE),t(s).addClass(E.ACTIVE),this._isSliding=!1,t(this._element).trigger(f)),a&&this.cycle()}},h._jQueryInterface=function(e){return this.each(function(){var n=t(this).data(a),o=t.extend({},_,t(this).data());"object"===("undefined"==typeof e?"undefined":i(e))&&t.extend(o,e);var r="string"==typeof e?e:o.slide;if(n||(n=new h(this,o),t(this).data(a,n)),"number"==typeof e)n.to(e);else if("string"==typeof r){if(void 0===n[r])throw new Error('No method named "'+r+'"');n[r]()}else o.interval&&(n.pause(),n.cycle())})},h._dataApiClickHandler=function(e){var n=r.getSelectorFromElement(this);if(n){var i=t(n)[0];if(i&&t(i).hasClass(E.CAROUSEL)){var o=t.extend({},t(i).data(),t(this).data()),s=this.getAttribute("data-slide-to");s&&(o.interval=!1),h._jQueryInterface.call(t(i),o),s&&t(i).data(a).to(s),e.preventDefault()}}},o(h,null,[{key:"VERSION",get:function(){return s}},{key:"Default",get:function(){return _}}]),h}();return t(document).on(m.CLICK_DATA_API,v.DATA_SLIDE,T._dataApiClickHandler),t(window).on(m.LOAD_DATA_API,function(){t(v.DATA_RIDE).each(function(){var e=t(this);T._jQueryInterface.call(e,e.data())})}),t.fn[e]=T._jQueryInterface,t.fn[e].Constructor=T,t.fn[e].noConflict=function(){return t.fn[e]=c,T._jQueryInterface},T}(jQuery),function(t){var e="collapse",s="4.0.0-alpha.6",a="bs.collapse",l="."+a,h=".data-api",c=t.fn[e],u=600,d={toggle:!0,parent:""},f={toggle:"boolean",parent:"string"},_={SHOW:"show"+l,SHOWN:"shown"+l,HIDE:"hide"+l,HIDDEN:"hidden"+l,CLICK_DATA_API:"click"+l+h},g={SHOW:"show",COLLAPSE:"collapse",COLLAPSING:"collapsing",COLLAPSED:"collapsed"},p={WIDTH:"width",HEIGHT:"height"},m={ACTIVES:".card > .show, .card > .collapsing",DATA_TOGGLE:'[data-toggle="collapse"]'},E=function(){function l(e,i){n(this,l),this._isTransitioning=!1,this._element=e,this._config=this._getConfig(i),this._triggerArray=t.makeArray(t('[data-toggle="collapse"][href="#'+e.id+'"],'+('[data-toggle="collapse"][data-target="#'+e.id+'"]'))),this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}return l.prototype.toggle=function(){t(this._element).hasClass(g.SHOW)?this.hide():this.show()},l.prototype.show=function(){var e=this;if(this._isTransitioning)throw new Error("Collapse is transitioning");if(!t(this._element).hasClass(g.SHOW)){var n=void 0,i=void 0;if(this._parent&&(n=t.makeArray(t(this._parent).find(m.ACTIVES)),n.length||(n=null)),!(n&&(i=t(n).data(a),i&&i._isTransitioning))){var o=t.Event(_.SHOW);if(t(this._element).trigger(o),!o.isDefaultPrevented()){n&&(l._jQueryInterface.call(t(n),"hide"),i||t(n).data(a,null));var s=this._getDimension();t(this._element).removeClass(g.COLLAPSE).addClass(g.COLLAPSING),this._element.style[s]=0,this._element.setAttribute("aria-expanded",!0),this._triggerArray.length&&t(this._triggerArray).removeClass(g.COLLAPSED).attr("aria-expanded",!0),this.setTransitioning(!0);var h=function(){t(e._element).removeClass(g.COLLAPSING).addClass(g.COLLAPSE).addClass(g.SHOW),e._element.style[s]="",e.setTransitioning(!1),t(e._element).trigger(_.SHOWN)};if(!r.supportsTransitionEnd())return void h();var c=s[0].toUpperCase()+s.slice(1),d="scroll"+c;t(this._element).one(r.TRANSITION_END,h).emulateTransitionEnd(u),this._element.style[s]=this._element[d]+"px"}}}},l.prototype.hide=function(){var e=this;if(this._isTransitioning)throw new Error("Collapse is transitioning");if(t(this._element).hasClass(g.SHOW)){var n=t.Event(_.HIDE);if(t(this._element).trigger(n),!n.isDefaultPrevented()){var i=this._getDimension(),o=i===p.WIDTH?"offsetWidth":"offsetHeight";this._element.style[i]=this._element[o]+"px",r.reflow(this._element),t(this._element).addClass(g.COLLAPSING).removeClass(g.COLLAPSE).removeClass(g.SHOW),this._element.setAttribute("aria-expanded",!1),this._triggerArray.length&&t(this._triggerArray).addClass(g.COLLAPSED).attr("aria-expanded",!1),this.setTransitioning(!0);var s=function(){e.setTransitioning(!1),t(e._element).removeClass(g.COLLAPSING).addClass(g.COLLAPSE).trigger(_.HIDDEN)};return this._element.style[i]="",r.supportsTransitionEnd()?void t(this._element).one(r.TRANSITION_END,s).emulateTransitionEnd(u):void s()}}},l.prototype.setTransitioning=function(t){this._isTransitioning=t},l.prototype.dispose=function(){t.removeData(this._element,a),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null},l.prototype._getConfig=function(n){return n=t.extend({},d,n),n.toggle=Boolean(n.toggle),r.typeCheckConfig(e,n,f),n},l.prototype._getDimension=function(){var e=t(this._element).hasClass(p.WIDTH);return e?p.WIDTH:p.HEIGHT},l.prototype._getParent=function(){var e=this,n=t(this._config.parent)[0],i='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]';return t(n).find(i).each(function(t,n){e._addAriaAndCollapsedClass(l._getTargetFromElement(n),[n])}),n},l.prototype._addAriaAndCollapsedClass=function(e,n){if(e){var i=t(e).hasClass(g.SHOW);e.setAttribute("aria-expanded",i),n.length&&t(n).toggleClass(g.COLLAPSED,!i).attr("aria-expanded",i)}},l._getTargetFromElement=function(e){var n=r.getSelectorFromElement(e);return n?t(n)[0]:null},l._jQueryInterface=function(e){return this.each(function(){var n=t(this),o=n.data(a),r=t.extend({},d,n.data(),"object"===("undefined"==typeof e?"undefined":i(e))&&e);if(!o&&r.toggle&&/show|hide/.test(e)&&(r.toggle=!1),o||(o=new l(this,r),n.data(a,o)),"string"==typeof e){if(void 0===o[e])throw new Error('No method named "'+e+'"');o[e]()}})},o(l,null,[{key:"VERSION",get:function(){return s}},{key:"Default",get:function(){return d}}]),l}();return t(document).on(_.CLICK_DATA_API,m.DATA_TOGGLE,function(e){e.preventDefault();var n=E._getTargetFromElement(this),i=t(n).data(a),o=i?"toggle":t(this).data();E._jQueryInterface.call(t(n),o)}),t.fn[e]=E._jQueryInterface,t.fn[e].Constructor=E,t.fn[e].noConflict=function(){return t.fn[e]=c,E._jQueryInterface},E}(jQuery),function(t){var e="dropdown",i="4.0.0-alpha.6",s="bs.dropdown",a="."+s,l=".data-api",h=t.fn[e],c=27,u=38,d=40,f=3,_={HIDE:"hide"+a,HIDDEN:"hidden"+a,SHOW:"show"+a,SHOWN:"shown"+a,CLICK:"click"+a,CLICK_DATA_API:"click"+a+l,FOCUSIN_DATA_API:"focusin"+a+l,KEYDOWN_DATA_API:"keydown"+a+l},g={BACKDROP:"dropdown-backdrop",DISABLED:"disabled",SHOW:"show"},p={BACKDROP:".dropdown-backdrop",DATA_TOGGLE:'[data-toggle="dropdown"]',FORM_CHILD:".dropdown form",ROLE_MENU:'[role="menu"]',ROLE_LISTBOX:'[role="listbox"]',NAVBAR_NAV:".navbar-nav",VISIBLE_ITEMS:'[role="menu"] li:not(.disabled) a, [role="listbox"] li:not(.disabled) a'},m=function(){function e(t){n(this,e),this._element=t,this._addEventListeners()}return e.prototype.toggle=function(){if(this.disabled||t(this).hasClass(g.DISABLED))return!1;var n=e._getParentFromElement(this),i=t(n).hasClass(g.SHOW);if(e._clearMenus(),i)return!1;if("ontouchstart"in document.documentElement&&!t(n).closest(p.NAVBAR_NAV).length){var o=document.createElement("div");o.className=g.BACKDROP,t(o).insertBefore(this),t(o).on("click",e._clearMenus)}var r={relatedTarget:this},s=t.Event(_.SHOW,r);return t(n).trigger(s),!s.isDefaultPrevented()&&(this.focus(),this.setAttribute("aria-expanded",!0),t(n).toggleClass(g.SHOW),t(n).trigger(t.Event(_.SHOWN,r)),!1)},e.prototype.dispose=function(){t.removeData(this._element,s),t(this._element).off(a),this._element=null},e.prototype._addEventListeners=function(){t(this._element).on(_.CLICK,this.toggle)},e._jQueryInterface=function(n){return this.each(function(){var i=t(this).data(s);if(i||(i=new e(this),t(this).data(s,i)),"string"==typeof n){if(void 0===i[n])throw new Error('No method named "'+n+'"');i[n].call(this)}})},e._clearMenus=function(n){if(!n||n.which!==f){var i=t(p.BACKDROP)[0];i&&i.parentNode.removeChild(i);for(var o=t.makeArray(t(p.DATA_TOGGLE)),r=0;r<o.length;r++){var s=e._getParentFromElement(o[r]),a={relatedTarget:o[r]};if(t(s).hasClass(g.SHOW)&&!(n&&("click"===n.type&&/input|textarea/i.test(n.target.tagName)||"focusin"===n.type)&&t.contains(s,n.target))){var l=t.Event(_.HIDE,a);t(s).trigger(l),l.isDefaultPrevented()||(o[r].setAttribute("aria-expanded","false"),t(s).removeClass(g.SHOW).trigger(t.Event(_.HIDDEN,a)))}}}},e._getParentFromElement=function(e){var n=void 0,i=r.getSelectorFromElement(e);return i&&(n=t(i)[0]),n||e.parentNode},e._dataApiKeydownHandler=function(n){if(/(38|40|27|32)/.test(n.which)&&!/input|textarea/i.test(n.target.tagName)&&(n.preventDefault(),n.stopPropagation(),!this.disabled&&!t(this).hasClass(g.DISABLED))){var i=e._getParentFromElement(this),o=t(i).hasClass(g.SHOW);if(!o&&n.which!==c||o&&n.which===c){if(n.which===c){var r=t(i).find(p.DATA_TOGGLE)[0];t(r).trigger("focus")}return void t(this).trigger("click")}var s=t(i).find(p.VISIBLE_ITEMS).get();if(s.length){var a=s.indexOf(n.target);n.which===u&&a>0&&a--,n.which===d&&a<s.length-1&&a++,a<0&&(a=0),s[a].focus()}}},o(e,null,[{key:"VERSION",get:function(){return i}}]),e}();return t(document).on(_.KEYDOWN_DATA_API,p.DATA_TOGGLE,m._dataApiKeydownHandler).on(_.KEYDOWN_DATA_API,p.ROLE_MENU,m._dataApiKeydownHandler).on(_.KEYDOWN_DATA_API,p.ROLE_LISTBOX,m._dataApiKeydownHandler).on(_.CLICK_DATA_API+" "+_.FOCUSIN_DATA_API,m._clearMenus).on(_.CLICK_DATA_API,p.DATA_TOGGLE,m.prototype.toggle).on(_.CLICK_DATA_API,p.FORM_CHILD,function(t){t.stopPropagation()}),t.fn[e]=m._jQueryInterface,t.fn[e].Constructor=m,t.fn[e].noConflict=function(){return t.fn[e]=h,m._jQueryInterface},m}(jQuery),function(t){var e="modal",s="4.0.0-alpha.6",a="bs.modal",l="."+a,h=".data-api",c=t.fn[e],u=300,d=150,f=27,_={backdrop:!0,keyboard:!0,focus:!0,show:!0},g={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},p={HIDE:"hide"+l,HIDDEN:"hidden"+l,SHOW:"show"+l,SHOWN:"shown"+l,FOCUSIN:"focusin"+l,RESIZE:"resize"+l,CLICK_DISMISS:"click.dismiss"+l,KEYDOWN_DISMISS:"keydown.dismiss"+l,MOUSEUP_DISMISS:"mouseup.dismiss"+l,MOUSEDOWN_DISMISS:"mousedown.dismiss"+l,CLICK_DATA_API:"click"+l+h},m={SCROLLBAR_MEASURER:"modal-scrollbar-measure",BACKDROP:"modal-backdrop",OPEN:"modal-open",FADE:"fade",SHOW:"show"},E={DIALOG:".modal-dialog",DATA_TOGGLE:'[data-toggle="modal"]',DATA_DISMISS:'[data-dismiss="modal"]',FIXED_CONTENT:".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"},v=function(){function h(e,i){n(this,h),this._config=this._getConfig(i),this._element=e,this._dialog=t(e).find(E.DIALOG)[0],this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._isTransitioning=!1,this._originalBodyPadding=0,this._scrollbarWidth=0}return h.prototype.toggle=function(t){return this._isShown?this.hide():this.show(t)},h.prototype.show=function(e){var n=this;if(this._isTransitioning)throw new Error("Modal is transitioning");r.supportsTransitionEnd()&&t(this._element).hasClass(m.FADE)&&(this._isTransitioning=!0);var i=t.Event(p.SHOW,{relatedTarget:e});t(this._element).trigger(i),this._isShown||i.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),t(document.body).addClass(m.OPEN),this._setEscapeEvent(),this._setResizeEvent(),t(this._element).on(p.CLICK_DISMISS,E.DATA_DISMISS,function(t){return n.hide(t)}),t(this._dialog).on(p.MOUSEDOWN_DISMISS,function(){t(n._element).one(p.MOUSEUP_DISMISS,function(e){t(e.target).is(n._element)&&(n._ignoreBackdropClick=!0)})}),this._showBackdrop(function(){return n._showElement(e)}))},h.prototype.hide=function(e){var n=this;if(e&&e.preventDefault(),this._isTransitioning)throw new Error("Modal is transitioning");var i=r.supportsTransitionEnd()&&t(this._element).hasClass(m.FADE);i&&(this._isTransitioning=!0);var o=t.Event(p.HIDE);t(this._element).trigger(o),this._isShown&&!o.isDefaultPrevented()&&(this._isShown=!1,this._setEscapeEvent(),this._setResizeEvent(),t(document).off(p.FOCUSIN),t(this._element).removeClass(m.SHOW),t(this._element).off(p.CLICK_DISMISS),t(this._dialog).off(p.MOUSEDOWN_DISMISS),i?t(this._element).one(r.TRANSITION_END,function(t){return n._hideModal(t)}).emulateTransitionEnd(u):this._hideModal())},h.prototype.dispose=function(){t.removeData(this._element,a),t(window,document,this._element,this._backdrop).off(l),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._originalBodyPadding=null,this._scrollbarWidth=null},h.prototype._getConfig=function(n){return n=t.extend({},_,n),r.typeCheckConfig(e,n,g),n},h.prototype._showElement=function(e){var n=this,i=r.supportsTransitionEnd()&&t(this._element).hasClass(m.FADE);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.scrollTop=0,i&&r.reflow(this._element),t(this._element).addClass(m.SHOW),this._config.focus&&this._enforceFocus();var o=t.Event(p.SHOWN,{relatedTarget:e}),s=function(){n._config.focus&&n._element.focus(),n._isTransitioning=!1,t(n._element).trigger(o)};i?t(this._dialog).one(r.TRANSITION_END,s).emulateTransitionEnd(u):s()},h.prototype._enforceFocus=function(){var e=this;t(document).off(p.FOCUSIN).on(p.FOCUSIN,function(n){document===n.target||e._element===n.target||t(e._element).has(n.target).length||e._element.focus()})},h.prototype._setEscapeEvent=function(){var e=this;this._isShown&&this._config.keyboard?t(this._element).on(p.KEYDOWN_DISMISS,function(t){t.which===f&&e.hide()}):this._isShown||t(this._element).off(p.KEYDOWN_DISMISS)},h.prototype._setResizeEvent=function(){var e=this;this._isShown?t(window).on(p.RESIZE,function(t){return e._handleUpdate(t)}):t(window).off(p.RESIZE)},h.prototype._hideModal=function(){var e=this;this._element.style.display="none",this._element.setAttribute("aria-hidden","true"),this._isTransitioning=!1,this._showBackdrop(function(){t(document.body).removeClass(m.OPEN),e._resetAdjustments(),e._resetScrollbar(),t(e._element).trigger(p.HIDDEN)})},h.prototype._removeBackdrop=function(){this._backdrop&&(t(this._backdrop).remove(),this._backdrop=null)},h.prototype._showBackdrop=function(e){var n=this,i=t(this._element).hasClass(m.FADE)?m.FADE:"";if(this._isShown&&this._config.backdrop){var o=r.supportsTransitionEnd()&&i;if(this._backdrop=document.createElement("div"),this._backdrop.className=m.BACKDROP,i&&t(this._backdrop).addClass(i),t(this._backdrop).appendTo(document.body),t(this._element).on(p.CLICK_DISMISS,function(t){return n._ignoreBackdropClick?void(n._ignoreBackdropClick=!1):void(t.target===t.currentTarget&&("static"===n._config.backdrop?n._element.focus():n.hide()))}),o&&r.reflow(this._backdrop),t(this._backdrop).addClass(m.SHOW),!e)return;if(!o)return void e();t(this._backdrop).one(r.TRANSITION_END,e).emulateTransitionEnd(d)}else if(!this._isShown&&this._backdrop){t(this._backdrop).removeClass(m.SHOW);var s=function(){n._removeBackdrop(),e&&e()};r.supportsTransitionEnd()&&t(this._element).hasClass(m.FADE)?t(this._backdrop).one(r.TRANSITION_END,s).emulateTransitionEnd(d):s()}else e&&e()},h.prototype._handleUpdate=function(){this._adjustDialog()},h.prototype._adjustDialog=function(){var t=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&t&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!t&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},h.prototype._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},h.prototype._checkScrollbar=function(){this._isBodyOverflowing=document.body.clientWidth<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},h.prototype._setScrollbar=function(){var e=parseInt(t(E.FIXED_CONTENT).css("padding-right")||0,10);this._originalBodyPadding=document.body.style.paddingRight||"",this._isBodyOverflowing&&(document.body.style.paddingRight=e+this._scrollbarWidth+"px")},h.prototype._resetScrollbar=function(){document.body.style.paddingRight=this._originalBodyPadding},h.prototype._getScrollbarWidth=function(){var t=document.createElement("div");t.className=m.SCROLLBAR_MEASURER,document.body.appendChild(t);var e=t.offsetWidth-t.clientWidth;return document.body.removeChild(t),e},h._jQueryInterface=function(e,n){return this.each(function(){var o=t(this).data(a),r=t.extend({},h.Default,t(this).data(),"object"===("undefined"==typeof e?"undefined":i(e))&&e);if(o||(o=new h(this,r),t(this).data(a,o)),"string"==typeof e){if(void 0===o[e])throw new Error('No method named "'+e+'"');o[e](n)}else r.show&&o.show(n)})},o(h,null,[{key:"VERSION",get:function(){return s}},{key:"Default",get:function(){return _}}]),h}();return t(document).on(p.CLICK_DATA_API,E.DATA_TOGGLE,function(e){var n=this,i=void 0,o=r.getSelectorFromElement(this);o&&(i=t(o)[0]);var s=t(i).data(a)?"toggle":t.extend({},t(i).data(),t(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||e.preventDefault();var l=t(i).one(p.SHOW,function(e){e.isDefaultPrevented()||l.one(p.HIDDEN,function(){t(n).is(":visible")&&n.focus()})});v._jQueryInterface.call(t(i),s,this)}),t.fn[e]=v._jQueryInterface,t.fn[e].Constructor=v,t.fn[e].noConflict=function(){return t.fn[e]=c,v._jQueryInterface},v}(jQuery),function(t){var e="scrollspy",s="4.0.0-alpha.6",a="bs.scrollspy",l="."+a,h=".data-api",c=t.fn[e],u={offset:10,method:"auto",target:""},d={offset:"number",method:"string",target:"(string|element)"},f={ACTIVATE:"activate"+l,SCROLL:"scroll"+l,LOAD_DATA_API:"load"+l+h},_={DROPDOWN_ITEM:"dropdown-item",DROPDOWN_MENU:"dropdown-menu",NAV_LINK:"nav-link",NAV:"nav",ACTIVE:"active"},g={DATA_SPY:'[data-spy="scroll"]',ACTIVE:".active",LIST_ITEM:".list-item",LI:"li",LI_DROPDOWN:"li.dropdown",NAV_LINKS:".nav-link",DROPDOWN:".dropdown",DROPDOWN_ITEMS:".dropdown-item",DROPDOWN_TOGGLE:".dropdown-toggle"},p={OFFSET:"offset",POSITION:"position"},m=function(){function h(e,i){var o=this;n(this,h),this._element=e,this._scrollElement="BODY"===e.tagName?window:e,this._config=this._getConfig(i),this._selector=this._config.target+" "+g.NAV_LINKS+","+(this._config.target+" "+g.DROPDOWN_ITEMS),this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,t(this._scrollElement).on(f.SCROLL,function(t){return o._process(t)}),this.refresh(),this._process()}return h.prototype.refresh=function(){var e=this,n=this._scrollElement!==this._scrollElement.window?p.POSITION:p.OFFSET,i="auto"===this._config.method?n:this._config.method,o=i===p.POSITION?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight();var s=t.makeArray(t(this._selector));s.map(function(e){var n=void 0,s=r.getSelectorFromElement(e);return s&&(n=t(s)[0]),n&&(n.offsetWidth||n.offsetHeight)?[t(n)[i]().top+o,s]:null}).filter(function(t){return t}).sort(function(t,e){return t[0]-e[0]}).forEach(function(t){e._offsets.push(t[0]),e._targets.push(t[1])})},h.prototype.dispose=function(){t.removeData(this._element,a),t(this._scrollElement).off(l),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},h.prototype._getConfig=function(n){if(n=t.extend({},u,n),"string"!=typeof n.target){var i=t(n.target).attr("id");i||(i=r.getUID(e),t(n.target).attr("id",i)),n.target="#"+i}return r.typeCheckConfig(e,n,d),n},h.prototype._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},h.prototype._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},h.prototype._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.offsetHeight},h.prototype._process=function(){var t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),n=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),t>=n){var i=this._targets[this._targets.length-1];return void(this._activeTarget!==i&&this._activate(i))}if(this._activeTarget&&t<this._offsets[0]&&this._offsets[0]>0)return this._activeTarget=null,void this._clear();for(var o=this._offsets.length;o--;){var r=this._activeTarget!==this._targets[o]&&t>=this._offsets[o]&&(void 0===this._offsets[o+1]||t<this._offsets[o+1]);r&&this._activate(this._targets[o])}},h.prototype._activate=function(e){this._activeTarget=e,this._clear();var n=this._selector.split(",");n=n.map(function(t){return t+'[data-target="'+e+'"],'+(t+'[href="'+e+'"]')});var i=t(n.join(","));i.hasClass(_.DROPDOWN_ITEM)?(i.closest(g.DROPDOWN).find(g.DROPDOWN_TOGGLE).addClass(_.ACTIVE),i.addClass(_.ACTIVE)):i.parents(g.LI).find("> "+g.NAV_LINKS).addClass(_.ACTIVE),t(this._scrollElement).trigger(f.ACTIVATE,{relatedTarget:e})},h.prototype._clear=function(){t(this._selector).filter(g.ACTIVE).removeClass(_.ACTIVE)},h._jQueryInterface=function(e){return this.each(function(){var n=t(this).data(a),o="object"===("undefined"==typeof e?"undefined":i(e))&&e;
if(n||(n=new h(this,o),t(this).data(a,n)),"string"==typeof e){if(void 0===n[e])throw new Error('No method named "'+e+'"');n[e]()}})},o(h,null,[{key:"VERSION",get:function(){return s}},{key:"Default",get:function(){return u}}]),h}();return t(window).on(f.LOAD_DATA_API,function(){for(var e=t.makeArray(t(g.DATA_SPY)),n=e.length;n--;){var i=t(e[n]);m._jQueryInterface.call(i,i.data())}}),t.fn[e]=m._jQueryInterface,t.fn[e].Constructor=m,t.fn[e].noConflict=function(){return t.fn[e]=c,m._jQueryInterface},m}(jQuery),function(t){var e="tab",i="4.0.0-alpha.6",s="bs.tab",a="."+s,l=".data-api",h=t.fn[e],c=150,u={HIDE:"hide"+a,HIDDEN:"hidden"+a,SHOW:"show"+a,SHOWN:"shown"+a,CLICK_DATA_API:"click"+a+l},d={DROPDOWN_MENU:"dropdown-menu",ACTIVE:"active",DISABLED:"disabled",FADE:"fade",SHOW:"show"},f={A:"a",LI:"li",DROPDOWN:".dropdown",LIST:"ul:not(.dropdown-menu), ol:not(.dropdown-menu), nav:not(.dropdown-menu)",FADE_CHILD:"> .nav-item .fade, > .fade",ACTIVE:".active",ACTIVE_CHILD:"> .nav-item > .active, > .active",DATA_TOGGLE:'[data-toggle="tab"], [data-toggle="pill"]',DROPDOWN_TOGGLE:".dropdown-toggle",DROPDOWN_ACTIVE_CHILD:"> .dropdown-menu .active"},_=function(){function e(t){n(this,e),this._element=t}return e.prototype.show=function(){var e=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&t(this._element).hasClass(d.ACTIVE)||t(this._element).hasClass(d.DISABLED))){var n=void 0,i=void 0,o=t(this._element).closest(f.LIST)[0],s=r.getSelectorFromElement(this._element);o&&(i=t.makeArray(t(o).find(f.ACTIVE)),i=i[i.length-1]);var a=t.Event(u.HIDE,{relatedTarget:this._element}),l=t.Event(u.SHOW,{relatedTarget:i});if(i&&t(i).trigger(a),t(this._element).trigger(l),!l.isDefaultPrevented()&&!a.isDefaultPrevented()){s&&(n=t(s)[0]),this._activate(this._element,o);var h=function(){var n=t.Event(u.HIDDEN,{relatedTarget:e._element}),o=t.Event(u.SHOWN,{relatedTarget:i});t(i).trigger(n),t(e._element).trigger(o)};n?this._activate(n,n.parentNode,h):h()}}},e.prototype.dispose=function(){t.removeClass(this._element,s),this._element=null},e.prototype._activate=function(e,n,i){var o=this,s=t(n).find(f.ACTIVE_CHILD)[0],a=i&&r.supportsTransitionEnd()&&(s&&t(s).hasClass(d.FADE)||Boolean(t(n).find(f.FADE_CHILD)[0])),l=function(){return o._transitionComplete(e,s,a,i)};s&&a?t(s).one(r.TRANSITION_END,l).emulateTransitionEnd(c):l(),s&&t(s).removeClass(d.SHOW)},e.prototype._transitionComplete=function(e,n,i,o){if(n){t(n).removeClass(d.ACTIVE);var s=t(n.parentNode).find(f.DROPDOWN_ACTIVE_CHILD)[0];s&&t(s).removeClass(d.ACTIVE),n.setAttribute("aria-expanded",!1)}if(t(e).addClass(d.ACTIVE),e.setAttribute("aria-expanded",!0),i?(r.reflow(e),t(e).addClass(d.SHOW)):t(e).removeClass(d.FADE),e.parentNode&&t(e.parentNode).hasClass(d.DROPDOWN_MENU)){var a=t(e).closest(f.DROPDOWN)[0];a&&t(a).find(f.DROPDOWN_TOGGLE).addClass(d.ACTIVE),e.setAttribute("aria-expanded",!0)}o&&o()},e._jQueryInterface=function(n){return this.each(function(){var i=t(this),o=i.data(s);if(o||(o=new e(this),i.data(s,o)),"string"==typeof n){if(void 0===o[n])throw new Error('No method named "'+n+'"');o[n]()}})},o(e,null,[{key:"VERSION",get:function(){return i}}]),e}();return t(document).on(u.CLICK_DATA_API,f.DATA_TOGGLE,function(e){e.preventDefault(),_._jQueryInterface.call(t(this),"show")}),t.fn[e]=_._jQueryInterface,t.fn[e].Constructor=_,t.fn[e].noConflict=function(){return t.fn[e]=h,_._jQueryInterface},_}(jQuery),function(t){if("undefined"==typeof Tether)throw new Error("Bootstrap tooltips require Tether (http://tether.io/)");var e="tooltip",s="4.0.0-alpha.6",a="bs.tooltip",l="."+a,h=t.fn[e],c=150,u="bs-tether",d={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:"0 0",constraints:[],container:!1},f={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"string",constraints:"array",container:"(string|element|boolean)"},_={TOP:"bottom center",RIGHT:"middle left",BOTTOM:"top center",LEFT:"middle right"},g={SHOW:"show",OUT:"out"},p={HIDE:"hide"+l,HIDDEN:"hidden"+l,SHOW:"show"+l,SHOWN:"shown"+l,INSERTED:"inserted"+l,CLICK:"click"+l,FOCUSIN:"focusin"+l,FOCUSOUT:"focusout"+l,MOUSEENTER:"mouseenter"+l,MOUSELEAVE:"mouseleave"+l},m={FADE:"fade",SHOW:"show"},E={TOOLTIP:".tooltip",TOOLTIP_INNER:".tooltip-inner"},v={element:!1,enabled:!1},T={HOVER:"hover",FOCUS:"focus",CLICK:"click",MANUAL:"manual"},I=function(){function h(t,e){n(this,h),this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._isTransitioning=!1,this._tether=null,this.element=t,this.config=this._getConfig(e),this.tip=null,this._setListeners()}return h.prototype.enable=function(){this._isEnabled=!0},h.prototype.disable=function(){this._isEnabled=!1},h.prototype.toggleEnabled=function(){this._isEnabled=!this._isEnabled},h.prototype.toggle=function(e){if(e){var n=this.constructor.DATA_KEY,i=t(e.currentTarget).data(n);i||(i=new this.constructor(e.currentTarget,this._getDelegateConfig()),t(e.currentTarget).data(n,i)),i._activeTrigger.click=!i._activeTrigger.click,i._isWithActiveTrigger()?i._enter(null,i):i._leave(null,i)}else{if(t(this.getTipElement()).hasClass(m.SHOW))return void this._leave(null,this);this._enter(null,this)}},h.prototype.dispose=function(){clearTimeout(this._timeout),this.cleanupTether(),t.removeData(this.element,this.constructor.DATA_KEY),t(this.element).off(this.constructor.EVENT_KEY),t(this.element).closest(".modal").off("hide.bs.modal"),this.tip&&t(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,this._activeTrigger=null,this._tether=null,this.element=null,this.config=null,this.tip=null},h.prototype.show=function(){var e=this;if("none"===t(this.element).css("display"))throw new Error("Please use show on visible elements");var n=t.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){if(this._isTransitioning)throw new Error("Tooltip is transitioning");t(this.element).trigger(n);var i=t.contains(this.element.ownerDocument.documentElement,this.element);if(n.isDefaultPrevented()||!i)return;var o=this.getTipElement(),s=r.getUID(this.constructor.NAME);o.setAttribute("id",s),this.element.setAttribute("aria-describedby",s),this.setContent(),this.config.animation&&t(o).addClass(m.FADE);var a="function"==typeof this.config.placement?this.config.placement.call(this,o,this.element):this.config.placement,l=this._getAttachment(a),c=this.config.container===!1?document.body:t(this.config.container);t(o).data(this.constructor.DATA_KEY,this).appendTo(c),t(this.element).trigger(this.constructor.Event.INSERTED),this._tether=new Tether({attachment:l,element:o,target:this.element,classes:v,classPrefix:u,offset:this.config.offset,constraints:this.config.constraints,addTargetClasses:!1}),r.reflow(o),this._tether.position(),t(o).addClass(m.SHOW);var d=function(){var n=e._hoverState;e._hoverState=null,e._isTransitioning=!1,t(e.element).trigger(e.constructor.Event.SHOWN),n===g.OUT&&e._leave(null,e)};if(r.supportsTransitionEnd()&&t(this.tip).hasClass(m.FADE))return this._isTransitioning=!0,void t(this.tip).one(r.TRANSITION_END,d).emulateTransitionEnd(h._TRANSITION_DURATION);d()}},h.prototype.hide=function(e){var n=this,i=this.getTipElement(),o=t.Event(this.constructor.Event.HIDE);if(this._isTransitioning)throw new Error("Tooltip is transitioning");var s=function(){n._hoverState!==g.SHOW&&i.parentNode&&i.parentNode.removeChild(i),n.element.removeAttribute("aria-describedby"),t(n.element).trigger(n.constructor.Event.HIDDEN),n._isTransitioning=!1,n.cleanupTether(),e&&e()};t(this.element).trigger(o),o.isDefaultPrevented()||(t(i).removeClass(m.SHOW),this._activeTrigger[T.CLICK]=!1,this._activeTrigger[T.FOCUS]=!1,this._activeTrigger[T.HOVER]=!1,r.supportsTransitionEnd()&&t(this.tip).hasClass(m.FADE)?(this._isTransitioning=!0,t(i).one(r.TRANSITION_END,s).emulateTransitionEnd(c)):s(),this._hoverState="")},h.prototype.isWithContent=function(){return Boolean(this.getTitle())},h.prototype.getTipElement=function(){return this.tip=this.tip||t(this.config.template)[0]},h.prototype.setContent=function(){var e=t(this.getTipElement());this.setElementContent(e.find(E.TOOLTIP_INNER),this.getTitle()),e.removeClass(m.FADE+" "+m.SHOW),this.cleanupTether()},h.prototype.setElementContent=function(e,n){var o=this.config.html;"object"===("undefined"==typeof n?"undefined":i(n))&&(n.nodeType||n.jquery)?o?t(n).parent().is(e)||e.empty().append(n):e.text(t(n).text()):e[o?"html":"text"](n)},h.prototype.getTitle=function(){var t=this.element.getAttribute("data-original-title");return t||(t="function"==typeof this.config.title?this.config.title.call(this.element):this.config.title),t},h.prototype.cleanupTether=function(){this._tether&&this._tether.destroy()},h.prototype._getAttachment=function(t){return _[t.toUpperCase()]},h.prototype._setListeners=function(){var e=this,n=this.config.trigger.split(" ");n.forEach(function(n){if("click"===n)t(e.element).on(e.constructor.Event.CLICK,e.config.selector,function(t){return e.toggle(t)});else if(n!==T.MANUAL){var i=n===T.HOVER?e.constructor.Event.MOUSEENTER:e.constructor.Event.FOCUSIN,o=n===T.HOVER?e.constructor.Event.MOUSELEAVE:e.constructor.Event.FOCUSOUT;t(e.element).on(i,e.config.selector,function(t){return e._enter(t)}).on(o,e.config.selector,function(t){return e._leave(t)})}t(e.element).closest(".modal").on("hide.bs.modal",function(){return e.hide()})}),this.config.selector?this.config=t.extend({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},h.prototype._fixTitle=function(){var t=i(this.element.getAttribute("data-original-title"));(this.element.getAttribute("title")||"string"!==t)&&(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},h.prototype._enter=function(e,n){var i=this.constructor.DATA_KEY;return n=n||t(e.currentTarget).data(i),n||(n=new this.constructor(e.currentTarget,this._getDelegateConfig()),t(e.currentTarget).data(i,n)),e&&(n._activeTrigger["focusin"===e.type?T.FOCUS:T.HOVER]=!0),t(n.getTipElement()).hasClass(m.SHOW)||n._hoverState===g.SHOW?void(n._hoverState=g.SHOW):(clearTimeout(n._timeout),n._hoverState=g.SHOW,n.config.delay&&n.config.delay.show?void(n._timeout=setTimeout(function(){n._hoverState===g.SHOW&&n.show()},n.config.delay.show)):void n.show())},h.prototype._leave=function(e,n){var i=this.constructor.DATA_KEY;if(n=n||t(e.currentTarget).data(i),n||(n=new this.constructor(e.currentTarget,this._getDelegateConfig()),t(e.currentTarget).data(i,n)),e&&(n._activeTrigger["focusout"===e.type?T.FOCUS:T.HOVER]=!1),!n._isWithActiveTrigger())return clearTimeout(n._timeout),n._hoverState=g.OUT,n.config.delay&&n.config.delay.hide?void(n._timeout=setTimeout(function(){n._hoverState===g.OUT&&n.hide()},n.config.delay.hide)):void n.hide()},h.prototype._isWithActiveTrigger=function(){for(var t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1},h.prototype._getConfig=function(n){return n=t.extend({},this.constructor.Default,t(this.element).data(),n),n.delay&&"number"==typeof n.delay&&(n.delay={show:n.delay,hide:n.delay}),r.typeCheckConfig(e,n,this.constructor.DefaultType),n},h.prototype._getDelegateConfig=function(){var t={};if(this.config)for(var e in this.config)this.constructor.Default[e]!==this.config[e]&&(t[e]=this.config[e]);return t},h._jQueryInterface=function(e){return this.each(function(){var n=t(this).data(a),o="object"===("undefined"==typeof e?"undefined":i(e))&&e;if((n||!/dispose|hide/.test(e))&&(n||(n=new h(this,o),t(this).data(a,n)),"string"==typeof e)){if(void 0===n[e])throw new Error('No method named "'+e+'"');n[e]()}})},o(h,null,[{key:"VERSION",get:function(){return s}},{key:"Default",get:function(){return d}},{key:"NAME",get:function(){return e}},{key:"DATA_KEY",get:function(){return a}},{key:"Event",get:function(){return p}},{key:"EVENT_KEY",get:function(){return l}},{key:"DefaultType",get:function(){return f}}]),h}();return t.fn[e]=I._jQueryInterface,t.fn[e].Constructor=I,t.fn[e].noConflict=function(){return t.fn[e]=h,I._jQueryInterface},I}(jQuery));(function(r){var a="popover",l="4.0.0-alpha.6",h="bs.popover",c="."+h,u=r.fn[a],d=r.extend({},s.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),f=r.extend({},s.DefaultType,{content:"(string|element|function)"}),_={FADE:"fade",SHOW:"show"},g={TITLE:".popover-title",CONTENT:".popover-content"},p={HIDE:"hide"+c,HIDDEN:"hidden"+c,SHOW:"show"+c,SHOWN:"shown"+c,INSERTED:"inserted"+c,CLICK:"click"+c,FOCUSIN:"focusin"+c,FOCUSOUT:"focusout"+c,MOUSEENTER:"mouseenter"+c,MOUSELEAVE:"mouseleave"+c},m=function(s){function u(){return n(this,u),t(this,s.apply(this,arguments))}return e(u,s),u.prototype.isWithContent=function(){return this.getTitle()||this._getContent()},u.prototype.getTipElement=function(){return this.tip=this.tip||r(this.config.template)[0]},u.prototype.setContent=function(){var t=r(this.getTipElement());this.setElementContent(t.find(g.TITLE),this.getTitle()),this.setElementContent(t.find(g.CONTENT),this._getContent()),t.removeClass(_.FADE+" "+_.SHOW),this.cleanupTether()},u.prototype._getContent=function(){return this.element.getAttribute("data-content")||("function"==typeof this.config.content?this.config.content.call(this.element):this.config.content)},u._jQueryInterface=function(t){return this.each(function(){var e=r(this).data(h),n="object"===("undefined"==typeof t?"undefined":i(t))?t:null;if((e||!/destroy|hide/.test(t))&&(e||(e=new u(this,n),r(this).data(h,e)),"string"==typeof t)){if(void 0===e[t])throw new Error('No method named "'+t+'"');e[t]()}})},o(u,null,[{key:"VERSION",get:function(){return l}},{key:"Default",get:function(){return d}},{key:"NAME",get:function(){return a}},{key:"DATA_KEY",get:function(){return h}},{key:"Event",get:function(){return p}},{key:"EVENT_KEY",get:function(){return c}},{key:"DefaultType",get:function(){return f}}]),u}(s);return r.fn[a]=m._jQueryInterface,r.fn[a].Constructor=m,r.fn[a].noConflict=function(){return r.fn[a]=u,m._jQueryInterface},m})(jQuery)}();;
/*! pace 1.0.2 */
(function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X=[].slice,Y={}.hasOwnProperty,Z=function(a,b){function c(){this.constructor=a}for(var d in b)Y.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},$=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};for(u={catchupTime:100,initialRate:.03,minTime:250,ghostTime:100,maxProgressPerFrame:20,easeFactor:1.25,startOnPageLoad:!0,restartOnPushState:!0,restartOnRequestAfter:500,target:"body",elements:{checkInterval:100,selectors:["body"]},eventLag:{minSamples:10,sampleCount:3,lagThreshold:3},ajax:{trackMethods:["GET"],trackWebSockets:!0,ignoreURLs:[]}},C=function(){var a;return null!=(a="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance.now():void 0)?a:+new Date},E=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,t=window.cancelAnimationFrame||window.mozCancelAnimationFrame,null==E&&(E=function(a){return setTimeout(a,50)},t=function(a){return clearTimeout(a)}),G=function(a){var b,c;return b=C(),(c=function(){var d;return d=C()-b,d>=33?(b=C(),a(d,function(){return E(c)})):setTimeout(c,33-d)})()},F=function(){var a,b,c;return c=arguments[0],b=arguments[1],a=3<=arguments.length?X.call(arguments,2):[],"function"==typeof c[b]?c[b].apply(c,a):c[b]},v=function(){var a,b,c,d,e,f,g;for(b=arguments[0],d=2<=arguments.length?X.call(arguments,1):[],f=0,g=d.length;g>f;f++)if(c=d[f])for(a in c)Y.call(c,a)&&(e=c[a],null!=b[a]&&"object"==typeof b[a]&&null!=e&&"object"==typeof e?v(b[a],e):b[a]=e);return b},q=function(a){var b,c,d,e,f;for(c=b=0,e=0,f=a.length;f>e;e++)d=a[e],c+=Math.abs(d),b++;return c/b},x=function(a,b){var c,d,e;if(null==a&&(a="options"),null==b&&(b=!0),e=document.querySelector("[data-pace-"+a+"]")){if(c=e.getAttribute("data-pace-"+a),!b)return c;try{return JSON.parse(c)}catch(f){return d=f,"undefined"!=typeof console&&null!==console?console.error("Error parsing inline pace options",d):void 0}}},g=function(){function a(){}return a.prototype.on=function(a,b,c,d){var e;return null==d&&(d=!1),null==this.bindings&&(this.bindings={}),null==(e=this.bindings)[a]&&(e[a]=[]),this.bindings[a].push({handler:b,ctx:c,once:d})},a.prototype.once=function(a,b,c){return this.on(a,b,c,!0)},a.prototype.off=function(a,b){var c,d,e;if(null!=(null!=(d=this.bindings)?d[a]:void 0)){if(null==b)return delete this.bindings[a];for(c=0,e=[];c<this.bindings[a].length;)e.push(this.bindings[a][c].handler===b?this.bindings[a].splice(c,1):c++);return e}},a.prototype.trigger=function(){var a,b,c,d,e,f,g,h,i;if(c=arguments[0],a=2<=arguments.length?X.call(arguments,1):[],null!=(g=this.bindings)?g[c]:void 0){for(e=0,i=[];e<this.bindings[c].length;)h=this.bindings[c][e],d=h.handler,b=h.ctx,f=h.once,d.apply(null!=b?b:this,a),i.push(f?this.bindings[c].splice(e,1):e++);return i}},a}(),j=window.Pace||{},window.Pace=j,v(j,g.prototype),D=j.options=v({},u,window.paceOptions,x()),U=["ajax","document","eventLag","elements"],Q=0,S=U.length;S>Q;Q++)K=U[Q],D[K]===!0&&(D[K]=u[K]);i=function(a){function b(){return V=b.__super__.constructor.apply(this,arguments)}return Z(b,a),b}(Error),b=function(){function a(){this.progress=0}return a.prototype.getElement=function(){var a;if(null==this.el){if(a=document.querySelector(D.target),!a)throw new i;this.el=document.createElement("div"),this.el.className="pace pace-active",document.body.className=document.body.className.replace(/pace-done/g,""),document.body.className+=" pace-running",this.el.innerHTML='<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>',null!=a.firstChild?a.insertBefore(this.el,a.firstChild):a.appendChild(this.el)}return this.el},a.prototype.finish=function(){var a;return a=this.getElement(),a.className=a.className.replace("pace-active",""),a.className+=" pace-inactive",document.body.className=document.body.className.replace("pace-running",""),document.body.className+=" pace-done"},a.prototype.update=function(a){return this.progress=a,this.render()},a.prototype.destroy=function(){try{this.getElement().parentNode.removeChild(this.getElement())}catch(a){i=a}return this.el=void 0},a.prototype.render=function(){var a,b,c,d,e,f,g;if(null==document.querySelector(D.target))return!1;for(a=this.getElement(),d="translate3d("+this.progress+"%, 0, 0)",g=["webkitTransform","msTransform","transform"],e=0,f=g.length;f>e;e++)b=g[e],a.children[0].style[b]=d;return(!this.lastRenderedProgress||this.lastRenderedProgress|0!==this.progress|0)&&(a.children[0].setAttribute("data-progress-text",""+(0|this.progress)+"%"),this.progress>=100?c="99":(c=this.progress<10?"0":"",c+=0|this.progress),a.children[0].setAttribute("data-progress",""+c)),this.lastRenderedProgress=this.progress},a.prototype.done=function(){return this.progress>=100},a}(),h=function(){function a(){this.bindings={}}return a.prototype.trigger=function(a,b){var c,d,e,f,g;if(null!=this.bindings[a]){for(f=this.bindings[a],g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push(c.call(this,b));return g}},a.prototype.on=function(a,b){var c;return null==(c=this.bindings)[a]&&(c[a]=[]),this.bindings[a].push(b)},a}(),P=window.XMLHttpRequest,O=window.XDomainRequest,N=window.WebSocket,w=function(a,b){var c,d,e;e=[];for(d in b.prototype)try{e.push(null==a[d]&&"function"!=typeof b[d]?"function"==typeof Object.defineProperty?Object.defineProperty(a,d,{get:function(){return b.prototype[d]},configurable:!0,enumerable:!0}):a[d]=b.prototype[d]:void 0)}catch(f){c=f}return e},A=[],j.ignore=function(){var a,b,c;return b=arguments[0],a=2<=arguments.length?X.call(arguments,1):[],A.unshift("ignore"),c=b.apply(null,a),A.shift(),c},j.track=function(){var a,b,c;return b=arguments[0],a=2<=arguments.length?X.call(arguments,1):[],A.unshift("track"),c=b.apply(null,a),A.shift(),c},J=function(a){var b;if(null==a&&(a="GET"),"track"===A[0])return"force";if(!A.length&&D.ajax){if("socket"===a&&D.ajax.trackWebSockets)return!0;if(b=a.toUpperCase(),$.call(D.ajax.trackMethods,b)>=0)return!0}return!1},k=function(a){function b(){var a,c=this;b.__super__.constructor.apply(this,arguments),a=function(a){var b;return b=a.open,a.open=function(d,e){return J(d)&&c.trigger("request",{type:d,url:e,request:a}),b.apply(a,arguments)}},window.XMLHttpRequest=function(b){var c;return c=new P(b),a(c),c};try{w(window.XMLHttpRequest,P)}catch(d){}if(null!=O){window.XDomainRequest=function(){var b;return b=new O,a(b),b};try{w(window.XDomainRequest,O)}catch(d){}}if(null!=N&&D.ajax.trackWebSockets){window.WebSocket=function(a,b){var d;return d=null!=b?new N(a,b):new N(a),J("socket")&&c.trigger("request",{type:"socket",url:a,protocols:b,request:d}),d};try{w(window.WebSocket,N)}catch(d){}}}return Z(b,a),b}(h),R=null,y=function(){return null==R&&(R=new k),R},I=function(a){var b,c,d,e;for(e=D.ajax.ignoreURLs,c=0,d=e.length;d>c;c++)if(b=e[c],"string"==typeof b){if(-1!==a.indexOf(b))return!0}else if(b.test(a))return!0;return!1},y().on("request",function(b){var c,d,e,f,g;return f=b.type,e=b.request,g=b.url,I(g)?void 0:j.running||D.restartOnRequestAfter===!1&&"force"!==J(f)?void 0:(d=arguments,c=D.restartOnRequestAfter||0,"boolean"==typeof c&&(c=0),setTimeout(function(){var b,c,g,h,i,k;if(b="socket"===f?e.readyState<2:0<(h=e.readyState)&&4>h){for(j.restart(),i=j.sources,k=[],c=0,g=i.length;g>c;c++){if(K=i[c],K instanceof a){K.watch.apply(K,d);break}k.push(void 0)}return k}},c))}),a=function(){function a(){var a=this;this.elements=[],y().on("request",function(){return a.watch.apply(a,arguments)})}return a.prototype.watch=function(a){var b,c,d,e;return d=a.type,b=a.request,e=a.url,I(e)?void 0:(c="socket"===d?new n(b):new o(b),this.elements.push(c))},a}(),o=function(){function a(a){var b,c,d,e,f,g,h=this;if(this.progress=0,null!=window.ProgressEvent)for(c=null,a.addEventListener("progress",function(a){return h.progress=a.lengthComputable?100*a.loaded/a.total:h.progress+(100-h.progress)/2},!1),g=["load","abort","timeout","error"],d=0,e=g.length;e>d;d++)b=g[d],a.addEventListener(b,function(){return h.progress=100},!1);else f=a.onreadystatechange,a.onreadystatechange=function(){var b;return 0===(b=a.readyState)||4===b?h.progress=100:3===a.readyState&&(h.progress=50),"function"==typeof f?f.apply(null,arguments):void 0}}return a}(),n=function(){function a(a){var b,c,d,e,f=this;for(this.progress=0,e=["error","open"],c=0,d=e.length;d>c;c++)b=e[c],a.addEventListener(b,function(){return f.progress=100},!1)}return a}(),d=function(){function a(a){var b,c,d,f;for(null==a&&(a={}),this.elements=[],null==a.selectors&&(a.selectors=[]),f=a.selectors,c=0,d=f.length;d>c;c++)b=f[c],this.elements.push(new e(b))}return a}(),e=function(){function a(a){this.selector=a,this.progress=0,this.check()}return a.prototype.check=function(){var a=this;return document.querySelector(this.selector)?this.done():setTimeout(function(){return a.check()},D.elements.checkInterval)},a.prototype.done=function(){return this.progress=100},a}(),c=function(){function a(){var a,b,c=this;this.progress=null!=(b=this.states[document.readyState])?b:100,a=document.onreadystatechange,document.onreadystatechange=function(){return null!=c.states[document.readyState]&&(c.progress=c.states[document.readyState]),"function"==typeof a?a.apply(null,arguments):void 0}}return a.prototype.states={loading:0,interactive:50,complete:100},a}(),f=function(){function a(){var a,b,c,d,e,f=this;this.progress=0,a=0,e=[],d=0,c=C(),b=setInterval(function(){var g;return g=C()-c-50,c=C(),e.push(g),e.length>D.eventLag.sampleCount&&e.shift(),a=q(e),++d>=D.eventLag.minSamples&&a<D.eventLag.lagThreshold?(f.progress=100,clearInterval(b)):f.progress=100*(3/(a+3))},50)}return a}(),m=function(){function a(a){this.source=a,this.last=this.sinceLastUpdate=0,this.rate=D.initialRate,this.catchup=0,this.progress=this.lastProgress=0,null!=this.source&&(this.progress=F(this.source,"progress"))}return a.prototype.tick=function(a,b){var c;return null==b&&(b=F(this.source,"progress")),b>=100&&(this.done=!0),b===this.last?this.sinceLastUpdate+=a:(this.sinceLastUpdate&&(this.rate=(b-this.last)/this.sinceLastUpdate),this.catchup=(b-this.progress)/D.catchupTime,this.sinceLastUpdate=0,this.last=b),b>this.progress&&(this.progress+=this.catchup*a),c=1-Math.pow(this.progress/100,D.easeFactor),this.progress+=c*this.rate*a,this.progress=Math.min(this.lastProgress+D.maxProgressPerFrame,this.progress),this.progress=Math.max(0,this.progress),this.progress=Math.min(100,this.progress),this.lastProgress=this.progress,this.progress},a}(),L=null,H=null,r=null,M=null,p=null,s=null,j.running=!1,z=function(){return D.restartOnPushState?j.restart():void 0},null!=window.history.pushState&&(T=window.history.pushState,window.history.pushState=function(){return z(),T.apply(window.history,arguments)}),null!=window.history.replaceState&&(W=window.history.replaceState,window.history.replaceState=function(){return z(),W.apply(window.history,arguments)}),l={ajax:a,elements:d,document:c,eventLag:f},(B=function(){var a,c,d,e,f,g,h,i;for(j.sources=L=[],g=["ajax","elements","document","eventLag"],c=0,e=g.length;e>c;c++)a=g[c],D[a]!==!1&&L.push(new l[a](D[a]));for(i=null!=(h=D.extraSources)?h:[],d=0,f=i.length;f>d;d++)K=i[d],L.push(new K(D));return j.bar=r=new b,H=[],M=new m})(),j.stop=function(){return j.trigger("stop"),j.running=!1,r.destroy(),s=!0,null!=p&&("function"==typeof t&&t(p),p=null),B()},j.restart=function(){return j.trigger("restart"),j.stop(),j.start()},j.go=function(){var a;return j.running=!0,r.render(),a=C(),s=!1,p=G(function(b,c){var d,e,f,g,h,i,k,l,n,o,p,q,t,u,v,w;for(l=100-r.progress,e=p=0,f=!0,i=q=0,u=L.length;u>q;i=++q)for(K=L[i],o=null!=H[i]?H[i]:H[i]=[],h=null!=(w=K.elements)?w:[K],k=t=0,v=h.length;v>t;k=++t)g=h[k],n=null!=o[k]?o[k]:o[k]=new m(g),f&=n.done,n.done||(e++,p+=n.tick(b));return d=p/e,r.update(M.tick(b,d)),r.done()||f||s?(r.update(100),j.trigger("done"),setTimeout(function(){return r.finish(),j.running=!1,j.trigger("hide")},Math.max(D.ghostTime,Math.max(D.minTime-(C()-a),0)))):c()})},j.start=function(a){v(D,a),j.running=!0;try{r.render()}catch(b){i=b}return document.querySelector(".pace")?(j.trigger("start"),j.go()):setTimeout(j.start,50)},"function"==typeof define&&define.amd?define(["pace"],function(){return j}):"object"==typeof exports?module.exports=j:D.startOnPageLoad&&j.start()}).call(this);;
/*****
* CONFIGURATION
*/
(function($) {
    //Main navigation
    $.navigation = $('nav > ul.nav');

  $.panelIconOpened = 'icon-arrow-up';
  $.panelIconClosed = 'icon-arrow-down';

  //Default colours
  $.brandPrimary =  '#20a8d8';
  $.brandSuccess =  '#4dbd74';
  $.brandInfo =     '#63c2de';
  $.brandWarning =  '#f8cb00';
  $.brandDanger =   '#f86c6b';

  $.grayDark =      '#2a2c36';
  $.gray =          '#55595c';
  $.grayLight =     '#818a91';
  $.grayLighter =   '#d1d4d7';
  $.grayLightest =  '#f8f9fa';

'use strict';

/****
* MAIN NAVIGATION
*/

$(document).ready(function($){

  // Add class .active to current link
  $.navigation.find('a').each(function(){

    var cUrl = String(window.location).split('?')[0];

    if (cUrl.substr(cUrl.length - 1) == '#') {
      cUrl = cUrl.slice(0,-1);
    }

    if ($($(this))[0].href==cUrl) {
      $(this).addClass('active');

      $(this).parents('ul').add(this).each(function(){
        $(this).parent().addClass('open');
      });
    }
  });

  // Dropdown Menu
  $.navigation.on('click', 'a', function(e){

    if ($.ajaxLoad) {
      e.preventDefault();
    }

    if ($(this).hasClass('nav-dropdown-toggle')) {
      $(this).parent().toggleClass('open');
      resizeBroadcast();
    }

  });

  function resizeBroadcast() {

    var timesRun = 0;
    var interval = setInterval(function(){
      timesRun += 1;
      if(timesRun === 5){
        clearInterval(interval);
      }
      window.dispatchEvent(new Event('resize'));
    }, 62.5);
  }

  /* ---------- Main Menu Open/Close, Min/Full ---------- */
  $('.navbar-toggler').click(function(){

    if ($(this).hasClass('sidebar-toggler')) {
      $('body').toggleClass('sidebar-hidden');
      resizeBroadcast();
    }

    if ($(this).hasClass('aside-menu-toggler')) {
      $('body').toggleClass('aside-menu-hidden');
      resizeBroadcast();
    }

    if ($(this).hasClass('mobile-sidebar-toggler')) {
      $('body').toggleClass('sidebar-mobile-show');
      resizeBroadcast();
    }

  });

  $('.sidebar-close').click(function(){
    $('body').toggleClass('sidebar-opened').parent().toggleClass('sidebar-opened');
  });

  /* ---------- Disable moving to top ---------- */
  $('a[href="#"][data-top!=true]').click(function(e){
    e.preventDefault();
  });

});

/****
* CARDS ACTIONS
*/

$(document).on('click', '.card-actions a', function(e){
  e.preventDefault();

  if ($(this).hasClass('btn-close')) {
    $(this).parent().parent().parent().fadeOut();
  } else if ($(this).hasClass('btn-minimize')) {
    var $target = $(this).parent().parent().next('.card-block');
    if (!$(this).hasClass('collapsed')) {
      $('i',$(this)).removeClass($.panelIconOpened).addClass($.panelIconClosed);
    } else {
      $('i',$(this)).removeClass($.panelIconClosed).addClass($.panelIconOpened);
    }

  } else if ($(this).hasClass('btn-setting')) {
    $('#myModal').modal('show');
  }

});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function init(url) {

  /* ---------- Tooltip ---------- */
  $('[rel="tooltip"],[data-rel="tooltip"]').tooltip({"placement":"bottom",delay: { show: 400, hide: 200 }});

  /* ---------- Popover ---------- */
  $('[rel="popover"],[data-rel="popover"],[data-toggle="popover"]').popover();

}
})(jQuery);
;

/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/*
 WARNING: clear browser's cache after you modify this file.
 If you don't do this, you may notice that browser is ignoring all your changes.
 */
CKEDITOR.editorConfig = function(config) {
  config.indentClasses = [ 'rteindent1', 'rteindent2', 'rteindent3', 'rteindent4' ];

  // [ Left, Center, Right, Justified ]
  config.justifyClasses = [ 'rteleft', 'rtecenter', 'rteright', 'rtejustify' ];

  // The minimum editor width, in pixels, when resizing it with the resize handle.
  config.resize_minWidth = 450;

  // Protect PHP code tags (<?...?>) so CKEditor will not break them when
  // switching from Source to WYSIWYG.
  // Uncommenting this line doesn't mean the user will not be able to type PHP
  // code in the source. This kind of prevention must be done in the server
  // side
  // (as does Drupal), so just leave this line as is.
  config.protectedSource.push(/<\?[\s\S]*?\?>/g); // PHP Code

  // [#1762328] Uncomment the line below to protect <code> tags in CKEditor (hide them in wysiwyg mode).
  // config.protectedSource.push(/<code>[\s\S]*?<\/code>/gi);
  config.extraPlugins = '';

  /*
    * Append here extra CSS rules that should be applied into the editing area.
    * Example:
    * config.extraCss = 'body {color:#FF0000;}';
    */
  config.extraCss = '';
  /**
    * Sample extraCss code for the "marinelli" theme.
    */
  if (Drupal.settings.ckeditor.theme == "marinelli") {
    config.extraCss += "body{background:#FFF;text-align:left;font-size:0.8em;}";
    config.extraCss += "#primary ol, #primary ul{margin:10px 0 10px 25px;}";
  }
  if (Drupal.settings.ckeditor.theme == "newsflash") {
    config.extraCss = "body{min-width:400px}";
  }

  /**
    * CKEditor's editing area body ID & class.
    * See http://drupal.ckeditor.com/tricks
    * This setting can be used if CKEditor does not work well with your theme by default.
    */
  config.bodyClass = '';
  config.bodyId = '';
  /**
    * Sample bodyClass and BodyId for the "marinelli" theme.
    */
  if (Drupal.settings.ckeditor.theme == "marinelli") {
    config.bodyClass = 'singlepage';
    config.bodyId = 'primary';
  }

  // Make CKEditor's edit area as high as the textarea would be.
  if (this.element.$.rows > 0) {
    config.height = this.element.$.rows * 20 + 'px';
  }
}

/*
 * Sample toolbars
 */

//Toolbar definition for basic buttons
Drupal.settings.cke_toolbar_DrupalBasic = [ [ 'Format', 'Bold', 'Italic', '-', 'NumberedList','BulletedList', '-', 'Link', 'Unlink', 'Image' ] ];

//Toolbar definition for Advanced buttons
Drupal.settings.cke_toolbar_DrupalAdvanced = [
  ['Source'],
  ['Cut','Copy','Paste','PasteText','PasteFromWord','-','SpellChecker', 'Scayt'],
  ['Undo','Redo','Find','Replace','-','SelectAll'],
  ['Image','Flash','Table','HorizontalRule','Smiley','SpecialChar'],
  ['Maximize', 'ShowBlocks'],
  '/',
  ['Format'],
  ['Bold','Italic','Underline','Strike','-','Subscript','Superscript','-','RemoveFormat'],
  ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
  ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl'],
  ['Link','Unlink','Anchor','Linkit','LinkToNode','LinkToMenu']
];

// Toolbar definition for all buttons
Drupal.settings.cke_toolbar_DrupalFull = [
  ['Source'],
  ['Cut','Copy','Paste','PasteText','PasteFromWord','-','SpellChecker', 'Scayt'],
  ['Undo','Redo','Find','Replace','-','SelectAll'],
  ['Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','Iframe'],
  '/',
  ['Bold','Italic','Underline','Strike','-','Subscript','Superscript','-','RemoveFormat'],
  ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote','CreateDiv'],
  ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl','-','Language'],
  ['Link','Unlink','Anchor','Linkit','LinkToNode', 'LinkToMenu'],
  '/',
  ['Format','Font','FontSize'],
  ['TextColor','BGColor'],
  ['Maximize', 'ShowBlocks'],
  ['DrupalBreak', 'DrupalPageBreak']
];;
/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
(function ($) {
  Drupal.ckeditor_ver = 4;

  $(document).ready(function() {
    if (typeof(CKEDITOR) == "undefined")
      return;

    // $('#edit-uicolor-textarea').show();

    if (Drupal.settings.ckeditor_version) {
      Drupal.ckeditor_ver = Drupal.settings.ckeditor_version.split('.')[0];
    }

    Drupal.editSkinEditorInit = function() {
      var skinframe_src = $('#skinframe').attr('src');
      //skinframe_src = skinframe_src.replace(/skin=[^&]+/, 'skin='+$("#edit-skin").val());
      var skin = skinframe_src.match(/skin=([^&]+)/)[1];
      if ($('#edit-uicolor').val() == 'custom') {
        skinframe_src = skinframe_src.replace(/uicolor=[^&]+/, 'uicolor='+$('input[name$="uicolor_user"]').val().replace('#', '') || 'D3D3D3');
      }
      else {
        skinframe_src = skinframe_src.replace(/uicolor=[^&]+/, 'uicolor=D3D3D3');
      }
      $('#skinframe').attr('src', skinframe_src);

      if (Drupal.ckeditor_ver == 3) {
        if (skin == "kama") {
          $("#edit-uicolor").removeAttr('disabled');
          $("#edit-uicolor").parent().removeClass('form-disabled');
        }
        else {
          $("#edit-uicolor").attr('disabled', 'disabled');
          $("#edit-uicolor").parent().addClass('form-disabled');
        }
      }
      else {
        $("#edit-uicolor").removeAttr('disabled');
        $("#edit-uicolor").parent().removeClass('form-disabled');
      }
    };

    Drupal.editSkinEditorInit();

    $("#edit-uicolor").bind("change", function() {
      Drupal.editSkinEditorInit();
    });

    $("#input-formats :checkbox").change(function() {
      $('#security-filters .filter-warning').hide();
      $('#security-filters div.filter-text-formats[filter]').html('');
      $('#security-filters ul.text-formats-config').html('');
      $('#input-formats :checked').each(function() {
        var format_name = $(this).val();
        var format_label = $('label[for="' + $(this).attr('id') + '"]').html();

        if (typeof(Drupal.settings.text_formats_config_links[format_name]) != 'undefined') {
          var text = "<li>" + format_label + " - <a href=\"" + Drupal.settings.text_formats_config_links[format_name].config_url + "\">configure</a></li>";
          var dataSel = $('#security-filters ul.text-formats-config');
          var html = dataSel.html();
          if (html == null || html.length == 0) {
            dataSel.html(text);
          }
          else {
            html += text;
            dataSel.html(html);
          }
        }

        $('#security-filters div.filter-text-formats[filter]').each(function() {
          var filter_name = $(this).attr('filter');
          var dataSel = $(this);
          var html = dataSel.html();
          var status = "enabled";
          if (typeof Drupal.settings.text_format_filters[format_name][filter_name] == 'undefined') {
            status = "disabled";
          }
          var text = "<span class=\"filter-text-format-status " + status + "\">" + format_label + ': </span><br/>';

          if (html == null || html.length == 0) {
            dataSel.html(text);
          }
          else {
            html += text;
            dataSel.html(html);
          }
        });
      });
    });
    $("#input-formats :checkbox:eq(0)").trigger('change');

    $(".cke_load_toolbar").click(function() {
      var buttons = eval('Drupal.settings.'+$(this).attr("id"));
      var text = "[\n";
      for(i in buttons) {
        if (typeof buttons[i] == 'string'){
          text = text + "    '/',\n";
        }
        else {
          text = text + "    [";
          max = buttons[i].length - 1;
          rows = buttons.length - 1;
          for (j in buttons[i]) {
            if (j < max){
              text = text + "'" + buttons[i][j] + "',";
            } else {
              text = text + "'" + buttons[i][j] + "'";
            }
          }
          if (i < rows){
            text = text + "],\n";
          } else {
            text = text + "]\n";
          }
        }
      }

      text = text + "]";
      text = text.replace(/\['\/'\]/g,"'/'");
      $("#edit-toolbar").val(text);
      if (Drupal.settings.ckeditor_toolbar_wizard == 't'){
        Drupal.ckeditorToolbarReload();
      }
      return false;
    });

    if (Drupal.settings.ckeditor_toolbar_wizard == 'f'){
      $("form#ckeditor-admin-profile-form textarea#edit-toolbar, form#ckeditor-admin-profile-form #edit-toolbar + .grippie").show();
    }
  });
})(jQuery);
;
/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
jQuery(document).ready(function() {
    function Tools(event, ui) {
        //outer loop for rows
        var tools = "[\n";
        rows = jQuery("#groupLayout div.sortableListDiv").length;
        jQuery.each(jQuery("#groupLayout div.sortableListDiv"), function(rowIndex, rowValue) {
            if (jQuery("li",rowValue).length > 0) {
                tools = tools + "    [";
            }
            //inner loop for toolbar buttons
            jQuery.each(jQuery("li",rowValue), function(buttonIndex, buttonValue) {
                if (jQuery(buttonValue).hasClass('spacer')) {
                    tools = tools + ",'-'";
                }
                else if (jQuery(buttonValue).hasClass('group')) {
                    tools = tools + "],\n    [";
                }
                else {
                    tools = tools + ",'" + jQuery(buttonValue).attr('id') + "'" ;
                }
            });

            if (jQuery("li" ,rowValue).length > 0) {
                if (rowIndex < (rows -1)) {
                    tools = tools + "],\n    '/',\n";
                }
                else {
                    tools = tools + "]\n";
                }
            }
        });
        tools = tools + "]";
        tools = tools.replace(/\[,/g, '[');
        tools = tools.replace(/\[],/g, '');
        jQuery("#edit-toolbar").val(tools);
    }

    Drupal.ckeditorToolbaInit = function() {
        Drupal.ckeditorToolbarUsedRender();
        Drupal.ckeditorToolbarAllRender();

        var firefox = navigator.userAgent.toLowerCase().match(/firefox\/[0-9]\./);
        jQuery(".sortableList").sortable({
            connectWith: ".sortableList",
            items: "div.sortableListDiv",
            sort: function(event, ui) {
                if (firefox){
                    ui.helper.css({'top' : ui.position.top - 35 + 'px'});
                }
            },
            stop: function(event, ui) {
                Tools(event, ui);
            }
        }).disableSelection();

        jQuery(".sortableRow").sortable({
            connectWith: ".sortableRow",
            items: "li.sortableItem",
            sort: function(event, ui) {
                if (firefox){
                    ui.helper.css({'top' : ui.position.top - 35 + 'px'});
                }
            },
            stop: function(event, ui) {
                Tools(event, ui);
            }
        }).disableSelection();

        jQuery("li.sortableItem").mouseover(function(){
            jQuery(".sortableList").sortable("disable");
        });
        jQuery("li.sortableItem").mouseout(function(){
            jQuery(".sortableList").sortable("enable");
        });
    }

    Drupal.ckeditorToolbarReload = function() {
        jQuery(".sortableList").sortable('destroy');
        jQuery(".sortableRow").sortable('destroy');
        jQuery("li.sortableItem").unbind();
        Drupal.ckeditorToolbaInit();
    }

    Drupal.ckeditorToolbarUsedRender = function() {
        var toolbar = jQuery('#edit-toolbar').val();
        toolbar = eval(toolbar);
        var html = '<div class="sortableListDiv"><span class="sortableListSpan"><ul class="sortableRow">';
        var group = false;

        for (var row in toolbar) {
            if (typeof toolbar[row] == 'string' && toolbar[row] == '/') {
                group = false;
                html += '</ul></span></div><div class="sortableListDiv"><span class="sortableListSpan"><ul class="sortableRow">';
            }
            else {
                if (group == false){
                    group = true;
                }
                else {
                    html += '<li class="sortableItem group"><img src="' + Drupal.settings.cke_toolbar_buttons_all['__group']['icon'] + '" alt="group" title="group" /></li>';
                }
                for (var button in toolbar[row]) {
                    if (toolbar[row][button] == '-') {
                        html += '<li class="sortableItem spacer"><img src="' + Drupal.settings.cke_toolbar_buttons_all['__spacer']['icon'] + '" alt="spacer" title="spacer" /></li>';
                    }
                    else if (Drupal.settings.cke_toolbar_buttons_all[toolbar[row][button]]) {
                        html += '<li class="sortableItem" id="' + Drupal.settings.cke_toolbar_buttons_all[toolbar[row][button]]['name'] + '"><img src="' + Drupal.settings.cke_toolbar_buttons_all[toolbar[row][button]]['icon'] + '" alt="' + Drupal.settings.cke_toolbar_buttons_all[toolbar[row][button]]['title'] + '" title="' + Drupal.settings.cke_toolbar_buttons_all[toolbar[row][button]]['title'] + '" /></li>';
                    }
                }
            }
        }
        html += '</ul></span></div>';
        jQuery('#groupLayout').empty().append(html);
    }

    Drupal.ckeditorToolbarAllRender = function() {
        var toolbarUsed = jQuery('#edit-toolbar').val();
        var toolbarAll = Drupal.settings.cke_toolbar_buttons_all;

        var htmlArray = new Array();
        var html = '';

        for (var i in toolbarAll) {
            if (new RegExp("\'[\s]*" + toolbarAll[i].name + "[\s]*\'").test(toolbarUsed) == false) {
                if (toolbarAll[i].name == false) continue;
                if (typeof htmlArray[toolbarAll[i].row] == 'undefined') htmlArray[toolbarAll[i].row] = '';
                htmlArray[toolbarAll[i].row] += '<li class="sortableItem" id="' + toolbarAll[i].name + '"><img src="' + toolbarAll[i].icon + '" alt="' + toolbarAll[i].title + '" title="' + toolbarAll[i].title + '" /></li>';
            }
        }

        if (typeof htmlArray[5] == 'undefined') htmlArray[5] = '';
        htmlArray[5] += '<li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li><li class="sortableItem group"><img src="' + toolbarAll['__group'].icon + '" alt="' + toolbarAll['__group'].title + '" title="' + toolbarAll['__group'].title + '" /></li>';

        if (typeof htmlArray[6] == 'undefined') htmlArray[6] = '';
        htmlArray[6] += '<li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li><li class="sortableItem spacer"><img src="' + toolbarAll['__spacer'].icon + '" alt="' + toolbarAll['__spacer'].title + '" title="' + toolbarAll['__spacer'].title + '" /></li>';

        if (typeof htmlArray[7] == 'undefined') htmlArray[7] = '';

        for (var j in htmlArray){
            html += '<div class="sortableListDiv"><span class="sortableListSpan"><ul class="sortableRow">' + htmlArray[j] + '</ul></span></div>';
        }
        jQuery('#allButtons').empty().append(html);
    }

    Drupal.ckeditorToolbaInit();
});

;
(function ($) {

/**
 * Toggle the visibility of a fieldset using smooth animations.
 */
Drupal.toggleFieldset = function (fieldset) {
  var $fieldset = $(fieldset);
  if ($fieldset.is('.collapsed')) {
    var $content = $('> .fieldset-wrapper', fieldset).hide();
    $fieldset
      .removeClass('collapsed')
      .trigger({ type: 'collapsed', value: false })
      .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Hide'));
    $content.slideDown({
      duration: 'fast',
      easing: 'linear',
      complete: function () {
        Drupal.collapseScrollIntoView(fieldset);
        fieldset.animating = false;
      },
      step: function () {
        // Scroll the fieldset into view.
        Drupal.collapseScrollIntoView(fieldset);
      }
    });
  }
  else {
    $fieldset.trigger({ type: 'collapsed', value: true });
    $('> .fieldset-wrapper', fieldset).slideUp('fast', function () {
      $fieldset
        .addClass('collapsed')
        .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Show'));
      fieldset.animating = false;
    });
  }
};

/**
 * Scroll a given fieldset into view as much as possible.
 */
Drupal.collapseScrollIntoView = function (node) {
  var h = document.documentElement.clientHeight || document.body.clientHeight || 0;
  var offset = document.documentElement.scrollTop || document.body.scrollTop || 0;
  var posY = $(node).offset().top;
  var fudge = 55;
  if (posY + node.offsetHeight + fudge > h + offset) {
    if (node.offsetHeight > h) {
      window.scrollTo(0, posY);
    }
    else {
      window.scrollTo(0, posY + node.offsetHeight - h + fudge);
    }
  }
};

Drupal.behaviors.collapse = {
  attach: function (context, settings) {
    $('fieldset.collapsible', context).once('collapse', function () {
      var $fieldset = $(this);
      // Expand fieldset if there are errors inside, or if it contains an
      // element that is targeted by the URI fragment identifier.
      var anchor = location.hash && location.hash != '#' ? ', ' + location.hash : '';
      if ($fieldset.find('.error' + anchor).length) {
        $fieldset.removeClass('collapsed');
      }

      var summary = $('<span class="summary"></span>');
      $fieldset.
        bind('summaryUpdated', function () {
          var text = $.trim($fieldset.drupalGetSummary());
          summary.html(text ? ' (' + text + ')' : '');
        })
        .trigger('summaryUpdated');

      // Turn the legend into a clickable link, but retain span.fieldset-legend
      // for CSS positioning.
      var $legend = $('> legend .fieldset-legend', this);

      $('<span class="fieldset-legend-prefix element-invisible"></span>')
        .append($fieldset.hasClass('collapsed') ? Drupal.t('Show') : Drupal.t('Hide'))
        .prependTo($legend)
        .after(' ');

      // .wrapInner() does not retain bound events.
      var $link = $('<a class="fieldset-title" href="#"></a>')
        .prepend($legend.contents())
        .appendTo($legend)
        .click(function () {
          var fieldset = $fieldset.get(0);
          // Don't animate multiple times.
          if (!fieldset.animating) {
            fieldset.animating = true;
            Drupal.toggleFieldset(fieldset);
          }
          return false;
        });

      $legend.append(summary);
    });
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;
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
})(jQuery);;
(function($) {
    'use strict';

    $.ThemeAdmin = function() {
        // Élements commun
        this.elements = {
            body: $('body'),
        };

        // Defaults
        this.api = {
            module: 'hackathon-api'
        };

        return this;
    };
    $.ThemeAdmin.prototype = {
        init: function() {
            var self = this;

            self.pageFunction = {
                pageHome: 'front',
                nodeData: 'node-type-data',
                pageTaxonomyTerm: 'page-taxonomy-term'
            };

            // Pour toutes les pages
            self.pageAll();

            // Pour chaque page
            $.each(self.pageFunction, function(funcName, className) {
                if (self.elements.body.hasClass(className)) {
                    self[funcName]();
                }
            });
        },
        pageAll: function() {

        },

        /**
         * Page d'accueil
         */
        pageHome: function() {

        },

        /**
         * Page terme de taxonomie
         */
        pageTaxonomyTerm: function() {
            $.extend(this.elements, {
                sourcesFilter: $('#edit-field-thematique-datasources'),
                exportDataItem: $('#edit-field-thematique-datas').find('textarea')
            });

            this.sourcesFilterHandler();
        },
        sourcesFilterHandler: function() {
            var self = this;
            var sources = self.elements.sourcesFilter.find('input.form-checkbox');

            // Event
            sources.on('click', function() {
                var item = $(this);
                var itemContainer = item.closest('.form-item');
                self.exportTermDataHandler();

                if (item.prop('checked')) {
                    var source = item.val();

                    $.ajax({
                        dataType: 'json',
                        url: '/' + self.api.module + '/' + source + '/call/getBases',
                    }).done(function(data) {

                        // Template des bases
                        var basesContainer = $('<div>', {
                            'class': 'item-bases-container'
                        }).appendTo(itemContainer);

                        var bases = $('<ul>').templateAddCheckboxItems(data, {
                            type: 'base',
                            parent: source
                        }).appendTo(basesContainer);

                        // Templates des tables
                        var baseItem = bases.find('.item-base > input');

                        if (baseItem.length) {
                            baseItem.on('click', function() {
                                var item = $(this);
                                var baseContainer = item.closest('.item-base');
                                self.exportTermDataHandler();

                                if (item.prop('checked')) {
                                    var base = item.val();

                                    $.ajax({
                                        dataType: 'json',
                                        url: '/' + self.api.module + '/' + source + '/call/getTables/' + base
                                    }).done(function(data) {

                                        var tablesContainer = $('<div>', {
                                            'class': 'item-tables-container'
                                        }).appendTo(baseContainer);

                                        var tables = $('<ul>').templateAddCheckboxItems(data, {
                                            type: 'table',
                                            parent: source + '/' + base
                                        }).appendTo(tablesContainer);

                                        var tableItemInput = tables.find('.item-table > input');
                                        if (tableItemInput.length) {
                                            tableItemInput.on('click', function() {
                                                self.exportTermDataHandler();
                                            });
                                        }

                                    }).fail(function() {
                                        console.error('La récupération des tables n\'a pas fonctionné.');
                                    });
                                } else {
                                    baseContainer.find('.item-tables-container').remove();
                                }
                            });
                        }

                    }).fail(function() {
                        console.error('La récupération des bases n\'a pas fonctionné.');
                    });
                } else {
                    itemContainer.find('.item-bases-container').remove();
                }
            });
        },
        exportTermDataHandler: function() {
            var self = this;

            // Suppression de l'existant avant génération de l'export
            self.elements.exportDataItem.empty();

            // Export
            var exportData = {};
            self.elements.sourcesFilter.find('input[type="checkbox"]').each(function() {
                var checkbox = $(this);

                if (checkbox.prop('checked')) {
                    var type = checkbox.attr('data-type');
                    var parent = checkbox.attr('data-parent');
                    var value = checkbox.val();

                    if (type === 'source') {
                        exportData[value] = {};
                    } else if (type === 'base') {
                        exportData[parent][value] = [];

                    } else if (type === 'table') {
                        var parents = (parent.indexOf('/') !== -1) ? parent.split('/') : [];

                        if (parents.length && exportData[parents[0]][parents[1]] !== undefined) {
                            exportData[parents[0]][parents[1]].push(value);
                        }
                    }

                    self.elements.exportDataItem.html(JSON.stringify(exportData));
                }
            });
        },

        /**
         * Node data (fiche de donnée)
         */
        nodeData: function() {
            $.extend(this.elements, {
                dataThematic: $('#edit-field-data-thematic'),
                dataTables: $('#edit-field-data-tables'),
                dataColumns: $('#edit-field-data-columns'),
                exportDataItem: $('#edit-field-data-filters').find('textarea')
            });

            var options = {self: this};
            this.elements.dataThematic.find('select')
                .thematicSelectHandler(options)
                .on('change', function() {
                    options.self.elements.dataTables.find('.form-checkboxes').empty();
                    $(this).thematicSelectHandler(options);
                });
        },
        exportNodeDataHandler: function() {
            var self = this;
            var exportData = {};

            // Suppression de l'existant avant génération de l'export
            self.elements.exportDataItem.empty();

            // Tables
            self.elements.dataTables.find('input[type="checkbox"]').each(function() {
                var checkbox = $(this);

                if (checkbox.prop('checked')) {
                    var type = checkbox.attr('data-type');
                    var parent = checkbox.attr('data-parent');
                    var value = checkbox.val();

                    if (type === 'table') {
                        var parents = (parent.indexOf('/') !== -1) ? parent.split('/') : [];

                        if (parents.length) {
                            if (exportData[parents[0]] === undefined) {
                                exportData[parents[0]] = {};
                            }

                            exportData[parents[0]][parents[1]] = {};
                            exportData[parents[0]][parents[1]][value] = [];
                        }
                    }
                }
            });

            // Colonnes
            self.elements.dataColumns.find('input[type="checkbox"]').each(function() {
                var checkbox = $(this);

                if (checkbox.prop('checked')) {
                    var type = checkbox.attr('data-type');
                    var parent = checkbox.attr('data-parent');
                    var value = checkbox.val();

                    if (type === 'column') {
                        var parents = (parent.indexOf('/') !== -1) ? parent.split('/') : [];

                        if (parents.length && exportData[parents[0]][parents[1]] !== undefined && exportData[parents[0]][parents[1]][parents[2]] !== undefined) {
                            exportData[parents[0]][parents[1]][parents[2]].push(value);
                        }
                    }
                }
            });

            // Export dans le champs
            self.elements.exportDataItem.html(JSON.stringify(exportData));
        }
    };

    /**
     * onReady
     */
    $(document).ready(function() {
        new $.ThemeAdmin().init();
    });

    /**
     * Drupal Ajax Behaviors
     */
    Drupal.behaviors.admin = {
        attach: function (context, settings) {
            var themeAdmin = new $.ThemeAdmin();
        }
    };

    $.fn.thematicSelectHandler = function(options) {
        var item = $(this);
        var tid = item.val();

        $.ajax({
            dataType: 'json',
            url: '/hackathon-thematic-data/' + tid,
        }).done(function(data) {
            var tablesContainer = options.self.elements.dataTables.find('.form-checkboxes');
            var columnsContainer = options.self.elements.dataColumns.find('.form-checkboxes');
            var maxTables = parseInt(options.self.elements.dataTables.attr('data-max'));
            var countTables = 0;

            if (typeof data === 'object') {
                $.each(data, function(source, bases) {
                    // Source
                    $('<p>', {
                        'class': 'item-source',
                        html: source
                    }).appendTo(tablesContainer);
                    options.self.exportNodeDataHandler();

                    // Bases
                    if (typeof bases === 'object') {
                        var basesContainer = $('<div>', {
                            'class': 'item-bases'
                        });

                        // Pour chaque base
                        $.each(bases, function(base, tables) {
                            $('<p>', {
                                'class': 'item-base',
                                html: base
                            }).appendTo(basesContainer);

                            // Tables
                            var tables = $('<ul>').templateAddCheckboxItems(tables, {
                                type: 'table',
                                parent: source + '/' + base
                            }).appendTo(basesContainer);

                            // Checkbox event
                            var tablesCheckboxes = tables.find('.item-table > input');
                            tablesCheckboxes.on('click', function() {
                                var item = $(this);
                                var table = item.val();
                                var parent = item.attr('data-parent').split('/')[1];

                                // Compteur
                                if (item.prop('checked')) {
                                    countTables++;

                                    $.ajax({
                                        dataType: 'json',
                                        url: '/' + options.self.api.module + '/' + source + '/call/getColumnsName/' + parent + ',' + table
                                    }).done(function(data) {
                                        var itemContainer = $('<div>', {
                                            'class': 'item-container item-container-' + table
                                        });

                                        $('<p>', {
                                            'class': 'item-table',
                                            html: table
                                        }).appendTo(itemContainer);

                                        // Colonnes
                                        var columns = $('<ul>').templateAddCheckboxItems(data, {
                                            type: 'column',
                                            parent: source + '/' + parent + '/' + table,
                                            checkbox: {
                                                checked: true
                                            }
                                        }).appendTo(itemContainer);

                                        // Checkbox event
                                        var columnItemInput = columns.find('.item-column > input')
                                        if (columnItemInput.length) {
                                            columnItemInput.on('click', function() {
                                                options.self.exportNodeDataHandler();
                                            });
                                        }

                                        // Add
                                        itemContainer.appendTo(columnsContainer);
                                        options.self.exportNodeDataHandler();

                                    }).fail(function() {
                                        console.error('Impossible de récupérer le nom des colonnes de la table ' + table);
                                    });
                                } else if (countTables > 0) {
                                    countTables--;

                                    columnsContainer.find('.item-container-' + table).remove();
                                    options.self.exportNodeDataHandler();
                                }

                                // Activation/Désactivation
                                tablesCheckboxes.not(':checked').attr('disabled', (countTables === maxTables));
                            });
                        });

                        basesContainer.appendTo(tablesContainer);
                    }
                });
            } else {
                console.error('Les données ne sont pas au format JSON.');
            }
        }).fail(function() {
            console.error('Impossible de récupérer les données d\'une thématique');
        });
        return this;
    };

    $.fn.templateAddCheckboxItems = function(list, userOptions) {
        var container = $(this);

        // Options
        var options = {
            type: undefined,
            parent: undefined,
            checkbox: {
                checked: false
            }
        };
        $.extend(options, userOptions);
        if (options.type === undefined) {
            console.error('L\'option type est obligatoire.');
        }
        if (options.parent === undefined) {
            console.error('L\'option parent est obligatoire.');
        }

        // Liste
        if (typeof list === 'object' || (typeof list === 'array' && list.length)) {

            $.each(list, function(i, item) {
                var itemContainer = $('<li>', {
                    'class': 'item-' + options.type
                });

                $('<input>', {
                    type: 'checkbox',
                    name: 'item-' + options.type + '-' + item,
                    id: 'item-' + options.type + '-' + item,
                    'data-type': options.type,
                    'data-parent': options.parent,
                    checked: options.checkbox.checked,
                    value: item
                }).appendTo(itemContainer);

                $('<label>', {
                    for: 'item-' + options.type + '-' + item,
                    html: item
                }).appendTo(itemContainer);

                itemContainer.appendTo(container);
            });

        } else {
            console.error('Les données ne sont pas au format JSON.');
        }

        return this;
    };
})(jQuery);;

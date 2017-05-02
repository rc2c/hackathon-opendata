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

            var options = {self: this};
            var sources = this.elements.sourcesFilter.find('input.form-checkbox');

            if (this.elements.exportDataItem.html() === '') {
                sources.filter(':checked').each(function() {
                    $(this).sourcesFilterHandler(options);
                });
                sources.on('click', function() {
                    $(this).sourcesFilterHandler(options);
                });
            } else {
                this.importTermDataHander();
            }
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
        importTermDataHander: function() {
            var self = this;
            var data = JSON.parse(self.elements.exportDataItem.html());

            console.log(data);

            if (typeof data === 'object') {
                // Sources
                $.each(data, function(source, bases) {
                    self.elements.sourcesFilter.find('input[value="' + source + '"]').prop('checked', true).sourcesFilterHandler({self: self});
                });

                // Bases
                $(document).ajaxComplete(function(event, xhr, settings) {
                    $.each(data, function(source, bases) {
                        if (settings.url.indexOf('/' + self.api.module + '/' + source + '/call/getBases') !== -1) {
                            $.each(bases, function(base, tables) {
                                self.elements.sourcesFilter.find('input[value="' + base + '"]').prop('checked', true).triggerHandler('click');
                            });
                        }

                        $.each(bases, function(base, tables) {
                            $.each(tables, function(index, table) {
                                self.elements.sourcesFilter.find('input[value="' + table + '"]').prop('checked', true);
                                self.exportTermDataHandler();
                            });
                        });
                    });
                });
            }
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

    $.fn.sourcesFilterHandler = function(options) {
        var item = $(this);
        var itemContainer = item.closest('.form-item');
        options.self.exportTermDataHandler();

        if (item.prop('checked')) {
            var source = item.val();

            $.ajax({
                dataType: 'json',
                url: '/' + options.self.api.module + '/' + source + '/call/getBases',
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
                        options.self.exportTermDataHandler();

                        if (item.prop('checked')) {
                            var base = item.val();

                            $.ajax({
                                dataType: 'json',
                                url: '/' + options.self.api.module + '/' + source + '/call/getTables/' + base
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
                                        options.self.exportTermDataHandler();
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

        return this;
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

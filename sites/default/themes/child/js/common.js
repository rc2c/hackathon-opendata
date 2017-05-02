(function($) {
    'use strict';

    $.Common = function() {};

    $.Common.prototype = {
        /**
         * Isotope avec filtres
         * 
         * @param object common
         * @param object isotopeOptions
         * @param jQuery selector list
         * @param jQuery selector filters
         */
        isotope: function() {
            var self = this;
            var filtersSelection = [];

            // Init
            if (self.list.length) {
                var options = {
                    itemSelector: '.list-item',
                    percentPosition: true,
                    masonry: {
                        columnWidth: '.list-item'
                    }
                };
                $.extend(options, self.isotopeOptions);
                self.list.isotope(options);

                $(window).load(function(){
                    self.list.isotope();
                });

                // Filter
                if (self.filters !== undefined && self.filters.length) {
                    // A l'init on decoche tout
                    self.filters.find('input').prop('checked', false);

                    // Au clic, on applique le filtre
                    self.filters.find('input').on('click', function() {
                        var input = $(this);
                        var value = input.val();
                        var action = (input.prop('checked')) ? 'push' : 'unset';

                        // En fonction du type d'input, on gère l'affichage des sélections
                        if (input.is(':radio')) {
                            filtersSelection = [];
                            var formItem = input.closest('.form-item');
                            var isChecked = (formItem.hasClass('is-selected')) ? true : false;

                            self.filters.find('.form-item').removeClass('is-selected')
                                .find('input').prop('checked', false);
                            
                            if (isChecked) {
                                action = 'unset';
                            } else {
                                input.closest('.form-item').addClass('is-selected')
                                    .find('input').prop('checked', true);
                            }
                        } else {
                            var result = input.closest('.form-item').toggleClass('is-selected');
                            
                            input.prop('checked', (result.hasClass('is-selected')) ? true : false);
                        }


                        self.common.isotopeFilter.call({
                            common: self.common,
                            filtersSelection: filtersSelection,
                            list: self.list,
                            action: action,
                            value: value
                        });
                    });

                    // URL préfiltrées : S'il y a un hash (#tid-00) dans l'url, on filtre automatiquement
                    if (location.hash) {
                        var tid = location.hash.substring(5); // Enlève "#tid-"
                        
                        // Case à cocher
                        self.filters.find('input').filter(function(index, element) {
                            if ($(element).val() === tid) {
                                return true;
                            }
                            return false;
                        })
                            .prop('checked', true)
                            .closest('.form-item')
                                .addClass('is-selected');

                        self.common.isotopeFilter.call({
                            common: self.common,
                            filtersSelection: filtersSelection,
                            list: self.list,
                            action: 'push',
                            value: tid
                        });
                    }
                }
            }

            return self;
        },
        isotopeFilter: function() {
            var self = this;

            // unset/push valeur
            if (self.action === 'unset') {
                self.common.isotopeUnsetFilter(self.filtersSelection, '.tid-' + self.value);
            } else {
                self.filtersSelection.push('.tid-' + self.value);
            }

            // Filtre
            self.list.isotope({
                filter: self.filtersSelection.join(', ')
            });
        },
        isotopeUnsetFilter: function(array, val) {
            var index = array.indexOf(val);
            if (index > -1) {
                array.splice(index, 1);
            }
        },

        /**
         * Gestion des accordéons
         * 
         * @param jQuery selector list
         */
        accordion: function() {
            var self = this;

            self.list.find('.accordion-toggle').on('click', function() {
                var element = $(this);
                var listItem = element.closest('.accordion');

                self.common.accordionToggleItem.call({
                    item: listItem,
                    list: self.list,
                    onToggle: self.onToggle
                });
            });
        },
        /**
         * Toggle un item d'un accordéon
         * 
         * @param jQuery selector item     Sélecteur de l'item à ouvrir/fermer
         * @param jQuery selector list     Sélecteur de la liste des items
         * @param function        onToggle Callback à executé une fois l'élément ouvert/fermé
         */
        accordionToggleItem: function() {
            var self = this;

            self.item
                .toggleClass('is-open')
                .find('.accordion-content').slideToggle('fast', function() {
                    // User callback
                    if (self.onToggle !== undefined) {
                        self.onToggle.call({
                            list: self.list,
                            currentElement: self.item
                        });
                    }
                });
        },

        /**
         * Compteur from -> to
         * 
         * object element -> Element jquery
         * int duration -> Durée en ms de chaque incrémentation
         * int iterations -> Nombre d'itérations avant 
         * int delay -> Délai avant le déclenchement du compteur
         */
        counter: function() {
            var self = this;
            var from = 0,
                to = parseInt(self.element.text()),
                count = 0,
                onEnd = self.onEnd;

            self.element.text(from);

            setTimeout(function() {
                var interval = setInterval(function() {
                    if (count === to) {
                        clearInterval(interval);

                        if (onEnd !== undefined) {
                            onEnd.call({
                                counter: self,
                                count: count
                            });
                        }
                    }

                    self.element.text(count);
                    count++;
                }, self.duration);
            }, self.delay);
        }
    };
})(jQuery);
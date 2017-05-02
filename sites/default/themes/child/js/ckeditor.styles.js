/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/*
 * This file is used/requested by the 'Styles' button.
 * The 'Styles' button is not enabled by default in DrupalFull and DrupalFiltered toolbars.
 */
if (typeof(CKEDITOR) !== 'undefined') {
    CKEDITOR.addStylesSet( 'drupal',
    [   
        // FORMATS
        { name : 'Paragraphe', element : 'p' },
        { name : 'Titre 2', element : 'h2' },
        { name : 'Titre 3', element : 'h3' },
        { name : 'Titre 4', element : 'h4' },

        // STYLES
        //{ name : 'Chiffre clé', element : 'p', attributes : { 'class' : 'key-figure' } },
        // { name : 'Bouton', element : 'a', attributes : { 'class' : 'btn' } },
        // { name : 'Bouton rouge', element : 'a', attributes : { 'class' : 'btn btn-primary' } },
        //{ name : 'Mise en avant', element : 'p', attributes : { 'class' : 'push' } },
        //{ name : 'Mise en avant liste', element : 'ol', attributes : { 'class' : 'push' } },

        // ACCORDEON
        //{ name : 'Accordéon-Titre', element : 'div', attributes : { 'class' : 'inlineAccordion-title' } },
        //{ name : 'Accordéon-Contenu', element : 'div', attributes : { 'class' : 'inlineAccordion-content' } }
    ]);
}
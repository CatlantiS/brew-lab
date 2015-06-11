'use strict'

angular.module('brewApp.directives')
    .directive('recipe', function() {
        return {
            link: function() {
                $('#recipeYeastType').typeahead({
                    name: 'yeastType',
                    local: ['Safale US-56 Ale Yeast']
                });
            }
        };
    });
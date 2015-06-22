'use strict';

angular.module('brewApp.directives')
    .directive('brewDropdown', function() {
        return {
            restrict: 'AE',
            link: function(scope, element) {
                $(element + '.dropdown-menu li a').click(function() {
                    var selectedText = $(this).text(),
                        dropdown = $(this).parents('.btn-group'),
                        //If for whatever reason, the dropdown toggle has more than two buttons, this will be ambiguous.
                        button = dropdown.find('button:not(.dropdown-toggle)');

                    //Have not tested this. But if the dropdown is just a toggle button, then use this.
                    if (button.length == 0)
                        button = dropdown.find('.dropdown-toggle');

                    button.html(selectedText);

                    //Let the scope know a value has been selecting.  Will need to listen for this in controller to get selected value.
                    scope.$broadcast('dropdownClicked', { element: element, selectedValue: selectedText });
                });
            }
        };
    });

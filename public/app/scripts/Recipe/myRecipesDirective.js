(function() {
    'use strict';

    angular.module('brewApp.directives')
        .directive('myRecipes', ['$compile', 'Helper', myRecipes]);

    function myRecipes($compile, Helper) {
        function link(scope, e, a, ctrl) {
            var table = $("#myRecipesTable");

            table.on('click','.row-edit', function() {
                var recipeId = $(this).attr('data-id');

                ctrl.editRecipe(recipeId);
            });

            table.on('click','.row-delete', function() {
                var recipeId = $(this).attr('data-id');

                ctrl.deleteRecipe(recipeId);
            });

            ctrl.prepareData = function() {
                ctrl.getMyRecipes();

                return {
                    responsive: true,
                    bLengthChange: false,
                    data: ctrl.recipes,
                    columns: [
                        {title: 'Name', data: 'name'},
                        {title: 'Volume', data: 'volume'},
                        {title: 'Units', data: 'units'},
                        {title: 'Yeast', data: 'yeastType'},
                        {title: ''},
                        {title: ''}
                    ],
                    columnDefs: [
                        {
                            targets: 4,
                            data: 'id',
                            render: function (d, a, m, n) {
                                return Helper.getRowEditIconHtml(m.id);
                            },
                            createdCell: function (g, r, a, p, e) {
                                $compile(g)(scope);
                            },
                            orderable: false
                        },
                        {
                            targets: 5,
                            data: 'id',
                            render: function (d, a, m, n) {
                                return Helper.getRowDeleteIconHtml(m.id);
                            },
                            createdCell: function (g, r, a, p, e) {
                                $compile(g)(scope);
                            },
                            orderable: false
                        }
                    ]
                };
            }
        }

        return {
            restrict: 'A',
            controller: 'MyRecipesCtrl',
            controllerAs: 'ctrl',
            link: link
        };
    }
})();

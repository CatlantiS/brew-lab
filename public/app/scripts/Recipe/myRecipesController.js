(function() {
    'use strict';

    angular.module('brewApp.controllers')
        .directive('myRecipes', myRecipes)
        .controller('MyRecipesCtrl', ['$compile', '$scope', 'User', myRecipesController]);

    function myRecipes() {
        function link(scope, element, attrs, ctrl) {
            var table = $("#myRecipesTable");

            table.on('click','.row-edit', function() {
                var recipeId = $(this).attr('data-id');

                ctrl.editRecipe(recipeId);
            });

            table.on('click','.row-delete', function() {
                var recipeId = $(this).attr('data-id');

                ctrl.deleteRecipe(recipeId);
            });
        }

        return {
            restrict: 'A',
            controller: 'MyRecipesCtrl',
            link: link
        };
    }

    function myRecipesController($compile, $scope, User) {
        /* jshint validthis: true */
        var self = this;

        self.loading = false;

        self.editRecipe = function(id) {
            alert('Edit ' + id);
        };

        self.deleteRecipe = function(id) {
            alert('Delete ' + id);
        };

        $scope.prepareData = function() {
            self.loading = true;

            return User.getRecipes().then(function(recipes) {
                self.loading = false;

                return {
                    responsive: true,
                    bLengthChange: false,
                    data: recipes,
                    columns: [
                        { title: 'Name', data: 'name' },
                        { title: 'Volume', data: 'volume' },
                        { title: 'Units', data: 'units' },
                        { title: 'Yeast', data: 'yeastType' },
                        { title: '' },
                        { title: '' }
                    ],
                    columnDefs: [
                        {
                            targets: 4,
                            data: 'id',
                            render: function (d, a, m, n) {
                                return '<a class="row-edit" href="javascript:void(0);" data-id="' + m.id + '"><i class="fa fa-pencil-square-o"></i></a>';
                            },
                            createdCell: function (g, r, a, p, e) {
                                $compile(g)($scope);
                            },
                            orderable: false
                        },
                        {
                            targets: 5,
                            data: 'id',
                            render: function (d, a, m, n) {
                                return '<a class="row-delete" href="javascript:void(0);" data-id="' + m.id + '"><i class="fa fa-trash"></i></a>';
                            },
                            createdCell: function (g, r, a, p, e) {
                                $compile(g)($scope);
                            },
                            orderable: false
                        }
                    ]
                };
            });
        };
    };
})();


(function() {
    'use strict';

    angular.module('brewApp.controllers')
        .controller('MyRecipesCtrl', ['$compile', '$scope', 'User', myRecipesController]);

    function myRecipesController($compile, $scope, User) {
        /* jshint validthis: true */
        var self = this;

        self.loading = false;

        self.editRecipe = function(id) {
            alert('Edit ' + id);
        };

        self.deleteRecipe = function(id) {
            User.deleteRecipe(id).then(function(recipes) {
                $scope.data = recipes;
            });
        };

        $scope.prepareData = function() {
            self.loading = true;

            return User.getRecipes().then(function(recipes) {
                self.loading = false;

                $scope.data = recipes;

                return {
                    responsive: true,
                    bLengthChange: false,
                    data: $scope.data,
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
                                return '<a class="row-edit" href="javascript:void(0);" data-id="' + m.id + '" title="Edit"><i class="fa fa-pencil-square-o"></i></a>';
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
                                return '<a class="row-delete" href="javascript:void(0);" data-id="' + m.id + '" title="Delete"><i class="fa fa-trash brew-delete"></i></a>';
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


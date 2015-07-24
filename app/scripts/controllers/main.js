'use strict';

/**
 * @ngdoc function
 * @name amiiboListApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the amiiboListApp
 */
angular.module('amiiboListApp')
  .controller('MainCtrl', function ($scope, listService) {
    $scope.options = [
      'non recherché',
      'peut-être plus tard',
      'recherché',
      'obtenu'
    ];
    listService.getAmiiboList()
        .query()
        .$promise
        .then(function(res) {
          $scope.amiibo = res;
        });;
  });

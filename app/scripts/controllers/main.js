'use strict';

/**
 * @ngdoc function
 * @name amiiboListApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the amiiboListApp
 */
angular.module('amiiboListApp')
  .controller('MainCtrl', function ($scope, listService, sluggifierFilter) {
    $scope.options = [
      '',
      'non recherché',
      'recherché',
      'peut-être plus tard',
      'obtenu'
    ];
    
    $scope.filter_serie = null;
    $scope.series = [];
    $scope.search = '';
    $scope.orderBy = '';
    
    listService.getAmiiboList()
        .query()
        .$promise
        .then(function(res) {
          $scope.amiibo = res;
          var series_id = [];
          for (var i = 0; i < $scope.amiibo.length; i++){
              if (series_id.indexOf($scope.amiibo[i].serie_acronym) == -1){
                  series_id.push($scope.amiibo[i].serie_acronym);
                  $scope.series.push({
                      id: $scope.amiibo[i].serie_acronym,
                      name: $scope.amiibo[i].serie
                  });
              }
          }
        });;
  });

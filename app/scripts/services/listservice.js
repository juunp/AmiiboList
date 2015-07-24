'use strict';

/**
 * @ngdoc service
 * @name amiiboListApp.listService
 * @description
 * # listService
 * Service in the amiiboListApp.
 */
angular.module('amiiboListApp')
  .service('listService', function ($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
      return {
        getAmiiboList: function(){
            return $resource('res/amiibo.json');
        }  
      };
  });

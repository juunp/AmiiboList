'use strict';

/**
 * @ngdoc filter
 * @name amiiboListApp.filter:sluggifier
 * @function
 * @description
 * # sluggifier
 * Filter in the amiiboListApp.
 */
angular.module('amiiboListApp')
  .filter('sluggifier', function (removeDiacritics) {
    return function (input) {
        input = removeDiacritics.replace(input);
        var result = '';
        for (var i = 0; i < input.length; i++){
            result += input[i].replace(/([\W])/, '_');            
        }
      return result.toLowerCase();
    };
    
});

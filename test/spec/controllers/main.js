'use strict';

describe('Controller: MainCtrl', function () {
  // load the controller's module

  var $q,
      mockListService,
      $rootScope,
      $scope,
      queryDeferred,
      mockListResponse = [{
        "name": "Marie",
        "number": null,
        "serie": "Série Animal Crossing",
        "serie_acronym": "acc",
        "sellingDate": "4ème trimestre 2015",
        "out": false
    },
    {
        "name": "Falco",
        "number": 52,
        "serie": "Série Super Smash Bros.",
        "serie_acronym": "ssb",
        "sellingDate": "inconnue",
        "out": false
    }];
  beforeEach(module('amiiboListApp'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$q_, _$rootScope_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
  }));
  
  beforeEach(inject(function($controller){
    $scope = $rootScope.$new();
      
    mockListService = {
        getAmiiboList: function() {
          queryDeferred = $q.defer();
          return {$promise: queryDeferred.promise};
        }
    };
    
    spyOn(mockListService, 'getAmiiboList').and.callThrough();
    
    
    $controller('MainCtrl', {
      // place here mocked dependencies
      '$scope': $scope,
      'listService': mockListService
    });
  }));
  
  
    it('should have options as an array of 5 elements at first', function(){
        expect($scope.options.length).toBe(5)
    });
    
    it('should have filter_series as null at first', function(){
        expect($scope.filter_serie).toBeNull();
    });
    
    it('should have series to be an array of 0 elements at first', function(){
        expect($scope.series.length).toBe(0);
    });
    
    it('should have search to be an empty string at first', function(){
        expect($scope.search).toBe('');
    });
    
    it('should have orderBy to be an empty string at first', function(){
        expect($scope.orderBy).toBe('');
    });
    
    describe('ListService.query', function(){
        beforeEach(function(){
            queryDeferred.resolve(mockListResponse);
            $rootScope.$apply();
        });
        
        it('should query the listService', function(){
            expect(mockListService.getAmiiboList).toHaveBeenCalled();
        });
        
        it('should set the response from the listService to $scope.amiibo', function(){
            expect($scope.amiibo).toEqual(mockListResponse);
        });
        
        it('should set $scope.series to be populated', function(){
            expect($scope.series.length).not.toBe(0);
        })
    })
});

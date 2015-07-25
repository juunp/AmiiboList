'use strict';

describe('Controller: MainCtrl', function () {
  // load the controller's module

  var MainCtrl, $q, mockListService, mockListResponse, $rootScope, $scope;
  
  beforeEach(module('amiiboListApp'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$q_, _$rootScope_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
  }));
  
  beforeEach(inject(function($controller){
    $scope = $rootScope.$new();
      
    mockListService = {
        query: function() {
          queryDeferred = $q.defer();
          return {$promise: queryDeferred.promise};
        }
    };
    
    spyOn(mockListService, 'query').and.callThrough();
    
    
    MainCtrl = $controller('MainCtrl', {
      // place here mocked dependencies
      '$scope': $scope,
      'mockService1': mockListService
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
});

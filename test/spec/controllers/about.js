'use strict';

describe('Controller: AboutCtrl', function () {

  // load the controller's module
  beforeEach(module('amiiboListApp'));

  var AboutCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    AboutCtrl = $controller('AboutCtrl', {
      // place here mocked dependencies
    });
  }));

});

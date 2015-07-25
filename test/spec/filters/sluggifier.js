'use strict';

describe('Filter: sluggifier', function () {

  // load the filter's module
  beforeEach(module('amiiboListApp'));

  // initialize a new instance of the filter before each test
  var sluggifier;
  beforeEach(inject(function ($filter) {
    sluggifier = $filter('sluggifier');
  }));

  it('should return the input with 0 spaces', function () {
    var text = 'a ngul arjs';
    var spaces_count = sluggifier(text).indexOf(' ');
    expect(spaces_count).toBe(-1);
  });
  
  it('should return the input without accentuated characters (and replace ç with c)', function(){
      var text = 'àâäéèêëïîôöûüùç';
      var result = 'aaaeeeeiioouuuc';
      expect(sluggifier(text)).toBe(result);
  })
  
  it('should replace every not alphanumeric character by a "_"', function(){
      var text = '&-^^%!/.*$';
      var result = '';
      for(var i = 0; i < text.length; i++){
          result += '_';
      }
      expect(text.length).toBe(result.length);
      expect(sluggifier(text)).toBe(result);
  })

});

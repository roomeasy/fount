angular.module('fount.category', [])

.controller('CategoryController', function ($scope, $http, $window, $location, CurrentCategory){

  $scope.categories = {};

  $scope.getCategories = function(){

    // Simple GET request example
    $http.get('api/v1/categories').
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.categories = data;
        data.forEach(function(category){
          var data = {
            id : category.id
          }

          $http.post('api/numberofsubcategories', data)
          .then(function(results){
            category.count = results.data.length;
          })
        })
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('error');
        console.log(data);
      });
  }

  $scope.updateCategory = function(categoryObj){
    CurrentCategory.category = categoryObj.category;
  }

  $scope.getCategories();

  $scope.animate = function(index){
    var pointer = angular.element('#cat'+index)
    // console.log(pointer.attr('class'))
      .removeClass('fadeIn')
      .addClass('animated pulse');
  }

  $scope.deanimate = function(index){
    angular.element('#cat'+index).removeClass('animated pulse');
  }

  $scope.catId = function(index){
    return "cat" + index;
  }

  $scope.initAnimate = function(index){
    // console.log(index);
    var pointer = angular.element('#cat'+index).removeClass('animated fadeIn')
  }
});

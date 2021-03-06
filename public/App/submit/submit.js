angular.module('fount.submit', [])

.controller('SubmitController', function($scope, $http){
  $scope.subcategories = [];

  $scope.post = {
    title: '',
    url: '',
    subcat: {
      subcategory_id: null,
      subcategory: '',
      parentCategory_id: null,
      parentCategory: ''
    }
  }

  $scope.getSubcats = function(){
    $http.get('api/v1/subcategories/all').
      success(function(data, status, headers, config) {
        $scope.subcategories = data;
      }).
      error(function(data, status, headers, config) {
        console.log('error');
        console.log(data);
      });
  }

  $scope.submitPost = function(){
    var message = {
      title: $scope.post.title,
      url: $scope.post.url,
      user_id: 1,
      subcat_id: $scope.post.subcat.subcategory_id
    }

    $http.post('api/v1/submit', message).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(data);
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log("error");
        console.log(data);
      });
  }

  $scope.getSubcats();

});

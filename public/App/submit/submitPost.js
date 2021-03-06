angular.module('fount.submitPost', [])

.controller('SubmitPostController', function($scope, $http, $state, $rootScope, CurrentCategory, AuthFactory){
  $scope.isAuth = AuthFactory.authStatus;
  $scope.subCategories = [];

  $scope.category = CurrentCategory.category;
  $scope.subCategory = CurrentCategory.subCategory;

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

  $scope.urlWarning = true;
  $scope.validateUrl = function() {
    if(!/^http:\/\//.test($scope.post.url)) {
      $scope.urlWarning = true;
    } else {
      $scope.urlWarning = false;
    }
  }

  $scope.getSubcats = function(){
    $http.get('/myfollows')
    .success(function(data) {
      console.log(data);
    })
    .error(function(data) {
      console.log('error', data);
    })

    $http.get('api/v1/subcategories/all').
      success(function(data, status, headers, config) {
        $scope.subCategories = data;
      }).
      error(function(data, status, headers, config) {
        console.log('error');
        console.log(data);
      });
  }

  $scope.submitNewPost = function(){
    if($scope.urlWarning) return;

    var message = {
      title: $scope.post.title,
      url: $scope.post.url,
      subcat_id: CurrentCategory.subCategoryId,
    }

    // if(/^http:\/\//.test(message.url))
    $http.post('api/v1/submit', message).
      then(function(data, status, headers, config){
        $state.go("index.subcategories.results",
          { category: $scope.category,
            subcategory: $scope.subCategory,
          });
      });
      // success(function(data, status, headers, config) {
      //   // this callback will be called asynchronously
      //   // when the response is available
      //   console.log(data);
      // }).
      // error(function(data, status, headers, config) {
      //   // called asynchronously if an error occurs
      //   // or server returns response with an error status.
      //   console.log("error");
      //   console.log(data);
      // });


  }

  $scope.getSubcats();

});

angular.module('fount.nav', [])

.controller('NavController', function($scope, $rootScope, $window, $http, AuthFactory){
  $scope.isAuth = AuthFactory.authStatus;
  AuthFactory.getAuth()

  $scope.logout = function(){
    $http.get('/logout')
    .success(function(data) {
      AuthFactory.getAuth();
      console.log(data);
      $scope.message = data.message;
      console.log($scope.message);
    })
    .error(function(err){
      throw err;
    })
  }

  $scope.clearSearch = function(){
    $rootScope.searchForm.content = "";
  }
});

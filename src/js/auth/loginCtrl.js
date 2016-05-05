angular.module('newMaranha.auth')

.controller('LoginCtrl', ['$scope', 'Login', '$location', 'Session',
    function($scope, Login, $location, Session) {

  $scope.loginData = {};
  $scope.loginData.username = ''; 
  $scope.loginData.password = '';

  $scope.login = function(){
    Login.attempt($scope.loginData, successLogin, errorLogin);
  };

  function successLogin(res){
    //get de user 
    Profile.get(function(data){
      Session.set(data); //save in localstorage
      //$location.path('');
    }, function(data){
      console.warn(data);
    });
  }

  function errorLogin(res, status){
    $ionicLoading.hide();
    alert(res);
    alert(status);
  }
}]);

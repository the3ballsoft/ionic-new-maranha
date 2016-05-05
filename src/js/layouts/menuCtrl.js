angular.module('newMaranha.layouts', [])

.controller('MenuCtrl', ['$scope', '$location', 'Session',
            function($scope, $location, Session) {

  $scope.user = Session.get();

  $scope.loguout = function(){
    console.info('saliendo');
    Session.destroy();
    $location.path('/');
  };

}]);

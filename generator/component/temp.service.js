angular.module('<%= name %>', [])

.service('<%= upCaseName %>', ['$http', function($http){
  this.all = function(){
    return $http.get('')
  }
}])

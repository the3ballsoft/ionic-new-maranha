angular.module('newMaranha.auth', [])

.service('Login', ['$http', '$ionicLoading','CONFIG', function($http, $ionicLoading, CONFIG){
    var url1 = CONFIG.url+'auth/login';

    this.handleError = function(res){
      console.warn(res);
    };

    /* @method dateFormat 
     * @description devuelve un string de fecha en formato DD/MM/YYYY 
     * @param string Fecha */
    this.dateFormat = function(date){
      var year = date.getFullYear(),
          month = (1 + date.getMonth()).toString(),
          day = date.getDate().toString();
      
      month = month.length > 1 ? month : '0' + month;
      day = day.length > 1 ? day : '0' + day;

      return (day + "/" + month + "/" + year);
    };

    /* @method generateValidationUrl 
     * @description devuelve un objeto con la url para realizar la validacion 
     * en el sistema y el token generado. la url sigue el siguiente patron: 
     * /validacion/código_de_estudiante/password/token_de_seguridad
     * @param integer cod,  @param string password */
    this.generateValidationUrl= function(cod, password){
      /*
       *Cadena del token conformada por: 
       *fecha+cadena_de_caracteres+clave+ cadena_de_caracteres+código_estudiante
       *•	Fecha: formato DD/MM/YYYY
       *•	Cadena de caracteres: -.-
       *•	Clave: test@2015_
       * EJEMPLO: MD5(01/01/2000-.-test@2015_-.-2001114000) = 06075F5BF3B6C3AA2F81748FCC4E6C0A
       */
      var cad = "-.-", 
          date = this.dateFormat(new Date()),
          hash = null;    
      hash = md5(date + cad + password + cad + cod);

      return {
        url   : (CONFIG.API_URL + "validacion" + "/" + cod + "/" + password + "/" + hash), 
        token : hash
      };
    };

    /*
     * @method attempt
     * @description Determina si la combinacion cod/password es correcta, si es correcta se 
     * almacena el token y se procede a terminar el proceso de logueo.
     * @param object userData, @param function callback, @param function error
     */
    this.attempt = function(data, callback, error){
      //var validationData = this.generateValidationUrl(data.cod, data.password);

      var userData = {codigo : data.cod+"", password : data.password+""};
      return $http.post(url1, userData).success(callback).error(error);
    };
}])
.service('Session', [ function(){
    this.ActiveUser = null;
    this.set = function(user){
        window.localStorage.setItem("AyreUser", JSON.stringify(user));
        this.ActiveUser = user;
    }
    this.get = function(){
        if(this.activeUser){
            return this.activeUser;
        }
        return JSON.parse(window.localStorage.getItem("AyreUser"));
    }
    this.destroy = function(){
        this.activeUser = null;
        window.localStorage.setItem("AyreUser", null);
        window.localStorage.setItem("AyreToken", null);
    }

    this.getToken = function(token){
        return window.localStorage.getItem("AyreToken");
    }

    this.setToken = function(token){
        window.localStorage.setItem("AyreToken", JSON.stringify(token));
    }

    this.syncToken =  function(){
    }

    this.checkToken = function(token){
        token = window.localStorage.getItem("AyreToken");
        if(token != undefined && token != null && token != "null"){
          return true 
        }
        return false;
    }

}]);

angular.module('usuarios',['angularModalService'])

.factory("flash", function($rootScope) {

  return {

    pop: function(message) {
      switch(message.type) {
        case 'success':
          toastr.success(message.body, message.title);
          break;
        case 'info':
          toastr.info(message.body, message.title);
          break;
        case 'warning':
          toastr.warning(message.body, message.title);
          break;
        case 'error':
          toastr.error(message.body, message.title);
          break;
      }
    }
  };
})


.controller('UsuariosCtrl', function($scope, $http, ModalService){

	angular.element(document).ready(function () {

    	$scope.selectUsuarios();

	});

	$scope.newUser = function(){
		// Debes proveer un controlador y una plantilla.
		ModalService.showModal({
			templateUrl: "nuevoUsuario.html",
      		controller: "modalCtrl"
		}).then(function(modal){
			modal.close.then(function(result){
				// Una vez que el modal sea cerrado, la libreria invoca esta función
        		// y en result tienes el resultado.
        		
        		$scope.resultadoModal = result;
        		$scope.selectUsuarios();
			})
		})
	};

	//La parte del select donde mostramos los datos en la tabla
	$scope.selectUsuarios = function(){
		angular.element($("#spinerContainer")).css("display", "block");
		$http.get('../models/selectUsuarios.php').success(function(data){
			if(data == "error"){
				$scope.usuarios = [];
			}else{
				$scope.usuarios = data;
				if(data.length > 0){
					var topbar = angular.element($(".navbar-default")).innerHeight();
		 			var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
		 			var formGroup = angular.element($(".form-group")).innerHeight();
	        		var table = angular.element($(".table-responsive"));
					var heightTable = window.outerHeight - topbar - navbar  - formGroup - 250;
					table.css("maxHeight", heightTable);

					var heightPanelInfo = window.outerHeight - topbar - navbar - 150;
					var panelInfo = angular.element($(".panel-info"));
			
					//panelInfo.css("height", heightPanelInfo);
					
					//Como agregar clases con angularjs
					//table.addClass('customClass');
				}
			}
			angular.element($("#spinerContainer")).css("display", "none");
		});
	};
	

	//Ordenamos de forma ascendente o descendente los datos
	$scope.ordenarPor = function(orden){
		$scope.ordenSeleccionado = orden;
	};

	//Abrimos el modal para modificar y recibimos los datos a ser modificados
	$scope.modificar = function(usuario){
		var usuario = usuario;
		
		ModalService.showModal({
			templateUrl: "modificarUsuario.html",
			controller: "modificarCtrl",
			 inputs: {
					id: usuario.idUser,
    			nombre: usuario.nombre,
    			apellido: usuario.apellido,
    			user: usuario.User,
    			pass: usuario.Pass,
    			idRoles: usuario.rolId,
    			rol: usuario.rolId,
    			idSucursal: usuario.idSucursal,
    			sucursal: usuario.Sucursal
  			}
		}).then(function(modal){
			modal.close.then(function(result){
				// $scope.resultadoModal = result;
				$scope.selectUsuarios();
			})
		})
		
	};

	//Funcion que se encarga de eliminar un registro
	$scope.eliminar = function(usuario){
		var usuario = usuario;
		
		ModalService.showModal({
			templateUrl: "eliminarUsuario.html",
			controller: "eliminarCtrl",
			inputs: {
				id: usuario.idUser,
				nombre: usuario.nombre
			}
		}).then(function(modal){
			modal.close.then(function(result){
				$scope.selectUsuarios();
			})
		})
	};

	
})

.controller('eliminarCtrl', function($scope, close, $http, id, nombre, flash){

	$scope.cerrarModal = function(){
		close();
	};
	$scope.eliminarUsuario = function(){

		var model = {
			idUsuario: id,
			nombre: nombre
		};
		angular.element($("#spinerContainer")).css("display", "block");
		$http.post("../models/eliminarUsuarios.php", model)
		.success(function(res){
			close();
			angular.element($("#spinerContainer")).css("display", "none");
			if(res == "error"){
				$scope.msgTitle = 'Error';
		    	$scope.msgBody  = 'Ha ocurrido un error!';
		    	$scope.msgType  = 'error';
		 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
			}else{
				$scope.msgTitle = 'Exitoso';
		    	$scope.msgBody  = res;
		    	$scope.msgType  = 'success';
		 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});				
			}			
		});
	};
})

	//El controller del modal modificar totalmente independiente de la pagina principal (clientes)
.controller('modificarCtrl', function($scope, close, $http, id, nombre, apellido, user,
pass, idRoles, rol, idSucursal, sucursal, flash){
	var myRol;
	angular.element($("#spinerContainer")).css("display", "block");
	$http.get('../models/selectRoles.php').success(function(data){
		$scope.roles = data;
		myRol = {"idRoles":idRoles, "Nombre":rol};
		$scope.myRol = myRol; 
	});
	var mySucursal;
	angular.element($("#spinerContainer")).css("display", "block");
	$http.get('../models/selectSucursales.php').success(function(data){
		angular.element($("#spinerContainer")).css("display", "none");
		var modalHeader = angular.element($(".modal-header")).innerHeight();
	 	var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
	 	var modalFooter = angular.element($(".modal-footer")).innerHeight();
	  var modalBody = angular.element($(".modal-body"));
		var contentHeight = window.outerHeight - modalHeader - modalFooter  - navbar - 250;
		modalBody.css("maxHeight", contentHeight);
		$scope.sucursales = data;
		mySucursal = {"idSucursal":idSucursal, "Nombre":sucursal};
		$scope.mySucursal = mySucursal; 
	});
	$scope.idUsuario = id;
	$scope.nombre = nombre;
	$scope.apellido = apellido;
	$scope.user = user;
	$scope.pass = pass;
	$scope.cerrarModal = function(){
		close();
	};
	$scope.modificarUsuario = function(){
		var model = {
			nombre: $scope.nombre,
			apellido: $scope.apellido,
			user: $scope.user,
			pass: $scope.pass,
			rol: $scope.myRol.idRoles,
			sucursal: $scope.mySucursal.idSucursal,
			idUsuario: $scope.idUsuario
	};

		angular.element($("#spinerContainer")).css("display", "block");
		$http.post("../models/modificarUsuarios.php", model)
		.success(function(res){
			close();
			angular.element($("#spinerContainer")).css("display", "none");
			if(res == "error"){
				$scope.msgTitle = 'Error';
		    	$scope.msgBody  = 'Ha ocurrido un error!';
		    	$scope.msgType  = 'error';
		 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
			}else{
				$scope.msgTitle = 'Exitoso';
		    	$scope.msgBody  = res;
		    	$scope.msgType  = 'success';
		 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		 		$scope.nombre = null;
				$scope.apellido = null;
				$scope.info = null;
			}
			
		});
	};
})


	//El controller del modal nuevo totalmente independiente de la pagina principal (clientes)
.controller('modalCtrl', function($scope, close, $http, flash){
	angular.element($("#spinerContainer")).css("display", "block");
	$http.get('../models/selectRoles.php').success(function(data){
		$scope.roles = data;
	});
	$http.get('../models/selectSucursales.php').success(function(data){
		angular.element($("#spinerContainer")).css("display", "none");
		var modalHeader = angular.element($(".modal-header")).innerHeight();
	 	var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
	 	var modalFooter = angular.element($(".modal-footer")).innerHeight();
	    var modalBody = angular.element($(".modal-body"));
		var contentHeight = window.outerHeight - modalHeader - modalFooter  - navbar - 250;
		modalBody.css("maxHeight", contentHeight);
		$scope.sucursales = data;
	});
	$scope.cerrarModal = function(){
		close();
	};
	$scope.guardarUsuario = function(){
		var model = {
			nombre: $scope.nombre,
			apellido: $scope.apellido,
			user: $scope.user,
			pass: $scope.pass,
			sucursal: $scope.sucursal,
			rol: $scope.rol
		};
		if(model.nombre == undefined || model.apellido == undefined || model.user == undefined 
			|| model.pass == undefined || model.sucursal == undefined || model.rol == undefined){
			$scope.msgTitle = 'Atención';
		  	$scope.msgBody  = 'Debe completar los campos requeridos!';
		  	$scope.msgType  = 'warning';
		 	flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		}else{
			angular.element($("#spinerContainer")).css("display", "block");
			$http.post("../models/insertUsuario.php", model)
			.success(function(res){
				close();
				angular.element($("#spinerContainer")).css("display", "none");
				if(res == "error"){
					$scope.msgTitle = 'Error';
		    		$scope.msgBody  = 'Ha ocurrido un error!';
		    		$scope.msgType  = 'error';
		 			flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
				}else{
					$scope.msgTitle = 'Exitoso';
		    		$scope.msgBody  = res;
		    		$scope.msgType  = 'success';
		 			flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		 			$scope.nombre = null;
					$scope.apellido = null;
					$scope.user = null;
					$scope.pass = null;
				}
			});
		}
		
	}
})

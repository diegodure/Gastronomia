angular.module('login',['angularModalService'])

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

.controller('LoginCtrl', function($scope, $http, ModalService, $rootScope, flash){
	angular.element(document).ready(function () {
			$scope.user = "";
			$scope.enterprise = "";
			$scope.branchOffices = "";
			$scope.idEnterprise = "";
    	$scope.selectEnterprise();
    	$scope.selectCountries();
	});

	$scope.getUserLog = function (user){
		console.log(user);
	}

	$scope.selectEnterprise = function(){
		angular.element($("#spinerContainer")).css("display", "block");
		$http.get('../models/selectEnterprise.php').success(function(data){
			angular.element($("#spinerContainer")).css("display", "none");
			if(data == "error"){
				$scope.enterprise = [];
			}else{
				$scope.enterprise = data;
				if(data.length > 0){
					var topbar = angular.element($(".navbar-default")).innerHeight();
		 			var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
		 			var formGroup = angular.element($(".form-group")).innerHeight();
	        		var table = angular.element($(".table-responsive"));
					var heightTable = window.outerHeight - topbar - navbar  - formGroup - 250;
					table.css("maxHeight", heightTable);

					var heightPanelInfo = window.outerHeight - topbar - navbar - 150;
					var panelInfo = angular.element($(".panel-info"));
				}	
			}
			
		});
	};

	$scope.deleteEnterprise = function(empresa){
		// Debes proveer un controlador y una plantilla.
		ModalService.showModal({
			templateUrl: "eliminarEmpresa.html",
      		controller: "eliminarEmpresaCtrl",
      		inputs: {
				id: empresa.idEmpresas,
				nombre: empresa.Nombre
			}
		}).then(function(modal){
			modal.close.then(function(result){
				$scope.selectEnterprise();
			})
		})
	}

	$scope.createEnterprise = function(){
		// Debes proveer un controlador y una plantilla.
		ModalService.showModal({
			templateUrl: "nuevaEmpresa.html",
      		controller: "nuevaEmpresaCtrl"
		}).then(function(modal){
			modal.close.then(function(result){
				if(result){
					$scope.selectEnterprise();
				}
				
			})
		})
	}

	$scope.modifyEnterprise = function(empresa){
		var empresa = empresa;
		ModalService.showModal({
			templateUrl: "modificarEmpresa.html",
			controller: "modificarEmpresaCtrl",
			 inputs: {
			 	idEmpresa: empresa.idEmpresas,
    			nombre: empresa.Nombre,
    			descripcion: empresa.Descripcion,
    			ciudad: empresa.Ciudad,
    			barrio: empresa.Barrio,
    			direccion: empresa.Dirreccion,
    			telefono: empresa.Telefono,
    			pais: empresa.Pais,
    			idPais: empresa.idPais
  			}
		}).then(function(modal){
			modal.close.then(function(result){
				if(result){
					$scope.selectEnterprise();
				}
			})
		})
		
	};

	$scope.selectCountries = function(){
		$http.get('../models/selectCountries.php').success(function(data){
			$scope.countries = data;
		});
	};

	$scope.selectRoles = function(){
		$http.get('../models/selectRoles.php').success(function(data){
			$scope.roles = data;
		});
	};

	$scope.selectBranchOffices = function(){
		$http.get('../models/selectRoles.php').success(function(data){
			$scope.branchOffices = data;
		});
	};
	


	//Seccion donde se registrar las suscursales
	$scope.registerBranchOffices = function(){
		var model = {
			idEmpresas: 1,
			name: $scope.name,
			description: $scope.description,
			country: $scope.country,
			city: $scope.city,
			neighborhood: $scope.neighborhood,
			address: $scope.address,
			phone: $scope.phone
		};
	
		if(model.name != undefined && model.city != undefined && model.neighborhood != undefined 
	     && model.address != undefined && model.country != undefined){
	    	$http.post("../models/insertBranchOffices.php", model)
			.success(function(res){
				console.log(res)
		 	if(res == "0" || res == 0){
		 	//	$scope.branchOffices = res;
		 		$scope.name = null;
		 		$scope.description = null;
				$scope.city = null;
				$scope.neighborhood = null;
				$scope.address = null;
				$scope.phone = null;
				$scope.country = null;
		 	//	$scope.msgTitle = 'Exitoso';
		  //  $scope.msgBody  = 'Sucursal creada correctamente!';
		  //  $scope.msgType  = 'success';
		 	//	flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		 		$scope.selectRoles();
		 		$scope.selectBranchOffices();
		 		$scope.$apply();
			}else{
				$scope.msgTitle = 'Alerta';
		    $scope.msgBody  = 'Ocurrio un error!';
		    $scope.msgType  = 'error';
		 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
			}
				
			});
	    }else{
	    	$scope.msgTitle = 'Alerta';
	    	$scope.msgBody  = 'Debe llenar todos los campos!';
	    	$scope.msgType  = 'warning';
	 			flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
	    }	

	};

	$scope.registerUser = function(){
		var model = {
			name: $scope.name,
			description: $scope.description,
			city: $scope.city,
			neighborhood: $scope.neighborhood,
			address: $scope.direccion,
			phone: $scope.telefono,
			country: $scope.country
		};
		if(model.userAlias != undefined && model.userPassword != undefined && model.userFirstName != undefined 
	     && model.userLastName != undefined && model.userRol != undefined && model.userBranchOffice != undefined){
	    	$http.post("../models/insertUsers.php", model)
			.success(function(res){
		 	if(res == "0" || res == 0){
		 		$scope.userAlias = null;
				$scope.userPassword = null;
				$scope.userFirstName = null;
				$scope.userLastName = null;
				$scope.userRol = null;
				$scope.userBranchOffice = null;
		 		$scope.msgTitle = 'Exitoso';
		    $scope.msgBody  = 'Usuario creado correctamente!';
		    $scope.msgType  = 'success';
		 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
			}else{
				$scope.msgTitle = 'Alerta';
		    	$scope.msgBody  = 'Ocurrio un error!';
		    	$scope.msgType  = 'error';
		 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
			}
				
			});
	    }else{
	    	$scope.msgTitle = 'Alerta';
	    	$scope.msgBody  = 'Debe llenar todos los campos!';
	    	$scope.msgType  = 'warning';
	 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
	    }

	};
})

.controller('modificarEmpresaCtrl', function($scope, close, $http, flash, idEmpresa, nombre, descripcion, ciudad,
 barrio, direccion, telefono, pais, idPais){
 	var miPais;
	angular.element($("#spinerContainer")).css("display", "block");
	$http.get('../models/selectCountries.php').success(function(data){
		angular.element($("#spinerContainer")).css("display", "none");
		var modalHeader = angular.element($(".modal-header")).innerHeight();
	 	var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
	 	var modalFooter = angular.element($(".modal-footer")).innerHeight();
	    var modalBody = angular.element($(".modal-body"));
		var contentHeight = window.outerHeight - modalHeader - modalFooter  - navbar - 250;
		modalBody.css("maxHeight", contentHeight);
		$scope.paises = data;
		miPais = {"idPais":idPais, "Nombre":pais};
		$scope.miPais = miPais; 
	});
		$scope.idEmpresa = idEmpresa;
		$scope.nombre = nombre;
		$scope.descripcion = descripcion;
		$scope.ciudad = ciudad;
		$scope.barrio = barrio;
		$scope.direccion = direccion;
		$scope.telefono = telefono;
		$scope.cerrarModal = function(){
		close();
	};
	$scope.modificarEmpresa = function(){
		var model = {
			id: idEmpresa,
			nombre: $scope.nombre,
			descripcion: $scope.descripcion,
			ciudad: $scope.ciudad,
			barrio: $scope.barrio,
			direccion: $scope.direccion,
			telefono: $scope.telefono,
			idPais: $scope.miPais.idPais,
			id: idEmpresa
		};
		if(model.nombre == undefined || model.ciudad == undefined || model.barrio == undefined
			|| model.direccion == undefined || model.idPais == undefined){
			$scope.msgTitle = 'Atención';
		  	$scope.msgBody  = 'Debe completar los campos requeridos!';
		  	$scope.msgType  = 'warning';
		 	flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		}else{
			$http.post("../models/modificarEmpresa.php", model)
			.success(function(res){
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
						$scope.descripcion = null;
						$scope.ciudad = null;
						$scope.barrio = null;
						$scope.direccion = null;
						$scope.telefono = null;
						close(true);
					}
			});
		}
		
	};
})

.controller('nuevaEmpresaCtrl', function($scope, close, $http, flash){
	angular.element($("#spinerContainer")).css("display", "block");
		$http.get('../models/selectCountries.php').success(function(data){
			angular.element($("#spinerContainer")).css("display", "none");
			var modalHeader = angular.element($(".modal-header")).innerHeight();
		 	var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
		 	var modalFooter = angular.element($(".modal-footer")).innerHeight();
		    var modalBody = angular.element($(".modal-body"));
			var contentHeight = window.outerHeight - modalHeader - modalFooter  - navbar - 200;
			modalBody.css("maxHeight", contentHeight);
			$scope.paises = data;

		});

	$scope.cerrarModal = function(){
		close();
	};
		//Seccion donde se registran empresas
	$scope.registerEnterprise = function(){
		
		var model = {
			name: $scope.nombre,
			description: $scope.descripcion,
			country: $scope.pais,
			city: $scope.ciudad,
			neighborhood: $scope.barrio,
			address: $scope.direccion,
			phone: $scope.telefono
		};	
		console.log(model);
	    if(model.name != undefined && model.city != undefined && model.neighborhood != undefined 
	     && model.address != undefined && model.country != undefined){
	     	angular.element($("#spinerContainer")).css("display", "block");
	    	$http.post("../models/insertEmpresa.php", model)
			.success(function(res){
				angular.element($("#spinerContainer")).css("display", "none");
				console.log(res);
			 	if(res != "error"){
			 		$scope.name = null;
			 		$scope.description = null;
					$scope.city = null;
					$scope.neighborhood = null;
					$scope.address = null;
					$scope.phone = null;
					$scope.country = null;
			 		$scope.msgTitle = 'Exitoso';
			    $scope.msgBody  = 'Empresa creada correctamente!';
			    $scope.msgType  = 'success';
			 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
			 		close(true);
				}else{
					$scope.msgTitle = 'Alerta';
			    $scope.msgBody  = 'Ocurrio un error!';
			    $scope.msgType  = 'error';
			 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
				}
				
			});
	    }else{
	    	$scope.msgTitle = 'Alerta';
	    	$scope.msgBody  = 'Debe llenar todos los campos!';
	    	$scope.msgType  = 'warning';
	 			flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
	    }		
		
	};
})

//El controller del modal eliminar totalmente independiente de la pagina principal (productos)
.controller('eliminarEmpresaCtrl', function($scope, close, $http, id, nombre, flash){


	$scope.cerrarModal = function(){
		close();
	};
	$scope.eliminarEmpresa = function(){

		var model = {
			idEmpresa: id,
			nombre: nombre
		};
		console.log(model)
		angular.element($("#spinerContainer")).css("display", "block");
		$http.post("../models/eliminarEmpresa.php", model)
		.success(function(res){
			
			angular.element($("#spinerContainer")).css("display", "none");
			if(res == "error"){
					$scope.msgTitle = 'Error';
		    	$scope.msgBody  = 'Ha ocurrido un error!';
		    	$scope.msgType  = 'error';
		 			flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
			}else{
					close(true);
					$scope.msgTitle = 'Exitoso';
		    	$scope.msgBody  = res;
		    	$scope.msgType  = 'success';
		 			flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
			}
		});
	};
})
angular.module('mesas',['angularModalService'])

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

.controller('MesasCtrl', function($scope, $http, ModalService){

	angular.element(document).ready(function () {

    	$scope.Mesas();

	});

	$scope.mostrarModal = function(){
		// Debes proveer un controlador y una plantilla.
		ModalService.showModal({
			templateUrl: "nuevaMesa.html",
      		controller: "modalCtrl"
		}).then(function(modal){
			modal.close.then(function(result){
				// Una vez que el modal sea cerrado, la libreria invoca esta función
        		// y en result tienes el resultado.
        		if(result){
        			$scope.Mesas();
        		}
        		
			})
		})
	};

	//La parte del select donde mostramos los datos en la tabla
	$scope.Mesas = function(){
		angular.element($("#spinerContainer")).css("display", "block");
		$http.get('../models/selectMesas.php').success(function(data){
			angular.element($("#spinerContainer")).css("display", "none");
			if(data == "error"){
				$scope.mesas = [];
			}else{
				$scope.mesas = data;
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
	
	//Ordenamos de forma ascendente o descendente los datos
	$scope.ordenarPor = function(orden){
		$scope.ordenSeleccionado = orden;
	};

	//Abrimos el modal para modificar y recibimos los datos a ser modificados
	$scope.modificar = function(mesa){
		var proveedor = proveedor;
		//alert(producto);
		ModalService.showModal({
			templateUrl: "modificarMesa.html",
			controller: "modificarCtrl",
			 inputs: {
    			nombre: mesa.Nombre,
    			descripcion: mesa.Descripcion,
    			id: mesa.idMesas
  			}
		}).then(function(modal){
			modal.close.then(function(result){
				// $scope.resultadoModal = result;
				if(result){
    			$scope.Mesas();
    		}
			})
		})
		
	};

	//Funcion que se encarga de eliminar un registro
	$scope.eliminar = function(mesa){
		var mesa = mesa;
		ModalService.showModal({
			templateUrl: "eliminarMesa.html",
			controller: "eliminarCtrl",
			inputs: {
				id: mesa.idMesas,
				nombre: mesa.Nombre
			}
		}).then(function(modal){
			modal.close.then(function(result){
				if(result){
    			$scope.Mesas();
    		}
			})
		})
	};

	
})


//El controller del modal eliminar totalmente independiente de la pagina principal (productos)
.controller('eliminarCtrl', function($scope, close, $http, id, nombre, flash){


	$scope.cerrarModal = function(){
		close();
	};
	$scope.eliminarMesa = function(){

		var model = {
			id: id,
			nombre: nombre
		};
		angular.element($("#spinerContainer")).css("display", "block");
		$http.post("../models/eliminarMesa.php", model)
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

	//El controller del modal modificar totalmente independiente de la pagina principal (productos)
.controller('modificarCtrl', function($scope, close, $http, nombre, descripcion, id, flash){
	
	$scope.nombre = nombre;
	$scope.descripcion = descripcion;
	$scope.cerrarModal = function(){
		close();
	};
	$scope.modificarMesa = function(){
		var model = {
			nombre: $scope.nombre,
			descripcion: $scope.descripcion,
			id: id
		};
		
		$http.post("../models/modificarMesa.php", model)
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
					$scope.apellido = null;
					$scope.info = null;
					close(true);
				}
		});
	};
})


	//El controller del modal nuevo totalmente independiente de la pagina principal (productos)
.controller('modalCtrl', function($scope, close, $http, flash, ModalService){
	
	$scope.cerrarModal = function(){
		close();
	};
	$scope.guardarMesa = function(){
		var model = {
			nombre: $scope.nombre,
			descripcion: $scope.descripcion
		};

		if (model.nombre == undefined || model.nombre == "" || 
			model.nombre == null) {
			$scope.msgTitle = 'Atención';
		  	$scope.msgBody  = 'Debe completar los campos requeridos!';
		  	$scope.msgType  = 'warning';
		 	flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		}else{
			$http.post("../models/insertMesas.php", model)
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
						close(true);
					}		
			});
		}
		
	};
	
})


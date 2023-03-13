angular.module('clientes',['angularModalService'])

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


.controller('ClientesCtrl', function($scope, $http, ModalService){

	angular.element(document).ready(function () {

    	$scope.selectClientes();

	});

	$scope.mostrarModal = function(){
		// Debes proveer un controlador y una plantilla.
		ModalService.showModal({
			templateUrl: "nuevoCliente.html",
      		controller: "modalCtrl"
		}).then(function(modal){
			modal.close.then(function(result){
				// Una vez que el modal sea cerrado, la libreria invoca esta función
        		// y en result tienes el resultado.
        		
        		$scope.resultadoModal = result;
        		$scope.selectClientes();
			})
		})
	};

	//La parte del select donde mostramos los datos en la tabla
	$scope.selectClientes = function(){
		angular.element($("#spinerContainer")).css("display", "block");
		$http.get('../models/selectClientes.php').success(function(data){
			if(data == "error"){
				$scope.clientes = [];
			}else{
				$scope.clientes = data;
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
	$scope.modificar = function(cliente){
		var cliente = cliente;
		//alert(cliente);
		ModalService.showModal({
			templateUrl: "modificarCliente.html",
			controller: "modificarCtrl",
			 inputs: {
				id: cliente.idCliente,
    			nombre: cliente.Nombre,
    			apellido: cliente.Apellido,
    			info: cliente.Info
  			}
		}).then(function(modal){
			modal.close.then(function(result){
				// $scope.resultadoModal = result;
				$scope.selectClientes();
			})
		})
		
	};

	//Funcion que se encarga de eliminar un registro
	$scope.eliminar = function(cliente){
		var cliente = cliente;
		//alert(cliente);
		ModalService.showModal({
			templateUrl: "eliminarCliente.html",
			controller: "eliminarCtrl",
			inputs: {
				id: cliente.idCliente,
				info: cliente.Info
			}
		}).then(function(modal){
			modal.close.then(function(result){
				$scope.selectClientes();
			})
		})
	};

	
})

.controller('eliminarCtrl', function($scope, close, $http, id, info, flash){

	$scope.cerrarModal = function(){
		close();
	};
	$scope.eliminarCliente = function(){

		var model = {
			idCliente: id,
			info: info
		};
		angular.element($("#spinerContainer")).css("display", "block");
		$http.post("../models/eliminarClientes.php", model)
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
.controller('modificarCtrl', function($scope, close, $http, id, nombre, apellido, info, flash){
	$scope.nombre = nombre;
	$scope.apellido = apellido;
	$scope.info = info;
	$scope.cerrarModal = function(){
		close();
	};
	$scope.modificarCliente = function(){
		var model = {
			nombre: $scope.nombre,
			apellido: $scope.apellido,
			info: $scope.info,
			id: id
		};

		 
		angular.element($("#spinerContainer")).css("display", "block");
		$http.post("../models/modificarClientes.php", model)
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
	$scope.cerrarModal = function(){
		close();
	};
	$scope.guardarCliente = function(){
		var model = {
			nombre: $scope.nombre,
			apellido: $scope.apellido,
			info: $scope.info
		};
		if(model.nombre == undefined || model.apellido == undefined || model.info == undefined){
			$scope.msgTitle = 'Atención';
		  	$scope.msgBody  = 'Debe completar los campos requeridos!';
		  	$scope.msgType  = 'warning';
		 	flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		}else{
			angular.element($("#spinerContainer")).css("display", "block");
			$http.post("../models/insertClientes.php", model)
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
					$scope.ruc = null;
				}
			});
		}
		
	}
})

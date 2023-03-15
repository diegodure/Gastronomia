angular.module('productos',['angularModalService','720kb.datepicker'])

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


.controller('ProductosCtrl', function($scope, $http, ModalService, flash){
	angular.element(document).ready(function () {

    	$scope.selectProducts(true);
	});
	window.onresize = function () {
         $scope.logResize();
    };

	 $scope.logResize = function () {
	 	var topbar = angular.element($(".navbar-default")).innerHeight();
	 	var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
	 	var formGroup = angular.element($(".form-group")).innerHeight(); 
        var table = angular.element($(".table-responsive"));
		var heightTable = window.outerHeight - topbar - navbar - formGroup - 250;
		table.css("maxHeight", heightTable);

		var heightPanelInfo = window.outerHeight - topbar - navbar - 150;
		var panelInfo = angular.element($(".panel-info"));
		
		//panelInfo.css("height", heightPanelInfo);

    };

	$scope.mostrarModalNuevoProducto = function(){
		// Debes proveer un controlador y una plantilla.
		ModalService.showModal({
			templateUrl: "nuevoProductos.html",
      		controller: "modalCtrl"
		}).then(function(modal){
			modal.close.then(function(result){
				// Una vez que el modal sea cerrado, la libreria invoca esta función
        		// y en result tienes el resultado.
        		if(result){
        			$scope.selectProducts(true);
        		}
        		
			})
		})
	};


	
	//La parte del select donde mostramos los datos en la tabla
	$scope.selectProducts = function(searchProducts){
		if(searchProducts){
			angular.element($("#spinerContainer")).css("display", "block");
			$http.get('../models/selectProductos.php').success(function(data){
				angular.element($("#spinerContainer")).css("display", "none");
				if(data == "error"){
					$scope.productos = [];
				}else{
					$scope.productos = data;
					
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
		}
		
	};

	
	//Ordenamos de forma ascendente o descendente los datos
	$scope.ordenarPor = function(orden){
		$scope.ordenSeleccionado = orden;
	};

	//Abrimos el modal para modificar y recibimos los datos a ser modificados
	$scope.modificar = function(producto){
		var producto = producto;
		ModalService.showModal({
			templateUrl: "modificarProducto.html",
			controller: "modificarCtrl",
			 inputs: {
			 		idP: producto.idProductos,
    			nombre: producto.Nombre,
    			descripcion: producto.Descripcion,
    			costo: producto.Costo,
    			PrecioUnitario: producto.PrecioUnitario,
    			PrecioPromocional: producto.PrecioPromocional,
    			Imagen: producto.Imagen
  			}
		}).then(function(modal){
			modal.close.then(function(result){
				if(result){
					$scope.selectProducts(true);
				}
			})
		})
		
	};

	//Funcion que se encarga de eliminar un registro
	$scope.eliminar = function(producto){
		var producto = producto;
		ModalService.showModal({
			templateUrl: "eliminarProducto.html",
			controller: "eliminarCtrl",
			inputs: {
				id: producto.idProductos,
				nombre: producto.Nombre
			}
		}).then(function(modal){
			modal.close.then(function(result){
				$scope.selectProducts(true);
			})
		})
	};
	
})


//El controller del modal eliminar totalmente independiente de la pagina principal (productos)
.controller('eliminarCtrl', function($scope, close, $http, id, nombre, flash){


	$scope.cerrarModal = function(){
		close();
	};
	$scope.eliminarProducto = function(){

		var model = {
			id: id,
			nombre: nombre
		};
		angular.element($("#spinerContainer")).css("display", "block");
		$http.post("../models/eliminarProductos.php", model)
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

	//El controller del modal modificar totalmente independiente de la pagina principal (productos)
.controller('modificarCtrl', function($scope, close, $http, idP, nombre, descripcion, costo, PrecioUnitario, 
	PrecioPromocional, Imagen, flash){
		
	$scope.idP = idP;
	$scope.nombre = nombre;
	$scope.descripcion = descripcion;
	$scope.costo = costo;
	$scope.precioUnitario = PrecioUnitario;
	$scope.precioPromocional = PrecioPromocional;
	$scope.imagen = Imagen;
	var detImg;
	var fd;
	$scope.SelectFile = function (e) {
		
			var imagen = e.target.files[0];
			var reader = new FileReader();
            
            const objectURL = URL.createObjectURL(imagen);
  					angular.element($("#imgToUpload")).removeAttr('src')
            angular.element($("#imgToUpload")).attr('src', objectURL)
            $scope.$apply();
                        
          fd = new FormData();
          fd.append('file', imagen);
          fd.append('name', e.target.files.name);
          fd.append('id', idP);
          
          detImg = {
          		name : e.target.files[0].name,
		 		type: e.target.files[0].type,
		 		file: fd,
		 		id: idP
		 	};
		 	 let configuracion = {
                headers: {
                    "Content-Type": undefined,
                },
                transformRequest: angular.identity,
            };
	};
	
	$scope.cerrarModal = function(){
		close();
	};
	$scope.modificarProducto = function(){

		let configuracion = {
          		headers: {
              "Content-Type": undefined,
          		},
          		transformRequest: angular.identity,
      		};
		
		var model = {
			idP: $scope.idP,
			nombre: $scope.nombre,
			descripcion: $scope.descripcion,
			costo: $scope.costo,
			precioPromocional: $scope.precioPromocional,
			precioUnitario: $scope.precioUnitario,
		};
		if(model.nombre == undefined || model.descripcion == undefined || model.precioUnitario == undefined){
			$scope.msgTitle = 'Atención';
		  $scope.msgBody  = 'Debe completar los campos requeridos!';
		  $scope.msgType  = 'warning';
		 	flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		}else{
			let configuracion = {
          		headers: {
              "Content-Type": undefined,
          		},
          		transformRequest: angular.identity,
      		};
      
			angular.element($("#spinerContainer")).css("display", "block");
			var response;
			$http.post("../models/modificarProductos.php", model)
			.success(function(res){
				if(res != "error" && fd != undefined){
		  			$http.post("../models/modifyPhoto.php", fd, configuracion).success(function (res) {
		  				response = res;
		  			});
				}
				response = res;
				close(true);
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
						$scope.descripcion = null;
						$scope.precioUnitario = null;
						$scope.precioPromocional = null;
				}
			});
		}
		
	};
})


	//El controller del modal nuevo totalmente independiente de la pagina principal (productos)
.controller('modalCtrl', function($scope, close, $http, flash){
	var fd;
	$scope.SelectFile = function (e) {
		
			var imagen = e.target.files[0];
			var reader = new FileReader();
            
             const objectURL = URL.createObjectURL(imagen);
  
            angular.element($("#imgToUpload"))
            $scope.imagen = objectURL;
            $scope.$apply();
                        
          fd = new FormData();
          fd.append('file', imagen);
          fd.append('name', e.target.files.name);
          
          var detImg = {
          		name : e.target.files[0].name,
		 		type: e.target.files[0].type,
		 		file: fd
		 	};
		 	 let configuracion = {
                headers: {
                    "Content-Type": undefined,
                },
                transformRequest: angular.identity,
            };
            
	};
		
	$scope.cerrarModal = function(){
		close();
	};
	$scope.guardarProducto = function(){
		var file = document.getElementById("imageFile").files;
		
		var model = {
			nombre: $scope.nombre,
			descripcion: $scope.descripcion,
			costo: $scope.costo, 
			precioUnitario: $scope.precioUnitario,
			precioPromocional: $scope.precioPromocional
		};
		if(model.nombre == undefined || model.descripcion == undefined || model.precioUnitario == undefined){
			$scope.msgTitle = 'Atención';
		  $scope.msgBody  = 'Debe completar los campos requeridos!';
		  $scope.msgType  = 'warning';
		 	flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		}else{
			let configuracion = {
          		headers: {
              "Content-Type": undefined,
          		},
          		transformRequest: angular.identity,
      		};
      
      
			angular.element($("#spinerContainer")).css("display", "block");
			var response;
			$http.post("../models/insertProductos.php", model)
			.success(function(res){
				if(res != "error" && fd != undefined){
		  			$http.post("../models/insertPhoto.php", fd, configuracion).success(function (res) {
		  				response = res;
		  			});
				}
				response = res;				
				angular.element($("#spinerContainer")).css("display", "none");
				if(response == "error"){
					$scope.msgTitle = 'Error';
		    		$scope.msgBody  = 'Ha ocurrido un error!';
		    		$scope.msgType  = 'error';
		 			flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
				}else{
					close(true);
					$scope.msgTitle = 'Exitoso';
		    	$scope.msgBody  = response;
		    	$scope.msgType  = 'success';
		 			flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
					$scope.nombre = null;
					$scope.descripcion = null;
					$scope.costo = null;
					$scope.precio = null;
					$scope.precioUnitario = null;
					$scope.precioPromocional = null;
				}
			});
		}
		
	}
})



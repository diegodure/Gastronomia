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
    	$scope.product = {
    		type : ""
    	};
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
    			Imagen: producto.Imagen,
    			idProduct_Type: producto.idProduct_Type,
    			productType: producto.productType
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
	PrecioPromocional, idProduct_Type, productType, Imagen, flash){

	var myTypeProduct;
	angular.element($("#spinerContainer")).css("display", "block");
	$http.get('../models/selectTypeProduct.php').success(function(data){
		angular.element($("#spinerContainer")).css("display", "none");
		var modalHeader = angular.element($(".modal-header")).innerHeight();
	 	var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
	 	var modalFooter = angular.element($(".modal-footer")).innerHeight();
	  var modalBody = angular.element($(".modal-body"));
		var contentHeight = window.outerHeight - modalHeader - modalFooter  - navbar - 250;
		modalBody.css("maxHeight", contentHeight);
		$scope.typeProducts = data;
		myTypeProduct = {"idProduct_Type":idProduct_Type, "Nombre":productType};
		$scope.myTypeProduct = myTypeProduct; 
	});
		
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

		reader.onload = function(event) {
			var img = new Image();
			img.onload = function() {
				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext('2d');

				// Definir dimensiones máximas
				var MAX_WIDTH = 800;
				var MAX_HEIGHT = 600;
				var width = img.width;
				var height = img.height;

				if (width > height) {
					if (width > MAX_WIDTH) {
						height *= MAX_WIDTH / width;
						width = MAX_WIDTH;
					}
				} else {
					if (height > MAX_HEIGHT) {
						width *= MAX_HEIGHT / height;
						height = MAX_HEIGHT;
					}
				}

				// Redimensionar imagen en el canvas
				canvas.width = width;
				canvas.height = height;
				ctx.drawImage(img, 0, 0, width, height);

				// Convertir canvas a Blob y enviarlo
				canvas.toBlob(function(blob) {
					// Crear FormData
					fd = new FormData();
					fd.append('file', blob, imagen.name);
					fd.append('name', imagen.name);
					fd.append('id', idP);

					// Crear objeto con detalles de la imagen
					var detImg = {
						name: imagen.name,
						type: imagen.type,
						file: fd,
						id: idP
					};

					// Configuración de la solicitud HTTP
					let configuracion = {
						headers: {
							"Content-Type": undefined,
						},
						transformRequest: angular.identity,
					};

					// Generar URL de vista previa con la imagen reducida
					const objectURL = URL.createObjectURL(blob);
					angular.element($("#imgToUpload")).attr('src', objectURL);
					$scope.$apply();
					
				}, 'image/jpeg', 0.8); // Calidad del JPEG (80%)
			};
			img.src = event.target.result;
		};
		
		reader.readAsDataURL(imagen);
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
			typeProduct: $scope.myTypeProduct.idProduct_Type
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
	$scope.getTypeProduct = function(){
		angular.element($("#spinerContainer")).css("display", "block");
		$http.get('../models/selectTypeProduct.php').success(function(data){
			angular.element($("#spinerContainer")).css("display", "none");
			var modalHeader = angular.element($(".modal-header")).innerHeight();
		 	var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
		 	var modalFooter = angular.element($(".modal-footer")).innerHeight();
		  var modalBody = angular.element($(".modal-body"));
			var contentHeight = window.outerHeight - modalHeader - modalFooter  - navbar - 250;
			modalBody.css("maxHeight", contentHeight);
			$scope.typeProducts = data;
		});
	}
	var fd;
	$scope.SelectFile = function (e) {
		var imagen = e.target.files[0];
		var reader = new FileReader();

		reader.onload = function(event) {
			var img = new Image();
			img.onload = function() {
				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext('2d');

				// Definir dimensiones máximas
				var MAX_WIDTH = 800;
				var MAX_HEIGHT = 600;
				var width = img.width;
				var height = img.height;

				if (width > height) {
					if (width > MAX_WIDTH) {
						height *= MAX_WIDTH / width;
						width = MAX_WIDTH;
					}
				} else {
					if (height > MAX_HEIGHT) {
						width *= MAX_HEIGHT / height;
						height = MAX_HEIGHT;
					}
				}

				// Redimensionar imagen en el canvas
				canvas.width = width;
				canvas.height = height;
				ctx.drawImage(img, 0, 0, width, height);

				// Convertir canvas a Blob y enviarlo
				canvas.toBlob(function(blob) {
					// Crear FormData
					fd = new FormData();
					fd.append('file', blob, imagen.name);
					fd.append('name', imagen.name);

					// Crear objeto con detalles de la imagen
					var detImg = {
						name: imagen.name,
						type: imagen.type,
						file: fd
					};

					// Configuración de la solicitud HTTP
					let configuracion = {
						headers: {
							"Content-Type": undefined,
						},
						transformRequest: angular.identity,
					};

					// Generar URL de vista previa
					const objectURL = URL.createObjectURL(blob);
					$scope.imagen = objectURL;
					$scope.$apply();
					
				}, 'image/jpeg', 0.8); // Calidad del JPEG (80%)
			};
			img.src = event.target.result;
		};
		
		reader.readAsDataURL(imagen);
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
			precioPromocional: $scope.precioPromocional,
			typeProduct: $scope.typeProduct
		};
		if(model.nombre == undefined || model.descripcion == undefined 
			|| model.precioUnitario == undefined || model.typeProduct == ""){
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
	$scope.getTypeProduct();
})



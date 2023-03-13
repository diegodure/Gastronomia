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
    
    $scope.selectConfiguraciones = function(){
    	$scope.productsInExpireToAlert = [];
	    $http.get('../models/selectConfiguraciones.php').success(function(data){
	      if(data == "error"){
	        $scope.configuraciones = [];
	      }else{
	        $scope.configuraciones = data;
	        for(var i = 0; i < $scope.configuraciones.length; i++){
				if($scope.configuraciones[i]["Nombre"] == "Vencimiento" && $scope.configuraciones[i]["Estado"] >= "0"){
					$scope.daysToExpiration = $scope.configuraciones[i]["Estado"];
				}
				if(data[i]["Nombre"] == "Foto del producto"){
					$scope.requieredPhoto = data[i]["Estado"];
					angular.element($("#requieredPhoto")).val(data[i]["Estado"]);
				}
			}
			if($scope.daysToExpiration > 0){
				var date = new Date();
				var mes= date.getMonth()+1;
	 			var dia= date.getDate();
				var mes = (mes < 10) ? ("0" + mes) : mes;
	 			var dia = (dia < 10) ? ("0" + dia) : dia;
				var d1 = Date.UTC(date.getFullYear(),mes,dia);
				var date2, d2, dif, dias;
				for(var i = 0; i < $scope.productos.length; i++){
					if($scope.productos[i]["Vencimiento"]){
						date2 = new Date($scope.productos[i]["Vencimiento"]);
						mes= date2.getMonth()+1;
						dia= date2.getDate()+1;
						mes = (mes < 10) ? ("0" + mes) : mes;
						dia = (dia < 10) ? ("0" + dia) : dia;
						d2 = Date.UTC(date2.getFullYear(),mes,dia);
						dif = d2-d1;
						dias = Math.floor(dif / (1000 * 60 * 60 * 24));
						if(dias < parseInt($scope.daysToExpiration)){
							$scope.productsInExpireToAlert.push($scope.productos[i])
						}
					}
				}
				if($scope.productsInExpireToAlert.length > 0){
					angular.element($(".iconExpiredProducts")).css("display", "block");
					if(angular.element($("#showToast")).val() == false || angular.element($("#showToast")).val() == "false"){
						angular.element($("#showToast")).val(true);
						$scope.msgTitle = 'Atención';
			    		$scope.msgBody  = 'Hay productos vencidos o por vencer!';
			    		$scope.msgType  = 'error';
			 			flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
					}
					
				}				
			}
			
	      }
	    });
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
        		if(result != undefined){
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
						$scope.selectConfiguraciones();
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
    			PrecioUnitario: producto.PrecioUnitario,
    			PrecioMayorista: producto.PrecioMayorista,
    			PrecioPromocional: producto.PrecioPromocional,
    			CantidadActual: producto.CantidadActual,
    			CantidadMinima: producto.CantidadMinima,
    			Imagen: producto.Imagen,
    			fechaVencimiento: producto.Vencimiento,
    			proveedorId: producto.provId,
    			proveedor: producto.provN
  			}
		}).then(function(modal){
			modal.close.then(function(result){
				$scope.selectProducts();
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
				$scope.selectProducts();
			})
		})
	};

	$scope.showExpiredProducts = function(){
		angular.element($(".iconExpiredProducts")).css("display", "none");
		angular.element($(".modalImpulse")).css("display", "block");
	}

	$scope.hideExpiredProducts = function(){
		angular.element($(".iconExpiredProducts")).css("display", "block");
		angular.element($(".modalImpulse")).css("display", "none");
	}
	
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
.controller('modificarCtrl', function($scope, close, $http, idP, nombre, descripcion, PrecioUnitario, 
	PrecioMayorista, PrecioPromocional, CantidadActual, CantidadMinima, Imagen, fechaVencimiento,
	 proveedorId, proveedor, flash){
	var miProveedor;
	angular.element($("#spinerContainer")).css("display", "block");
	$http.get('../models/selectProveedores.php').success(function(data){
		var modalHeader = angular.element($(".modal-header")).innerHeight();
	 	var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
	 	var modalFooter = angular.element($(".modal-footer")).innerHeight();
	    var modalBody = angular.element($(".modal-body"));
		var contentHeight = window.outerHeight - modalHeader - modalFooter  - navbar - 250;
		modalBody.css("maxHeight", contentHeight);
		$scope.proveedores = data;
		miProveedor = {"idProveedores":proveedorId, "Nombre":proveedor};
		$scope.miProv = miProveedor;
		if(angular.element($("#requieredPhoto")).val() == "" || angular.element($("#requieredPhoto")).val() == undefined 
			|| angular.element($("#expirationDate")).val() == "" || angular.element($("#expirationDate")).val() == undefined){
			$http.get('../models/selectConfiguraciones.php').success(function(data){
				for(var i = 0; i < data.length; i++){
					if(data[i]["Nombre"] == "Foto del producto"){
						$scope.requieredPhoto = data[i]["Estado"];
						angular.element($("#requieredPhoto")).val(data[i]["Estado"]);
					}
					if(data[i]["Nombre"] == "Vencimiento"){
						$scope.expirationDate = data[i]["Estado"];
						angular.element($("#expirationDate")).val(data[i]["Estado"]);
					}
				}	
				angular.element($("#spinerContainer")).css("display", "none");
			});
		}else{
			$scope.requieredPhoto = angular.element($("#requieredPhoto")).val();
			$scope.expirationDate = angular.element($("#expirationDate")).val();
			angular.element($("#spinerContainer")).css("display", "none");
		}
		
	});
	$scope.idP = idP;
	$scope.nombre = nombre;
	$scope.descripcion = descripcion;
	$scope.precioUnitario = PrecioUnitario;
	$scope.precioMayorista = PrecioMayorista;
	$scope.precioPromocional = PrecioPromocional;
	$scope.cantidadActual = CantidadActual;
	$scope.cantidadMin = CantidadMinima;
	$scope.fechaVencimiento = fechaVencimiento;
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
			precio: $scope.precioUnitario,
			cantidad: $scope.cantidadActual,
			cantidadMin: $scope.cantidadMin,
			precioPromocional: $scope.precioPromocional,
			precioUnitario: $scope.precioUnitario,
			precioMayorista: $scope.precioMayorista,
			fechaVencimiento: angular.element($("#newDate")).val(),
			proveedor: $scope.miProv.idProveedores
		};
		if(model.nombre == undefined || model.descripcion == undefined || model.precioUnitario == undefined
			|| model.precioMayorista == undefined || model.proveedor == undefined){
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
				if(res != "error" && ($scope.requieredPhoto == 0 || $scope.requieredPhoto == "0") && fd != undefined){
		  			$http.post("../models/modifyPhoto.php", fd, configuracion).success(function (res) {
		  				response = res;
		  			});
				}
				response = res;
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
						$scope.descripcion = null;
						$scope.precio = null;
						$scope.cantidad = null;
						$scope.cantidadMin = null;
						$scope.precioUnitario = null;
						$scope.precioMayorista = null;
						$scope.precioPromocional = null;
						$scope.proveedor = null;
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
	angular.element($("#spinerContainer")).css("display", "block");
	$http.get('../models/selectProveedores.php').success(function(data){
		var modalHeader = angular.element($(".modal-header")).innerHeight();
	 	var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
	 	var modalFooter = angular.element($(".modal-footer")).innerHeight();
	    var modalBody = angular.element($(".modal-body"));
		var contentHeight = window.outerHeight - modalHeader - modalFooter  - navbar - 250;
		modalBody.css("maxHeight", contentHeight);
		$scope.proveedores = data;
		if(angular.element($("#requieredPhoto")).val() == "" || angular.element($("#requieredPhoto")).val() == undefined
			|| angular.element($("#expirationDate")).val() == "" || angular.element($("#expirationDate")).val() == undefined){
			$http.get('../models/selectConfiguraciones.php').success(function(data){
				for(var i = 0; i < data.length; i++){
					if(data[i]["Nombre"] == "Foto del producto" && data[i]["Estado"] == "0"){
						$scope.requieredPhoto = data[i]["Estado"];
						angular.element($("#requieredPhoto")).val(data[i]["Estado"]);
					}
					if(data[i]["Nombre"] == "Vencimiento" && data[i]["Estado"] != "0"){
						$scope.expirationDate = data[i]["Estado"];
						angular.element($("#expirationDate")).val(data[i]["Estado"]);
					}else{
						$scope.expirationDate = 0;
					}
				}	
				angular.element($("#spinerContainer")).css("display", "none");
			});
		}else{
			$scope.requieredPhoto = angular.element($("#requieredPhoto")).val();
			$scope.expirationDate = angular.element($("#expirationDate")).val();
			angular.element($("#spinerContainer")).css("display", "none");
		}
		angular.element($("#spinerContainer")).css("display", "none");
	});
	$scope.cerrarModal = function(){
		close();
	};
	$scope.guardarProducto = function(){
		if($scope.requieredPhoto == 0 || $scope.requieredPhoto == "0"){
			var file = document.getElementById("imageFile").files;
		}
		
		var model = {
			nombre: $scope.nombre,
			descripcion: $scope.descripcion,
			cantidad: $scope.cantidad,
			cantidadMin: $scope.cantidadMin, 
			precioUnitario: $scope.precioUnitario,
			precioMayorista: $scope.precioMayorista,
			precioPromocional: $scope.precioPromocional,
			proveedor: $scope.proveedor,
			fechaVencimiento: $scope.fechaVencimiento
		};
		if(model.nombre == undefined || model.descripcion == undefined || model.precioUnitario == undefined
			|| model.precioMayorista == undefined || model.proveedor == undefined){
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
				if(res != "error" && $scope.requieredPhoto == 0 || $scope.requieredPhoto == "0"){
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
					$scope.precio = null;
					$scope.cantidad = null;
					$scope.cantidadMin = null;
					$scope.precioUnitario = null;
					$scope.precioMayorista = null;
					$scope.precioPromocional = null;
					$scope.proveedor = null;
				}
			});
		}
		
	}
})



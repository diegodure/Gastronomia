angular.module('compras',['angularModalService'])

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

.controller('ComprasCtrl', function($scope, $http, ModalService, flash){

	//Inicializamos las variables 
	 $scope.productos = [];
	 var total = 0, iva = 0;

	 $scope.modalProveedor = function(){
	 	// Debes proveer un controlador y una plantilla.
	 	ModalService.showModal({
	 		templateUrl: "proveedorCompra.html",
      		controller: "proveedorCompraCtrl"
	 	}).then(function(modal){
	 		modal.close.then(function(result){
	 			// Una vez que el modal sea cerrado, la libreria invoca esta función
        		// y en result tienes el resultado.
        		$scope.proveedor = result;
        		//location.reload();
	 		})
	 	})
	 };

	 $scope.modalProducto = function(){
		//Debes proveer un controlador y una plantilla
		ModalService.showModal({
			templateUrl: "productoFactura.html",
			controller: "productoFacturaCtrl"
		}).then(function(modal){
			modal.close.then(function(result){
				// Una vez que el modal sea cerrado, la libreria invoca esta funcion
				// y en result tienes el resultado
				
				$scope.prod = result;
				$scope.precio = result.precio;
				
			})
		})
	};

	//Parte del codigo donde agregamos los productos a la tabla
	$scope.agregarProducto = function(){
		//Calculo del subtotal de cada producto
		var subTotal = $scope.precio * $scope.cantidad;
		//iva = subTotal / 10;
		
		//calculo del total de todos los productos
		//total = total + subTotal + iva;
		total = total + subTotal;
		$scope.total = total;
		//alert(total);

		//ubicamos los datos en el array para mostrarlos en la tabla
		$scope.productos.push({idP: $scope.prod.idP, nombre: $scope.prod.nombre, descripcion: $scope.prod.descripcion,
		 precio: $scope.precio, cantidad: $scope.cantidad, subTotal: subTotal});
		$scope.prod.nombre = null;
		$scope.prod.descripcion = null;
		$scope.precio = null;
		$scope.cantidad = null;
		$scope.prod.precio = null;


	};


	$scope.eliminarProducto = function(producto){

		//restamos del total el producto que fue eliminado 
		//total = total - producto.subTotal - producto.iva;
		total = total - producto.subTotal;
		$scope.total = total;
		//alert(total);
		var pos = $scope.productos.indexOf(producto);
		$scope.productos.splice(pos, 1); //pasamos el indice a ser eliminado (pos) y luego la cantidad de elementos a ser eliminados
		$scope.msgTitle = 'Info';
		$scope.msgBody  = 'Se sacó el producto!';
		$scope.msgType  = 'info';
		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
	};

	$scope.facturar = function(productos, proveedor){
			
			var length = productos.length;
		
			//Obtenemos los productos
			var productos = productos;
			
			var detFac = [];

			for ( i=0; i < length; i++){
				 detFac.push({
					id : productos[i].idP,
					precio: productos[i].precio,
					cantidad : productos[i].cantidad,
					subT: productos[i].subTotal,
			 });
			}

			//almacenamos los datos del cliente
			var factura = {
				id: proveedor.id,
				total: $scope.total
			};

			//alert($scope.total);
			var pos = 0;
			angular.element($("#spinerContainer")).css("display", "block");
			$http.post("../models/insertCompras.php", factura)
			.success(function(res){
				$http.post("../models/detCompra.php", detFac)
					.success(function (res) {
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
				$scope.proveedor.id = null;
				$scope.proveedor.nombre = null;
				$scope.proveedor.apellido = null;
				$scope.proveedor.user = null;
				$scope.total = null;
				$scope.productos.splice(pos);
			});
			total = 0;
		
	};

})

.controller('proveedorCompraCtrl', function($scope, close, $http){
	$scope.cerrarModal = function(){
		close();
	};

	//La parte del select donde mostramos los datos en la tabla
	angular.element($("#spinerContainer")).css("display", "block");
	$http.get('../models/selectProveedores.php').success(function(data){
		angular.element($("#spinerContainer")).css("display", "none");
		if(data == "error"){
				$scope.proveedores = [];
		}else{
			$scope.proveedores = data;
			if(data.length > 0){
				var modalHeader = angular.element($(".modal-header")).innerHeight();
			 	var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
			 	var modalFooter = angular.element($(".modal-footer")).innerHeight();
			 	var modalBody = angular.element($(".modal-body"));
			    var tableResponsive = angular.element($(".table-responsive"));
				var contentHeight = window.outerHeight - modalHeader - modalFooter  - navbar - 350;
				modalBody.css("height", (window.outerHeight - modalHeader - modalFooter  - navbar - 250));
				modalBody.css("overflowY", "hidden");
				tableResponsive.css("maxHeight", contentHeight);
				var heightPanelInfo = window.outerHeight - navbar - 150;
				var panelInfo = angular.element($(".panel-info"));
		
				//panelInfo.css("height", heightPanelInfo);
				
				//Como agregar clases con angularjs
				//table.addClass('customClass');
			}
		}
	});

	//La parte donde elegimos el usuario
	$scope.elegir = function(proveedor){
		var proveedor = {
			nombre: proveedor.Nombre,
			apellido: proveedor.Apellido,
			user: proveedor.Empresa,
			id: proveedor.idProveedores
		};
	
		 close(proveedor);
	};
})

	//El controller del modal nuevo totalmente independiente de la pagina principal (productos)
.controller('productoFacturaCtrl', function($scope, close, $http, ModalService){
	$scope.cerrarModal = function(){
		close();
	};

	//La parte del select donde mostramos los datos en la tabla
	angular.element($("#spinerContainer")).css("display", "block");
	$http.get('../models/selectProductos.php').success(function(data){
		angular.element($("#spinerContainer")).css("display", "none");
		if(data == "error"){
				$scope.productos = [];
		}else{
			$scope.productos = data;
			if(data.length > 0){
				var modalHeader = angular.element($(".modal-header")).innerHeight();
			 	var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
			 	var modalFooter = angular.element($(".modal-footer")).innerHeight();
			 	var modalBody = angular.element($(".modal-body"));
			    var tableResponsive = angular.element($(".table-responsive"));
				var contentHeight = window.outerHeight - modalHeader - modalFooter  - navbar - 350;
				modalBody.css("height", (window.outerHeight - modalHeader - modalFooter  - navbar - 250));
				modalBody.css("overflowY", "hidden");
				tableResponsive.css("maxHeight", contentHeight);
				var heightPanelInfo = window.outerHeight - navbar - 150;
				var panelInfo = angular.element($(".panel-info"));
		
				//panelInfo.css("height", heightPanelInfo);
				
				//Como agregar clases con angularjs
				//table.addClass('customClass');
			}
		}
	
	});

	//La parte donde elegimos el producto
	$scope.elegir = function(producto){
		var productos = {
			idP: producto.idProductos,
			nombre: producto.Nombre,
			descripcion: producto.Descripcion,
			precio: producto.PrecioUnitario
		};
		
		 close(productos);
	};
	// $scope.obj = serveData;

	$scope.mostrarModalNuevoProducto = function(){
		// Debes proveer un controlador y una plantilla.
		ModalService.showModal({
			templateUrl: "nuevoProductos.html",
      		controller: "modalCtrl"
		}).then(function(modal){
			modal.close.then(function(result){
				// Una vez que el modal sea cerrado, la libreria invoca esta función
        		// y en result tienes el resultado.
        		$scope.resultadoModal = result;
        		
			})
		})
	};
})

	//El controller del modal nuevo totalmente independiente de la pagina principal (productos)
.controller('modalCtrl', function($scope, close, $http,flash){
	angular.element($("#spinerContainer")).css("display", "block");
	$http.get('../models/selectProveedores.php').success(function(data){
		angular.element($("#spinerContainer")).css("display", "none");
		var modalHeader = angular.element($(".modal-header")).innerHeight();
	 	var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
	 	var modalFooter = angular.element($(".modal-footer")).innerHeight();
	    var modalBody = angular.element($(".modal-body"));
		var contentHeight = window.outerHeight - modalHeader - modalFooter  - navbar - 250;
		modalBody.css("maxHeight", contentHeight);
		$scope.proveedores = data;

	});
	$scope.cerrarModal = function(){
		close();
	};
	$scope.guardarProducto = function(){
		var model = {
			nombre: $scope.nombre,
			descripcion: $scope.descripcion,
			precio: $scope.precio,
			cantidad: $scope.cantidad,
			proveedor: $scope.proveedor
		};

		angular.element($("#spinerContainer")).css("display", "block");
		$http.post("../models/insertProductos.php", model)
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
})


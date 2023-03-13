angular.module('facturas',['angularModalService'])

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


.controller('FacturasCtrl', function($scope, $http, ModalService, flash){


	//Inicializamos las variables 
	 $scope.productos = [];
	 var total = 0, iva = 0;

	$scope.modalCliente = function(){
		// Debes proveer un controlador y una plantilla.
		ModalService.showModal({
			templateUrl: "clienteFactura.html",
      		controller: "clienteFacturaCtrl"
		}).then(function(modal){
			modal.close.then(function(result){
				// Una vez que el modal sea cerrado, la libreria invoca esta función
        		// y en result tienes el resultado.
        		$scope.cliente = result;
        	
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
				
			})
		})
	};

	//Parte del codigo donde agregamos los productos a la tabla
	$scope.agregarProducto = function(){
		//Calculo del subtotal de cada producto
		var subTotal = $scope.prod.precio * $scope.cantidad;
		iva = subTotal / 10;
		
		//calculo del total de todos los productos
		total = total + subTotal + iva;
		$scope.total = total;
		//alert(total);

		//ubicamos los datos en el array para mostrarlos en la tabla
		$scope.productos.push({idP: $scope.prod.idP, nombre: $scope.prod.nombre, descripcion: $scope.prod.descripcion,
		 precio: $scope.prod.precio, cantidad: $scope.cantidad, iva: iva, subTotal: subTotal});
		$scope.prod.nombre = null;
		$scope.prod.descripcion = null;
		$scope.precio = null;
		$scope.cantidad = null;
		$scope.prod.precio = null;


	};

	$scope.eliminarProducto = function(producto){

		//restamos del total el producto que fue eliminado 
		total = total - producto.subTotal - producto.iva;
		$scope.total = total;
		//alert(total);
		var pos = $scope.productos.indexOf(producto);
		console.log(pos);
		$scope.productos.splice(pos, 1); //pasamos el indice a ser eliminado (pos) y luego la cantidad de elementos a ser eliminados
		$scope.msgTitle = 'Info';
		$scope.msgBody  = 'Se sacó el producto!';
		$scope.msgType  = 'info';
		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
	};

	$scope.facturar = function(productos, cliente){
			
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
					iva : productos[i].iva,
			 });
			}

			//almacenamos los datos del cliente
			var factura = {
				id: $scope.cliente.id,
				total: $scope.total
			};

			var pos = 0;
			$http.post("../models/insertFacturas.php", factura)
			.success(function(res){
				alert(res);
				$http.post("../models/detFactura.php", detFac)
					.success(function (res) {
						alert(res);
					});
				$scope.cliente.id = null;
				$scope.cliente.nombre = null;
				$scope.cliente.apellido = null;
				$scope.cliente.info = null;
				$scope.total = null;
				$scope.productos.splice(pos);
			});
			total = 0;
		
	};

})

	//El controller del modal nuevo totalmente independiente de la pagina principal (clientes)
.controller('clienteFacturaCtrl', function($scope, close, $http){
	$scope.cerrarModal = function(){
		close();
	};

	//La parte del select donde mostramos los datos en la tabla
	$http.get('../models/selectClientes.php').success(function(data){
		$scope.clientes = data;
	});

	//La parte donde elegimos el cliente
	$scope.elegir = function(cliente){
		var clientes = {
			nombre: cliente.Nombre,
			apellido: cliente.Apellido,
			info: cliente.Info,
			id: cliente.idCliente
		};
		 // serveData = clientes;
		 // $scope.obj = serveData;
		 //console.log($scope.obj);
		 //console.log(clientes);
		 close(clientes);
	};
	// $scope.obj = serveData;
})

	//El controller del modal nuevo totalmente independiente de la pagina principal (productos)
.controller('productoFacturaCtrl', function($scope, close, $http){
	$scope.cerrarModal = function(){
		close();
	};

	//La parte del select donde mostramos los datos en la tabla
	$http.get('../models/selectProductos.php').success(function(data){
		$scope.productos = data;
		//console.log($scope.productos);
	});

	//La parte donde elegimos el producto
	$scope.elegir = function(producto){
		var productos = {
			idP: producto.idProducto,
			nombre: producto.Nombre,
			descripcion: producto.Descripcion,
			precio: producto.Precio
		};
		
		 close(productos);
	};
	// $scope.obj = serveData;
})
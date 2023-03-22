angular.module('ventas',['angularModalService'])

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

.controller('VentasCtrl', function($scope, $http, ModalService, flash){
	angular.element(document).ready(function () {
    	$scope.price = {
    		type : "minorista"
    	};
    	$scope.Mesas();
    	$scope.Productos();
	});

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
	        var panel = angular.element($(".panel-body"));
					var heightTable = window.outerHeight - topbar - navbar  - formGroup - 250;
					panel.css("maxHeight", heightTable);
			
				}
			
			}
			
		});
	};

	$scope.Productos = function(){
		$http.get('../models/selectProductos.php').success(function(data){
			if(data == "error"){
				$scope.productos = [];
			}else{
				$scope.productos = data;	
			}
		});
	}

	$scope.showOrder = function(mesa){
		var productos = $scope.productos;
		ModalService.showModal({
	 		templateUrl: "ordenMesa.html",
      controller: "ordenMesaCtrl",
			inputs: {mesa,productos}
	 	}).then(function(modal){
	 		modal.close.then(function(result){
	 			if(result){
	 				$scope.Mesas();
	 			}
	 		})
	 	})
	}

	//Inicializamos las variables 
	 $scope.productos = [];
	 var total = 0, iva = 0;

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
				angular.element($("#cantidadProducto")).focus();
			})
		})
	};

	//Parte del codigo donde agregamos los productos a la tabla
	$scope.agregarProducto = function(){
		
		var precio;
		if($scope.price.type == "minorista"){
			precio = $scope.prod.PrecioUnitario;
			$scope.prod.PrecioUnitario = null;
		}else if($scope.price.type == "mayorista"){
			precio = $scope.prod.PrecioMayorista;
			$scope.prod.PrecioMayorista = null;
		}else if($scope.price.type == "promocional"){
			precio = $scope.prod.PrecioPromocional;
			$scope.prod.PrecioPromocional = null;
		}
		for(var i = 0; i < $scope.configuraciones.length; i++){
			if($scope.configuraciones[i]["Nombre"] == "Cantidad mínima" && $scope.configuraciones[i]["Estado"] == "0"){
				if(($scope.prod.CantidadActual - $scope.cantidad) <= $scope.prod.CantidadMinima && $scope.prod.CantidadMinima != 0){
					$scope.msgTitle = 'Atención';
			    	$scope.msgBody  = "El producto "+$scope.prod.Nombre+" llego a la cantidad mínima";
			    	$scope.msgType  = 'warning';
			 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
				}
			}
		}
		//Calculo del subtotal de cada producto
		var subTotal = precio * $scope.cantidad;
		//iva = subTotal / 10;
		
		//calculo del total de todos los productos
		//total = total + subTotal + iva;
		total = total + subTotal;
		$scope.total = total;
		//alert(total);

		//ubicamos los datos en el array para mostrarlos en la tabla
		$scope.productos.push({idP: $scope.prod.idProductos, nombre: $scope.prod.Nombre, descripcion: $scope.prod.Descripcion,
		precio: precio, cantidad: $scope.cantidad, subTotal: subTotal,condicion: $scope.price.type});
		$scope.prod.Nombre = null;
		$scope.prod.Descripcion = null;		
		$scope.cantidad = null;
		
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

	$scope.prepareToSell = function(){
		if($scope.total == "" || $scope.total == null){
			$scope.msgTitle = 'Info';
    		$scope.msgBody  = 'No hay productos por vender!';
    		$scope.msgType  = 'info';
 			flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
		}else{
			angular.element($(".modalImpulse")).css("display", "block");
			angular.element($("#pago")).focus();
		}
		
	}

	$scope.hideModalToSell = function(){
		angular.element($(".modalImpulse")).css("display", "none");
		$scope.payment = null;
		$scope.vuelto = null;
	}

	$scope.calcularVuelto = function(){
		$scope.vuelto = $scope.payment - $scope.total; 
	}

	$scope.facturar = function(productos, cliente, isInvoice){
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
					condicion: productos[i].condicion
			 	});
			}

			//almacenamos los datos del cliente
			var factura = {
				id: $scope.cliente.id,
				total: $scope.total
			};
			if (isInvoice) {
				//Ejmplo 1
				// var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    //     		pdfMake.createPdf(docDefinition).open();

    			var row = [];
				row.push([{text: 'Artículo', style: 'tableHeader'}, {text: 'Cantidad', style: 'tableHeader'},{text: 'Importe', style: 'tableHeader'}]);
				for (var i = 0; i < productos.length; i++) {
					row.push([productos[i].nombre,productos[i].cantidad,productos[i].precio])
				}
    			html2canvas(document.getElementById('saleToPrint'), {
		         onrendered: function(canvas) {
		           var data = canvas.toDataURL();
		           var docDefinition = {
		           	 pageSize: 'C6',
		             content: [
		             	{
		             		text: 'Título del negocio',
							style: 'header'
						},
						{
							text: 'Nº RUC',
							style: 'subheader'
						},
						{
							text: 'Dirección',
							style: 'subheader'
						},
						{
							text: 'Teléfono',
							style: 'subheader'
						},
						'\n..................................................................................................................................................................',
						{
		             		text: 'Numero de venta 0000',
							style: 'header'
						},
						'..................................................................................................................................................................',
						{
		             		text: 'Fecha: 2022/06/25',
							style: 'clientInfo'
						},
						{
		             		text: 'Cliente: '+cliente.nombre,
							style: 'clientInfo'
						},
						{
		             		text: 'Ruc: '+cliente.info,
							style: 'clientInfo'
						},
						'\n',
						{
							style: 'tableProduct',
							table: {
								widths: [ '*', '*', '*', '*', '*' ],
								headerRows: 1,
								body: row
							},
							layout: 'headerLineOnly'
						},
						'\n..................................................................................................................................................................',
						{
		             		text: 'Total: '+$scope.total,
							style: 'clientInfo'
						},
						{
							text: 'Vendedor: Nombre y Apellido',
							style: 'clientInfo'
						}
		             ],
								styles: {
									header: {
										fontSize: 16,
										bold: true,
										alignment: 'center'
									},
									subheader: {
										fontSize: 15,
										bold: true,
										alignment: 'center'
									},
									quote: {
										italics: true
									},
									small: {
										fontSize: 8
									},
									clientInfo : {
										fontSize: 14,
										bold: false,
										alignment: 'left'
									},
									tableHeader: {
										bold: true,
										fontSize: 13,
										alignment: 'center',
										color: 'black'
									},
									tableProduct: {
										alignment : 'center'
									}
								}
		           };
		           pdfMake.createPdf(docDefinition).open();
		           // pdfMake.createPdf(docDefinition).download("test.pdf");
		         }
		       });
			}
			// //alert($scope.total);
			var pos = 0;
			angular.element($("#spinerContainer")).css("display", "block");
			$http.post("../models/insertFacturas.php", factura)
			.success(function(res){
				$http.post("../models/detFactura.php", detFac)
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
					 		$scope.hideModalToSell();
						}
					});
				$scope.cliente.id = null;
				$scope.cliente.nombre = null;
				$scope.cliente.apellido = null;
				$scope.cliente.info = null;
				$scope.cliente.user = null;
				$scope.total = null;
				$scope.productos.splice(pos);
			});
			total = 0;
			$scope.payment = null;
			$scope.vuelto = null;
	};

})

.directive('numberConverter', function() {
  return {
    priority: 1,
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ngModel) {
      function toModel(value) {
        return "" + value; // convert to string
      }

      function toView(value) {
        console.log("toView", value);
        return parseInt(value); // convert to number
      }

      ngModel.$formatters.push(toView);
      ngModel.$parsers.push(toModel);
    }
  };
})

.controller('ordenMesaCtrl', function($scope, close, $http, flash,mesa,productos,ModalService){
	
	$scope.productos = productos;
	if(mesa.Active == 1 || mesa.Active == "1"){
		var model = {
			idTable: mesa.idMesas,
			active: 0
		}
		angular.element($("#spinerContainer")).css("display", "block");
		$http.post('../models/getOrderResume.php',model).success(function(data){
			angular.element($("#spinerContainer")).css("display", "none");
			$scope.cliente = {id:data[0].idClientes,nombre:data[0].Nombre,apellido:data[0].Apellido,
			info:data[0].Info};
			$scope.idVenta = data[0].idVentas; 
			$scope.detailOrder = data[1];
			$scope.updateAmountOder(false);
			for(var i = 0; i < $scope.detailOrder.length; i++){
				angular.element($("#productForOrder-"+$scope.detailOrder[i].idProductos)).css("display","none");
			}
		});
	}else{
		$scope.detailOrder = [];		
		$scope.totalOrder = 0;
		$scope.cliente = {id:1,nombre:"Ocasional",apellido:".",info:"XXXXXX"}
	}
	$scope.showConfirmButton = false;
	$scope.modalUsuario = function(){
	 	// Debes proveer un controlador y una plantilla.
	 	ModalService.showModal({
	 		templateUrl: "clienteVenta.html",
      		controller: "clienteVentaCtrl"
	 	}).then(function(modal){
	 		modal.close.then(function(result){
	 			// Una vez que el modal sea cerrado, la libreria invoca esta función
        		// y en result tienes el resultado.
        		$scope.cliente = result;
	 		})
	 	})
	 };

	window.onkeyup = function (e) {
		if(e.keyCode == 67 && angular.element($(".modal")).length == 0) {
			$scope.modalUsuario();
		}else if(e.keyCode == 80 && angular.element($(".modal")).length == 0){
			$scope.modalProducto();
		}else if(e.keyCode == 82 && angular.element($(".modal")).length == 0){
			$scope.prepareToSell();
		}else if(e.keyCode == 70 && angular.element($(".modalVentas")).css("display") == "block"){

		}
  };

	$scope.cerrarModal = function(){
		close();
	};

	$scope.addProductToOrder = function(product, index){
		if(!$scope.showConfirmButton){
			$scope.showConfirmButton = true;
		}
		product.Cantidad = 1;
		$scope.detailOrder.push(product);
		$scope.totalOrder = $scope.totalOrder + (product.Cantidad*product.PrecioUnitario);
		angular.element($("#productForOrder-"+product.idProductos+"")).css("display","none");
	}

	$scope.saveOrden = function(){
		var model = {};
		if(mesa.Active == 0 || mesa.Active == "0"){
			model = {
				total: $scope.totalOrder,
				idCliente: $scope.cliente.id,
				idTable: mesa.idMesas
			};
			angular.element($("#spinerContainer")).css("display", "block");
			$http.post("../models/insertFacturas.php", model)
			.success(function(res){
				if(res != "error"){
					$http.post("../models/detFactura.php", $scope.detailOrder)
					.success(function (res) {
						angular.element($("#spinerContainer")).css("display", "none");
						if(res == "error"){
							$scope.msgTitle = 'Error';
					    	$scope.msgBody  = 'Ha ocurrido un error!';
					    	$scope.msgType  = 'error';
					 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
						}else{
							// $scope.hideModalToSell();
						 	close(true);
							$scope.msgTitle = 'Exitoso';
					    $scope.msgBody  = res;
					    $scope.msgType  = 'success';
						 	flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
						}
					});	
				}
			});
		}else{
			model = {
				total: $scope.totalOrder,
				idCliente: $scope.cliente.id,
				idTable: mesa.idMesas,
				idVenta: $scope.idVenta,
				detail: $scope.detailOrder
			};
			angular.element($("#spinerContainer")).css("display", "block");
			$http.post("../models/updateOrder.php", model)
			.success(function(res){
				if(res == "error"){
					$scope.msgTitle = 'Error';
			    $scope.msgBody  = 'Ha ocurrido un error!';
			    $scope.msgType  = 'error';
			 		flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
				}else{
					// $scope.hideModalToSell();
				 	close(true);
					$scope.msgTitle = 'Exitoso';
			    $scope.msgBody  = res;
			    $scope.msgType  = 'success';
				 	flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
				}
			});
		}
	}

	$scope.closeTable = function(){
		//falta agregar condicion cuando es la primera vez en cargar la orden
		if($scope.showConfirmButton){
			//insertar los detalles, actualizar el total y estado de la venta
		}else{
			//actualizar el estado de la venta
		}
	}

	$scope.updateAmountOder = function(orderCharged){
		if(!$scope.showConfirmButton && orderCharged){
			$scope.showConfirmButton = true;
		}
		$scope.totalOrder = 0;
		for(var i = 0; i < $scope.detailOrder.length; i++){
			$scope.totalOrder = $scope.totalOrder + ($scope.detailOrder[i].Cantidad*$scope.detailOrder[i].PrecioUnitario);
		}
	}

	$scope.removeProductFromOrder = function(product,index){
		$scope.detailOrder.splice(index,1);
		$scope.updateAmountOder(true);

		angular.element($("#productForOrder-"+product.idProductos+"")).css("display","");
	}

})


.controller('clienteVentaCtrl', function($scope, close, $http){
	$scope.cerrarModal = function(){
		close();
	};

	//La parte del select donde mostramos los datos en la tabla
	angular.element($("#spinerContainer")).css("display", "block");
	$http.get('../models/selectClientes.php').success(function(data){
		angular.element($("#spinerContainer")).css("display", "none");
		$scope.clientes = data;
		angular.element($("#q")).focus();
	});

	//La parte donde elegimos el usuario
	$scope.elegir = function(cliente){
		var clientes = {
			nombre: cliente.Nombre,
			apellido: cliente.Apellido,
			info: cliente.Info,
			id: cliente.idClientes
		};
		 // serveData = clientes;
		 // $scope.obj = serveData;
		 //console.log($scope.obj);
		 //console.log(clientes);
		 close(clientes);
	};
})

	//El controller del modal nuevo totalmente independiente de la pagina principal (productos)
.controller('productoFacturaCtrl', function($scope, close, $http){
	$scope.cerrarModal = function(){
		close();
	};

	//La parte del select donde mostramos los datos en la tabla
	angular.element($("#spinerContainer")).css("display", "block");
	$http.get('../models/selectProductos.php').success(function(data){
		angular.element($("#spinerContainer")).css("display", "none");
		var topbar = angular.element($(".navbar-default")).innerHeight();
		var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
		var formGroup = angular.element($(".form-group")).innerHeight();
		var table = angular.element($(".productoFactura"));
		var heightTable = window.outerHeight - topbar - navbar  - formGroup - 250;
		table.css("maxHeight", heightTable);

		var heightPanelInfo = window.outerHeight - topbar - navbar - 150;
		var panelInfo = angular.element($(".panel-info"));
		$scope.productos = data;
		angular.element($("#q")).focus();
	});

	//La parte donde elegimos el producto
	$scope.elegir = function(producto){
		close(producto);
	};

})
 <?php
  	session_start();
    include("../conect.php");
    
    if(isset($_SESSION['user'])){
    	$title = "Facturas | Simple Invoice"
  ?>
  <!DOCTYPE html>
<html>

<?php
	include("head.php");
?>

<body ng-app="ventas" style="overflow-x: hidden;overflow-y: auto;">
<?php
	include("navbar.php");
?>

<div class="container">


<div ng-controller="VentasCtrl" class="container">
		<div class="modalImpulse modalVentas">
		 	<p>Calcular vuelto <span aria-hidden="true" 
		 		style="float: right;margin-right: 10px;cursor: pointer;" ng-click="hideModalToSell()">×</span></p>
		 	<div style="padding: 15px;">
		 		<div>
		 			<label>Pago</label> <input id="pago" type="number" name="pay" ng-model="payment" ng-change="calcularVuelto()">
		 		</div>
		 		<div>
		 			<label>Vuelto</label> <input type="number" readonly name="vuelto" ng-model="vuelto">
		 		</div>
		 	</div>
		 	<div class="btnModalContainer">
		 		<button type="submit" class="btn btn-default" ng-click="facturar(productos, cliente, true)">
				<span class="glyphicon glyphicon-plus"></span>Facturar</button>
				<button type="submit" class="btn btn-default" ng-click="facturar(productos, cliente, false)">
				<span class="glyphicon glyphicon-plus"></span>Vender</button>
		 	</div>
		 </div>
		<div class="panel panel-info">
			<div class="panel-heading">
				
				<h4><i class='glyphicon glyphicon-plus'></i> Nueva Venta <span style="float: right;">C(CLIENTES) P(PRODUCTOS) R(REGISTRAR)</span></h4>
			</div>
					<div class="panel-body row">
						<form class="form-vertical col-lg-6 col-md-6 col-sm-6 col-xs-12" role="form">

						    <div class="form-group row">
						        <label for="q" class="col-md-6 control-label">Buscar Cliente</label>

                                    <div class="col-md-6">
                                	    <button type="button" class="btn btn-default" ng-click="modalUsuario()">
                                		<span class="glyphicon glyphicon-search"></span> Buscar</button>
                                		<span></span>
                                	</div>
						    </div>
				
							<div class="form-group row">
                                <label for="q" class="col-md-6 control-label">Codigo del Cliente</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" required placeholder="Codigo del cliente" ng-model="cliente.id"  readonly>
                                </div>
                            </div>

                            <div class="form-group row">
								<label for="q" class="col-md-6 control-label">Nombre del Cliente</label>
								<div class="col-md-6">
									<input type="text" class="form-control" required placeholder="Nombre del cliente" ng-model="cliente.nombre"  readonly>
								</div>
							</div>

							<div class="form-group row">
								<label for="q" class="col-md-6 control-label">Apellido del Cliente</label>
								<div class="col-md-6">
									<input type="text" class="form-control" required placeholder="Apellido del cliente" ng-model="cliente.apellido" readonly>
								</div>
							</div>

							<div class="form-group row">
								<label for="q" class="col-md-6 control-label">CI/RUC del Cliente</label>
								<div class="col-md-6">
									<input type="text" class="form-control" required placeholder="Info del cliente" ng-model="cliente.info"  readonly>
								</div>
							</div>
				
						</form>

						<form class="form-vertical col-lg-6 col-md-6 col-sm-6 col-xs-12" role="form" ng-submit="agregarProducto()">

							<div class="form-group row">
								<label for="q" class="col-md-6 control-label">Buscar Producto</label>
								
								<div class="col-md-6">
									<button type="button" class="btn btn-default" ng-click="modalProducto()">
									<span class="glyphicon glyphicon-search"></span> Buscar</button>
									<span></span>
								</div>

							</div>
							
							<div class="form-group row">
								<label for="q" class="col-md-6 control-label">Nombre del Producto</label>
								<div class="col-md-6">
									<input type="text" class="form-control" required placeholder="Nombre del producto" ng-model="prod.Nombre"  readonly>
								</div>
							</div>

							<div class="form-group row">
								<label for="q" class="col-md-6 control-label">Descripcion del Producto</label>
								<div class="col-md-6">
									<input type="text" class="form-control" required placeholder="Descripcion del producto" ng-model="prod.Descripcion"  readonly>
								</div>
							</div>

							<div class="form-group row">
								<label for="q" class="col-md-6 control-label">Precio del Producto</label>
								<div class="col-md-6">
									<label>Minorista<input type="radio" ng-model="price.type" value="minorista"></label>
									<label>Mayorista<input type="radio" ng-model="price.type" value="mayorista"></label>
									<label>Promocional<input type="radio" ng-model="price.type" value="promocional"></label>
									<span ng-if="price.type === 'minorista'">
									<input type="text" class="form-control" required placeholder="Precio del producto" ng-model="prod.PrecioUnitario | currency:'₲'" readonly>
									</span>
									<span ng-if="price.type === 'mayorista'">
									<input type="text" class="form-control" required placeholder="Precio del producto" ng-model="prod.PrecioMayorista | currency:'₲'" readonly>
									</span>
									<span ng-if="price.type === 'promocional'">
									<input type="text" class="form-control" required placeholder="Precio del producto" ng-model="prod.PrecioPromocional | currency:'₲'" readonly>
									</span>
								</div>
							</div>

							<div class="form-group row">	
								<label for="q" class="col-md-6 control-label">Cantidad del Producto</label>
								<div class="col-md-6">
									<input type="number" id="cantidadProducto" class="form-control" required placeholder="Cantidad del Producto" ng-model="cantidad">
								</div>
							</div>

							<div class="form-group row">
								<label for="q" class="col-md-6 control-label">Agregar Producto</label>
								
								<div class="col-md-6">
									<button type="submit" class="btn btn-default">
									<span class="glyphicon glyphicon-plus"></span> Agregar</button>
									<span></span>
								</div>

							</div>

						</form>


						<div class="table-responsive" id="tableProduct" style="overflow-x: inherit;">
							<table class="table">
								<tr class="info">
									<th>Codigo</th>
									<th>Nombre</th>
									<th>Descripcion</th>
									<th>Precio</th>
									<th>Cantidad</th>
									<th>Condición Venta</th>
									<th>SubTotal</th>
									<th class='text-right'>Acciones</th>
								</tr>
								
								<tr ng-repeat="producto in productos | orderBy:ordenSeleccionado | filter:buscar">
									<td>{{producto.idP}}</td>

									<td>{{producto.nombre}}</td>

									<!-- Filtro lowercase para letras en minusculas -->
									<td>{{producto.descripcion | lowercase}}</td>

									
									<td>{{producto.precio | currency:'₲'}}</td>
									
									<td>{{producto.cantidad}}</td>

									<td>{{producto.condicion}}</td>

                                    <td>{{producto.subTotal | currency:'₲'}}</td>


									<td><span class="pull-right"> 
									<a href="#" class='btn btn-default' title='Borrar producto' ng-click="eliminarProducto(producto)"><i class="glyphicon glyphicon-trash"></i> </a></span></td>
								</tr>
								
							</table>
							
						</div>
						<div class="form-group row">
								<label for="q" class="col-md-3 control-label">Total</label>
								
								<div class="col-md-3">
									<input type="text" class="form-control" required placeholder="Total" ng-model="total | currency:'₲'" readonly>
								</div>

								<label for="q" class="col-md-3 control-label">Registrar</label>
								
								<div class="col-md-3">
									<button class="btn btn-default" ng-click="prepareToSell()">
									<span class="glyphicon glyphicon-plus"></span>Registrar</button>
									
								</div>

							</div>
							<div id="saleToPrint" class="table-responsive" style="display: none;">
							
							</div>
					</div>
			</div>





	</div>
</div>
<br>
<br>
<br>
<?php
	include("footer.php");
?>
<!-- <script type="text/javascript" src="bower_components/angular/angular.min.js"></script>

<script type="text/javascript" src="bd2.js"></script> -->
</body>
</html>
<?php
	 }else{
	 	echo '<script> alert("User o password incorrectos");</script>';
        echo '<script> window.location="login.php";</script>';
    }

?>
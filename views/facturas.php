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

<body ng-app="facturas" >
<?php
	include("navbar.php");
?>

<div class="container">


<div ng-controller="FacturasCtrl" class="container">

		<div class="panel panel-info">
			<div class="panel-heading">
				
				<h4><i class='glyphicon glyphicon-plus'></i> Nueva Venta</h4>
			</div>
					<div class="panel-body">
						<form class="form-horizontal" role="form">

						    <div class="form-group row">
						        <label for="q" class="col-md-4 control-label">Buscar Cliente</label>

                                    <div class="col-md-4">
                                	    <button type="button" class="btn btn-default" ng-click="modalCliente()">
                                		<span class="glyphicon glyphicon-search"></span> Buscar</button>
                                		<span></span>
                                	</div>
						    </div>
				
							<div class="form-group row">

                                <label for="q" class="col-md-3 control-label">Codigo del Cliente</label>
                                <div class="col-md-3">
                                    <input type="text" class="form-control" required placeholder="Codigo del cliente" ng-model="cliente.id"  readonly>
                                </div>

								<label for="q" class="col-md-3 control-label">Nombre del Cliente</label>
								<div class="col-md-3">
									<input type="text" class="form-control" required placeholder="Nombre del cliente" ng-model="cliente.nombre"  readonly>
								</div>
							</div>

							<div class="form-group row">
								<label for="q" class="col-md-3 control-label">Apellido del Cliente</label>
								<div class="col-md-3">
									<input type="text" class="form-control" required placeholder="Apellido del cliente" ng-model="cliente.apellido" readonly>
								</div>
								
								<label for="q" class="col-md-3 control-label">Info del Cliente</label>
								<div class="col-md-3">
									<input type="text" class="form-control" required placeholder="Info del cliente" ng-model="cliente.info"  readonly>
								</div>
							</div>
				
						</form>

						<form class="form-horizontal" role="form" ng-submit="agregarProducto()">

							<div class="form-group row">
								<label for="q" class="col-md-4 control-label">Buscar Producto</label>
								
								<div class="col-md-4">
									<button type="button" class="btn btn-default" ng-click="modalProducto()">
									<span class="glyphicon glyphicon-search"></span> Buscar</button>
									<span></span>
								</div>

							</div>
							
							<div class="form-group row">

								<label for="q" class="col-md-3 control-label">Nombre del Producto</label>
								<div class="col-md-3">
									<input type="text" class="form-control" required placeholder="Nombre del producto" ng-model="prod.nombre"  readonly>
								</div>

								<label for="q" class="col-md-3 control-label">Descripcion del Producto</label>
								<div class="col-md-3">
									<input type="text" class="form-control" required placeholder="Descripcion del producto" ng-model="prod.descripcion"  readonly>
								</div>
							</div>

							<div class="form-group row">
								<label for="q" class="col-md-3 control-label">Precio del Producto</label>
								<div class="col-md-3">
									<input type="text" class="form-control" required placeholder="Precio del producto" ng-model="prod.precio | currency:'₲'" readonly>
								</div>
								
								<label for="q" class="col-md-3 control-label">Cantidad del Producto</label>
								<div class="col-md-3">
									<input type="text" class="form-control" required placeholder="Cantidad del Producto" ng-model="cantidad">
								</div>
							</div>

							<div class="form-group row">
								<label for="q" class="col-md-4 control-label">Agregar Producto</label>
								
								<div class="col-md-4">
									<button type="submit" class="btn btn-default">
									<span class="glyphicon glyphicon-plus"></span> Agregar</button>
									<span></span>
								</div>

							</div>

						</form>


						<div class="table-responsive">
							<table class="table">
								<tr class="info">
									<th>Codigo</th>
									<th>Nombre</th>
									<th>Descripcion</th>
									<th>Precio</th>
									<th>Cantidad</th>
									<th>SubTotal</th>
									<th>Iva</th>
									<th class='text-right'>Acciones</th>
								</tr>
								
								<tr ng-repeat="producto in productos | orderBy:ordenSeleccionado | filter:buscar">
									<td>{{producto.idP}}</td>

									<td>{{producto.nombre}}</td>

									<!-- Filtro lowercase para letras en minusculas -->
									<td>{{producto.descripcion | lowercase}}</td>

									
									<td>{{producto.precio | currency:'₲'}}</td>
									
									<td>{{producto.cantidad}}</td>

                                    <td>{{producto.subTotal | currency:'₲'}}</td>

                                    <td>{{producto.iva | currency:'₲'}}</td>

									<td><span class="pull-right"> 
									<a href="#" class='btn btn-default' title='Borrar producto' ng-click="eliminarProducto(producto)"><i class="glyphicon glyphicon-trash"></i> </a></span></td>
								</tr>
								
							</table>
							
						</div>
						<div class="form-group row">
								<label for="q" class="col-md-2 control-label">Total</label>
								
								<div class="col-md-2">
									<input type="text" class="form-control" required placeholder="Total" ng-model="total | currency:'₲'" readonly>
								</div>

								<label for="q" class="col-md-2 control-label">Facturar</label>
								
								<div class="col-md-2">
									<button type="submit" class="btn btn-default" ng-click="facturar(productos, cliente)">
									<span class="glyphicon glyphicon-plus"></span>Facturar</button>
									<span></span>
								</div>

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
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

<body ng-app="compras" style="overflow-x: hidden;overflow-y: auto;">
<?php
	include("navbar.php");
?>

<div class="container">


<div ng-controller="ComprasCtrl" class="container">

		<div class="panel panel-info">
			<div class="panel-heading">
				
				<h4><i class='glyphicon glyphicon-plus'></i> Nueva Compra</h4>
			</div>
					<div class="panel-body row">
						<form class="form-vertical col-lg-6 col-md-6 col-sm-6 col-xs-12" role="form">

						    <div class="form-group row">
						        <label for="q" class="col-md-6 control-label">Buscar Proveedor</label>

                                    <div class="col-md-6">
                                	    <button type="button" class="btn btn-default" ng-click="modalProveedor()">
                                		<span class="glyphicon glyphicon-search"></span> Buscar</button>
                                		<span></span>
                                	</div>
						    </div>
				
							<div class="form-group row">
                                <label for="q" class="col-md-6 control-label">Codigo del Proveedor</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" required placeholder="Codigo del proveedor" ng-model="proveedor.id"  readonly>
                                </div>
                            </div>

                            <div class="form-group row">
								<label for="q" class="col-md-6 control-label">Nombre del Proveedor</label>
								<div class="col-md-6">
									<input type="text" class="form-control" required placeholder="Nombre del proveedor" ng-model="proveedor.nombre"  readonly>
								</div>
							</div>

							<div class="form-group row">
								<label for="q" class="col-md-6 control-label">Apellido del Proveedor</label>
								<div class="col-md-6">
									<input type="text" class="form-control" required placeholder="Apellido del proveedor" ng-model="proveedor.apellido" readonly>
								</div>
							</div>

							<div class="form-group row">	
								<label for="q" class="col-md-6 control-label">Info del Proveedor</label>
								<div class="col-md-6">
									<input type="text" class="form-control" required placeholder="Info del proveedor" ng-model="proveedor.info"  readonly>
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
									<input type="text" class="form-control" required placeholder="Nombre del producto" ng-model="prod.nombre"  readonly>
								</div>
							</div>

							<div class="form-group row">
								<label for="q" class="col-md-6 control-label">Descripcion del Producto</label>
								<div class="col-md-6">
									<input type="text" class="form-control" required placeholder="Descripcion del producto" ng-model="prod.descripcion"  readonly>
								</div>
							</div>

							<div class="form-group row">
								<label for="q" class="col-md-6 control-label">Costo del Producto</label>
								<div class="col-md-6">
									<input type="text" class="form-control" required placeholder="Precio del producto" ng-model="precio" >
								</div>
							</div>

							<div class="form-group row">	
								<label for="q" class="col-md-6 control-label">Cantidad del Producto</label>
								<div class="col-md-6">
									<input type="text" class="form-control" required placeholder="Cantidad del Producto" ng-model="cantidad">
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

					</div>
					<div class="table-responsive">
							<table class="table">
								<tr class="info">
									<th>Codigo</th>
									<th>Nombre</th>
									<th>Descripcion</th>
									<th>Precio</th>
									<th>Cantidad</th>
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

								<label for="q" class="col-md-3 control-label">Facturar</label>
								
								<div class="col-md-3">
									<button type="submit" class="btn btn-default" ng-click="facturar(productos, proveedor)">
									<span class="glyphicon glyphicon-plus"></span>Facturar</button>
									<span></span>
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
		if($_SESSION['user'] != "Administrador"){
			echo '<script>
			isNotAdmin();
			</script>';
		}
	 }else{
	 	echo '<script> alert("User o password incorrectos");</script>';
        echo '<script> window.location="login.php";</script>';
    }

?>
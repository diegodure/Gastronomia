  <?php
  	session_start();
    include("../conect.php");
    
    if(isset($_SESSION['user'])){
    	$title = "Impulse";
  ?>
  <!DOCTYPE html>
<html>

<?php
	include("head.php");
?>

<body ng-app="productos" style="overflow:hidden">
<?php
	include("navbar.php");
?>

<div class="container">


<div ng-controller="ProductosCtrl" class="container">	
		
		<div class="panel panel-info">
			<div class="panel-heading">
				<div class="btn-group pull-right">
					<button type='button' class="btn btn-info" ng-click="mostrarModalNuevoProducto()"><span class="glyphicon glyphicon-plus" ></span> Nuevo Producto</button>
				</div>
				<h4><i class='glyphicon glyphicon-search'></i> Buscar Producto</h4>
			</div>
					<div class="panel-body">
						<form class="form-horizontal" role="form" id="datos_cotizacion">
				
							<div class="form-group row">
								<label for="q" class="col-md-2 control-label">Nombre del Producto</label>
								<div class="col-md-5">
									<input type="text" class="form-control" id="q" placeholder="Nombre del producto" ng-model="buscar.$">
								</div>
								<div class="col-md-3">
									<label><input type="radio" ng-model="product.type" value="ingrediente">Ingrediente</label>
									<label><input type="radio" ng-model="product.type" value="menu">menu</label>
									<label><input type="radio" ng-model="product.type" value="">Todos</label>
								</div>
							
							</div>
				
						</form>
						<div class="table-responsive tableAbm">
							<table class="table">
								<tr class="info">
									<th>Código</th>
									<th>
										<span class="caret" style="cursor: pointer;" ng-click="ordenarPor('Nombre')"></span>Nombre/s<span class="caret" style="cursor: pointer;" ng-click="ordenarPor('-Nombre')"></span>
									</th>
									<th>Descripcion</th>
									<th>Costo</th>
									<th>Precio Venta</th>
									<th>Precio Promocional</th>
									<th>Tipo</th>
									<th class='text-right'>Acciones</th>
								</tr>
								
								<tr ng-repeat="producto in productos | orderBy:ordenSeleccionado | filter:buscar:strict | filter:{productType:product.type}">
									<td>{{producto.idProductos}}</td>
									<td>
										{{producto.Nombre}}
									</td>
									<td>{{producto.Descripcion}}</td>
									<td>{{producto.Costo | currency :'₲':0}}</td>
									<td>{{producto.PrecioUnitario | currency :'₲':0}}</td>
									<td>{{producto.PrecioPromocional | currency :'₲':0}}</td>
									<td>{{producto.productType}}</td>

									<td><span class="pull-right">
									<a href="#" class='btn btn-default' title='Editar producto' ng-click="modificar(producto)" data-toggle="modal"><i class="glyphicon glyphicon-edit"></i></a> 
									<a href="#" class='btn btn-default' title='Borrar producto' ng-click="eliminar(producto)"><i class="glyphicon glyphicon-trash"></i> </a></span></td>
								</tr>
								
							</table>
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
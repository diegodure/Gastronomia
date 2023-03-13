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

<body ng-app="mesas" >
<?php
	include("navbar.php");
?>

<div class="container">


<div ng-controller="MesasCtrl" class="container">

		<div class="panel panel-info">
			<div class="panel-heading">
				<div class="btn-group pull-right">
					<button type='button' class="btn btn-info" ng-click="mostrarModal()"><span class="glyphicon glyphicon-plus" ></span> Nueva Mesa</button>
				</div>
				<h4><i class='glyphicon glyphicon-search'></i> Buscar Mesa</h4>
			</div>
					<div class="panel-body">
						<form class="form-horizontal" role="form" id="datos_cotizacion">
				
							<div class="form-group row">
								<label for="q" class="col-md-2 control-label">Nombre de la mesa</label>
								<div class="col-md-5">
									<input type="text" class="form-control" id="q" placeholder="Nombre de la mesa" ng-model="buscar.Nombre">
								</div>
								<div class="col-md-3">
									<button type="button" class="btn btn-default">
									<span class="glyphicon glyphicon-search"></span> Buscar</button>
									<span></span>
								</div>
							
							</div>
				
						</form>
						<div class="table-responsive">
							<table class="table">
								<tr class="info">
									<th>Código</th>
									<th><span class="caret" style="cursor: pointer;" ng-click="ordenarPor('Nombre')"></span>Nombre<span class="caret" style="cursor: pointer;" ng-click="ordenarPor('-Nombre')"></span></th>
									<th>Descripción</th>
									<th>Estado</th>
									<th class='text-right'>Acciones</th>
								</tr>
								
								<tr ng-repeat="mesa in mesas | orderBy:ordenSeleccionado | filter:buscar">
									<td>{{mesa.idMesas}}</td>
									<td>{{mesa.Nombre}}</td>
									<td>{{mesa.Descripcion}}</td>
									<td>
										<span style="font-weight: bold;" ng-if="mesa.Active == 0">
											Habilitado
										</span>
										<span style="font-weight: bold;" ng-if="mesa.Active == 1">
											Deshabilitado
										</span></td>


									<td><span class="pull-right">
									<a href="#" class='btn btn-default' title='Editar mesa' ng-click="modificar(mesa)" data-toggle="modal"><i class="glyphicon glyphicon-edit"></i></a> 
									<a href="#" class='btn btn-default' title='Borrar mesa' ng-click="eliminar(mesa)"><i class="glyphicon glyphicon-trash"></i> </a></span></td>
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
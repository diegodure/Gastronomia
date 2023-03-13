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

<body ng-app="configuracion" style="overflow:hidden">
<?php
	include("navbar.php");
?>

<div class="container">


<div ng-controller="ConfiguracionCtrl" class="container">

		<div class="panel panel-info">
			<div class="panel-heading">
				
				<h4><i class='glyphicon glyphicon-search'></i> Buscar Configuración</h4>
			</div>
					<div class="panel-body">
						<form class="form-horizontal" role="form" id="datos_cotizacion">
				
							<div class="form-group row">
								<label for="q" class="col-md-2 control-label">Nombre de la configuración</label>
								<div class="col-md-5">
									<input type="text" class="form-control" id="q" placeholder="Nombre de la configuración" ng-model="buscar.Nombre">
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
									<th><span class="caret" style="cursor: pointer;" ng-click="ordenarPor('Nombre')"></span>Nombre/s<span class="caret" style="cursor: pointer;" ng-click="ordenarPor('-Nombre')"></span></th>
									<th>Descripción</th>
									<th>Estado</th>
									<th class='text-right'>Acciones</th>
								</tr>
								
								<tr ng-repeat="configuracion in configuraciones | orderBy:ordenSeleccionado | filter:buscar">
									<td>{{configuracion.idConfiguracion}}</td>
									<td>{{configuracion.Nombre}}</td>
									<td>{{configuracion.Descripcion}}</td>
							
									<!-- Filtro lowercase para letras en minusculas -->
									<td>
										<span style="font-weight: bold;" ng-if="configuracion.Estado != 0 && configuracion.Nombre == 'Vencimiento'">
											{{configuracion.Estado}} día(s)
										</span>
										<span style="font-weight: bold;" ng-if="configuracion.Estado == 1">
											Deshabilitado
										</span>
										<span style="font-weight: bold;" ng-if="configuracion.Estado == 0 && configuracion.Nombre == 'Vencimiento'">
											Deshabilitado
										</span>
										<span style="font-weight: bold;" ng-if="configuracion.Estado == 0 && configuracion.Nombre != 'Vencimiento'">
											Habilitado
										</span>
										
									</td>
									
									<td><span class="pull-right">
									<a href="#" class='btn btn-default' title='Editar producto' ng-click="modificarConfiguracion(configuracion)" data-toggle="modal"><i class="glyphicon glyphicon-edit"></i></a> 
									</span></td>
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
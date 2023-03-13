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

<body ng-app="login">
<?php
	include("navbar.php");
?>

<div class="container">


<div ng-controller="LoginCtrl" class="container">

		<div class="panel panel-info">
			<div class="panel-heading">
				<div class="btn-group pull-right">
					<button type='button' class="btn btn-info" ng-click="createEnterprise()"><span class="glyphicon glyphicon-plus" ></span> Nueva Empresa</button>
				</div>
				<h4><i class='glyphicon glyphicon-search'></i> Buscar Empresa</h4>
			</div>
					<div class="panel-body">
						<form class="form-horizontal" role="form" id="">
				
							<div class="form-group row">
								<label for="q" class="col-md-2 control-label">Nombre de la empresa</label>
								<div class="col-md-5">
									<input type="text" class="form-control" id="q" placeholder="Nombre de la empresa" ng-model="buscar.Nombre">
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
									<th>Ciudad</th>
									<th>País</th>
									<th class='text-right'>Acciones</th>
								</tr>
								
								<tr ng-repeat="empresa in enterprise | orderBy:ordenSeleccionado | filter:buscar">
									<td>{{empresa.idEmpresas}}</td>
									<td>{{empresa.Nombre}}</td>
									<td>{{empresa.Descripcion}}</td>
							
									<!-- Filtro lowercase para letras en minusculas -->
									<td>{{empresa.Ciudad}}</td>
									<td>{{empresa.Pais}}</td>


									<td><span class="pull-right">
									<a href="#" class='btn btn-default' title='Editar empresa' ng-click="modifyEnterprise(empresa)" data-toggle="modal"><i class="glyphicon glyphicon-edit"></i></a> 
									<a href="#" class='btn btn-default' title='Borrar empresa' ng-click="deleteEnterprise(empresa)"><i class="glyphicon glyphicon-trash"></i> </a></span></td>
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
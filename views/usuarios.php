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

<body ng-app="usuarios" >
<?php
	include("navbar.php");
?>

<div class="container">



<div ng-controller="UsuariosCtrl" class="container">

		<div class="panel panel-info">
			<div class="panel-heading">
				<div class="btn-group pull-right">
					<button type='button' class="btn btn-info" ng-click="newUser()"><span class="glyphicon glyphicon-plus"></span> Nuevo Usuario</button>
					

				</div>
				<h4><i class='glyphicon glyphicon-search'></i> Buscar Usuarios</h4>
			</div>
					<div class="panel-body">
						<form class="form-horizontal" role="form" id="">
				
							<div class="form-group row">
								<label for="q" class="col-md-2 control-label">Nombre del Usuario</label>
								<div class="col-md-5">
									<input type="text" class="form-control" id="q" placeholder="Nombre del usuario" ng-model="buscar.Nombre">
								</div>
								<div class="col-md-3">
									<button type="button" class="btn btn-default" ng-click="">
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
									<th>Apellido</th>
									<th>Rol</th>
									<th class='text-right'>Acciones</th>
								</tr>
								
								<tr ng-repeat="usuario in usuarios | orderBy:ordenSeleccionado | filter:buscar">
									<td>{{usuario.idUsuarios}}</td>
									<td>{{usuario.Nombre}}</td>
							
									<!-- Filtro lowercase para letras en minusculas -->
									<td>{{usuario.Apellido | lowercase}}</td>
							
									<td>{{usuario.Rol}}</td>

									<td><span class="pull-right">
									<a href="#" class='btn btn-default' title='Editar usuario' ng-click="modificar(usuario)" data-toggle="modal"><i class="glyphicon glyphicon-edit"></i></a> 
									<a href="#" class='btn btn-default' title='Borrar usuario' ng-click="eliminar(usuario)" data-toggle="modal"><i class="glyphicon glyphicon-trash"></i> </a></span></td>
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
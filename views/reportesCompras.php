  <?php
  	session_start();
    include("../conect.php");
    
    if(isset($_SESSION['user'])){
    	$title = "Impulse"
  ?>
  <!DOCTYPE html>
<html>

<?php
	include("head.php");
?>

<body ng-app="reportesCompras" >
<?php
	include("navbar.php");
?>

<div class="container">
	<div ng-controller="ReportesComprasCtrl" class="container">
		<div class="panel panel-info">
			<div class="panel-heading">
				
				<h4><i class='glyphicon glyphicon-search'></i> Buscar Compras</h4>
			</div>
			<div class="panel-body">
				<form class="form-horizontal" role="form" id="datos_cotizacion">
						
            	    <div class="form-group row" style="display: inline-block;width: 45%;">
            		    <label for="q" class="col-md-4 control-label">Fecha desde</label>
            		    <div class="col-md-6">

                            <datepicker ng-click="calendar()" date-format="yyyy-MM-dd" selector="form-control" button-prev-title="previous month" button-next-title="next month">
                                <div class="input-group">
                                    <input class="form-control" placeholder="Fecha de la Venta" ng-model="date1" style="cursor: pointer"/>
                                    <span class="input-group-addon">
                                    <i class="fa fa-lg fa-calendar"></i>
                                    </span>
                                </div>
                            </datepicker>


                        </div>

            		</div>

            		<div class="form-group row" style="display: inline-block;width: 45%;">
            		    <label for="q" class="col-md-4 control-label">Fecha hasta</label>
            		    <div class="col-md-6">

                            <datepicker ng-click="calendar()" date-format="yyyy-MM-dd" selector="form-control" button-prev-title="previous month" button-next-title="next month">
                                <div class="input-group">
                                    <input class="form-control" placeholder="Fecha de la Venta" ng-model="date2" style="cursor: pointer"/>
                                    <span class="input-group-addon">
                                    <i class="fa fa-lg fa-calendar"></i>
                                    </span>
                                </div>
                            </datepicker>


                        </div>

            		</div>

					<div class="btn-group pull-right">
					<button type='button' class="btn btn-info" ng-click="report(date1,date2)"><span class="glyphicon glyphicon-plus"></span> Buscar</button>
					

					</div>
				</form>

				<div class="container">
				  <div class="row" >
				    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
				    	<div class="table-responsive">
				    		<table class="table">
								<tr class="info">
									<th>Codigo</th>
									<th>Fecha</th>
									<th>Total</th>
									<th>Ver detalle</th>
								</tr>
								<tr ng-repeat="compra in compras">
									<td>{{compra.idCompras}}</td>
									<td>{{compra.Fecha}}</td>
									<td>{{compra.Total | currency :'₲':0}}</td>
									<td><span class="pull-left"> 
									<a href="#" class='btn btn-default' title='Detalle de la compra' ng-click="showPurchase(compra)"><i class="glyphicon glyphicon-search"></i> </a></span></td>
								</tr>
							</table>
				    	</div>
				      
				    </div>
				    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
				      <div class="table-responsive">
				    		<table class="table">
								<tr class="info">
									<th>Codigo</th>
									<th>Producto</th>
									<th>Precio</th>
									<th>Cantidad</th>
									
								</tr>
								<tr ng-repeat="detCom in detCompra">
									<td>{{detCom.Compras_idCompras}}</td>
									<td>{{detCom.Nombre}}</td>
									<td>{{detCom.Precio | currency :'₲':0}}</td>
									<td>{{detCom.Cantidad}}</td>
									
								</tr>
							</table>
				    	</div>
				      
				    </div>
				    </div>
				    
				  </div>
				</div>

			</div>
		</div>
	</div>
</div>
<!-- <div ng-controller="ctrl">

  		<button ng-click="mostrarModal()">Ver Modal</button>
  		<br>{{ resultadoModal }}

	</div> -->
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
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

<body ng-app="reportesBalances" style="overflow-x: hidden;overflow-y: auto;">
<?php
	include("navbar.php");
?>

<div class="container">
	<div ng-controller="ReportesBalancesCtrl" class="container">
		<div class="panel panel-info">
			<div class="panel-heading">
				
				<h4><i class='glyphicon glyphicon-search'></i> Buscar Balance</h4>
			</div>
			<div class="panel-body">
				<div class="row">
						
            	    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
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

            		<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
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

					<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
					<button type='button' class="btn btn-info" ng-click="report(date1,date2)"><span class="glyphicon glyphicon-plus"></span> Buscar</button>
					<button type='button' ng-show="etiquetas.length > 0" class="btn btn-info" ng-click="downloadReport()"><span class="glyphicon glyphicon-download-alt"></span> Descargar</button>

					</div>
				</div>

				<div class="row" id="reportContainer">
					<div class="col col-md-12 col-lg-12 col-xl-12">
						<h4 style="text-align: center;">Productos más vendidos</h4>
						<div class="table-responsive">
					  		<table class="table">
					  			<tr class="info">
									<th>Nombre</th>
									<th>Costo Producto</th>
									<th>Precio de Venta</th>
									<th>Porcentaje de ganancia</th>
									<th>Tipo de Venta</th>
									<th>Cantidad de Ventas</th>
									<th>Total de Ventas</th>
								</tr>
								<tr ng-repeat="maxP in maxProducts">
									<td>{{maxP.Nombre}}</td>
									<td>{{maxP.Costo}}</td>
									<td>{{maxP.Precio}}</td>
									<td>{{((maxP.Precio-maxP.Costo)/maxP.Precio)*100}}%</td>
									<td>{{maxP.Condicion_Venta}}</td>
									<td>{{maxP.CantidadVentas}}</td>
									<td>{{maxP.TotalVentas}}</td>
								</tr>
					  		</table>
				  		</div>
				  	</div>
				  	<div class="col col-md-12 col-lg-12 col-xl-12">
				  		<canvas id="mylineGraph"></canvas>
				  	</div>
				    <div class="col col-md-12 col-lg-12 col-xl-12" >
				    	
				    	<canvas id="barChart" class="chart chart-bar" chart-colors="colors" chart-data="datos" chart-labels="etiquetas" chart-series="series" chart-legend="options"></canvas>
				    </div>
				    <div class="col col-md-12 col-lg-12 col-xl-12" >
				     <canvas id="pie" class="chart chart-pie" chart-options="options" chart-colors="colors" chart-data="data" chart-labels="labels"></canvas>
				      
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
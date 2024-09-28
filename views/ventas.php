<?php
session_start();
include("../conect.php");

if (isset($_SESSION['user'])) {
    $title = "Impulse";
?>
<!DOCTYPE html>
<html>

<?php include("head.php"); ?>

<body ng-app="ventas" style="overflow-x: hidden; overflow-y: auto;">
    <?php include("navbar.php"); ?>

    <div class="container">
        <div ng-controller="VentasCtrl" class="container">
            <div class="modalImpulse modalVentas">
                <p>Calcular vuelto <span aria-hidden="true" style="float: right;margin-right: 10px;cursor: pointer;" ng-click="hideModalToSell()">×</span></p>
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

            <!-- Pestañas -->
            <ul class="nav nav-tabs" role="tablist">
                <li class="active"><a data-toggle="tab" href="#mesas">Mesas</a></li>
                <li><a data-toggle="tab" href="#delivery">Delivery</a></li>
                <li><a data-toggle="tab" href="#pickup">Pickup</a></li>
            </ul>

            <div class="tab-content">
                <div id="mesas" class="tab-pane fade in active">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h4><i class='glyphicon glyphicon-plus'></i> Nueva Venta </h4>
                        </div>
                        <div class="panel-body row" style="overflow:auto">
                            <div ng-repeat="mesa in mesas | orderBy:ordenSeleccionado | filter:buscar" class="col col-xl-3 col-lg-4 col-md-4 col-sm-6" ng-click="showOrder(mesa)" style="">
                                <div style="padding:5px">
                                    <div ng-if="mesa.Active == 0" class="containerTablesActive">
                                        <div style="font-weight:bold">{{mesa.Nombre}}</div>
                                        <div>{{mesa.Descripcion}}</div>
                                        <div>Disponible</div>
                                    </div>
                                    <div ng-if="mesa.Active == 1" class="containerTablesInactive">
                                        <div style="font-weight:bold">{{mesa.Nombre}}</div>
                                        <div>{{mesa.Descripcion}}</div>
                                        <div>Ocupado</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="delivery" class="tab-pane fade">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h4><i class='glyphicon glyphicon-plus'></i> Delivery </h4>
                        </div>
                        <div class="panel-body">
                            <p style="color:black">Contenido de Delivery aquí...</p>
                            <!-- Aquí puedes añadir tu código para mostrar deliverys -->
                        </div>
                    </div>
                </div>

                <div id="pickup" class="tab-pane fade">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h4><i class='glyphicon glyphicon-plus'></i> Pickup </h4>
                        </div>
                        <div class="panel-body">
                            <p style="color:black">Contenido de Pickup aquí...</p>
                            <!-- Aquí puedes añadir tu código para mostrar pickups -->
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <br>
    <br>
    <br>
    <?php include("footer.php"); ?>
    <!-- <script type="text/javascript" src="bower_components/angular/angular.min.js"></script> -->
    <!-- <script type="text/javascript" src="bd2.js"></script> -->
</body>
</html>
<?php
} else {
    echo '<script> alert("User o password incorrectos");</script>';
    echo '<script> window.location="login.php";</script>';
}
?>

<?php
session_start();
include("../conect.php");

if (isset($_SESSION['user'])) {
    $title = "Impulse";
?>
<!DOCTYPE html>
<html>

<?php include("head.php"); ?>

<<<<<<< HEAD
<body ng-app="ventas" style="overflow: hidden;">
=======
<body ng-app="ventas" style="overflow-x: hidden; overflow-y: auto;">
>>>>>>> c3e0ee4afbf58f1dde2b824abc0693b4af5894ea
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
                <li ng-click="Mesas()" class="active"><a data-toggle="tab" href="#mesas">Mesas</a></li>
                <li ng-click="selectVentas('delivery')"><a data-toggle="tab" href="#delivery">Delivery</a></li>
                <li ng-click="selectVentas('pickup')"><a data-toggle="tab" href="#pickup">Pickup</a></li>
            </ul>

            <div class="tab-content">
                <input type="hidden" id="saleType">
                <div id="mesas" class="tab-pane fade in active">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h4> Mesas </h4>
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
                            <h4>
                                <i class='glyphicon glyphicon-plus' 
                                style="cursor:pointer" ng-click="showOrder({})"></i> 
                            Delivery </h4>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div ng-repeat="delivery in deliveries | orderBy:ordenSeleccionado | filter:buscar" class="col col-xl-4 col-lg-6 col-md-6 col-sm-12" style="margin-bottom: 15px;">
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                            <h5><strong>{{delivery.Nombre}} {{delivery.Apellido}}</strong></h5>
                                            <p style="color:black"><i class='glyphicon glyphicon-time'></i> Fecha: {{delivery.Fecha}}</p>
                                            <p style="color:black"><i class='glyphicon glyphicon-earphone'></i> Contacto: {{delivery.Info}}</p>
                                            
                                            <!-- Estado del pedido -->
                                            <div ng-if="delivery.Estado == 0" class="alert alert-warning">
                                                <i class="glyphicon glyphicon-exclamation-sign"></i> Pedido pendiente
                                            </div>
                                            <div ng-if="delivery.Estado == 1" class="alert alert-success">
                                                <i class="glyphicon glyphicon-ok"></i> Pedido completado
                                            </div>

                                            <!-- Botones de acciones -->
                                            <div class="text-right">
                                                <button class="btn btn-info btn-sm" ng-click="showOrder(delivery)">
                                                    <i class="glyphicon glyphicon-eye-open"></i> Ver detalles
                                                </button>
                                                <button class="btn btn-success btn-sm" ng-click="completeOrder(delivery)">
                                                    <i class="glyphicon glyphicon-ok"></i> Completar
                                                </button>
                                                <button class="btn btn-danger btn-sm" ng-click="deleteOrder(delivery)">
                                                    <i class="glyphicon glyphicon-trash"></i> Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="pickup" class="tab-pane fade">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h4>
                                <i class='glyphicon glyphicon-plus' style="cursor:pointer"></i> 
                            Pickup </h4>
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

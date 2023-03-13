angular.module('reportesCompras',['720kb.datepicker'])

.factory("flash", function($rootScope) {

  return {

    pop: function(message) {
      switch(message.type) {
        case 'success':
          toastr.success(message.body, message.title);
          break;
        case 'info':
          toastr.info(message.body, message.title);
          break;
        case 'warning':
          toastr.warning(message.body, message.title);
          break;
        case 'error':
          toastr.error(message.body, message.title);
          break;
      }
    }
  };
})

    .controller("ReportesComprasCtrl", function ($scope, $http, flash) {

        $scope.report = function (date1,date2) {
            
              var fechas = {
                fecha1: date1,
                fecha2: date2
              };
              if(fechas.fecha1 == undefined || fechas.fecha2 == undefined){
                $scope.msgTitle = 'Atención';
                $scope.msgBody  = 'Debe seleccionar el rango de fechas!';
                $scope.msgType  = 'warning';
                flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
              }else{
                angular.element($("#spinerContainer")).css("display", "block");
                $http.post('../models/selectCompra.php', fechas).success(function (data) {
                    $scope.compras = data;
                    angular.element($("#spinerContainer")).css("display", "none");
                });
              }            
        };


        $scope.showPurchase = function (compra) {
          
          var compra = {
            idVenta: compra.idCompras,
            fecha: compra.Fecha
          };
          angular.element($("#spinerContainer")).css("display", "block");
          $http.post('../models/selectCompraDetalle.php', compra).success(function (data) {
                  $scope.detCompra = data;
                  angular.element($("#spinerContainer")).css("display", "none");
              });
       };

    });




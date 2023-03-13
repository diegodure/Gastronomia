angular.module('reportesVentas',['720kb.datepicker'])

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

    .controller("ReportesVentasCtrl", function ($scope, $http, flash) {

    //	$scope.calendar = function (date) {
	//	$scope.fecha = date;
	//};
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
                $http.post('../models/selectVenta.php', fechas).success(function (data) {
                    $scope.ventas = data;
                    angular.element($("#spinerContainer")).css("display", "none");
                });
              }
        };


        $scope.showSell = function (venta) {
          
          var venta = {
            idVenta: venta.idVentas,
            fecha: venta.Fecha
          };
          angular.element($("#spinerContainer")).css("display", "block");
          $http.post('../models/selectVentaDetalle.php', venta).success(function (data) {
                  $scope.detVenta = data;
                  angular.element($("#spinerContainer")).css("display", "none");
              });
       };

    });




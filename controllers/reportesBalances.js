angular.module('reportesBalances',['720kb.datepicker','chart.js'])

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

.controller("ReportesBalancesCtrl", function ($scope, $http, flash) {

    //	$scope.calendar = function (date) {
	//	$scope.fecha = date;
	//};

	$scope.labels = ["Compras", "Ventas", "Ganancias"];
  	$scope.data = [];
  	var compras = [];
  	var ventas = [];
  	var sumCompra = 0;
  	var sumVenta = 0; 
  	var resBalance = 0;
    var dateBackup = 0;

	       $scope.etiquetas = [];
        $scope.series = ['Compras', 'Ventas'];


        $scope.datos = [];
       // $scope.datos = [
          //  [65, 59, 80, 81],
          //  [28, 48, 40, 19]
       // ];
	$scope.downloadReport = function(){
    html2canvas(document.getElementById('reportContainer'), {
      onrendered: function(canvas) {
        var data = canvas.toDataURL();
        var docDefinition = {
          content: [{
            image: data,
            width: 500,
          }]
        };
        pdfMake.createPdf(docDefinition).open();
        // pdfMake.createPdf(docDefinition).download("test.pdf");
      }
    });
  }

  $scope.createReport = function(date1, date2){
    var line = document.getElementById("mylineGraph").getContext("2d");
    var barChart = document.getElementById("barChart")
    $scope.datos = [];
    $scope.data = [];
    $scope.etiquetas = [];
    $scope.colors = ['#ff0000','#3498DB','#717984','#F1C40F'];
    $scope.options = {legend:{display:true,position:"top"}}
    compras = [];
    ventas = [];

    sumCompra, sumTotalCompra = 0;
    sumVenta, sumTotalVenta = 0; 
    resBalance = 0;
    dateBackup = 0;
    var fechas = {
      fecha1: date1,
      fecha2: date2
    };
    if (fechas.fecha1 == undefined || fechas.fecha2 == undefined) {
      $scope.msgTitle = 'Atención';
      $scope.msgBody  = 'Debe seleccionar el rango de fechas!';
      $scope.msgType  = 'warning';
      flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
    }else{
      angular.element($("#spinerContainer")).css("display", "block");
      $http.post('../models/selectVenta.php', fechas).success(function (data) {
        $scope.ventas = data;
        var num = 0;
        var dateCompare = 0;
        for(var i = 0; i < $scope.ventas.length; i++){
          if(dateCompare != $scope.ventas[i]["Fecha"]){
            $scope.etiquetas.push($scope.ventas[i]["Fecha"]);
            num = parseInt($scope.ventas[i]["Total"]);
            sumTotalVenta = sumTotalVenta + num;
            dateBackup = $scope.ventas[i]["Fecha"];
            dateCompare = $scope.ventas[i]["Fecha"];
          }else{
            num = parseInt($scope.ventas[i]["Total"]);
            sumTotalVenta = sumTotalVenta + num;
            dateBackup = $scope.ventas[i]["Fecha"];
            dateCompare = $scope.ventas[i]["Fecha"];
          }
        }
        $http.post('../models/selectCompra.php', fechas).success(function (data) {
          num = 0;
          dateCompare = 0;
          $scope.compras = data;
          for (var i = 0; i < $scope.compras.length; i++) {
              var igual=false;
               for (var j = 0; j < $scope.etiquetas.length & !igual; j++) {
                   if($scope.compras[i]['Fecha'] == $scope.etiquetas[j]) 
                           igual=true;
               }
              if(!igual)$scope.etiquetas.push($scope.compras[i]['Fecha']);
          }
          
          $scope.etiquetas.sort((a, b) => new Date(a).getTime() > new Date(b).getTime());
         
          for(var i = 0; i < $scope.compras.length; i++){
            if(dateCompare != $scope.compras[i]["Fecha"]){
              num = parseInt($scope.compras[i]["Total"]);
              sumTotalCompra = sumTotalCompra + num;
              dateBackup = $scope.compras[i]["Fecha"];
              dateCompare = $scope.compras[i]["Fecha"];
            }else{
              num = parseInt($scope.compras[i]["Total"]);
              sumTotalCompra = sumTotalCompra + num;
              dateBackup = $scope.compras[i]["Fecha"];
              dateCompare = $scope.compras[i]["Fecha"];
            }
          }
          
          angular.element($("#spinerContainer")).css("display", "none");
          resBalance = sumTotalVenta - sumTotalCompra;
          $scope.data.push(sumTotalCompra,sumTotalVenta,resBalance);
          $scope.datos.push(compras,ventas);
          console.log($scope.etiquetas);
          console.log("Compra"+sumTotalCompra);
          console.log("Venta"+sumTotalVenta);
          var mylineGraph = new Chart(line, {
            type: "line",
            data: {
              labels: $scope.etiquetas/*La linea de tiempo a mostrarse en el grafico*/,
              datasets: [
                {
                  label: "COMPRAS",
                  data: compras,
                  fill: false,
                  borderColor: "rgba(245, 35, 56, .65)",
                  lineTension: 0,
                  pointBorderWidth: 2,
                  borderDash: [5, 5],
                  pointStyle: "rectRounded"
                },
                {
                  label: "VENTAS",
                  data: ventas,
                  fill: false,
                  borderColor: "rgba(55, 130, 220, .65)",
                  backgroundColor: "rgba(55, 130, 220, 0.1)",
                  lineTension: 0,
                  pointBorderWidth: 2,
                  borderDash: [5, 5],
                  pointStyle: "rectRounded"
                }
              ]
            },
            options: {
              title: {
                display: true,
                text: "Gráficos de compras y ventas del "+fechas.fecha1+" al "+fechas.fecha2,
                fontSize: 26,
              },
              legend:{
                display: true,
                position: 'top',
                labels: {
                  boxWidth:80,
                  fontColor: 'black'
                }
              },
              plugins: {
               datalabels: {
                 display: false
               }
              }
            }
          });

        });
      });
            
    }
  }   
        $scope.report = function (date1,date2) {
            var line = document.getElementById("mylineGraph").getContext("2d");
            var barChart = document.getElementById("barChart")
              $scope.datos = [];
              $scope.data = [];
              $scope.etiquetas = [];
              $scope.colors = ['#ff0000','#3498DB','#717984','#F1C40F'];
              $scope.options = {legend:{display:true,position:"top"}}
              compras = [];
              ventas = [];
              sumCompra, sumTotalCompra = 0;
              sumVenta, sumTotalVenta = 0; 
              resBalance = 0;
              dateBackup = 0;
              var fechas = {
                fecha1: date1,
                fecha2: date2
              };
              if (fechas.fecha1 == undefined || fechas.fecha2 == undefined) {
                $scope.msgTitle = 'Atención';
                $scope.msgBody  = 'Debe seleccionar el rango de fechas!';
                $scope.msgType  = 'warning';
                flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
              }else{
                angular.element($("#spinerContainer")).css("display", "block");
                $http.post('../models/selectVenta.php', fechas).success(function (data) {
                  $scope.ventas = data;
                  var num = 0;
                  var dateCompare = 0;
                  for (var i = $scope.ventas.length - 1; i >= 0; i--) {
                    if(dateBackup == 0){
                      $scope.etiquetas.push($scope.ventas[i]["Fecha"]);
                      num = parseInt($scope.ventas[i]["Total"]);
                      sumVenta = sumVenta + num;
                      dateBackup = $scope.ventas[i]["Fecha"];
                    }else{
                      if(dateBackup == $scope.ventas[i]["Fecha"]){
                        num = parseInt($scope.ventas[i]["Total"]);
                        sumVenta = sumVenta + num;
                        dateBackup = $scope.ventas[i]["Fecha"];
                      }else{
                        ventas.push(sumVenta);
                        $scope.etiquetas.push($scope.ventas[i]["Fecha"]);
                        sumTotalVenta = sumTotalVenta + sumVenta;
                        sumVenta = 0;
                        dateBackup = $scope.ventas[i]["Fecha"];
                        num = parseInt($scope.ventas[i]["Total"]);
                        sumVenta = sumVenta + num;                        
                      }
                      if(i == 0){
                        sumTotalVenta = sumTotalVenta + sumVenta;
                        ventas.push(sumVenta);
                      }
                    }

                  }
                  
                  ventas.reverse();
                  ventas.push(0);
                  
              });
              $http.post('../models/selectCompra.php', fechas).success(function (data) {
                    angular.element($("#spinerContainer")).css("display", "none");
                    $scope.compras = data;
                    var num2 = 0;
                    dateBackup = 0;
                    
                    var array = [];
                    for (var i = 0; i < $scope.compras.length; i++) {
                        var igual=false;
                         for (var j = 0; j < $scope.etiquetas.length & !igual; j++) {
                             if($scope.compras[i]['Fecha'] == $scope.etiquetas[j]) 
                                     igual=true;
                         }
                        if(!igual)$scope.etiquetas.push($scope.compras[i]['Fecha']);
                    }
                    
                    $scope.etiquetas.sort((a, b) => new Date(a).getTime() > new Date(b).getTime());
                    $scope.etiquetas.reverse();
                    for (var i = $scope.compras.length - 1; i >= 0; i--) {
                      if(dateBackup == 0){
                        num2 = parseInt($scope.compras[i]["Total"]);
                        sumCompra = sumCompra + num2;
                        dateBackup = $scope.compras[i]["Fecha"];
                      }else{
                        if(dateBackup == $scope.compras[i]["Fecha"]){
                          num2 = parseInt($scope.compras[i]["Total"]);
                          sumCompra = sumCompra + num2;
                          dateBackup = $scope.compras[i]["Fecha"];
                        }else{
                          compras.push(sumCompra);
                          sumTotalCompra = sumTotalCompra + sumCompra;
                          sumCompra = 0;
                          dateBackup = $scope.compras[i]["Fecha"];
                          num2 = parseInt($scope.compras[i]["Total"]);
                          sumCompra = sumCompra + num2;                        
                        }
                        if(i == 0){
                          sumTotalCompra = sumTotalCompra + sumCompra;
                          compras.push(sumCompra);
                          
                        }
                      }
                    }
                    compras.reverse();
                    compras.push(0);
                    resBalance = sumTotalVenta - sumTotalCompra;
                    $scope.data.push(sumTotalCompra,sumTotalVenta,resBalance);
                    $scope.datos.push(compras,ventas);
                    var a = $scope.etiquetas.reverse();
              
                var mylineGraph = new Chart(line, {
                  type: "line",
                  data: {
                    labels: a/*La linea de tiempo a mostrarse en el grafico*/,
                    datasets: [
                      {
                        label: "COMPRAS",
                        data: compras,
                        fill: false,
                        borderColor: "rgba(245, 35, 56, .65)",
                        lineTension: 0,
                        pointBorderWidth: 2,
                        borderDash: [5, 5],
                        pointStyle: "rectRounded"
                      },
                      {
                        label: "VENTAS",
                        data: ventas,
                        fill: false,
                        borderColor: "rgba(55, 130, 220, .65)",
                        backgroundColor: "rgba(55, 130, 220, 0.1)",
                        lineTension: 0,
                        pointBorderWidth: 2,
                        borderDash: [5, 5],
                        pointStyle: "rectRounded"
                      }
                    ]
                  },
                  options: {
                    title: {
                      display: true,
                      text: "Gráficos de compras y ventas del "+fechas.fecha1+" al "+fechas.fecha2,
                      fontSize: 26,
                    },
                    legend:{
                      display: true,
                      position: 'top',
                      labels: {
                        boxWidth:80,
                        fontColor: 'black'
                      }
                    },
                    plugins: {
                     datalabels: {
                       display: false
                     }
                    }
                  }
                });  
              });
            }
              
        };

    });




angular.module('configuracion',['angularModalService'])

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

.controller('ConfiguracionCtrl', function($scope, $http, ModalService){
  angular.element(document).ready(function () {

      $scope.selectConfiguraciones();

  });

  //La parte del select donde mostramos los datos en la tabla
  $scope.selectConfiguraciones = function(){
    angular.element($("#spinerContainer")).css("display", "block");
    $http.get('../models/selectConfiguraciones.php').success(function(data){
      if(data == "error"){
        $scope.configuraciones = [];
      }else{
        $scope.configuraciones = data;
        if(data.length > 0){
          var topbar = angular.element($(".navbar-default")).innerHeight();
          var navbar = angular.element($(".navbar-fixed-bottom")).innerHeight();
          var formGroup = angular.element($(".form-group")).innerHeight();
              var table = angular.element($(".table-responsive"));
          var heightTable = window.outerHeight - topbar - navbar  - formGroup - 250;
          table.css("maxHeight", heightTable);

          var heightPanelInfo = window.outerHeight - topbar - navbar - 150;
          var panelInfo = angular.element($(".panel-info"));
      
          //panelInfo.css("height", heightPanelInfo);
          
          //Como agregar clases con angularjs
          //table.addClass('customClass');
        }
      }
      angular.element($("#spinerContainer")).css("display", "none");
    });
  };

  //Ordenamos de forma ascendente o descendente los datos
  $scope.ordenarPor = function(orden){
    $scope.ordenSeleccionado = orden;
  };

  $scope.modificarConfiguracion = function(configuracion){
      var configuracion = configuracion;
      //alert(cliente);
      ModalService.showModal({
        templateUrl: "modificarConfiguracion.html",
        controller: "modificarCtrl",
         inputs: {
          id: configuracion.idConfiguracion,
            nombre: configuracion.Nombre,
            descripcion: configuracion.Descripcion,
            estado: configuracion.Estado
          }
      }).then(function(modal){
        modal.close.then(function(result){
          // $scope.resultadoModal = result;
          $scope.selectConfiguraciones();
        })
      })
  };

})

  //El controller del modal modificar totalmente independiente de la pagina principal (clientes)
.controller('modificarCtrl', function($scope, close, $http, id, nombre, descripcion, estado, flash){
  var myNewConfig;
  if(nombre == "Cantidad mínima" || nombre == "Foto del producto"){
    $scope.configuraciones = [{"Estado":"0","Nombre":"Sí"},{"Estado":"1","Nombre":"No"}];
    myNewConfig = {"idConfiguracion":id, "Estado":estado};
    $scope.myNewConfig = myNewConfig;
  }else if(nombre == "Vencimiento"){
    $scope.myNewConfig = parseInt(estado);
  }

  $scope.nombre = nombre;
  $scope.descripcion = descripcion;
  $scope.estado = estado;
  $scope.cerrarModal = function(){
    close();
  };

  $scope.setNewValue = function(){
    if ($scope.nombre == "Vencimiento") {
      $scope.estado = angular.element($("#myNewConfig")).val();
    }else{
      $scope.estado = angular.element($("#myNewConfig option:selected")).val();  
    }
    
  };

  $scope.modificarConfiguracion = function(){
    var model = {
      nombre: $scope.nombre,
      descripcion: $scope.descripcion,
      estado: $scope.estado,
      id: id
    };
    angular.element($("#spinerContainer")).css("display", "block");
    $http.post("../models/modificarConfiguracion.php", model)
    .success(function(res){
      close();
      angular.element($("#spinerContainer")).css("display", "none");
      if(res == "error"){
        $scope.msgTitle = 'Error';
          $scope.msgBody  = 'Ha ocurrido un error!';
          $scope.msgType  = 'error';
        flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
      }else{
        $scope.msgTitle = 'Exitoso';
          $scope.msgBody  = res;
          $scope.msgType  = 'success';
        flash.pop({title: $scope.msgTitle, body: $scope.msgBody, type: $scope.msgType});
        $scope.nombre = null;
        $scope.apellido = null;
        $scope.info = null;
        angular.element($("#requieredPhoto")).val('');
        angular.element($("#expirationDate")).val('');
      }
      
    });
  };
})
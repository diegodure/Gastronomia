
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">
        <img rel=icon src='../img/Impulse.png' sizes="32x32" width="32" height="32" type="image/png">
      </a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">

        <li class="" id="liClient"><a href="clientes.php"><i class='glyphicon glyphicon-user'></i> Clientes</a></li>
        <li class="" id="liMesas"><a href="mesas.php"><i class='glyphicon glyphicon-blackboard'></i> Mesas</a></li>
        <li class="" id="liProductos"><a href="productos.php"><i class='glyphicon glyphicon-shopping-cart'></i> Productos</a></li>
        <li class="" id="liCompras"><a href="compras.php"><i class='glyphicon glyphicon-barcode'></i> Compras</a></li>
        <li class="" id="liVentas"><a href="ventas.php"><i class='glyphicon glyphicon-barcode'></i> Ventas</a></li>
		
	       <li class="dropdown" id="liReportes">
	        <a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class='glyphicon glyphicon-signal'></i> Reportes
	        <span class="caret"></span></a>
	        <ul class="dropdown-menu">
	          <li><a href="reportesCompras.php">Compras</a></li>
	          <li><a href="reportesVentas.php">Ventas</a></li>
	          <li><a href="reportesBalances.php">Balances</a></li>
	        </ul>
	      </li>

        <li class="dropdown" id="liConfig">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class='glyphicon glyphicon-asterisk'></i> Preferencias
          <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="usuarios.php">Usuarios</a></li>
            <li><a href="configuration.php">Configuración</a></li>
          </ul>
        </li>

       </ul>
      <ul class="nav navbar-nav navbar-right">
        
		<li><a href="../logout.php"><i class='glyphicon glyphicon-off'></i> Salir</a></li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
  <div id="spinerContainer">
    <img src="../img/Impulse.png" id="spiner" class="giro">
  </div>
  
  <input type="hidden" name="requieredPhoto" id="requieredPhoto">
  <input type="hidden" name="expirationDate" id="expirationDate">
  <input type="hidden" name="showToast" id="showToast" value="false">
</nav>
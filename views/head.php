<meta charset="utf-8">
<meta name="viewport" content="initial-scale=1, maximum-scale=1">
	<script> 
	    var IdUser = '<?php echo $idUser;?>';
	    var roleUser = '<?php echo $roleUser;?>';
		var idService = '<?php echo $idService;?>';
		<?php
			if (isset($_SESSION['user'])) {
				$razon_social = $_SESSION['razon_social'];
			}
		?>
		var razon_social = '<?php echo $razon_social;?>';
	</script>
	<title><?php echo $title;?></title>
	<link rel="stylesheet" href="../bower_components/bootstrap/dist/css/bootstrap.min.css">

	<link rel="stylesheet" href="../css/custom.css">
	<link rel="stylesheet" type="text/css" href="../css/modal.css">
	<link rel="stylesheet" type="text/css" href="../bower_components/angularjs-datepicker/dist/angular-datepicker.css">
	<link rel="stylesheet" type="text/css" href="../bower_components/toastr/toastr.min.css">
	<link rel="stylesheet" type="text/css" href="../css/general.css">
	<link rel="stylesheet" type="text/css" href="../css/topbar.css">
	<link rel=icon href='../img/Impulse.png' sizes="32x32" type="image/png">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
	<link href="../css/angular-moment-picker.min.css" rel="stylesheet">
<?php
	$data = json_decode(file_get_contents("php://input"));

	$total = $data->{"total"};
    $idCliente = $data->{"idCliente"};
    $idTable = $data->{"idTable"};
    $idVenta = $data->{"idVenta"};

    $detail = array($data->{"detail"});
    
    $array_num = count($detail);
    $i = 0;
    foreach ($detail as $valor){
    	while($array_num >= $i){
    		echo($valor[$i]->{"PrecioUnitario"});
    		$i++;
    	}
    }
?>
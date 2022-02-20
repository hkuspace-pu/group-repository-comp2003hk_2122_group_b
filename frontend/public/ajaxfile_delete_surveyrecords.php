<?php

include "config.php";


//var_dump("file_get_content:" + file_get_contents("php://input"));
$str = json_decode(file_get_contents("php://input"));
if ( $str === FALSE ) {
     $response[] = '{}';
} else {
    $data = $str;   
    $Survey_Case_No = $data->Survey_Case_No;
	mysqli_query($con,"DELETE FROM survey_case WHERE survey_case_no=".$Survey_Case_No);
	echo "Delete successfully";
	exit;
}

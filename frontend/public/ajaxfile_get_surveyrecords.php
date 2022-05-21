<?php

include "config.php";

$condition = "";

if(isset($_GET['Survey_Case_No_From']) and isset($_GET['Survey_Case_No_To'])){
   $condition = " where survey_case_no>=".$_GET['Survey_Case_No_From']." and survey_case_no<=".$_GET['Survey_Case_No_To'] ;
}

$userData = mysqli_query($con,"select * from survey ".$condition);
if (!$userData) {
    printf("Error: %s\n", mysqli_error($con));
    printf("Sql statement:" + $condition);
    exit;

} else {

$response = array();
while($row = mysqli_fetch_assoc($userData)){
   $response[] = $row;
}

echo json_encode($response);
exit;

}

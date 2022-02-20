<?php

include "config.php";

$condition = "";

if(isset($_GET['tree_name']) ){
   $condition = " inner join trees on trees.TreeID = trees_image_path.TreeID where trees.Name_English='".$_GET['tree_name']."'";
}

$userData = mysqli_query($con,"select Image_Path from trees_image_path ".$condition);
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

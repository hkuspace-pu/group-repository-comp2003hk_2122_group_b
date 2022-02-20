<?php

include "config.php";

$data = json_decode(file_get_contents("php://input"));
//echo $data;
if ( $data === FALSE ) {
     header('HTTP/1.1 400 Bad Request');
         echo json_encode([
             'errorMessage' => 'Please provide valid JSON',
         ]);
         die;
} else {


$survey_id = $data->survey_id;
$location_longitude = $data->location_longitude;
$location_latitude = $data->location_latitude;
$survey_state = $data->survey_state;
$survey_created_time = $data->survey_created_time;
$tree_id = $data->tree_id;
$observation = $data->observation;
$measurement = $data->measurement;
$condition = $data->condition;
$moderatorcomment = $data->moderatorcomment;
//echo 'survey id:'.$survey_id;

$query = "SELECT SurveyID FROM survey WHERE SurveyID=$survey_id";
$sqlsearch = mysqli_query($con,$query);
$resultcount = mysqli_num_rows($sqlsearch);
if($resultcount > 0){
    
	$update_survey_query =  "UPDATE survey SET
        Longitude = '$location_longitude',
        Latitude = '$location_latitude',
        SurveyState = '$survey_state',
        Last_Amended_Time = '$survey_created_time',
        TreeID = '$tree_id',
        Observation = '$observation',
        Measurement = '$measurement',
        ConditionID = '$condition',
		Moderator_Comment = '$moderatorcomment'
        WHERE SurveyID = $survey_id";
	//echo $update_survey_query;
		
		mysqli_query($con,
		   $update_survey_query
		);

		echo 'Update Successfully!';
	
}else{
	$update_survey_query =
	"INSERT INTO survey (SurveyID, Longitude, Latitude, SurveyState, Last_Amended_Time, TreeID, Observation, Measurement, ConditionID, Video, SurveyorID, Moderator)
	    VALUES ($survey_id,'$location_longitude','$location_latitude','$survey_state','$survey_created_time','$tree_id','$observation','$measurement','$condition','',1,'$moderatorcomment')";
	//echo $update_survey_query;
    mysqli_query($con, $update_survey_query ) ;
	echo 'Create Successfully!';
	
}

}
exit;

<?php
// conexió amb la base de dades
$db = new mysqli("localhost", "root", "Bmfyboesf15.,", "dbname");

if($db->connect_error){
    die('Unable to connect to database (' . $db->connect_errno . ')' . $db->connect_error);
}
    
// escriptura d'una demanda SQL
$sql ="SELECT * FROM score";

if(!$result = $db->query($sql)){
    die('There was an error running the query [' . $db->error . ']');
}
//creation of the HTML table
$code =  "<ul>";
while($row = $result->fetch_assoc()){
    $code .= "<li>".$row['id'].", ".$row['valeur'].", ".$row['date'].", ".$row['idUtilisateur']."</li>";
}
$code .= "</ul>";

echo $code;
include('formulaire.html');

$db->close();
    
?>

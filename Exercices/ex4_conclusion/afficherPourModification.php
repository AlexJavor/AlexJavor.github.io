<?php
if (!isset ($_GET["id"])) {
    die("requ&ecirc;te non autoris&eacute;e");
}

// conexió amb la base de dades
$db = new mysqli("localhost", "root", "Bmfyboesf15.,", "dbname");

if($db->connect_error){
    die('Unable to connect to database (' . $db->connect_errno . ')' . $db->connect_error);
}
    
// recuperacio d'una demanda SQL
$id = $_GET['id'];

// escriptura d'una demanda SQL
$sql = "SELECT * FROM score WHERE id = $id limit 1";

//execution
$result = $db->query($sql);
$save = $result->fetch_object();

$id = $save->id;
$valeur = $save->valeur;
$date = $save->date;
$idUtilisateur = $save->idUtilisateur;

// formulaire
require('formulaire.php');

//close db
mysqli_close($db);
    
?>
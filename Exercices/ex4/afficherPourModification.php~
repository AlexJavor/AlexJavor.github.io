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
$idUtilisateur = 2;

// escriptura d'una demanda SQL

$sql = "DELETE FROM score WHERE id = $id";

//execution
$result = $db->query($sql);

//redirection
header('Location: liste.php');

//close db
mysqli_close($db);
    
?>
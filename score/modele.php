<?php

require "../_config/BD.php";

function recupereTous(){
	// récupération de tous les enregistrements
	$con = connexion();
	$query = "SELECT * FROM score";
	$result = $con->query($query);
	fermeture($con);
	return $result;
}

function ajouteEnregistrement($donnees){
	$valeur = $donnees['valeur'];
    $dateScore = date("Y-m-d");
	// ajout d'un enregistrement
	$con = connexion();
	$query = "INSERT INTO score (`id`, `valeur`, `date` ,`idUtilisateur`,`idMail`)
		VALUES (NULL, '".$valeur."',  '".$dateScore."', '2', '".$_SESSION['id']."');";
    echo $query;
	$result = $con->query($query);
	fermeture($con);	
}
function recupereEnregistrementParId($id){
	// récupération d'un enregistrement
	$con = connexion();
	$query = "SELECT * FROM score WHERE id = $id";
	$result = $con->query($query);
	return $result->fetch_assoc();
	fermeture($con);
}	
function modifieEnregistrement($id, $donnees){
	$valeur = $donnees['valeur'];
	// récupération d'un enregistrement
	$con = connexion();
	$query = "UPDATE score SET `valeur` = $valeur WHERE id = $id;";
	$result = $con->query($query);
	fermeture($con);
}
function supprimeEnregistrement($id){
	// suppression d'un enregistrement
	$con = connexion();
	$query = "DELETE FROM score WHERE id = $id";
	$result = $con->query($query);
	fermeture($con);
}	
	
?>


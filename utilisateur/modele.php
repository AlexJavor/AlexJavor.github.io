<?php

require "../_config/BD.php";

function ajouteEnregistrement($donnees){
	$mail = $donnees['mail'];
	$password = $donnees['password'];
    $confirm_password = $donnees['confirm_password'];
	$valide = 0;
	$cle = $donnees['cle'];
	// ajout d'un enregistrement
	$con = connexion();
	$query = "INSERT INTO utilisateur (`id`, `mail`, `password`, `confirm_password`,`valide`, `cle`)
		VALUES (NULL, '".$mail."', '".$password."','".$confirm_password."','".$valide."', '".$cle."');";
	$result = $con->query($query);
	fermeture($con);	
}

function recupereEnregistrementParCle($cle) {
	// récupération d'un enregistrement
	$con = connexion();
	$query = "SELECT * FROM utilisateur WHERE cle = '$cle'";
	$result = $con->query($query);
	return $result->fetch_assoc();
	fermeture($con);
}
function validerUtilisateur($cle) {
	// validation d'un utilisateur
	$con = connexion();
	$query = "UPDATE utilisateur SET `valide` = 1 WHERE cle = '$cle';";
	$result = $con->query($query);
	fermeture($con);
}

function recupereTous(){
	// récupération de tous les enregistrements
	$con = connexion();
	$query = "SELECT * FROM utilisateur";
	$result = $con->query($query);
	fermeture($con);
	return $result;
}
function recupereEnregistrementParId($id){
	// récupération d'un enregistrement
	$con = connexion();
	$query = "SELECT * FROM utilisateur WHERE id = $id";
	$result = $con->query($query);
	return $result->fetch_assoc();
	fermeture($con);
}
function modifieEnregistrement($id, $donnees){
	$valeur = $donnees['valeur'];
	// récupération d'un enregistrement
	$con = connexion();
	$query = "UPDATE utilisateur SET `valeur` = $valeur WHERE id = $id;";
	$result = $con->query($query);
	fermeture($con);
}
function supprimeEnregistrement($id){
	// suppression d'un enregistrement
	$con = connexion();
	$query = "DELETE FROM utilisateur WHERE id = $id";
	$result = $con->query($query);
	fermeture($con);
}

function doubleuser($mail){
    $con = connexion();
    $query = "SELECT * FROM utilisateur WHERE mail = '$mail';";
    $result = $con->query($query);
    if($result->num_rows == 0) {
        return TRUE;
    } else {
        return FALSE;
    }
    fermeture($con);
}
	
	
?>


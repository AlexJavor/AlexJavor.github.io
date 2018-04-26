<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title><?php echo $titre; ?></title>
</head>
<body>
	
<h3><?php echo $titre; ?></h3>
<?php
// création code HTML
$corps = "<ul>"; 
while($r = $liste->fetch_assoc()) {
   	$corps .= "<li>";
	$corps .= $r['id'].", ".$r['valeur'];
	// liens 
	$corps .= " - <a href=\"controleur.php?action=modifier&id=".$r['id']."\">Modifier</a>";
	$corps .= " | <a href=\"controleur.php?action=supprimer&id=".$r['id']."\">Supprimer</a>";
	$corps .= "</li>";
}
$corps .= "</ul>"; 
// lien pour création
$corps .= "<a href=\"controleur.php?action=creer\">Cr&eacute;er</a>";
// affichage de la vue
echo $corps;
?>

</body>
</html>





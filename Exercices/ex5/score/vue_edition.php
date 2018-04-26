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
$valeur = $donnees['valeur'];
$id = $donnees['id'];
$erreurValeur = $erreurs['valeur'];

	$corps = <<<EOT
<form id="creation-form" name="creation-form" method="post" action="controleur.php?action=$action">
<label for="valeur">Score</label>
<input id="valeur" type="text" name="valeur" value="$valeur" required aria-required="true" />
<p class="erreur">$erreurValeur</p>
<br><br>
<button name='submit' type='submit' id='submit'>Valider</button>
<input type='hidden' name='id' value='$id'/>
</form>
EOT;

// affichage
echo $corps;
?>

</body>
</html>
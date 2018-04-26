<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" type="text/css" href="../css/gabarit.css">
<title><?php echo $titre; ?></title>
</head>
<body>

<div id="bandeau">SPACE INVADERS</div>

      <div id="auth">
      <?php
      // lien pour authentification
      if ( !isset( $_SESSION['mail'] ) ) {		
          echo "<p><a href=\"../authentification/controleur.php?action=login\">Login</a> - <a href=\"../utilisateur/controleur.php?action=creer\">S'enregistrer</a>";
      } else {
          echo $_SESSION['mail']." - <a href=\"../authentification/controleur.php?action=logout\">Logout</a>";
	}
      ?>
</div>

<div id="menu"><?php echo $titre; ?></div>
      <div id="corps"><?php echo $corps; ?></div>
<footer>MOOC AppDyn</foooter>
	
</body>
</html>


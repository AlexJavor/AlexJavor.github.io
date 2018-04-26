$(function() {
	init();	
});

function init(){
	
	// STRUCTURE
	// contenus initiaux de l'écran d'accueil
	$('#titre').html("Clic sur les balles");
	//$('#image').html("<img src='projet/images/jeu.png'>");
	$('#texte').html("Dans chacun des niveaux de jeu, cliquer sur les balles correspondant à la consigne affichée avant qu'elles touchent le bas du cadre !");
	$('#boutonJeu').html("<input type=\"submit\" value=\"Jouer\">");
	//$('footer').html("mooc HTML5 - 05/2014");
	
	// contenu initial de l'écran de jeu
	$('#animation').html("<canvas id=\"dessin\" width=\"450\" height=\"300\">Texte pour les navigateurs qui ne supportent pas canvas</canvas>");
	$('#boutonQuitter').html("<input type=\"submit\" value=\"Quitter\">");
	monCanvas = document.getElementById('dessin');
	if (monCanvas.getContext){
		ctx = monCanvas.getContext('2d');
	} else {
		alert('canvas non supporté par ce navigateur');
	}	

	// contenu initial de l'écran de bilan
	$('#boutonRejouer').html("<input type=\"submit\" value=\"Rejouer\">");
	$('#boutonAccueil').html("<input type=\"submit\" value=\"Accueil\">");
		
	// DONNEES
	// liste des niveaux
	listeNiveaux = [];			// idCouleur, idTaille
	listeNiveaux[0] = [0, 0];	// rouge et petite
	listeNiveaux[1] = [1, 1];	// verte et moyenne
	// liste des couleurs (rouge, vert, bleu)
	listeCouleurs = [["rouge","#B9121B"],["verte","#96CA2D"],["bleue", "#046380"]];
	listeTailles = [["petite",10],["moyenne",20],["grande",30]];
	// liste des balles : idNiveau, idCouleur, idTaille, x, v, y, visible
	listeBalles = [];
	
	listeBalles[0] = [0,0,0,20,4,0,1];	// rouge et petite
	listeBalles[1] = [0,1,0,50,7,0,1];	// verte et petite	
	listeBalles[2] = [0,2,1,100,4,0,1]; // bleue et moyenne
	 
	listeBalles[3] = [1,1,1,150,5,0,1];	// verte et moyenne
	listeBalles[4] = [1,0,1,100,4,0,1]; // rouge et moyenne 
	listeBalles[5] = [1,1,1,200,5,0,1];	// verte et moyenne

	tempsLimite = 60;
	
	// VARIABLES
	tempsJeu = 0;
	niveauCourant = 0;
	ecranCourant = null;

	// GESTIONNAIRES
	// gestionnaire du bouton #boutonJeu
	$('#boutonJeu').click(function() {
		afficheJeu();
	});
	// interactivité sur le canvas
	monCanvas.addEventListener("click", clicCanvas, false);	
	// gestionnaire du bouton #boutonJeu
	$('#boutonQuitter').click(function() {
		reinitialisation();
		afficheAccueil();
	});
	// gestionnaires
	$('#boutonRejouer').click(function() {
		reinitialisation();
		afficheJeu();
	});
	$('#boutonAccueil').click(function() {
		reinitialisation();
		afficheAccueil();
	});		
	
	// REGLES
	inter = setInterval(regles, 100);	
	
	// LANCEMENT
	afficheAccueil();
		
}

function afficheAccueil(){
	ecranCourant = "accueil";
	// affichage de l'écran et masquage des autres écrans
	$('#accueil').show();
	$('#jeu').hide();
	$('#bilan').hide();	
}
function afficheJeu(){
	ecranCourant = "jeu";
	// affichage de l'écran et masquage des autres écrans
	$('#accueil').hide();
	$('#jeu').show();
	$('#bilan').hide();
	// affichage de la consigne du premier niveau de l'animation
	afficheConsigne(niveauCourant);
}
function afficheConsigne(ni){
	var idCouleur = listeNiveaux[ni][0];
	var idTaille = listeNiveaux[ni][1];
	var cons = "Cliquer sur les balles de couleur " + listeCouleurs[idCouleur][0] + " et de taille " + listeTailles[idTaille][0];
	$('#consigne').html(cons);
}
function regles(){
	if (ecranCourant == "jeu"){
		$('#temps').html(tempsJeu/10);
		animer();
	}	
}
function animer() {
	if(tempsJeu/10 > tempsLimite){
			afficheBilan();
	} else {
		tempsJeu++;		
		// effaçage
		ctx.clearRect(0,0, monCanvas.width,monCanvas.height);
		var nbBallesDessinees = 0;
		for (var j=0; j<listeBalles.length; j++){
			// idNiveau, idCouleur, idTaille, x, v, y, visible
			var idNiveau = listeBalles[j][0];
			if(idNiveau == niveauCourant && listeBalles[j][5] < monCanvas.height && listeBalles[j][6] == 1){
				// dessin
				nbBallesDessinees++;
				dessineBalle(j);
			}
		}			
		if(nbBallesDessinees == 0){
			if(niveauCourant == listeNiveaux.length-1){
				afficheBilan();
			} else {
				niveauCourant++;
				afficheConsigne(niveauCourant);
			}
		}
	}			
}
function dessineBalle(idB){
	// paramètres de la balle : // idNiveau, idCouleur, idTaille, x, v, y, visible
	var x = listeBalles[idB][3];
	var v = listeBalles[idB][4];
	var couleur = listeCouleurs[ listeBalles[idB][1] ][1];
	var R = listeTailles[ listeBalles[idB][2] ][1];
	// y
	var y = listeBalles[idB][5] + v*1;
	listeBalles[idB][5] =y;	
	// sauvegarde de l'état du contexte
	ctx.save();
	// dessin
	ctx.translate(x,y);
   	ctx.beginPath();
   	ctx.arc(0, 0, R, 0, 2 * Math.PI, false);
   	ctx.fillStyle = couleur;
   	ctx.fill();
   	ctx.lineWidth = 1;
    ctx.strokeStyle = '#000';
  	ctx.stroke();
  	// retour à l'état précédent du contexte
	ctx.restore()
}
function afficheBilan(){
	ecranCourant = "bilan";
	// affichage de l'écran et masquage des autres écrans
	$('#accueil').hide();
	$('#jeu').hide();
	$('#bilan').show();
	
	// calcul du score
	var nbPointsTotal = 0;
	var nbPointsObtenus = 0;
	for (var j=0; j<listeNiveaux.length; j++){
		var idCouleurNiveau = listeNiveaux[j][0];
		var idTailleNiveau = listeNiveaux[j][1];
		for (var k=0; k<listeBalles.length; k++){
			var idNiveau = listeBalles[k][2];
			if(idNiveau == j){
				var idCouleurBalle = listeBalles[k][0];
				var idTailleBalle = listeBalles[k][1];
				if(idCouleurBalle == idCouleurNiveau && idTailleBalle == idTailleNiveau){
					nbPointsTotal++;
					if(listeBalles[k][6] == 0){
						nbPointsObtenus++;
					}
				} else {
					if(listeBalles[k][6] == 0){
						nbPointsObtenus--;
					}
				}
			}			
		}
	}
	$('#recap').html("Votre score est de "+nbPointsObtenus+"/"+nbPointsTotal);
	// Appel Ajax
	var action = $('#action').val();
	$.ajax({
		url: 'http://localhost/mooc_ad/s0/fil_rouge/public/score/'+action,
		type: "post",
		data: {"valeur": nbPointsObtenus},
		success: function(response){
			alert("score enregistré");
  		},
  		error: function(jqXHR, textStatus, errorThrown) {
			alert(errorThrown);
		} 
	});
			
}
function clicCanvas(e){
	// position de la souris / document
	var xSourisDocument = e.pageX 
    var ySourisDocument = e.pageY;
	// position du canvas / document
	var xCanvas = monCanvas.offsetLeft;
	var yCanvas = monCanvas.offsetTop;
	// position du clic / canvas
	xSourisCanvas = xSourisDocument - xCanvas;
	ySourisCanvas = ySourisDocument - yCanvas;
	// test si une balle est cliquée
	for (var c=0; c<listeBalles.length; c++){
		var R = listeTailles[listeBalles[c][1]][1];
		if(Math.abs(listeBalles[c][3]-xSourisCanvas) < R
			&& Math.abs(listeBalles[c][5]-ySourisCanvas) < R){
			listeBalles[c][6]=0;
		}
	}
}
function reinitialisation(){
	niveauCourant = 0;
	// balles
	for (var k=0; k<listeBalles.length; k++){
		listeBalles[k][5] = 1;
		listeBalles[k][6] = 1;
	}
}


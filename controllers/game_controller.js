/**
 * @tag controllers, home
 * Controllerklass som hanterar kommunikation mellan views och models
 */
$.Controller.extend('Nextcard.Controllers.Game',
/* @Static */
{
	onDocument: true,
	
	/**
	* Regler som bestämmer när spelarna ska turas om
	* @return {Function} Returnerar en funktion innehållandes logiken för hur turordningen ska skiftas
	*/
	switchRules: {
		ifIncorrect: function(correct){
			return correct;
		},
		always: function(correct){
			return false;
		}
	}
},
/* @Prototype */
{
	/**
	* När sidan laddas visas startsidan med olika val för spelet
	*/
	load: function () {
		if (!$("#nextcard").length) {
			$(document.body).append($('<div/>').attr('id', 'nextcard'));
			$('#nextcard').append(this.view('logo', { }));
		}
		$("#nextcard").append($('<div/>').attr('id', 'game'));
		$('#game').append(this.view('init', { }));
		
		
	},
	
	/**
	* Funktion för att starta ett nytt spel
	*/
	startGame: function(a_players, a_switchRule) {
		
		//Skapa ett nytt game och skicka med spelarna och switchRule
  		this.game = new Nextcard.Models.Game(a_players, Nextcard.Controllers.Game.switchRules[a_switchRule]);
		
		this.paused = false;
		
		//Visa vyn för spelet
		$('#game').html(this.view('playGame', { players: this.game.m_players, card: this.game.GetNextCard(), cardsLeft: this.game.GetCardsLeft() }));
		
		this.BindControls();
	},
	
	/**
	* Funktion för att binda tangentbordskommandon
	*/
	BindControls: function(){
		
		that = this;
		
		$(document).bind('keyup', 'a', function(){
			if (that.paused === false && that.game.GetCurrentPlayerIndex() === 0) {
				that.Update("over")
			}
		});
		
		$(document).bind('keyup', 'z', function(){
			if (that.paused === false && that.game.GetCurrentPlayerIndex() === 0) {
				that.Update("under")
			}
		});
		
		$(document).bind('keydown', 'up', function(){
			if (that.paused === false && that.game.GetCurrentPlayerIndex() === 1) {
				that.Update("over")
			}
		});
		
		$(document).bind('keydown', 'down', function(){
			if (that.paused === false && that.game.GetCurrentPlayerIndex() === 1) {
				that.Update("under")
			}
		});
		
		$(document).bind('keydown', '8', function(){
			if (that.paused === false && that.game.GetCurrentPlayerIndex() === 2) {
				that.Update("over")
			}
		});
		
		$(document).bind('keydown', '2', function(){
			if (that.paused === false && that.game.GetCurrentPlayerIndex() === 2) {
				that.Update("under")
			}
		});
	},
	
	/**
	* Funktion som körs efter varje gissning
	* @param {String} a_direction Spelarens gissning (over/under)
	*/
	Update: function(a_direction) {
		
		//Disable:a knapparna för gissning
		$('#over').attr('disabled', 'disabled');
		$('#under').attr('disabled', 'disabled');
		
		//Pausa spelet för tangentbordsstyrning
		this.paused = true;
		
		//Räkna ut antal poäng för gissningen
		var points = this.game.Select(a_direction);
		
		//View som uppdaterar antal kort kvar
		$('#cardsLeftDiv').html(this.view('showCardsLeft', { cardsLeft: this.game.GetCardsLeft() }));
		
		//View som uppdaterar spelarnas poäng
		$('#playersDiv').html(this.view('showPlayers', { players: this.game.m_players }));
		
		//Hämtar div som visar aktuella kortet, samt div som visar det nästa kortet
		var currentIndex = this.game.GetCardsLeft() % 2;
		var nextIndex = (currentIndex + 1) % 2;
		
		var currentCardDiv = $( "#cardDiv" + currentIndex);
		var nextCardDiv = $( "#cardDiv" + nextIndex);
		
		//Byt bild på kort
		var nextCardPath = "images/" + this.game.GetNextCard().GetColor() + this.game.GetNextCard().GetValue() + ".png";
		$( "#cardImg" + nextIndex).attr('src', nextCardPath);
		
		//Göm div med det aktuella kortet
		currentCardDiv.toggle( 'slide', {direction: 'right'}, 500, hideCallback);
		
		//Spara this i variabeln that så att den kan nås i callback-funktionerna nedan
		that = this;
		
		//Callback-funktion som körs efter att kortet gömts
		function hideCallback() {
			
			//Visa div med det nya kortet
			nextCardDiv.toggle('slide', {direction: 'left'}, 500, showCallback);

			//View som uppdaterar antal poäng för gissningen och sedan gömmer det
			if (points > 0){
				$('#pointsDiv').attr('class', 'correct');
				$('#pointsDiv').html('+' + points + '<img src="images/correct.png"/>');
			} else {
				$('#pointsDiv').attr('class', 'incorrect');
				$('#pointsDiv').html(points + '<img src="images/incorrect.png"/>');
			}
			$("#pointsDiv").show();
			setTimeout(function(){
				$("#pointsDiv").hide('fade', {}, 500);
			}, 500);
		}
		
		//Callback-funktion som körs efter att det nya kortet har visats
		//Kollar även om spelet är slut eller ej och visar rätt view
		function showCallback() {
			if (that.game.IsGameOver() === false) {
				$('#over').removeAttr("disabled");
				$('#under').removeAttr("disabled");
				that.paused = false;
			} else {
				that.GameOver();
			}
		}
	},
	
	/**
	* Körs när spelet är slut
	*/
	GameOver: function() {
		
		//Hämtar vinnaren
		var winner = this.game.GetWinner();
		
		//Variabel för att spara en text som ska skrivas ut
		var summary;
		
		if (this.game.m_noOfPlayers === 1){
			summary = "You got " + this.game.GetPlayer(0).GetScore() + " points!";
		}
		else if (winner === false) {
			summary = "The game was tied!";
		} else {
			summary = winner.GetName() + " is the winner!";
		}
		
		//Skriv ut gameover-viewn
		$('#gameInfo').html(that.view('gameOver', {summary : summary}));
	},
	
	/**
	* Lyssnar på om användaren har ändrat antalet spelare genom radiobuttons
	*/
	'.selectPlayers change': function() {
		//Hämta antalet valda spelare
		var noOfPlayers = $('input[name="players"]:radio:checked').val();
		
		//Uppdatera vyn med en textbox för namnet för varje spelare
		$('#playerInputDiv').html(this.view('inputPlayers', { noOfPlayers: noOfPlayers }));
	},
	
	/**
	* Lyssnar på om användaren har klickat på en textbox för spelarnamn och isf markerar texten i textboxen
	* @param {jQuery} el Textboxen som användaren har klickat på
	*/
	'.playerNameInput click': function(el) {
		el.focus();
		el.select();
	},
	
	/**
	* Lyssnar på om användaren har klickat på knappen för att skapa ett nytt spel
	*/
	'#startGame click': function() {
		var players = [];
		
		//Hämta varje spelares namn och lägg in i players-arrayen
		$('#playerInputDiv .playerNameInput').each(function() {
		    var name = $(this).val();
			players.push(name);
		});

		//Hämtar rätt switchRule (hur aktiv spelare ska bytas)
		var switchRule = $('input[name="switchOption"]:radio:checked').val() || "always";
		
		this.startGame(players, switchRule);
	},
	
	/**
	* Lyssnar på om spelaren gissar över
	*/
	'#over click': function() {
		this.Update("over");
		$('#over').blur();
	},
	
	/**
	* Lyssnar på om spelaren gissar under
	*/
	'#under click': function() {
		this.Update("under");
		$('#under').blur();
	},
	
	/**
	* Lyssnar på om spelaren klickat på "Restart" och startar om spelet
	*/
	'#restart click': function() {
		
		this.game.RestartGame();
		$('#game').html(this.view('playGame', { players: this.game.m_players, card: this.game.GetNextCard(), cardsLeft: this.game.GetCardsLeft() }));
		this.paused = false;
	},
	
	/**
	* Lyssnar på om användaren klickat på "Quit to menu" och visar startsidan
	*/
	'#quit click': function() {
		$('#game').remove();
		
		this.load();
	}
});
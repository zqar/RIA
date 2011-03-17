/**
 * @tag controllers, home
 * Controllerklass som hanterar kommunikation mellan views och models
 */
$.Controller.extend('Nextcard.Controllers.Game',
/* @Static */
{
	onDocument: true,
	
	/**
	* Regler som best�mmer n�r spelarna ska turas om
	* @return {Function} Returnerar en funktion inneh�llandes logiken f�r hur turordningen ska skiftas
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
	* N�r sidan laddas visas startsidan med olika val f�r spelet
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
	* Funktion f�r att starta ett nytt spel
	*/
	startGame: function(a_players, a_switchRule) {
		
		//Skapa ett nytt game och skicka med spelarna och switchRule
  		this.game = new Nextcard.Models.Game(a_players, Nextcard.Controllers.Game.switchRules[a_switchRule]);
		
		this.paused = false;
		
		//Visa vyn f�r spelet
		$('#game').html(this.view('playGame', { players: this.game.m_players, card: this.game.GetNextCard(), cardsLeft: this.game.GetCardsLeft() }));
		
		this.BindControls();
	},
	
	/**
	* Funktion f�r att binda tangentbordskommandon
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
	* Funktion som k�rs efter varje gissning
	* @param {String} a_direction Spelarens gissning (over/under)
	*/
	Update: function(a_direction) {
		
		//Disable:a knapparna f�r gissning
		$('#over').attr('disabled', 'disabled');
		$('#under').attr('disabled', 'disabled');
		
		//Pausa spelet f�r tangentbordsstyrning
		this.paused = true;
		
		//R�kna ut antal po�ng f�r gissningen
		var points = this.game.Select(a_direction);
		
		//View som uppdaterar antal kort kvar
		$('#cardsLeftDiv').html(this.view('showCardsLeft', { cardsLeft: this.game.GetCardsLeft() }));
		
		//View som uppdaterar spelarnas po�ng
		$('#playersDiv').html(this.view('showPlayers', { players: this.game.m_players }));
		
		//H�mtar div som visar aktuella kortet, samt div som visar det n�sta kortet
		var currentIndex = this.game.GetCardsLeft() % 2;
		var nextIndex = (currentIndex + 1) % 2;
		
		var currentCardDiv = $( "#cardDiv" + currentIndex);
		var nextCardDiv = $( "#cardDiv" + nextIndex);
		
		//Byt bild p� kort
		var nextCardPath = "images/" + this.game.GetNextCard().GetColor() + this.game.GetNextCard().GetValue() + ".png";
		$( "#cardImg" + nextIndex).attr('src', nextCardPath);
		
		//G�m div med det aktuella kortet
		currentCardDiv.toggle( 'slide', {direction: 'right'}, 500, hideCallback);
		
		//Spara this i variabeln that s� att den kan n�s i callback-funktionerna nedan
		that = this;
		
		//Callback-funktion som k�rs efter att kortet g�mts
		function hideCallback() {
			
			//Visa div med det nya kortet
			nextCardDiv.toggle('slide', {direction: 'left'}, 500, showCallback);

			//View som uppdaterar antal po�ng f�r gissningen och sedan g�mmer det
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
		
		//Callback-funktion som k�rs efter att det nya kortet har visats
		//Kollar �ven om spelet �r slut eller ej och visar r�tt view
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
	* K�rs n�r spelet �r slut
	*/
	GameOver: function() {
		
		//H�mtar vinnaren
		var winner = this.game.GetWinner();
		
		//Variabel f�r att spara en text som ska skrivas ut
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
	* Lyssnar p� om anv�ndaren har �ndrat antalet spelare genom radiobuttons
	*/
	'.selectPlayers change': function() {
		//H�mta antalet valda spelare
		var noOfPlayers = $('input[name="players"]:radio:checked').val();
		
		//Uppdatera vyn med en textbox f�r namnet f�r varje spelare
		$('#playerInputDiv').html(this.view('inputPlayers', { noOfPlayers: noOfPlayers }));
	},
	
	/**
	* Lyssnar p� om anv�ndaren har klickat p� en textbox f�r spelarnamn och isf markerar texten i textboxen
	* @param {jQuery} el Textboxen som anv�ndaren har klickat p�
	*/
	'.playerNameInput click': function(el) {
		el.focus();
		el.select();
	},
	
	/**
	* Lyssnar p� om anv�ndaren har klickat p� knappen f�r att skapa ett nytt spel
	*/
	'#startGame click': function() {
		var players = [];
		
		//H�mta varje spelares namn och l�gg in i players-arrayen
		$('#playerInputDiv .playerNameInput').each(function() {
		    var name = $(this).val();
			players.push(name);
		});

		//H�mtar r�tt switchRule (hur aktiv spelare ska bytas)
		var switchRule = $('input[name="switchOption"]:radio:checked').val() || "always";
		
		this.startGame(players, switchRule);
	},
	
	/**
	* Lyssnar p� om spelaren gissar �ver
	*/
	'#over click': function() {
		this.Update("over");
		$('#over').blur();
	},
	
	/**
	* Lyssnar p� om spelaren gissar under
	*/
	'#under click': function() {
		this.Update("under");
		$('#under').blur();
	},
	
	/**
	* Lyssnar p� om spelaren klickat p� "Restart" och startar om spelet
	*/
	'#restart click': function() {
		
		this.game.RestartGame();
		$('#game').html(this.view('playGame', { players: this.game.m_players, card: this.game.GetNextCard(), cardsLeft: this.game.GetCardsLeft() }));
		this.paused = false;
	},
	
	/**
	* Lyssnar p� om anv�ndaren klickat p� "Quit to menu" och visar startsidan
	*/
	'#quit click': function() {
		$('#game').remove();
		
		this.load();
	}
});
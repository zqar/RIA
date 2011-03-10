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
		if (!$("#game").length) {
			$(document.body).append($('<div/>').attr('id', 'game'));
		}
		
		$('#game').append(this.view('init', { }));
	},
	
	/**
	* Funktion f�r att starta ett nytt spel
	*/
	startGame: function(a_players, a_switchRule) {
		
		//Skapa ett nytt game och skicka med spelarna och switchRule
  		this.game = new Nextcard.Models.Game(a_players, Nextcard.Controllers.Game.switchRules[a_switchRule]);
		
		//Visa vyn f�r spelet
		$('#game').html(this.view('playGame', { players: this.game.m_players, card: this.game.GetNextCard(), cardsLeft: this.game.GetCardsLeft() }));
	},
	
	/**
	* Funktion som k�rs efter varje gissning
	* @param {String} a_direction Spelarens gissning (over/under)
	*/
	Update: function(a_direction) {
		
		//Disable:a knapparna f�r gissning
		$('#over').attr('disabled', 'disabled');
		$('#under').attr('disabled', 'disabled');
		
		//R�kna ut antal po�ng f�r gissningen
		var points = this.game.Select(a_direction);
		
		//View som uppdaterar antal kort kvar
		$('#cardsLeftDiv').html(this.view('showCardsLeft', { cardsLeft: this.game.GetCardsLeft() }));
		
		//View som uppdaterar spelarnas po�ng
		$('#playersDiv').html(this.view('showPlayers', { players: this.game.m_players }));
		
		//G�m kortet
		$( "#cardDiv" ).hide( 'slide', {direction: 'right'}, 500, hideCallback);
		
		//Spara this i variabeln that s� att den kan n�s i callback-funktionerna nedan
		that = this;
		
		//Callback-funktion som k�rs efter att kortet g�mts
		function hideCallback() {
			
			//Byt bild p� kort
			var nextCardPath = "images/" + that.game.GetNextCard().GetColor() + that.game.GetNextCard().GetValue() + ".png";
			$("#cardImg").attr('src', nextCardPath);
			
			//Visa det nya kortet
			$("#cardDiv").show('slide', {direction: 'left'}, 300, showCallback);

			//View som uppdaterar antal po�ng f�r gissningen och sedan g�mmer det
			if (points > 0){
				$('#pointsDiv').html('<span class="correct">+' + points + '</span>');
			} else {
				$('#pointsDiv').html('<span class="incorrect">' + points + '</span>');
			}
			$("#pointsDiv").show();
			$("#pointsDiv").hide('fade', {}, 1000);
		}
		
		//Callback-funktion som k�rs efter att det nya kortet har visats
		//Kollar �ven om spelet �r slut eller ej och visar r�tt view
		function showCallback() {
			if (that.game.IsGameOver() === false) {
				$('#over').removeAttr("disabled");
				$('#under').removeAttr("disabled");
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
	},
	
	/**
	* Lyssnar p� om spelaren gissar under
	*/
	'#under click': function() {
		this.Update("under");
	},
	
	/**
	* Lyssnar p� om spelaren klickat p� "Restart" och startar om spelet
	*/
	'#restart click': function() {
		
		this.game.RestartGame();
		$('#game').html(this.view('playGame', { players: this.game.m_players, card: this.game.GetNextCard(), cardsLeft: this.game.GetCardsLeft() }));
	},
	
	/**
	* Lyssnar p� om anv�ndaren klickat p� "Quit to menu" och visar startsidan
	*/
	'#quit click': function() {
		$('#game').remove();
		
		this.load();
	}
	
	/*//Test f�r att kolla korten i kortleken, m�ste �ven l�sa upp knappen i playGame.ejs
	'#listCards click': function() {
		for (var i = 0, j = this.game.m_deck.m_cards.length ; i < j ; i++) {
			$('#game').append('<p>' + (i + 1) + ': ' + this.game.m_deck.m_cards[i].m_color + this.game.m_deck.m_cards[i].m_value + '</p>');
		}
	}*/
});
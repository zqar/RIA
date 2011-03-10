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
		if (!$("#game").length) {
			$(document.body).append($('<div/>').attr('id', 'game'));
		}
		
		$('#game').append(this.view('init', { }));
	},
	
	/**
	* Funktion för att starta ett nytt spel
	*/
	startGame: function(a_players, a_switchRule) {
		
		//Skapa ett nytt game och skicka med spelarna och switchRule
  		this.game = new Nextcard.Models.Game(a_players, Nextcard.Controllers.Game.switchRules[a_switchRule]);
		
		//Visa vyn för spelet
		$('#game').html(this.view('playGame', { players: this.game.m_players, card: this.game.GetNextCard(), cardsLeft: this.game.GetCardsLeft() }));
	},
	
	/**
	* Funktion som körs efter varje gissning
	* @param {String} a_direction Spelarens gissning (over/under)
	*/
	Update: function(a_direction) {
		
		//Disable:a knapparna för gissning
		$('#over').attr('disabled', 'disabled');
		$('#under').attr('disabled', 'disabled');
		
		//Räkna ut antal poäng för gissningen
		var points = this.game.Select(a_direction);
		
		//View som uppdaterar antal kort kvar
		$('#cardsLeftDiv').html(this.view('showCardsLeft', { cardsLeft: this.game.GetCardsLeft() }));
		
		//View som uppdaterar spelarnas poäng
		$('#playersDiv').html(this.view('showPlayers', { players: this.game.m_players }));
		
		//Göm kortet
		$( "#cardDiv" ).hide( 'slide', {direction: 'right'}, 500, hideCallback);
		
		//Spara this i variabeln that så att den kan nås i callback-funktionerna nedan
		that = this;
		
		//Callback-funktion som körs efter att kortet gömts
		function hideCallback() {
			
			//Byt bild på kort
			var nextCardPath = "images/" + that.game.GetNextCard().GetColor() + that.game.GetNextCard().GetValue() + ".png";
			$("#cardImg").attr('src', nextCardPath);
			
			//Visa det nya kortet
			$("#cardDiv").show('slide', {direction: 'left'}, 300, showCallback);

			//View som uppdaterar antal poäng för gissningen och sedan gömmer det
			if (points > 0){
				$('#pointsDiv').html('<span class="correct">+' + points + '</span>');
			} else {
				$('#pointsDiv').html('<span class="incorrect">' + points + '</span>');
			}
			$("#pointsDiv").show();
			$("#pointsDiv").hide('fade', {}, 1000);
		}
		
		//Callback-funktion som körs efter att det nya kortet har visats
		//Kollar även om spelet är slut eller ej och visar rätt view
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
	},
	
	/**
	* Lyssnar på om spelaren gissar under
	*/
	'#under click': function() {
		this.Update("under");
	},
	
	/**
	* Lyssnar på om spelaren klickat på "Restart" och startar om spelet
	*/
	'#restart click': function() {
		
		this.game.RestartGame();
		$('#game').html(this.view('playGame', { players: this.game.m_players, card: this.game.GetNextCard(), cardsLeft: this.game.GetCardsLeft() }));
	},
	
	/**
	* Lyssnar på om användaren klickat på "Quit to menu" och visar startsidan
	*/
	'#quit click': function() {
		$('#game').remove();
		
		this.load();
	}
	
	/*//Test för att kolla korten i kortleken, måste även låsa upp knappen i playGame.ejs
	'#listCards click': function() {
		for (var i = 0, j = this.game.m_deck.m_cards.length ; i < j ; i++) {
			$('#game').append('<p>' + (i + 1) + ': ' + this.game.m_deck.m_cards[i].m_color + this.game.m_deck.m_cards[i].m_value + '</p>');
		}
	}*/
});
/**
 * @tag controllers, home
 * Controllerklass som hanterar kommunikation mellan views och models
 */
$.Controller.extend('Nextcard.Controllers.Game',
/* @Static */
{
	onDocument: true
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
		  
		var switchIfCorrect = $('input[name="switchIfCorrect"]:radio:checked').val() === "yes";
		
		//alert(switchIfCorrect);
		
		this.startGame(players, switchIfCorrect);
	},
	
	/**
	* Funktion f�r att starta ett nytt spel
	*/
	startGame: function(a_players, a_switchIfCorrect) {
		this.game = new Nextcard.Models.Game(a_players, a_switchIfCorrect);
			
		this.game.ResetDeck();
		this.game.ResetScores();
		
		$('#game').html(this.view('playGame', { players: this.game.m_players, card: this.game.m_deck.GetNextCard(), cardsLeft: this.game.GetCardsLeft() }));
	},
	
	/**
	* Funktion som k�rs efter varje gissning
	*/
	Update: function(a_direction) {
		var points = this.game.Select(a_direction);

		if (this.game.IsGameOver() === true) {
			console.log('game over!!!!!!!!!!!!!!!!!!!!');
			$('#over').attr('disabled', 'disabled');
			$('#under').attr('disabled', 'disabled');
		}
		
		//View som uppdaterar kortet
		$('#cardDiv').html(this.view('showCard', { card: this.game.GetNextCard() }));
		
		//View som uppdaterar antal kort kvar
		$('#cardsLeftDiv').html(this.view('showCardsLeft', { cardsLeft: this.game.GetCardsLeft() }));
		
		//View som uppdaterar antal po�ng f�r gissningen
		$('#pointsDiv').html(this.view('showPoints', { points: points }));
		
		//View som uppdaterar anv�ndarnas po�ng
		$('#playersDiv').html(this.view('showPlayers', { players: this.game.m_players }));
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
	
	//Ta bort sen, bara test nu!!!!!!!!!
	'#listCards click': function() {
		for (var i = 0, j = this.game.m_deck.m_cards.length ; i < j ; i++) {
			$('#game').append('<p>' + (i + 1) + ': ' + this.game.m_deck.m_cards[i].m_color + this.game.m_deck.m_cards[i].m_value + '</p>');
		}
	},
	
	/**
	* Lyssnar p� om spelaren klickat p� "Restart" och startar om spelet
	*/
	'#restart click': function() {
		var players = [];
		
		for (var i = 0, j = this.game.m_players.length ; i < j ; i++) {
			players.push(this.game.GetPlayer(i).GetName());
		}
		
		this.startGame(players, this.game.m_switchIfCorrect);
	},
	
	/**
	* Lyssnar p� om anv�ndaren klickat p� "Quit to menu" och visar startsidan
	*/
	'#quit click': function() {
		$('#game').remove();
		
		this.load();
	}
	

});
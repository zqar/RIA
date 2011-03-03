/**
 */
$.Controller.extend('Nextcard.Controllers.Game',
/* @Static */
{
	onDocument: true
},
/* @Prototype */
{
	/**
	* När sidan laddas
	*/
	load: function () {
		if (!$("#game").length) {
			$(document.body).append($('<div/>').attr('id', 'game'));
		}
		
		$('#game').append(this.view('init', { }));

	},
	
	//TA BORT!!!!!!!!!!!
	'#testPlayers click': function() {
		var players = $('input[@name=players]:radio:checked').val();
		alert(players);
	},
	
	//Funktion för att ändra antalet spelare genom radiobutton
	'.selectPlayers change': function() {
		//Hämta antalet valda spelare
		var noOfPlayers = $('input[@name=players]:radio:checked').val();
		//Uppdatera vyn
		$('#playerNames').html(this.view('inputPlayers', { noOfPlayers: noOfPlayers }));
		//alert($('input[@name=players]:radio:checked').val());
	},
	
	//Funktion för att 
	'#startGame click': function() {
		var players = ["anders", "peter"];
		//for (var i = 0, j = ;)
		this.startGame(players);
	},
	
	startGame: function(a_players) {
		this.game = new Nextcard.Models.Game(a_players);
			
		this.game.ResetDeck();
		this.game.ResetScores();
		
		//$('#game').append($('<button/>').attr('id', 'button'));
		/*$('#game').append($('<button/>').attr('id', 'listCards'));
		$('#game').append($('<button type="button" id="over">Over</button>'));
		$('#game').append($('<button type="button" id="under">Under</button>'));*/
		
		/*$('#game').append($('<p id="currentCard">Card: ' + this.game.GetNextCard().m_color + this.game.GetNextCard().m_value + '</p>'));
		$('#game').append($('<p id="cardsLeft">Cards left: 52</p>'));
		$('#game').append($('<div id="points"></div>'));*/
		
		/*$('#game').append($('<div id="player1">Player1</div>'));
		$('#game').append($('<div id="player2">Player2</div>'));
		$('#player1').append($('<p id="p1name">' + this.game.GetPlayer(0).m_name + '</p>'));
		$('#player2').append($('<p id="p2name">' + this.game.GetPlayer(1).m_name + '</p>'));
		$('#player1').append($('<p id="p1score">' + this.game.GetPlayer(0).m_score + '</p>'));
		$('#player2').append($('<p id="p2score">' + this.game.GetPlayer(1).m_score + '</p>'));
		console.log(this.game.m_deck.m_cards.length);
		console.log(this.game.m_players.length);*/
		
		/*$('#game').append($('<div id="cardDiv"></div>'));
		$('#game').append($('<div id="cardsLeftDiv"></div>'));
		$('#game').append($('<div id="pointsDiv"></div>'));
		$('#game').append($('<div id="playersDiv"></div>'));*/
		
		$('#game').html(this.view('playGame', { players: this.game.m_players, card: this.game.m_deck.GetNextCard(), cardsLeft: this.game.GetCardsLeft() }));
		//$('#playersDiv').append(this.view('showplayers', { players: this.game.m_players }));
	},
	
	Update: function(a_direction) {
		var points = this.game.Select(a_direction);
		/*$('#currentCard').html('Card: ' + this.game.GetNextCard().m_color + this.game.GetNextCard().m_value);
		$('#cardsLeft').html('Cards left: ' + this.game.GetCardsLeft());
		$('#points').html(points);*/
		/*$('#p1score').html(this.game.GetPlayer(0).m_score);
		$('#p2score').html(this.game.GetPlayer(1).m_score);
		
		if (this.game.GetPlayer(0).IsActive()) {
			$('#player1').attr('class', 'active');
			$('#player2').attr('class', 'inactive');
		} else {
			$('#player2').attr('class', 'active');
			$('#player1').attr('class', 'inactive');
		}*/
		
		if (this.game.IsGameOver() === true) {
			console.log('game over!!!!!!!!!!!!!!!!!!!!');
			$('#over').attr('disabled', 'disabled');
			$('#under').attr('disabled', 'disabled');
		}
		
		//View som uppdaterar kortet
		$('#cardDiv').html(this.view('showCard', { card: this.game.GetNextCard() }));
		
		//View som uppdaterar antal kort kvar
		$('#cardsLeftDiv').html(this.view('showCardsLeft', { cardsLeft: this.game.GetCardsLeft() }));
		
		//View som uppdaterar antal poäng för gissningen
		$('#pointsDiv').html(this.view('showPoints', { points: points }));
		
		//View som uppdaterar användarnas poäng
		$('#playersDiv').html(this.view('showPlayers', { players: this.game.m_players }));
	},
	
	'#over click': function() {
		this.Update("over");
	},
	
	'#under click': function() {
		this.Update("under");
	},
	
	'#listCards click': function() {
		for (var i = 0, j = this.game.m_deck.m_cards.length ; i < j ; i++) {
			$('#game').append('<p>' + this.game.m_deck.m_cards[i].m_color + this.game.m_deck.m_cards[i].m_value + '</p>');
		}
	}
	
	
	

});
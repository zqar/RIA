/**
*/
$.Model.extend('Nextcard.Models.Game',
/* @Static */
{
},
/* @Prototype */
{

	//Konstruktor
	init: function (a_players) {
		//Kalla på this.ResetDeck() som skapar en ny kortlek och sparar undan den
	    this.m_deck = new Nextcard.Models.Deck();
		this.m_currentPlayer = 0;
		this.m_players = [];
		
		//this.m_players.push("ett");
		//this.m_players.push(new Nextcard.Models.Player("två"));
		//this.m_playera = new Nextcard.Models.Player("hej");
		//this.m_players[1] = new Nextcard.Models.Player(a_players[0]);
		
		//Skapa Player-objekt
		for (var i = 0, j = a_players.length ; i < j ; i++) {
			this.m_players[i] = new Nextcard.Models.Player(a_players[i]);
			console.log(this.m_players[i].m_name + " skapad"); //logging
		}
		this.m_players[this.m_currentPlayer].SetActive(true);
		
		//alert(this.m_players[this.m_currentPlayer].m_name);
		//this.m_players = "not implemented";
		
		//alert(this.m_players[0]);
	},
	
	//Varför skapas en ny Deck när denna funktionen finns, men ej körs?
	ResetDeck: function() {
		//return new Nextcard.Models.Deck();
	},
	
	ResetScores: function() {
		return "not implemented";
	},
	
	//Funktion för en gissning
	Select: function(a_direction) {
		var card1 = this.m_deck.GetNextCard();
		
		this.m_deck.RemoveNextCard();
		
		var card2 = this.m_deck.GetNextCard();
		
		var points = this.CalcScore(card1.GetValue(), card2.GetValue(), a_direction)
		
		this.m_players[this.m_currentPlayer].UpdateScore(points);
		
		this.SetNextPlayer();
		
		return points;
	},
	
	//Räknar ut hur många poäng en gissning ger
	CalcScore: function(a_nextCardValue, a_secondCardValue, a_direction) {
		var score = 0;
		//Fel gissning
		if ((a_nextCardValue > a_secondCardValue && a_direction === "over") || (a_nextCardValue < a_secondCardValue && a_direction === "under")) {
			score = -5;
		//Rätt gissning över respektive under
		} else if (a_direction === "over") {
			score = a_nextCardValue;
		} else if (a_direction === "under") {
			score = 14 - a_nextCardValue;
		}
		
		console.log('points: ' + score)
		return score;
	},
	
	//Funktion som sätter vilken spelares tur det är
	//Fixa till bättre logik här sen (interface för olika regler?)
	SetNextPlayer: function() {
		for (var i = 0, j = this.m_players.length ; i < j ; i++) {
			this.m_players[i].SetActive(false);
		}
		if (this.m_currentPlayer === 0) {
			this.m_currentPlayer = 1;
		} else {
			this.m_currentPlayer = 0;
		}
		this.m_players[this.m_currentPlayer].SetActive(true);
	},
	
	GetCardsLeft: function() {
		return this.m_deck.GetCardsLeft();
	},
	
	GetNextCard: function() {
		return this.m_deck.GetNextCard();
	},
	
	GetPlayer: function(a_index) {
		return this.m_players[a_index];
	},
	
	GetCurrentPlayer: function() {
		return "not implemented";
	},
	
	IsGameOver: function() {
		return (this.m_deck.GetCardsLeft() === 1);
	}

});
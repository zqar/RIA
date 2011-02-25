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
	    this.m_deck = new Nextcard.Models.Deck();
		this.m_players = "not implemented";
		this.m_currentPlayer = "not implemented";
	},
	
	ResetDeck: function() {
		return "not implemented";
	},
	
	ResetScores: function() {
		return "not implemented";
	},
	
	Select: function(a_direction) {
		return "not implemented";
	},
	
	CalcScore: function(a_nextCardValue, a_secondCardValue, a_direction) {
		return "not implemented";
	},
	
	SetNextPlayer: function() {
		return "not implemented";
	},
	
	GetCardsLeft: function() {
		return "not implemented";
	},
	
	GetNextCard: function() {
		return "not implemented";
	},
	
	GetPlayer: function() {
		return "not implemented";
	},
	
	GetCurrentPlayer: function() {
		return "not implemented";
	},
	
	IsGameOver: function() {
		return "not implemented";
	}

});
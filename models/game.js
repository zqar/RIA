/**
 * @tag models, home
 * Modellklass som hanterar ett spel
 */
$.Model.extend('Nextcard.Models.Game',
/* @Static */
{
},
/* @Prototype */
{

	/**
 	 * Konstruktor f�r klassen
 	 * @param {Array} a_players En array som inneh�ller spelarnas namn
 	 * @param {Function} a_switchRule Funktion inneh�llandes logiken f�r n�r turordningen skiftar
 	 */
	init: function (a_playerNames, a_switchRule) {
		this.m_players = [];
		this.m_switchRule = a_switchRule;
		
		//Skapa Player-objekt
		for (var i = 0, j = a_playerNames.length ; i < j ; i++) {
			this.m_players[i] = new Nextcard.Models.Player(a_playerNames[i]);
		}
		
		//Starta spelet
		this.RestartGame();
	},
	
	/**
 	 * Funktion f�r att starta ett spel
 	 */
	RestartGame: function() {
		
		this.m_deck = new Nextcard.Models.Deck();
		this.ResetPlayers();
		this.m_currentPlayer = 0;
		this.m_noOfPlayers = this.m_players.length;
		
		//S�tt f�rsta spelaren som aktuell spelare
		this.m_players[this.m_currentPlayer].SetActive(true);
	},
	
	/**
 	 * Funktion f�r att nollst�lla spelarnas po�ng
 	 */
	ResetPlayers: function() {
		for (var i = 0 ; i < this.m_noOfPlayers ; i++) {
			this.m_players[i].ResetScore();
			this.m_players[i].SetActive(false);
		}
	},
	
	/**
 	 * Funktion f�r en gissning
 	 * @param {String} a_direction Spelarens gissning (over/under)
 	 * @return {Number} Returnerar hur m�nga po�ng spelaren f�r f�r gissningen
 	 */
	Select: function(a_direction) {
		//H�mtar och tar bort kort, samt r�knar ut po�ngen f�r gissningen
		var card1 = this.m_deck.GetNextCard();
		this.m_deck.RemoveNextCard();
		var card2 = this.m_deck.GetNextCard();
		var points = this.CalcScore(card1.GetValue(), card2.GetValue(), a_direction)
		
		//Uppdatera po�ngen och s�tter aktuell spelare
		this.m_players[this.m_currentPlayer].UpdateScore(points);
		this.SetNextPlayer(points);
		
		return points;
	},
	
	/**
 	 * Funktion som r�knar ut hur m�nga po�ng en gissning ger
 	 * @param {String} a_nextCardValue Det aktuella kortets v�rde
 	 * @param {String} a_secondCardValue N�stkommande kortets v�rde
 	 * @param {String} a_direction Spelarens gissning (over/under)
 	 * @return {Number} Returnerar hur m�nga po�ng spelaren f�r f�r gissningen
 	 */
	CalcScore: function(a_nextCardValue, a_secondCardValue, a_direction) {
		var score = 0;
		
		//Fel gissning
		if ((a_nextCardValue > a_secondCardValue && a_direction === "over") || (a_nextCardValue < a_secondCardValue && a_direction === "under")) {
			score = -5;
			
		//R�tt gissning �ver respektive under
		} else if (a_direction === "over") {
			score = a_nextCardValue;
		} else if (a_direction === "under") {
			score = 14 - a_nextCardValue;
		}

		return score;
	},
	
	/**
 	 * Funktion som s�tter vilken spelares tur det �r n�sta g�ng
 	 * @param {Number} a_points Antalet po�ng som spelaren fick f�r sin gissning
 	 */
	SetNextPlayer: function(a_points) {
		
		//m_switchRule inneh�ller logik f�r om turen ska g� vidare till n�sta spelare
		if (this.m_switchRule(a_points > 0)){
			return;
		}
		
		//Byt aktiv spelare
		var nextPlayerIndex = (this.m_currentPlayer + 1) % this.m_noOfPlayers;

		this.m_players[this.m_currentPlayer].SetActive(false);
		this.m_players[nextPlayerIndex].SetActive(true);
		
		this.m_currentPlayer = nextPlayerIndex;
		
	},
	
	/**
 	 * Funktion kollar vem som vunnit spelet
 	 * @return {Object|Boolean} Returnerar Player-objektet som �r vinnaren, alternativt false ifall det �r flera spelare p� samma toppo�ng
 	 */
	GetWinner: function() {
		
		var winner = [];
		
		var maxScore = -1000;
		
		//Kolla vilken po�ng som var h�gst
		for (var i = 0 ; i < this.m_noOfPlayers ; i++) {
			if (this.m_players[i].GetScore() > maxScore) {
				maxScore = this.m_players[i].GetScore();
			}
		}
		
		//Kolla vilka spelare som har den h�gsta po�ngen
		for (var i = 0; i < this.m_noOfPlayers; i++) {
			if (this.m_players[i].GetScore() === maxScore) {
				winner.push(this.m_players[i]);
			}
		}
		
		//Returnera en ensam vinnare eller false (d� vinsten delas mellan flera spelare)
		if (winner.length === 1) {
			return winner[0];
		} else {
			return false;
		}
	},
	
	/**
 	 * H�mtar antalet kort som finns kvar i kortleken
 	 * @return {Number} Returnerar hur m�nga kort Deck-objektet inneh�ller
 	 */
	GetCardsLeft: function() {
		return this.m_deck.GetCardsLeft();
	},
	
	/**
 	 * Funktion f�r att h�mta det �versta kortet i kortleken
 	 * @return {Object} Returnerar Deck-objektets �versta Card-objekt
 	 */
	GetNextCard: function() {
		return this.m_deck.GetNextCard();
	},
	
	/**
 	 * H�mtar ett player-objekt
 	 * @param {Number} a_index Indexet f�r spelaren som ska h�mtas
 	 * @return {Object} Returnerar Player-objektet med det valda indexet
 	 */
	GetPlayer: function(a_index) {
		return this.m_players[a_index];
	},
	
	/**
 	 * H�mtar indexet f�r spelaren som har turen
 	 * @return {Number} Returnerar indexet f�r aktuellt spelare
 	 */
	GetCurrentPlayerIndex: function() {
		return this.m_currentPlayer;
	},
	
	/**
 	 * Kollar om spelet �r slut
 	 * @return {Boolean} Returnerar om spelet �r slut eller ej
 	 */
	IsGameOver: function() {
		return (this.m_deck.GetCardsLeft() === 1);
	}

});
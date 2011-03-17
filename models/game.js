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
 	 * Konstruktor för klassen
 	 * @param {Array} a_players En array som innehåller spelarnas namn
 	 * @param {Function} a_switchRule Funktion innehållandes logiken för när turordningen skiftar
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
 	 * Funktion för att starta ett spel
 	 */
	RestartGame: function() {
		
		this.m_deck = new Nextcard.Models.Deck();
		this.ResetPlayers();
		this.m_currentPlayer = 0;
		this.m_noOfPlayers = this.m_players.length;
		
		//Sätt första spelaren som aktuell spelare
		this.m_players[this.m_currentPlayer].SetActive(true);
	},
	
	/**
 	 * Funktion för att nollställa spelarnas poäng
 	 */
	ResetPlayers: function() {
		for (var i = 0 ; i < this.m_noOfPlayers ; i++) {
			this.m_players[i].ResetScore();
			this.m_players[i].SetActive(false);
		}
	},
	
	/**
 	 * Funktion för en gissning
 	 * @param {String} a_direction Spelarens gissning (over/under)
 	 * @return {Number} Returnerar hur många poäng spelaren får för gissningen
 	 */
	Select: function(a_direction) {
		//Hämtar och tar bort kort, samt räknar ut poängen för gissningen
		var card1 = this.m_deck.GetNextCard();
		this.m_deck.RemoveNextCard();
		var card2 = this.m_deck.GetNextCard();
		var points = this.CalcScore(card1.GetValue(), card2.GetValue(), a_direction)
		
		//Uppdatera poängen och sätter aktuell spelare
		this.m_players[this.m_currentPlayer].UpdateScore(points);
		this.SetNextPlayer(points);
		
		return points;
	},
	
	/**
 	 * Funktion som räknar ut hur många poäng en gissning ger
 	 * @param {String} a_nextCardValue Det aktuella kortets värde
 	 * @param {String} a_secondCardValue Nästkommande kortets värde
 	 * @param {String} a_direction Spelarens gissning (over/under)
 	 * @return {Number} Returnerar hur många poäng spelaren får för gissningen
 	 */
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

		return score;
	},
	
	/**
 	 * Funktion som sätter vilken spelares tur det är nästa gång
 	 * @param {Number} a_points Antalet poäng som spelaren fick för sin gissning
 	 */
	SetNextPlayer: function(a_points) {
		
		//m_switchRule innehåller logik för om turen ska gå vidare till nästa spelare
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
 	 * @return {Object|Boolean} Returnerar Player-objektet som är vinnaren, alternativt false ifall det är flera spelare på samma toppoäng
 	 */
	GetWinner: function() {
		
		var winner = [];
		
		var maxScore = -1000;
		
		//Kolla vilken poäng som var högst
		for (var i = 0 ; i < this.m_noOfPlayers ; i++) {
			if (this.m_players[i].GetScore() > maxScore) {
				maxScore = this.m_players[i].GetScore();
			}
		}
		
		//Kolla vilka spelare som har den högsta poängen
		for (var i = 0; i < this.m_noOfPlayers; i++) {
			if (this.m_players[i].GetScore() === maxScore) {
				winner.push(this.m_players[i]);
			}
		}
		
		//Returnera en ensam vinnare eller false (då vinsten delas mellan flera spelare)
		if (winner.length === 1) {
			return winner[0];
		} else {
			return false;
		}
	},
	
	/**
 	 * Hämtar antalet kort som finns kvar i kortleken
 	 * @return {Number} Returnerar hur många kort Deck-objektet innehåller
 	 */
	GetCardsLeft: function() {
		return this.m_deck.GetCardsLeft();
	},
	
	/**
 	 * Funktion för att hämta det översta kortet i kortleken
 	 * @return {Object} Returnerar Deck-objektets översta Card-objekt
 	 */
	GetNextCard: function() {
		return this.m_deck.GetNextCard();
	},
	
	/**
 	 * Hämtar ett player-objekt
 	 * @param {Number} a_index Indexet för spelaren som ska hämtas
 	 * @return {Object} Returnerar Player-objektet med det valda indexet
 	 */
	GetPlayer: function(a_index) {
		return this.m_players[a_index];
	},
	
	/**
 	 * Hämtar indexet för spelaren som har turen
 	 * @return {Number} Returnerar indexet för aktuellt spelare
 	 */
	GetCurrentPlayerIndex: function() {
		return this.m_currentPlayer;
	},
	
	/**
 	 * Kollar om spelet är slut
 	 * @return {Boolean} Returnerar om spelet är slut eller ej
 	 */
	IsGameOver: function() {
		return (this.m_deck.GetCardsLeft() === 1);
	}

});
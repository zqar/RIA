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
 	 * @param {Boolean} a_switchIfCorrect Sätter om turordningen skiftar efter varje gissning eller vid fel gissning
 	 */
	init: function (a_players, a_switchIfCorrect) {
		//Kalla på this.ResetDeck() som skapar en ny kortlek och sparar undan den
	    this.m_deck = new Nextcard.Models.Deck(); //Tillfällig lösning, ändra sen
		this.m_currentPlayer = 0;
		this.m_players = [];
		this.m_switchIfCorrect = a_switchIfCorrect;
		
		//Skapa Player-objekt
		for (var i = 0, j = a_players.length ; i < j ; i++) {
			this.m_players[i] = new Nextcard.Models.Player(a_players[i]);
			console.log("player " + this.m_players[i].GetName() + " skapad"); //logging
		}
		
		//Sätt första spelaren som aktuell spelare
		this.m_players[this.m_currentPlayer].SetActive(true);
		
	},
	
	//Varför skapas en ny Deck när denna funktionen läses in (ej anropas)?
	ResetDeck: function() {
		//return new Nextcard.Models.Deck();
	},
	
	ResetScores: function() {
		return "not implemented";
	},
	
	/**
 	 * Funktion för en gissning
 	 * @param {String} a_direction Spelarens gissning (over/under)
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
		
		console.log('points: ' + score)
		return score;
	},
	
	/**
 	 * Funktion som sätter vilken spelares tur det är nästa gång
 	 * @param {Number} a_points Antalet poäng som spelaren fick för sin gissning
 	 */
	SetNextPlayer: function(a_points) {
		
		//Gör inget om spelaren gissade rätt och m_switchIfCorrect == false...
		if (a_points > 0 && this.m_switchIfCorrect === false) {
			return;
		}
		
		//...annars blir det nästa spelares tur
		var nextPlayerIndex = this.m_currentPlayer + 1;
		
		if (nextPlayerIndex == this.m_players.length) {
			nextPlayerIndex = 0;
		}
		
		this.m_players[this.m_currentPlayer].SetActive(false);
		this.m_players[nextPlayerIndex].SetActive(true);
		
		this.m_currentPlayer = nextPlayerIndex;
		
	},
	
	/**
 	 * Hämtar antalet kort som finns kvar i kortleken
 	 */
	GetCardsLeft: function() {
		return this.m_deck.GetCardsLeft();
	},
	
	/**
 	 * Hämtar antalet kort som finns kvar i kortleken
 	 */
	GetNextCard: function() {
		return this.m_deck.GetNextCard();
	},
	
	/**
 	 * Hämtar ett player-objekt
 	 * @param {Number} a_index Indexet för spelaren som ska hämtas
 	 */
	GetPlayer: function(a_index) {
		return this.m_players[a_index];
	},
	
	GetCurrentPlayer: function() {
		return "not implemented";
	},
	
	/**
 	 * Kollar om spelet är slut
 	 */
	IsGameOver: function() {
		return (this.m_deck.GetCardsLeft() === 1);
	}

});
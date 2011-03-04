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
 	 * @param {Boolean} a_switchIfCorrect S�tter om turordningen skiftar efter varje gissning eller vid fel gissning
 	 */
	init: function (a_players, a_switchIfCorrect) {
		//Kalla p� this.ResetDeck() som skapar en ny kortlek och sparar undan den
	    this.m_deck = new Nextcard.Models.Deck(); //Tillf�llig l�sning, �ndra sen
		this.m_currentPlayer = 0;
		this.m_players = [];
		this.m_switchIfCorrect = a_switchIfCorrect;
		
		//Skapa Player-objekt
		for (var i = 0, j = a_players.length ; i < j ; i++) {
			this.m_players[i] = new Nextcard.Models.Player(a_players[i]);
			console.log("player " + this.m_players[i].GetName() + " skapad"); //logging
		}
		
		//S�tt f�rsta spelaren som aktuell spelare
		this.m_players[this.m_currentPlayer].SetActive(true);
		
	},
	
	//Varf�r skapas en ny Deck n�r denna funktionen l�ses in (ej anropas)?
	ResetDeck: function() {
		//return new Nextcard.Models.Deck();
	},
	
	ResetScores: function() {
		return "not implemented";
	},
	
	/**
 	 * Funktion f�r en gissning
 	 * @param {String} a_direction Spelarens gissning (over/under)
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
		
		console.log('points: ' + score)
		return score;
	},
	
	/**
 	 * Funktion som s�tter vilken spelares tur det �r n�sta g�ng
 	 * @param {Number} a_points Antalet po�ng som spelaren fick f�r sin gissning
 	 */
	SetNextPlayer: function(a_points) {
		
		//G�r inget om spelaren gissade r�tt och m_switchIfCorrect == false...
		if (a_points > 0 && this.m_switchIfCorrect === false) {
			return;
		}
		
		//...annars blir det n�sta spelares tur
		var nextPlayerIndex = this.m_currentPlayer + 1;
		
		if (nextPlayerIndex == this.m_players.length) {
			nextPlayerIndex = 0;
		}
		
		this.m_players[this.m_currentPlayer].SetActive(false);
		this.m_players[nextPlayerIndex].SetActive(true);
		
		this.m_currentPlayer = nextPlayerIndex;
		
	},
	
	/**
 	 * H�mtar antalet kort som finns kvar i kortleken
 	 */
	GetCardsLeft: function() {
		return this.m_deck.GetCardsLeft();
	},
	
	/**
 	 * H�mtar antalet kort som finns kvar i kortleken
 	 */
	GetNextCard: function() {
		return this.m_deck.GetNextCard();
	},
	
	/**
 	 * H�mtar ett player-objekt
 	 * @param {Number} a_index Indexet f�r spelaren som ska h�mtas
 	 */
	GetPlayer: function(a_index) {
		return this.m_players[a_index];
	},
	
	GetCurrentPlayer: function() {
		return "not implemented";
	},
	
	/**
 	 * Kollar om spelet �r slut
 	 */
	IsGameOver: function() {
		return (this.m_deck.GetCardsLeft() === 1);
	}

});
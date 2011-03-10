/**
 * @tag models, home
 * Modellklass som inneh�ller en kortlek i form av card-objekt
 */
$.Model.extend('Nextcard.Models.Deck',
/* @Static */
{
},
/* @Prototype */
{

	/**
 	 * Konstruktor f�r klassen, skapar en komplett kortlek best�endes av 52 card-objekt som blandas
 	 */
	init: function () {
		this.m_cards = [];
		
		var colors = ["h", "s", "c", "d"]
		
		for (var i = 1 ; i < 14 ; i++) {
			for (var j = 0, k = colors.length ; j < k ; j++) {
				this.m_cards.push(new Nextcard.Models.Card(i, colors[j]));
			}
		}
		
		this.Shuffle();
	},
	
	/**
 	 * Funktion f�r att blanda korten i kortleken
 	 */
	Shuffle: function() {
		for (var i = 0 ; i < 1000 ; i++) {
			//generera ett slumptal mellan 0-51
			var randomNumber=Math.floor(Math.random()*52);
			
			//spara undan det slumpade kortet, ta ur det fr�n leken och l�gg det sist i leken
			var card = this.m_cards[randomNumber];
			this.m_cards.splice(randomNumber, 1);
			this.m_cards.push(card);
		}
	},
	
	/**
 	 * Funktion f�r att h�mta det �versta kortet
 	 * @return {Object} Returnerar Deck-objektets �versta Card-objekt
 	 */
	GetNextCard: function() {
		return this.m_cards[this.m_cards.length-1];
	},
	
	/**
 	 * Funktion f�r att ta bort det �versta kortet
 	 */
	RemoveNextCard: function() {
		this.m_cards.splice(this.m_cards.length-1, 1);
	},
	
	/**
 	 * Funktion f�r att h�mta antalet kort som finns kvar i kortleken
 	 * @return {Number} Returnerar hur m�nga kort Deck-objektet inneh�ller
 	 */
	GetCardsLeft: function() {
		return this.m_cards.length;
	}

});
/**
 * @tag models, home
 * Modellklass som innehåller en kortlek i form av card-objekt
 */
$.Model.extend('Nextcard.Models.Deck',
/* @Static */
{
},
/* @Prototype */
{

	/**
 	 * Konstruktor för klassen, skapar en komplett kortlek beståendes av 52 card-objekt som blandas
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
 	 * Funktion för att blanda korten i kortleken
 	 */
	Shuffle: function() {
		for (var i = 0 ; i < 1000 ; i++) {
			//generera ett slumptal mellan 0-51
			var randomNumber=Math.floor(Math.random()*52);
			
			//spara undan det slumpade kortet, ta ur det från leken och lägg det sist i leken
			var card = this.m_cards[randomNumber];
			this.m_cards.splice(randomNumber, 1);
			this.m_cards.push(card);
		}
	},
	
	/**
 	 * Funktion för att hämta det översta kortet
 	 * @return {Object} Returnerar Deck-objektets översta Card-objekt
 	 */
	GetNextCard: function() {
		return this.m_cards[this.m_cards.length-1];
	},
	
	/**
 	 * Funktion för att ta bort det översta kortet
 	 */
	RemoveNextCard: function() {
		this.m_cards.splice(this.m_cards.length-1, 1);
	},
	
	/**
 	 * Funktion för att hämta antalet kort som finns kvar i kortleken
 	 * @return {Number} Returnerar hur många kort Deck-objektet innehåller
 	 */
	GetCardsLeft: function() {
		return this.m_cards.length;
	}

});
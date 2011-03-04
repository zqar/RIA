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
				//console.log("skapade kortet: " + colors[j] + i);
			}
		}
		
		console.log("kortlek skapad");
		
		this.Shuffle();
		console.log("kortlek blandad");
	},
	
	AddCard: function(a_card) {
		return "not implemented";
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
 	 */
	GetNextCard: function() {
		console.log("h�mta kortet " + this.m_cards[this.m_cards.length-1].m_color + this.m_cards[this.m_cards.length-1].m_value);//GetValue);
		return this.m_cards[this.m_cards.length-1];
	},
	
	/**
 	 * Funktion f�r att ta bort det �versta kortet
 	 */
	RemoveNextCard: function() {
		console.log("Tar bort kortet " + this.m_cards[this.m_cards.length-1].m_color + this.m_cards[this.m_cards.length-1].m_value);
		this.m_cards.splice(this.m_cards.length-1, 1);
	},
	
	/**
 	 * Funktion f�r att h�mta antalet kort som finns kvar i kortleken
 	 */
	GetCardsLeft: function() {
		return this.m_cards.length;
	}

});
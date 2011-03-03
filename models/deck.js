/**
*/
$.Model.extend('Nextcard.Models.Deck',
/* @Static */
{
},
/* @Prototype */
{

	//Konstruktor
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
	
	//Blanda korten många ggr
	Shuffle: function() {
		for (var i = 0 ; i < 100 ; i++) {
			//random nr
			var randomNumber=Math.floor(Math.random()*52);
			console.log(randomNumber);
			//spara kortet och ta bort
			var card = this.m_cards[randomNumber];
			this.m_cards.splice(randomNumber, 1);
			console.log(card.m_color + card.m_value);
			//lägg till kortet sist i leken
			this.m_cards.push(card);
			console.log(this.m_cards[51].m_color + this.m_cards[51].m_value)
		}
	},
	
	GetNextCard: function() {
		console.log("hämta kortet " + this.m_cards[this.m_cards.length-1].m_color + this.m_cards[this.m_cards.length-1].m_value);//GetValue);
		return this.m_cards[this.m_cards.length-1];
	},
	
	RemoveNextCard: function() {
		console.log("Tar bort kortet " + this.m_cards[this.m_cards.length-1].m_color + this.m_cards[this.m_cards.length-1].m_value);
		this.m_cards.splice(this.m_cards.length-1, 1);
	},
	
	GetCardsLeft: function() {
		return this.m_cards.length;
	}

});
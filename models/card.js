/**
 * @tag classes, home
 * Klass för ett spelkort
 */
$.Class.extend('Nextcard.Models.Card',
/* @Static */
{
},
/* @Prototype */
{

	/**
 	 * Konstruktor för klassen
 	 * @param {Number} a_value Kortets värde
 	 * @param {String} a_color Kortets färg
 	 */
	init: function (a_value, a_color) {
		this.m_value = a_value;
		this.m_color = a_color;
	},
	
	/**
 	 * Hämtar kortets värde
 	 * @return {Number} Returnerar kortets värde
 	 */
	GetValue: function() {
		return this.m_value;
	},
	
	/**
 	 * Hämtar kortets färg
 	 * @return {String} Returnerar kortets värde
 	 */
	GetColor: function() {
		return this.m_color;
	}
});
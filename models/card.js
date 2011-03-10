/**
 * @tag classes, home
 * Klass f�r ett spelkort
 */
$.Class.extend('Nextcard.Models.Card',
/* @Static */
{
},
/* @Prototype */
{

	/**
 	 * Konstruktor f�r klassen
 	 * @param {Number} a_value Kortets v�rde
 	 * @param {String} a_color Kortets f�rg
 	 */
	init: function (a_value, a_color) {
		this.m_value = a_value;
		this.m_color = a_color;
	},
	
	/**
 	 * H�mtar kortets v�rde
 	 * @return {Number} Returnerar kortets v�rde
 	 */
	GetValue: function() {
		return this.m_value;
	},
	
	/**
 	 * H�mtar kortets f�rg
 	 * @return {String} Returnerar kortets v�rde
 	 */
	GetColor: function() {
		return this.m_color;
	}
});
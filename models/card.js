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
	
	GetValue: function() {
		return this.m_value;
	},
	
	GetColor: function() {
		return this.m_color;
	}
});
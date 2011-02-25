/**
*/
$.Model.extend('Nextcard.Models.Card',
/* @Static */
{
},
/* @Prototype */
{

	//Konstruktor
	init: function (a_value, a_color) {
		this.m_value = a_value;
		this.m_color = a_color;
	},
	
	GetValue: function() {
		return "not implemented";
	},
	
	GetColor: function() {
		return "not implemented";
	}
});
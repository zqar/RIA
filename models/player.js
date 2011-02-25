/**
*/
$.Model.extend('Nextcard.Models.Player',
/* @Static */
{
},
/* @Prototype */
{

	//Konstruktor
	init: function (a_name) {
		this.m_score = 0;
		this.m_name = a_name;
	},
	
	UpdateScore: function(a_points) {
		return "not implemented";
	},
	
	GetScore: function() {
		return "not implemented";
	},
	
	GetName: function() {
		return "not implemented";
	},
	
	ResetScore: function() {
		return "not implemented";
	}
});
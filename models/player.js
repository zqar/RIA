/**
*/
$.Class.extend('Nextcard.Models.Player',
/* @Static */
{
},
/* @Prototype */
{

	//Konstruktor
	init: function (a_name) {
		this.m_score = 0;
		this.m_name = a_name;
		this.m_isActive = false;
	},
	
	UpdateScore: function(a_points) {
		this.m_score += a_points;
	},
	
	GetScore: function() {
		return this.m_score;
	},
	
	GetName: function() {
		return this.m_name;
	},
	
	ResetScore: function() {
		return "not implemented";
	},
	
	SetActive: function(a_active) {
		this.m_isActive = a_active;
	},
	
	IsActive: function() {
		return this.m_isActive === true;
	}
});
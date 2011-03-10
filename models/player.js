/**
 * @tag classes, home
 * Klass f�r en spelare
 */
$.Class.extend('Nextcard.Models.Player',
/* @Static */
{
},
/* @Prototype */
{
	/**
 	 * Konstruktor f�r klassen
 	 * @param {String} a_name Spelarens namn
 	 */
	init: function (a_name) {
		this.m_score = 0;
		this.m_name = a_name;
		this.m_active = false;		
	},
	
	/**
 	 * H�mta namnet p� spelaren
 	 * @return {String} Returnerar spelarens namn
 	 */
	GetName: function() {
		return this.m_name;
	},
	
	/**
 	 * H�mtar po�ngen f�r spelaren
 	 * @return {Number} Returnerar spelarens po�ng
 	 */
	GetScore: function() {
		return this.m_score;
	},
	
	/**
 	 * Uppdaterar po�ngen f�r spelaren
 	 */
	UpdateScore: function(a_points) {
		this.m_score += a_points;
	},
	
	/**
 	 * Nollst�ller spelarens po�ng
 	 */
	ResetScore: function() {
		this.m_score = 0;
	},
	
	/**
 	 * S�tt aktuell spelare
 	 */
	SetActive: function(a_active) {
		this.m_active = a_active;
	},
	
	/**
 	 * Kollar om det �r spelarens tur
 	 * @return {Boolean} Returnerar om det �r spelarens tur eller ej
 	 */
	IsActive: function() {
		return this.m_active === true;
	}
});
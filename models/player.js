/**
 * @tag classes, home
 * Klass för en spelare
 */
$.Class.extend('Nextcard.Models.Player',
/* @Static */
{
},
/* @Prototype */
{
	/**
 	 * Konstruktor för klassen
 	 * @param {String} a_name Spelarens namn
 	 */
	init: function (a_name) {
		this.m_score = 0;
		this.m_name = a_name;
		this.m_active = false;		
	},
	
	/**
 	 * Hämta namnet på spelaren
 	 * @return {String} Returnerar spelarens namn
 	 */
	GetName: function() {
		return this.m_name;
	},
	
	/**
 	 * Hämtar poängen för spelaren
 	 * @return {Number} Returnerar spelarens poäng
 	 */
	GetScore: function() {
		return this.m_score;
	},
	
	/**
 	 * Uppdaterar poängen för spelaren
 	 */
	UpdateScore: function(a_points) {
		this.m_score += a_points;
	},
	
	/**
 	 * Nollställer spelarens poäng
 	 */
	ResetScore: function() {
		this.m_score = 0;
	},
	
	/**
 	 * Sätt aktuell spelare
 	 */
	SetActive: function(a_active) {
		this.m_active = a_active;
	},
	
	/**
 	 * Kollar om det är spelarens tur
 	 * @return {Boolean} Returnerar om det är spelarens tur eller ej
 	 */
	IsActive: function() {
		return this.m_active === true;
	}
});
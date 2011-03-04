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

	//I denna klassen testar jag att l�gga alla funktioner som anv�nder sig av de privata variablerna i konstruktorn
	//Det blir dock mycket kod i konstruktorn
	/**
 	 * Konstruktor f�r klassen
 	 * @param {String} a_name Spelarens namn
 	 */
	init: function (a_name) {
		/*this.m_score = 0;
		this.m_name = a_name;
		this.m_isActive = false;*/
		
		var m_score = 0;
		var m_name = a_name;
		var m_isActive = false;
		
		//H�mtar po�ngen f�r sepalren
		this.GetScore = function(){
			return m_score;
		}
		
		//Uppdaterar po�ngen f�r spelaren
		this.UpdateScore = function(a_points){
			m_score += a_points;
		} 
		
		//H�mta namnet p� spelaren
		this.GetName = function() {
			return m_name;
		}
		
		//S�tt aktuell spelare
		this.SetActive = function(a_active) {
			m_isActive = a_active;
		}
		
		//Kollar om det �r spelarens tur
		this.IsActive = function() {
			return m_isActive === true;
		}
		
		
	}
	
	/*UpdateScore: function(a_points) {
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
	}*/
});
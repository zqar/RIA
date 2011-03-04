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

	//I denna klassen testar jag att lägga alla funktioner som använder sig av de privata variablerna i konstruktorn
	//Det blir dock mycket kod i konstruktorn
	/**
 	 * Konstruktor för klassen
 	 * @param {String} a_name Spelarens namn
 	 */
	init: function (a_name) {
		/*this.m_score = 0;
		this.m_name = a_name;
		this.m_isActive = false;*/
		
		var m_score = 0;
		var m_name = a_name;
		var m_isActive = false;
		
		//Hämtar poängen för sepalren
		this.GetScore = function(){
			return m_score;
		}
		
		//Uppdaterar poängen för spelaren
		this.UpdateScore = function(a_points){
			m_score += a_points;
		} 
		
		//Hämta namnet på spelaren
		this.GetName = function() {
			return m_name;
		}
		
		//Sätt aktuell spelare
		this.SetActive = function(a_active) {
			m_isActive = a_active;
		}
		
		//Kollar om det är spelarens tur
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
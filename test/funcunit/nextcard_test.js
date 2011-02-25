module("nextcard test", { 
	setup: function(){
		S.open("//nextcard/nextcard.html");
	}
});

test("Copy Test", function(){
	equals(S("h1").text(), "Welcome to JavaScriptMVC 3.0!","welcome text");
});
//steal/js nextcard/scripts/compress.js

load("steal/rhino/steal.js");
steal.plugins('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('nextcard/scripts/build.html',{to: 'nextcard'});
});

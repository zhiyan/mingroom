app.factory("$fireQuery", function($data){
	return function(type,text,cb){

		var res = [],
			params = {
				"query" : {
					"query_string" : {
						"default_field" : "name",
						"query" : "*"+escapeText(text)+"*",
					}
				}
			};

	    var queue = $data.child("search");

	    function search(index, type, searchTerm, callback) {

	       var key = queue.child('request').push({ index: index, type: type, query: searchTerm }).key();

	       queue.child('response/'+key).on('value', function fn(snap) {
	       	console.log(snap.val())
	          if( snap.val() !== null ) {     // wait for data
	             snap.ref().off('value', fn); // stop listening
	             snap.ref().remove();         // clear the queue
	             callback(snap.val());
	          }
	       });
	    }

	    function escapeText(text){
	    	return text.replace(/[-\/\s]/g," AND ");
	    	// return text.replace(/([-+&|?*~^\[\]\(\)])/g,"\\$1");
	    }

	    search('firebase', type, params, function(data) {
	        if( data.hits ) {
	           data.hits.forEach(function(hit) {
	           	  var one = hit._source;
	           	  one.$id = hit._id;
	              res.push(one);
	           });
	        }
	        cb(res);
	    });
	}
});
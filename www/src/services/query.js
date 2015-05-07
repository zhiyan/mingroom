app.factory("$fireQuery", function($data){
	return function(type,text,cb){

		var res = [];

	    var queue = $data.child("search");

	    function search(index, type, searchTerm, callback) {

	       var key = queue.child('request').push({ index: index, type: type, query: searchTerm }).key();

	       queue.child('response/'+key).on('value', function fn(snap) {
	          if( snap.val() !== null ) {     // wait for data
	             snap.ref().off('value', fn); // stop listening
	             snap.ref().remove();         // clear the queue
	             callback(snap.val());
	          }
	       });
	    }

	    search('firebase', type, {"query_string" : {"query":"*"+text+"*"}}, function(data) {
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
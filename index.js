function daleth(){
	var routes = arguments;
	return function(path, callback) {
		path = path.split('?')[0]; // 
		for (var i in routes) {
			var match = routes[i][0].exec(path);
			if (match){
				callback(routes[i][1], 
						(match.length==1) ? [] : match.splice(1,1));
				return;
			}
		}
	};
};

module.exports = daleth;
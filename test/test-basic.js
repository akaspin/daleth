var sys = require('sys');
var assert =  require('assert');

var tester = function(name, args, expect) {
	assert.equal(name, expect.name);
	assert.deepEqual(args, expect.args);
};

var route = require("../")(
    [/^\/user\/?$/, function(args, expect) {
		tester('#1', args, expect);
	}],
    [/^\/user\/([a-z]+)\/?$/, function(args, expect) {
		tester('#2', args, expect);
	}],
    [/^\/$/, function(args, expect) {
		tester('#3', args, expect);
	}],
    [/^\/.*$/, function(args, expect) {
		tester('Fallback', args, expect);
	}] // Fallback - catch all unhandled
);

[
 	{path: "/fall", expect: {name:"Fallback", args:[]}},
 	{path: "/fall/any", expect: {name:"Fallback", args:[]}},
 	{path: "/Fall/any", expect: {name:"Fallback", args:[]}},
 	{path: "/", expect: {name:"#3", args:[]}},
 	{path: "/user", expect: {name:"#1", args:[]}},
 	{path: "/user/", expect: {name:"#1", args:[]}},
 	{path: "/User", expect: {name:"Fallback", args:[]}},
 	{path: "/User/", expect: {name:"Fallback", args:[]}},
 	{path: "/user/name", expect: {name:"#2", args:["name"]}},
 	{path: "/user/smith", expect: {name:"#2", args:["smith"]}},
 	{path: "/user/name/any", expect: {name:"Fallback", args:[]}},
 	{path: "/user/nam1", expect: {name:"Fallback", args:[]}},
]
.forEach(function(test){
	var req = test.path;
	var expect = test.expect;
	route(req, function(handler, args) {
		handler(args, expect);
	});
});



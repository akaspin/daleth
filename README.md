# daleth

Daleth is very simple router. 

In the Phoenician alphabet "Daleth" indicates door.

## Usage

Usage of *daleth* is very simple:

    var http = require('http');
    var daleth = require('daleth')(
        [/^\/([a-z]+)\/?$/, function(request, response, args) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end('One argument: ' + args, 'utf8');
        }],
        [/^\/$/, function(request, response) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end('Pure root', 'utf8');
        }],
        [/^\/.*$/, function(request, response) { // Fallback
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.end('Not found', 'utf8');
        }]
    );
    
    http.createServer(function (request, response) {
        daleth(request.url, function(handler, args) {
            handler(request, response, args);
        });
    }).listen(8888);

*daleth* takes set of two-element arrays that contains `regex` and `handler` 
as arguments and returns "route" function. `Regex` is full JavaScript RegExp
object that can include "search groups". `Handler` can be any object, not just 
a function. 

"Route" function takes two arguments: `path` and `callback`. Callback also 
takes two arguments: routed handler and array of extracted matching search 
groups. If `path` includes "?" symbol, *daleth* trashes it and all trailing
path.

 
    
    


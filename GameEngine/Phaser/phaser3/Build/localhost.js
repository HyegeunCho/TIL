var express = require('express');
var compression = require('compression');
var path = require('path');
var https = require('https');
var fs = require('fs');
var opn = require('opn');
var argv = require('minimist')(process.argv.slice(2));

var app = express();

var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

app.use(compression());
app.use(express.static('../'));
app.use('/Production', express.static('../Production'));

// https.createServer(options, app).listen(8080, function() {
//     console.log('Https server listening on port 8080');
//     if (!argv.auto || argv.auto === 'true') {
//         if (argv.path) {
//             opn(`https://localhost:8080/start?path=${argv.path}`);
//         } else {
//         opn('https://localhost:8080/start');
//         }
//     }
// });

app.get('/start', function(req, res) {
    console.log("Redirect!!");

    if (!req.query.t) {
        var appId = '159326401332940';
    } else {
        appId = req.query.t;
    }

    if (!req.query.path) {
        res.redirect(`https://www.facebook.com/embed/instantgames/${appId}/player?game_url=https://localhost:8080`);
    } else {
        res.redirect(`https://www.facebook.com/embed/instantgames/${appId}/player?game_url=https://localhost:8080/${req.query.path}`);
    }

    
});

app.get('/', function(req, res) {

    res.send(200);
});

app.listen(8080, () => {
    opn(`http://localhost:8080`);
    console.log("DinoBallzLine listening on port 8800!");
});
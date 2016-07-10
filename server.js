var express = require('express'),
path = require('path'),
app = express();

app.set('port', (process.env.PORT || 8000));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});
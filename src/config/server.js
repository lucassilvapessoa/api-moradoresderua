console.log('[Config] Server');
let express = require('express'); // O express retorna uma função
let expressSession = require('express-session');

let app = express(); //express é uma função. 
let port = 3000;

app.set('views', './app/views');
app.use(express.static('./public'));

app.use(expressSession({
	secret: 'Vlaksjdfçlkjdasfçlkadsjfçsdlkjf',
	resave: false,
	saveUninitialized: false
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || port, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

module.exports = app;
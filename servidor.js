var express = require('express');
var app = express();
var bodyParser = require('body-parser')
const webpush = require('web-push')

app.use('/', express.static('web'));
app.use(bodyParser.json());

const vapidKeys = webpush.generateVAPIDKeys();


//Almacenamos en memoria los endpoints de los usuarios que quieren notificaciones. 
//Normalmente se haría en una BD, ¡es solo un ejemplo!
var listaSuscripciones = new Map();

app.post('/api/suscripciones', function(pet, resp){
	var suscripcion = pet.body;
	listaSuscripciones.set(suscripcion.endpoint, suscripcion);
	resp.status(201);
	resp.send('creada suscripción para endpoint: ' + suscripcion.endpoint);
});


app.delete('/api/suscripciones', function(pet, resp){
	var endpoint = pet.query.endpoint;
	console.log(endpoint)
	if (listaSuscripciones.has(endpoint)) {
	  listaSuscripciones.delete(endpoint);
		resp.status(200);
		resp.send('Eliminada suscripción');
	}
	else {
		resp.status(404);
		resp.send('No existe la suscripción con id: ' + id);
	}
});

var GOOGLE_API_KEY = 'AIzaSyCEhXPlHLVhumxI2zsSAzbPRL-grFUBK0c'; 

//enviar notificación: petición GET con parámetro HTTP 'texto'
//nos saltamos REST usando GET pero es que así es mucho más fácil de probar
app.get('/api/notificaciones', function(pet, resp) {
	listaSuscripciones.forEach(susc => {
		console.log(susc)
		webpush.sendNotification(
			susc, 
			pet.query.texto, 
			{   
				gcmAPIKey: GOOGLE_API_KEY,
				vapidDetails: {
					subject: 'http://prueba.com',
					publicKey:vapidKeys.publicKey,
					privateKey:vapidKeys.privateKey
				}
			}
		).then(result => {
			console.log(result)
			resp.status(200).send('ok')
		}).catch(error => {
			console.log(error)
			resp.status(500).send()
		})
	})			
});



app.listen(3000, function(){
	console.log("Web Express en el puerto 3000");
});

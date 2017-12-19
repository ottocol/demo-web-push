document.addEventListener('DOMContentLoaded', function(){
	navigator.serviceWorker
		.register('service_worker.js')
		.then(mostrarEstadoSuscripcion)
});


function mostrarEstadoSuscripcion(registration) {
	//Le preguntamos al pushManager si estamos suscritos
	registration.pushManager.getSubscription().then(function(subscription) {
		if (!subscription) {
			console.log('no estás suscrito')
			document.getElementById('mensaje_suscripcion').innerHTML = 'No estás suscrito. ¿Quieres suscribirte?';
			document.getElementById('cb_suscripcion').checked = false;

		}
		else {
			console.log(subscription);
			document.getElementById('mensaje_suscripcion').innerHTML = 'Ya estás suscrito. Desmarca la casilla para eliminar la suscripción';
			document.getElementById('cb_suscripcion').checked = true;
		}
	});

}

document.getElementById('cb_suscripcion').addEventListener('click', cambiarSuscripcion);

function cambiarSuscripcion() {
	if (document.getElementById('cb_suscripcion').checked) {
		//El usuario ha marcado la casilla, suscribirnos
		navigator.serviceWorker.ready.then(function(registration) {
			return registration.pushManager.subscribe({userVisibleOnly: true});
		}).then(function(subscription) {
			console.log(subscription);
			crearSuscripcionEnNuestroServidor(subscription);
			document.getElementById('mensaje_suscripcion').innerHTML = 'Ya estás suscrito. Desmarca la casilla para eliminar la suscripción';
			document.getElementById('cb_suscripcion').checked = true;
		}).catch(function(error){
			console.error(error);
		});
	}
	else {
		var susc;

		navigator.serviceWorker.ready.then(function(registration) {
			return registration.pushManager.getSubscription();
		}).then(function(subscription){
			susc = subscription;
			return subscription.unsubscribe();
		}).then(function(ok){
			eliminarSuscripcionDeNuestroServidor(susc);
			console.log('te has desuscrito: ' +  ok);
			document.getElementById('mensaje_suscripcion').innerHTML = 'No estás suscrito. ¿Quieres suscribirte?';
			document.getElementById('cb_suscripcion').checked = false;
		});

	}
}

function crearSuscripcionEnNuestroServidor(subscription) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/api/suscripciones', true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onreadystatechange = function() {
		if (xhr.readyState==4 && xhr.status==201) {
			 console.log(xhr.responseText)
		}
	};
	xhr.send(JSON.stringify(subscription));
}


function eliminarSuscripcionDeNuestroServidor(subscription) {
	var xhr = new XMLHttpRequest();
	xhr.open('DELETE', '/api/suscripciones?endpoint=' + subscription.endpoint, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState==4 && xhr.status==200) {
			 console.log(xhr.responseText)
		}
	};
	xhr.send();
}
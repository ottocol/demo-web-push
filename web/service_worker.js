console.log('hola soy el Service Worker');

self.addEventListener('push', function(notificacion) {
	self.registration.showNotification('Mensaje:', {
		body: notificacion.data.text()
	})
});
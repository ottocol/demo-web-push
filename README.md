# Ejemplo de notificaciones push

Demo básica de notificaciones push

## Requerimientos e Instalación

El ejemplo requiere `node` y `npm`. Para probarlo necesitaremos algún navegador compatible con notificaciones *push* (Chrome Desktop, Firefox o Chrome for Android).

Para instalar las dependencias

```bash
npm install
```

## Prueba

Poner en marcha el servidor con `node app_server.js`. Acceder en un navegador **que implemente notificaciones Push** (por ejemplo Chrome) a la URL `http://localhost:3000/ejemplo_push.html`. Con la página de ejemplo podemos suscribirnos o desuscribirnos a las notificaciones

Para simular el envío de una notificación, enviar una petición POST a `http://localhost:3000/api/notificaciones`. En el cuerpo de la petición en formato JSON enviar el `titulo` y el `contenido` de la notificación

```json
{
    "titulo": "saludo",
    "contenido": "Hola, soy una notificación push"
}
```
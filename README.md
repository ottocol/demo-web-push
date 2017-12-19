# Ejemplo de notificaciones push

Demo básica de notificaciones push

## Requerimientos e Instalación

El ejemplo requiere `node` y `npm`. Para probarlo necesitaremos algún navegador compatible con notificaciones *push* (por ejemplo Chrome o Firefox).

Para instalar las dependencias

```bash
npm install
```

## Prueba

Poner en marcha el servidor con `node servidor.js`. Acceder en un navegador **que implemente notificaciones Push** (por ejemplo Chrome) a la URL `http://localhost:3000/ejemplo_push.html`. Con la página de ejemplo podemos suscribirnos o desuscribirnos a las notificaciones

Para simular el envío de una notificación, enviar una petición GET a `http://localhost:3000/api/notificaciones?texto=<texto_de_la_notificacion>`.
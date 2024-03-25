const redis = require('redis');

// Configura la conexión a Redis
const client = redis.createClient({
  host: '127.0.0.1', // Cambia esto si Redis está en una dirección diferente
  port: 6379,        // Cambia esto si el puerto de tu servidor Redis es diferente
  // También puedes especificar la contraseña si Redis está protegido por contraseña
  // password: 'tu_contraseña'
});

// Manejo de errores de conexión
client.on('error', err => {
  console.error('Error de conexión a Redis:', err);
});

// Obtener el valor de la clave "msg"
client.get('msg', (err, reply) => {
  if (err) {
    console.error('Error al obtener el valor de la clave "msg" de Redis:', err);
  } else {
    console.log(reply);
  }
});

// Cierra la conexión a Redis cuando ya no sea necesaria
// No es necesario si tu aplicación Node.js está finalizando
// client.quit();

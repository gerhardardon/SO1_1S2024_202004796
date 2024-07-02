# Plataforma de Monitoreo y Señales a Procesos 🖥️🛰️
Gerhard Benjamin Ardon Valdez
202004796

## Introduccion 📕
En este proyecto, se tiene como objetivo principal implementar un sistema de monitoreo de

recursos del sistema y gestión de procesos, empleando varias tecnologías y lenguajes de

programación. El sistema resultante permitirá obtener información clave sobre el rendimiento del

computador, procesos en ejecución y su administración a través de una interfaz amigable.

Para una mayor descripcion visitar el enunciado del proyecto en este repositorio "[SO1]PROYECTO1_1S2024.pdf"

## Objetivos 📗
- Conocer el Kernel de Linux mediante módulos de C.
- Hacer uso de programación asíncrona con rutinas de Golang.
- Comprender el funcionamiento de los contenedores usando Docker.
- Utilizacion de reverse proxys con NGINX
- Manejo de Virtualizacion y port fowarding para comunicacion con la maquina local.

## Sistema Operativo 🛠️
- Ubuntu Server 22.04
- VirtualBox 

## Tenologias Usadas 📘
### Modulos de Kernel en C 🔩
En C para Linux, los módulos son fragmentos de código que pueden ser cargados y descargados en el kernel del sistema operativo en tiempo de ejecución. Estos módulos extienden las funcionalidades del kernel sin necesidad de recompilarlo por completo. Permiten agregar características específicas, controladores de dispositivos, sistemas de archivos, entre otros, sin tener que modificar el núcleo del sistema operativo. Esto proporciona flexibilidad y modularidad al sistema Linux, ya que los módulos pueden ser cargados y descargados según sea necesario sin afectar al funcionamiento general del sistema.

En este caso en específico se utilizaron los siguientes:
- Modulo Ram: Este módulo es el encargado de leer la ram total y la libre del sistema
- Modulo CPU: Este modulo lee la utilizacion del cpu y devuelve su porcetaje
- Modulo Proc: El modulo de procesos lee todos los procesos del sistema y los ordena segun su PID, ademas este modulo obtiene todos los child processes (si los hay) y los enlaza con su proceso padre para llevar todo el tracking de estos.

Para crear, compilar y mopntar estos modulos se deben seguir los siguientes pasos:
- navegar hasta la carpeta que contiene los modulos de C 
  ``` 
  cd /PROYECTO1/modulo_proc
  cd /PROYECTO1/modulo_ram
  ```
  
- compilar el modulo
  ```make```
- insertar el modulo en kernell con permisos de administrador
- ```sudo insmod [nombre_del_modulo.ko]```
- eliminar modulo (opcional)
  ```sudo rmmod [nombre_del_modulo.ko]```

### React + Vite ⚡
![](https://media.licdn.com/dms/image/D4D12AQFZkbeVaofxzQ/article-cover_image-shrink_600_2000/0/1708033784779?e=2147483647&v=beta&t=8xtvmqPnaQ-hvmkf3Yj3ZhlytJ6mNTPopeFs5yRwazI)
Para la parte de UI se utilizaron las siguientes herramientas:
- React
- Vite
- Bootstrap
- Chart-js-2
- Graphviz-react
  
Vite es una herramienta de construcción y desarrollo rápida diseñada para proyectos modernos de JavaScript. Se destaca por su rendimiento y eficiencia, especialmente en proyectos con frameworks como React, Vue y otros.

Ventajas de usar Vite con React:

-    Inicio rápido: Arranca casi instantáneamente.
-    Recarga rápida: Hot module replacement (HMR) eficiente.
- Compilación optimizada: Uso de ESBuild para rápida transformación y compilación.
- Configuración simplificada: Menos configuración comparada con Webpack.
- Soporte para módulos ES: Carga más rápida de dependencias en desarrollo.
  
Para instalar las dependencias necesarias para iniciar este proyecto con el uso de npm:
- navegar a la carpeta
```cd /PROYECTO1/frontend```

- instalar dependencias 
  ```npm install```

- iniciar pagina:
  ```npm run dev```

Listo, la aplicacion de monitoredo de prosesos se mostrara en el puerto localhost:5173
![captura de la interfaz](/PROYECTO1/assets/pagina.png)

### Fiber y Go 🔌
![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*4izRDkKCRZIOkLNfpDln9w.jpeg)
Se escogio fiber y go debido a su rendimiento y facilidad de uso, ademas que lo vuelve una API ligera 

Para la creacion de esta API se utilizo:
- Fiber V2
- GoRutines

Se leyeron los modulos insertados con anterioridad en la carpeta "/proc" de neustro SO y se manejaron los datos para devolver los siguientes valores:

| Modulo    | Valor de retorno             | Endpoint       |
|-----------|------------------------------|----------------|
| RAM       | int porcentaje libre         | "api/ram"      |
| CPU       | int porcentaje libre         | "api/cpu"      |
| Procesos  | json procesos con sus hijos  | "api/proclist" |

### Docker y Dockerhub 🐳
![enter image description here](https://www.docker.com/wp-content/uploads/2023/10/products-hub-1-hero-1.svg)
Docker es una plataforma que simplifica el desarrollo, empaquetado y ejecución de aplicaciones en contenedores. Los contenedores son unidades de software que incluyen todo lo necesario para ejecutar una aplicación de forma independiente. DockerHub es un servicio en la nube que actúa como repositorio para contenedores Docker, permitiendo a los desarrolladores compartir y distribuir sus aplicaciones.

Para crear una imagen primero situate en en la rama del Dockerfile y ejecuta:

    docker build -t TU_USUARIO/TU_IMAGEN:TAG .
Inicia sesion en dockerhub:

    docker login
Empuja tu imagen hacia dockerhub:

    docker push TU_USUARIO/TU_IMAGEN:TAG
Luego de eato, tu imagen debera verse entre tus repositorios de dockerhub, si no le pusiste tag se configurara con :latest 

Estas imagenes son necesarias ya que deben ser referenciadas en los deployments.yaml con los que funciona kubernetes.
Para esto te dejo un ejemplo en donde se referencia una imagen en dockerhub de nombre "gerhardardon/go.client:v1"
### Docker Compose 🐋
![](data:image/png;base64,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)
Docker Compose es una herramienta para definir y administrar aplicaciones Docker de múltiples contenedores. Con Docker Compose, puedes usar un archivo YAML para configurar los servicios de tu aplicación. Luego, con un solo comando, puedes crear e iniciar todos los servicios desde esa configuración.

Para este proyectos se utilizaron los siguientes servicios para levantar el Compose y orquestar los contenedores:

- Contenedor para la base de datos mysql y el volumen necesario
	```
	db:
    image: mysql:latest
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: 'pass' 
      MYSQL_DATABASE: 'memories'    
      MYSQL_USER: 'user'          
      MYSQL_PASSWORD: 'pass'     
    volumes:
      - mysqlvol:/var/lib/mysql

	```
- Contenedor para la api de Go traida desde el perfil de dockerhub y corriendo en el puerto 3000
	```
	apigo:
    image: gerhardardon/apigo:latest
    pid: host
    restart: always
    volumes:
    - type: bind
      source: /proc
      target: /proc
    ports:
      - "3000:3000"
    depends_on:
      - db
	```
- Contenedor para el frontend traida desde el perfil de dockerhub y corriendo en el puerto 80
	```
  frontend:
    image: gerhardardon/frontreact:latest
    restart: always
    ports:
      - "80:80"
    depends_on:
      - apigo
	```

### GNIX 📡
![](https://miro.medium.com/v2/resize:fit:1400/1*Gm_q3hi9cBRFeGA1NoxowQ.png)
NGINX es un servidor web de código abierto que también se puede usar como proxy inverso, equilibrador de carga, proxy de correo y caché HTTP. Es conocido por su alto rendimiento, estabilidad y bajo consumo de recursos, lo que lo convierte en una opción popular para servir contenido web.

En este caso se utilizo como un reverse proxy redirigiendo las solicitudes de los clientes al servidor de backend, distribuyendo la carga y mejorando el rendimiento.

El archivo se puede encontrar en *PROYECTO1/frontend/nginx.conf*
```
events {}

http {
    server {
        listen 80;
        server_name localhost;

        location / {
            root /usr/share/nginx/html;
            index index.html;
            try_files $uri $uri/ /index.html;
            include /etc/nginx/mime.types;

        }

        location /api/ {
            proxy_pass http://apigo:3000;
        }
    }
}
```

## Conclusiones 📙
- El uso de contenedores y compose facilitan de gran medida el despliegue de aplicaciones completas en otros dispositivos, en este caso la VM de Ubuntu Server.
- Al instalar los modulos del kernel, en algunos casos el S.O. pedira desavilitar ciertas funciones de seguridad o firmar los modulos, esto con la intencion de proteger el kernel (si no se resuelve no se insertaran los modulos, esto es algo que me generó problema a la hora del desarrollo)
- El uso de NGINX permite no poner la ruta entera a la cual se deben realizar las solicitudes de los endpoints
- El uso de port fowarding para el acceso a puertos de la VM desde el ordenador Host, facilita la visualizacion de archivos (en este caso la visualizacion de la pagina web corriendo en el pjuerto 80, ya que Ubuntu Server no cuenta con interfaz gráfica)
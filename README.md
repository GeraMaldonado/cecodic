# Plataforma de Eventos CECODIC

_Este proyecto es una plataforma para la gestión de eventos académicos y científicos, desarrollada con una arquitectura MVC en capas. El frontend utiliza Vue.js, mientras que el backend está construido con Node.js/Express y una base de datos MySQL._

## Características

- Gestión de eventos académicos y científicos.
- Interfaz de usuario amigable desarrollada con Vue.js.
- Backend robusto utilizando Node.js/Express.
- Conexión segura y eficiente con la base de datos MySQL.
- Instalador automatizado para facilitar la configuración inicial.

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Requisitos 📋

#### Previos a la instalacion del software
- Git
- Linux
  
#### Para ejecutar el software
- Node.js (versión 14 o superior) _(Se instalara en el proceso)_
- MySQL (versión 5.7 o superior) _(Se instalara en el proceso)_
- Vue CLI (versión 4 o superior) _(Se instalara en el proceso)_

### Instalación 🔧

#### Terminal
1. Clonar el repositorio y dirigirse a la carpeta del proyecto
  ```sh
  git clone https://github.com/GeraMaldonado/cecodic.git
  cd ceodic
  ```

2. Dirigete a la carpeta cecodic/instalador/ y ejecutar el instalador
  ```sh
  cd cecodic/instalador
  chmod  +x instalador.sh
  ./instalador.sh
  ```

3. Seleccionar la opcion 1 del instalador, esto instalara/actualizara npm y mysql
o tambien se puede escoger solo instalar mysql, solo crear usuario y base de datos en mysql, o crear usuario para el proyecto, la (ocpion 1 ejecutara todo).
El instalador te dara la opcion de generar un archivo .env con la informaicon que se configuró la base de datos mysql.

4. Regresar a la carpeta raiz cecodic
  ```sh
  cd ../
  ```



El `instalador.sh` permite crear un `.env` con los valores ingresados para facilitar la conexión.
Claro que este paso es opcional, se puede omitir y crear manualmente el `.env` o crear las variables de entorno

## Backend 🔩

_El backend se realizó con el lenguaje js usando el framework express, tiene por default el puerto 3000._

Para ejecutar el backend basta con ejecutar el archivo `index.js` que se encuentra en la ruta cecodic/src
  ```sh
  node src/index.js
  ```

también se puede usar el atajo de node

  ```sh
  npm run start
  ```
Esto iniciara el backend del proyecto, conectandolo con la base de datos y tambien ejecutara el deploy del frontend,
el cual se encuentra en la ruta cecodic/src/public, de esta manera bastara con ingresar a la ruta http://localhost:3000/ para ver el proyecto

## Frontend 🖼

_El frontend se realizó con el framework vue, tiene por default el puerto 5173 para la realización de pruebas._

Todo el contenido del frontend se encuentra en la ruta cecodic/src/app
Para probar y ejecutar el front de manera singular basta con la instrucción de npm

  ```sh
  npm run dev
  ```

Esto iniciará solo el frontend del proyecto de manera aislada, cuando se estén conformes con los cambios se ejecuta la instrucción
  ```sh
  npm run build
  ```
para que se compile el proyecto, esto generará archivos en la ruta cecodic/src/public, los cuales se pueden usar de manera independiente como con GitHub-Pages, o con el backend


Es importante señalar que para poder usar el frontend de manera independiente es necesario modificar el contenido de un archivo js dentro de la dirección src/app, el archivo en cuestión es `urlBackend.js`, de tal modo que apunte al backed, la dirección esta por default vacía, y se recomienda que al ya desplegar el proyecto se mantenga vacía o se use una dirección local `http://localhost:3000`.


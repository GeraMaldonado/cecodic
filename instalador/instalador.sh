#!/bin/bash

function instalarActualizarNpm() {
  sudo apt-get update
  sudo apt-get install -y npm
  npm install
  echo
  echo "***************************************************************"
  echo "*        npm y dependencias instaladas/actualizadas           *"
  echo "***************************************************************"
  echo
}

function instalarConfigurarMySQL() {
  sudo apt-get install -y mysql-server
  echo
  echo "***************************************************************"
  echo "*                  Configuración de MySQL                     *"
  echo "***************************************************************"
  sudo mysql_secure_installation
  echo
  echo "***************************************************************"
  echo "*                MySQL instalado y configurado                *"
  echo "***************************************************************"
  echo
}

function pedirContraseña() {
  read -sp "Introduce la contraseña: " password1
  echo
  read -sp "Vuelve a introducir la contraseña: " password2
  echo
  if [ "$password1" != "$password2" ]; then
    echo "Las contraseñas no coinciden. Inténtalo de nuevo."
    pedirContraseña
  elif [[ ! "$password1" =~ [^a-zA-Z0-9] ]]; then
    echo "La contraseña debe contener al menos un carácter especial."
    pedirContraseña
  elif [[ ! "$password1" =~ [A-Za-z] ]]; then
    echo "La contraseña debe contener al menos una letra."
    pedirContraseña
  elif [[ ! "$password1" =~ [0-9] ]]; then
    echo "La contraseña debe contener al menos un número."
    pedirContraseña
  elif [ ${#password1} -lt 8 ]; then
    echo "La contraseña debe tener al menos 8 caracteres."
    pedirContraseña
  else
    PASSWORD=$password1
  fi
}

function nombreBD() {
  read -p "Introduce el nombre de la base de datos (default: cecodic): " DB_NAME
  DB_NAME=${DB_NAME:-cecodic}
}

function usuarioBD() {
  read -p "Introduce el nombre del usuario de la base de datos (default: cecodic): " DB_USER
  DB_USER=${DB_USER:-cecodic}
  echo "Introduce la contraseña para el usuario de la base de datos:"
  pedirContraseña
  DB_PASSWORD=$PASSWORD
}

function crearBD() {
  nombreBD
  usuarioBD
  sudo mysql -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"
  sudo mysql -e "CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';"
  sudo mysql -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';"
  sudo mysql -e "FLUSH PRIVILEGES;"
  sudo mysql $DB_NAME < tablas.sql
  echo
  echo "***************************************************************"
  echo "*               Base de datos y usuario creados               *"
  echo "***************************************************************"
  echo
  read -p "¿Deseas crear un archivo .env? (y/n): " crearEnv
  if [ "$crearEnv" == "y" ]; then
    rutaEnv="../.env"
    echo "HOST=localhost" > $rutaEnv
    echo "DATABASE=$DB_NAME" >> $rutaEnv
    echo "DB_USER=$DB_USER" >> $rutaEnv
    echo "PASSWORD=$DB_PASSWORD" >> $rutaEnv
    echo
    echo "***************************************************************"
    echo "*                  Archivo .env creado                        *"
    echo "***************************************************************"
    echo
  fi
}

function crearUsuarioCecodic() {
  if [ -z "$DB_USER" ] || [ -z "$DB_PASSWORD" ] || [ -z "$DB_NAME" ]; then
    echo
    echo "***************************************************************"
    echo "*           Ingresar credenciales de Base de Datos            *"
    echo "***************************************************************"
    read -p "Introduce el nombre de la base de datos: " DB_NAME
    DB_NAME=${DB_NAME:-cecodic}
    read -p "Introduce el nombre del usuario de la base de datos: " DB_USER
    DB_USER=${DB_USER:-cecodic}
    echo "Introduce la contraseña para el usuario de la base de datos:"
    pedirContraseña
    DB_PASSWORD=$PASSWORD
  fi

  echo
  echo "***************************************************************"
  echo "*                  Crear usuario para CECODIC                 *"
  echo "***************************************************************"
  read -p "Introduce el nombre de usuario: " USUARIO
  read -p "Introduce el correo: " CORREO
  echo "Introduce la contraseña para el usuario:"
  pedirContraseña
  USER_PASSWORD=$PASSWORD

  HASHED_PASSWORD=$(node contrasenas.js "$USER_PASSWORD")
  if [ $? -ne 0 ]; then
    echo "Error al encriptar la contraseña."
    exit 1
  fi

  sudo mysql -u $DB_USER -p$DB_PASSWORD -e "USE $DB_NAME; INSERT INTO usuarios (usuario, correo, contrasena) VALUES ('$USUARIO', '$CORREO', '$HASHED_PASSWORD');"
  echo 
  echo "***************************************************************"
  echo "*       Usuario para CECODIC creado correctamente             *"
  echo "***************************************************************"
  echo
}

function mostrarMenu() {
  echo
  echo "Seleccione una opción:"
  echo "1. Instalar todo"
  echo "2. Instalar/Actualizar npm y dependencias"
  echo "3. Instalar y configurar MySQL"
  echo "4. Crear base de datos y usuario"
  echo "5. Crear usuario para CECODIC"
  echo "6. Salir"
}

function main() {
  while true; do
    mostrarMenu
    read -p "Opción: " opcion
    case $opcion in
      1)
        instalarActualizarNpm
        instalarConfigurarMySQL
        crearBD
        crearUsuarioCecodic
        echo "Instalacion terminada"
        echo "Saliendo..."
        exit 0
        ;;
      2)
        instalarActualizarNpm
        ;;
      3)
        instalarConfigurarMySQL
        ;;
      4)
        crearBD
        ;;
      5)
        crearUsuarioCecodic
        ;;
      6)
        echo "Saliendo..."
        exit 0
        ;;
      *)
        echo "Opción inválida. Por favor, seleccione una opción válida."
        ;;
    esac
  done
}

main

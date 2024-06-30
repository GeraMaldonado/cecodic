#!/bin/bash

# Actualizar los paquetes e instalar npm y mysql
#sudo apt-get update
#sudo apt-get install -y npm
#npm install
#sudo apt-get install -y mysql-server

# Configuración segura de MySQL
sudo mysql_secure_installation

# Funcion contraseña
function pedir_contraseña() {
  read -sp "Introduce la contraseña: " password1
  echo
  read -sp "Vuelve a introducir la contraseña: " password2
  echo

  if [ "$password1" != "$password2" ]; then
    echo "Las contraseñas no coinciden. Inténtalo de nuevo."
    pedir_contraseña
  else
    PASSWORD=$password1
  fi
}

# Pedir datos del usuario
read -p "Introduce el nombre de usuario: " USUARIO
read -p "Introduce el correo: " CORREO
pedir_contraseña

# Crear la base de datos y el usuario si no existen
sudo mysql -e "CREATE DATABASE IF NOT EXISTS cecodic;"
sudo mysql -e "CREATE USER IF NOT EXISTS 'cecodic'@'localhost' IDENTIFIED BY 'Cec@dic995533';"
sudo mysql -e "GRANT ALL PRIVILEGES ON cecodic.* TO 'cecodic'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

# Crear las tablas en la base de datos
sudo mysql cecodic < tablas.sql

# Encriptar la contraseña
HASHED_PASSWORD=$(node contrasenas.js "$PASSWORD")

# Verificar si la encriptación fue exitosa
if [ $? -ne 0 ]; then
    echo "Error al encriptar la contraseña."
    exit 1
fi

# Insertar el usuario en la base de datos
sudo mysql -u cecodic -pCec@dic995533 -e "USE cecodic; INSERT INTO usuarios (usuario, correo, contrasena) VALUES ('$USUARIO', '$CORREO', '$HASHED_PASSWORD');"

echo "Instalación completada exitosamente."

# rm tablas.sql
# rm $0


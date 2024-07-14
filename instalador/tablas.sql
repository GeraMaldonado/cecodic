-- Crear tabla eventos
CREATE TABLE IF NOT EXISTS `eventos` (
  `ideventos` bigint NOT NULL AUTO_INCREMENT,
  `titulo` text NOT NULL,
  `institucion` text NOT NULL,
  `fecha` date NOT NULL,
  `hora` time DEFAULT NULL,
  `lugar` varchar(200) DEFAULT NULL,
  `resumen` text,
  `detalles` text,
  `img` text,
  `pdf` text,
  PRIMARY KEY (`ideventos`)
);

-- Crear tabla usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `idusuarios` int NOT NULL AUTO_INCREMENT,
  `usuario` text NOT NULL,
  `correo` text NOT NULL,
  `contrasena` text NOT NULL,
  PRIMARY KEY (`idusuarios`)
);


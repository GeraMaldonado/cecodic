ALTER TABLE `eventos` ADD COLUMN `fechaFin` DATE DEFAULT NULL, ADD COLUMN `tipoEvento` VARCHAR(50) DEFAULT 'publico', ADD COLUMN `estatus` VARCHAR(20) DEFAULT 'aceptado';
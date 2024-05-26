-- -----------------------------------------------------
-- Artifact:    DDL_agromercado_v1.sql
-- Version:     1.0
-- Date:        2024-03-19 09:54:00
-- Author:      Lunar Software
-- Email:       lunar@gmail.com
-- Comments:    Se refinaron requerimientos y se 
--              redisenio la BD corrigiendo varios
--              errores de inconsistencia de los datos.
-- -----------------------------------------------------
DROP DATABASE IF EXISTS agromercado;
CREATE DATABASE agromercado;
USE agromercado ;

-- -----------------------------------------------------
-- Table usuario
-- -----------------------------------------------------

CREATE TABLE usuario 
(
  idUsuario         INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombreUsuario     VARCHAR(50) UNIQUE NOT NULL,
  contrasenia       VARCHAR(16) NOT NULL,
  correo            VARCHAR(50) NOT NULL,
  token             VARCHAR(200) NOT NULL
);

-- -----------------------------------------------------
-- Table tarjeta
-- -----------------------------------------------------

CREATE TABLE tarjeta 
(
  idTarjeta         INT PRIMARY KEY AUTO_INCREMENT,
  nombre    		VARCHAR(180),
  numeroTarjeta		VARCHAR(150),
  nombreTarjeta		VARCHAR(100),
  email      		VARCHAR(50),
  codigoPostal      VARCHAR(10),
  domicilio       	VARCHAR(50),
  ciudad            VARCHAR(50),
  pais          	VARCHAR(50),
  codigoZip         VARCHAR(50),
  mes				VARCHAR(50),
  anio				VARCHAR(50),
  cvv				VARCHAR(50)
);

-- -----------------------------------------------------
-- Table persona
-- -----------------------------------------------------

CREATE TABLE persona 
(
  idPersona         INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre            VARCHAR(45) NOT NULL,
  apellidoPaterno   VARCHAR(45) NOT NULL,
  apellidoMaterno   VARCHAR(45) NOT NULL DEFAULT '',
  genero            VARCHAR(2)  NOT NULL DEFAULT 'O', -- H: Hombre; M: Mujer; O: Otro
  fechaNacimiento   DATE NOT NULL,
  rfc               VARCHAR(15) NOT NULL DEFAULT '',
  curp              VARCHAR(19) NOT NULL DEFAULT '',
  telefono          VARCHAR(20) NOT NULL DEFAULT '',
  idUsuario			INT NOT NULL,
  idTarjeta			INT NOT NULL,
  CONSTRAINT fk_idPersona_usuario
    FOREIGN KEY (idUsuario)
    REFERENCES usuario (idUsuario),
  CONSTRAINT fk_idTarjeta_tarjeta
    FOREIGN KEY (idTarjeta)
    REFERENCES tarjeta (idTarjeta)
);

-- -----------------------------------------------------
-- Table producto
-- -----------------------------------------------------

CREATE TABLE producto 
(
  idProducto        INT PRIMARY KEY AUTO_INCREMENT,
  nombreProducto    VARCHAR(180),
  descripcion		VARCHAR(150),
  stock				INT NOT NULL DEFAULT 0,
  precioCompra      FLOAT NOT NULL DEFAULT 0.0,
  precioVenta       FLOAT NOT NULL DEFAULT 0.0,
  foto              LONGTEXT,
  rutaFoto          VARCHAR(254),
  estatus           INT NOT NULL DEFAULT 1 -- 0: Inactivo; 1: Activo;
);

-- -----------------------------------------------------
-- Table venta
-- -----------------------------------------------------

CREATE TABLE venta 
(
  idVenta       INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  fechaHora     DATETIME NOT NULL,
  estatus       INT NOT NULL DEFAULT 1, -- 0: Cancelada o Eliminada; 
                                        -- 1: Realizada; 
                                        -- 2: Pendiente;
  idPersona     INT NOT NULL,
  CONSTRAINT fk_idPersona_venta
    FOREIGN KEY (idPersona)
    REFERENCES persona (idPersona)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table detalleVenta
-- -----------------------------------------------------

CREATE TABLE detalleVenta 
(
  idProducto    INT NOT NULL,
  idVenta       INT NOT NULL,
  cantidad      INT NOT NULL,
  precioVenta   FLOAT NOT NULL,
  CONSTRAINT fk_idProducto_dv
    FOREIGN KEY (idProducto)
    REFERENCES producto (idProducto)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_idVenta_dv
    FOREIGN KEY (idVenta)
    REFERENCES venta (idVenta)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

-- -----------------------------------------------------
-- Table compra
-- -----------------------------------------------------

CREATE TABLE compra 
(
  idCompra          INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  fechaHoraPedido   DATETIME NOT NULL,
  estatus           INT NOT NULL DEFAULT 1, -- 0: La compra fue CANCELADA o ELIMINADA de forma logica; 
                                  -- 1: La compra esta PENDIENTE de ser surtida; 
                                  -- 2: La compra fue ATENDIDA y
                                  --    por consiguiente, se agregaron
                                  --    las cantidades al inventario correspondiente;
  activo            INT NOT NULL DEFAULT 1,
  idPersona        INT NOT NULL,
  CONSTRAINT fk_idPersona_compra
    FOREIGN KEY (idPersona)
    REFERENCES persona (idPersona)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table detalleCompra
-- -----------------------------------------------------

CREATE TABLE detalleCompra
(
  idCompra      INT NOT NULL,
  idProducto    INT NOT NULL,
  cantidad      INT NOT NULL,
  precioCompra  FLOAT NOT NULL,
  CONSTRAINT fk_idPedido_detalleC
    FOREIGN KEY (idCompra)
    REFERENCES compra (idCompra)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_idProducto_detalleP
    FOREIGN KEY (idProducto)
    REFERENCES producto (idProducto)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

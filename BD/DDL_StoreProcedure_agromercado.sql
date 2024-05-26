USE agromercado;

DELIMITER $$

DROP PROCEDURE IF EXISTS eliminarCompra;
CREATE PROCEDURE eliminarCompra(
    IN var_idCompra INT  -- ID de la Compra a eliminar
)
BEGIN
    DECLARE var_compraActiva INT;

    SELECT estatus INTO var_compraActiva
    FROM compra
    WHERE idCompra = var_idCompra;
    IF var_compraActiva = 1 OR 2 THEN
        UPDATE compra
        SET estatus = 0
        WHERE idCompra = var_idCompra;

    END IF;
END $$

DELIMITER ;


DELIMITER $$
DROP PROCEDURE IF EXISTS eliminarVenta;
CREATE PROCEDURE eliminarVenta(
    IN var_idVenta INT  -- ID de la Venta a eliminar
)
BEGIN
    DECLARE var_ventaActiva INT;

    SELECT estatus INTO var_ventaActiva
    FROM venta
    WHERE idVenta = var_idVenta;
    IF var_ventaActiva = 1 OR 2 THEN
        UPDATE venta
        SET estatus = 0
        WHERE idVenta = var_idVenta;

    END IF;
END $$

DELIMITER ;

DROP PROCEDURE IF EXISTS insertarProducto;
DELIMITER $$
CREATE PROCEDURE insertarProducto(
								  IN var_nombreProducto	VARCHAR(180), 		-- 1
								  IN var_descripcion VARCHAR(150),			-- 2
								  IN var_stock INT,							-- 3
								  IN var_precioCompra FLOAT,				-- 4
								  IN var_foto LONGTEXT,						-- 6
								  IN var_rutaFoto VARCHAR(254),				-- 7
								  IN var_estatus INT,						-- 8
                                  OUT var_idProducto INT					-- 9
                                 )
    BEGIN
        -- Insertamos los datos de Productos:
      INSERT INTO producto(idProducto,nombreProducto, descripcion, stock, precioCompra, foto, rutaFoto, estatus)
      VALUES(var_idProducto,var_nombreProducto, var_descripcion, var_stock, var_precioCompra, var_foto, var_rutaFoto, var_estatus);
      SET var_idProducto=LAST_INSERT_ID();

    END
$$
DELIMITER ;


DROP PROCEDURE IF EXISTS eliminarProducto;
DELIMITER $$

CREATE PROCEDURE eliminarProducto(
    IN var_idProducto INT  -- ID de la Sucursal a eliminar
)
BEGIN
    DECLARE var_productoActivo INT;

    SELECT estatus INTO var_productoActivo
    FROM producto
    WHERE idProducto = var_idProducto;
    IF var_productoActivo = 1 THEN
        UPDATE producto
        SET estatus = 0
        WHERE idProducto = var_idProducto;

    END IF;
END $$

DELIMITER ;


DROP PROCEDURE IF EXISTS calcularPrecioCarrito;
-- Stored Procedure para calcular precios y actualizar el carrito
DELIMITER //

CREATE PROCEDURE calcularPrecioCarrito(IN carrito_id INT)
BEGIN
    DECLARE total DECIMAL(10, 2);
    DECLARE producto_precio DECIMAL(10, 2);
    
    -- Calculamos el precio total de cada producto y actualizamos el detalleCarrito
    UPDATE detalleCarrito
    SET precioVenta = cantidad * (SELECT precioCompra FROM producto WHERE idProducto = detalleCarrito.idProducto)
    WHERE idCarrito = carrito_id;
    
    -- Calculamos el precio total del carrito sumando los precios de todos los productos
    SELECT SUM(precioVenta) INTO total
    FROM detalleCarrito
    WHERE idCarrito = carrito_id;
    
    -- Actualizamos el precio total del carrito
    UPDATE carrito
    SET precioTotal = total
    WHERE idCarrito = carrito_id;
END//

DELIMITER ;



DROP PROCEDURE IF EXISTS insertarTarjeta;
DELIMITER $$
CREATE PROCEDURE insertarTarjeta(
								  IN var_numeroTarjeta VARCHAR(150),			-- 1
								  IN var_nombreTarjeta VARCHAR(100),            -- 2
                                  IN var_email VARCHAR(50),						-- 3
								  IN var_codigoPostal VARCHAR(10),            	-- 4
                                  IN var_domicilio VARCHAR(50),            		-- 5
                                  IN var_ciudad VARCHAR(50),            		-- 6
                                  IN var_pais VARCHAR(50),            			-- 7
                                  IN var_mes VARCHAR(50),            			-- 8
                                  IN var_anio VARCHAR(50),            			-- 9
                                  IN var_cvv VARCHAR(50),	            		-- 10
                                  IN var_idPersona INT,							-- 11
                                  OUT var_idTarjeta INT							-- 12
                                 )
 BEGIN
        -- Insertamos los datos de Productos:
      INSERT INTO tarjeta(idTarjeta, numeroTarjeta, nombreTarjeta, email, codigoPostal, domicilio, ciudad, pais, mes, anio, cvv, idPersona)
      VALUES(var_idTarjeta, var_numeroTarjeta, var_nombreTarjeta, var_email, var_codigoPostal, var_domicilio, var_ciudad, var_pais, var_mes, var_anio,var_cvv, var_idPersona);
      SET var_idTarjeta=LAST_INSERT_ID();
    END
$$
DELIMITER ;


DROP PROCEDURE IF EXISTS insertarPersona;
DELIMITER $$
CREATE PROCEDURE insertarPersona(
    /* Datos de Persona */
    IN  var_nombre           VARCHAR(45),    --  1
    IN  var_apellidoPaterno  VARCHAR(45),    --  2
    IN  var_apellidoMaterno  VARCHAR(45),    --  3
    IN  var_genero           VARCHAR(2),     --  4
    IN  var_fechaNacimiento  VARCHAR(10),    --  5
    IN  var_rfc              VARCHAR(15),    --  6
    IN  var_curp             VARCHAR(19),    --  7
    IN  var_telefono         VARCHAR(20),    --  8
    /* Datos del Usuario */
    IN  var_nombreUsuario    VARCHAR(50),    -- 9
    IN  var_contrasenia      VARCHAR(16),    -- 10
    IN  var_correo           VARCHAR(50),    -- 11
    IN  var_token            VARCHAR(200),   -- 12
    /* Parametros de Salida */
    OUT var_idPersona        INT,            -- 13
    OUT var_idUsuario        INT             -- 14
)
BEGIN
    DECLARE last_id INT;

    -- Insertamos los datos del Usuario
    INSERT INTO usuario(nombreUsuario, contrasenia, correo, token)
    VALUES(var_nombreUsuario, var_contrasenia, var_correo, var_token);
    
    -- Obtenemos el último idUsuario insertado
    SELECT LAST_INSERT_ID() INTO var_idUsuario;

    -- Comenzamos insertando los datos de la Persona:
    INSERT INTO persona (nombre, apellidoPaterno, apellidoMaterno, genero,
                         fechaNacimiento, rfc, curp, telefono, idUsuario)
    VALUES (var_nombre, var_apellidoPaterno, var_apellidoMaterno, 
            var_genero, STR_TO_DATE(var_fechaNacimiento, '%Y-%m-%d'),
            var_rfc, var_curp, var_telefono, var_idUsuario);

    -- Obtenemos el ID de Persona que se generó:
    SELECT LAST_INSERT_ID() INTO var_idPersona; 
END
$$
DELIMITER ;
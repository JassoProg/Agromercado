USE agromercado;

DROP VIEW IF EXISTS v_persona;
CREATE VIEW v_persona AS
    SELECT  
            P.idPersona,
			P.nombre,
            P.apellidoPaterno,
            P.apellidoMaterno,
            P.genero,
            P.fechaNacimiento,
            P.rfc,
            P.curp,
            P.telefono,
            U.idUsuario,
            U.nombreUsuario,
            U.contrasenia,
            U.correo,
            U.token,
            T.idTarjeta,
            T.numeroTarjeta,
			T.nombreTarjeta,
			T.email,
			T.domicilio,
			T.ciudad,
			T.pais,
			T.codigoZip,
			T.mes,
			T.anio,
			T.cvv
    FROM    persona P
            INNER JOIN  tarjeta  T ON T.idTarjeta = P.idTarjeta 
            INNER JOIN  usuario  U ON U.idUsuario = P.idUsuario;
            
SELECT * FROM v_persona;


-- PRODUCTO ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            
CREATE VIEW v_producto AS
			SELECT
				P.idProducto, 
				P.nombreProducto AS nombreProducto, 
				P.descripcion, 
				P.stock, 
				P.precioCompra, 
				P.precioVenta, 
				P.foto, 
				P.rutaFoto, 
				P.estatus
            FROM producto P;
            
SELECT * FROM v_producto;


CREATE VIEW v_compra AS
    SELECT  
            C.idCompra,
            DATE_FORMAT(C.fechaHoraPedido, '%Y-%m-%d %H:%i:%s') AS fechaHoraPedido,
            C.estatus,
            C.activo,
            C.idPersona,
            DC.idProducto,
            DC.cantidad,
            DC.precioCompra
    FROM    compra C
            INNER JOIN  detalleCompra DC ON DC.idCompra = C.idCompra;
            
SELECT * FROM v_compra;


CREATE VIEW v_venta AS
    SELECT  
            V.idVenta,
            DATE_FORMAT(V.fechaHora, '%Y-%m-%d %H:%i:%s') AS fechaHora,
            V.estatus,
            V.idPersona,
            DV.idProducto,
            DV.cantidad,
            DV.precioVenta
    FROM    venta V
            INNER JOIN  detalleVenta DV ON DV.idVenta = V.idVenta;
            
SELECT * FROM v_venta; 



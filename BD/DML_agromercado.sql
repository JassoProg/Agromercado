USE agromercado;

INSERT INTO usuario(idUsuario, nombreUsuario, contrasenia,correo,token)
VALUES(1,"Administrador","Administrador","admin@gmail.com","tokenPrueba");

INSERT INTO tarjeta(idTarjeta, nombre, numeroTarjeta, nombreTarjeta, email, domicilio,
					ciudad, pais, codigoZip, mes, anio, cvv)
			VALUES(1, "Fabian", "123569874512", "Santnader", "fabian@gmail.com", "Manantiales",
					"León", "México", "LFAR041801DSD", "Marzo", "2024", "458");
                    
INSERT INTO persona(nombre, apellidoPaterno, apellidoMaterno, genero, fechaNacimiento, rfc,
					curp, telefono, idUsuario, idTarjeta)
			VALUES("Henry Martin", "Quiñones", "Leiva", "H",  STR_TO_DATE('01/01/1901', '%d/%m/%Y'), "AKAKAKAK",
					"AKAKAKAKKA", "4772569689", 1, 1);

INSERT INTO producto(nombreProducto, descripcion, stock, precioCompra, precioVenta,
					 foto, rutaFoto, estatus)
			 VALUES("Frijoles", "Muy buenos", 10, 50.20, 65.50, "", "", 1);
             
let tarjeta = [];



//refreshCompra();
refreshTarjeta();
let nombreUsuario = localStorage.getItem('usuario');


// Si el nombre de usuario está disponible, enviar una solicitud a la API para obtener los datos de la persona asociada a ese nombre de usuario
if (nombreUsuario) {
    obtenerDatosPersona(nombreUsuario);
}

async function obtenerDatosPersona(nombreUsuario) {
    try {
        // URL de la API para obtener los datos de la persona por nombre de usuario
        let url = `http://localhost:8090/AgromercadoBackend/api/usuario/getPersona?nombreUsuario=${nombreUsuario}`;

        // Realizar la solicitud a la API
        let respuesta = await fetch(url);
        let datos = await respuesta.json();

        // Verificar si hay algún error en la respuesta
        if (datos.error) {
            throw new Error(datos.error);
        }

        // Rellenar el formulario con los datos de la persona obtenidos de la respuesta
        document.getElementById('txtNombreUsuario').value = datos.usuario.nombreUsuario;
        document.getElementById('txtCorreo').value = datos.usuario.correo;
        document.getElementById('txtContrasenia').value = datos.usuario.contrasenia;
        document.getElementById('txtNombre').value = datos.nombre;
        document.getElementById('txtApellidoPaterno').value = datos.apellidoPaterno;
        document.getElementById('txtApellidoMaterno').value = datos.apellidoMaterno;
        document.getElementById('txtGenero').value = datos.genero;
        document.getElementById('txtFechaNacimiento').value = datos.fechaNacimiento;
        document.getElementById('txtRFC').value = datos.rfc;
        document.getElementById('txtCURP').value = datos.curp;
        document.getElementById('txtTelefono').value = datos.telefono;

    } catch (error) {
        console.error(error);
        // Manejar el error, mostrar un mensaje al usuario, etc.
    }
}


/*async function refreshCompra()
{
    let url = "http://localhost:8090/AgromercadoBackend/api/compra/getAll";
    let resp = await fetch(url);
    let datos = await resp.json();
    if (datos.error != null)
    {
        Swal.fire('', datos.error, 'warning');
        return;
    }
    if (datos.exception != null)
    {
        Swal.fire('', datos.exception, 'danger');
    }

    tarjeta = datos;
    
    fillTableCompra();
}*/

/*function fillTableCompra()
{
    //Aqui vamos a ir guardando el contenido del
    //tbody de la tabla de compra:
    let contenido = '';
    
    
    //Recorremos el arreglo elemento por elemento:
    for (let i = 0; i < tarjeta.length; i++)
    {
    
        contenido += '<tr>' +
                '<td>' + tarjeta[i].producto.idProducto + '</td>' +
                '<td>' + tarjeta[i].fechaHoraPedido + '</td>' +
                '<td>' + tarjeta[i].cantidad + '</td>' +
                '<td>' + tarjeta[i].precioCompra + '</td>' +
                '</tr>';
    }
    
 
    document.getElementById("tbodyCompra").innerHTML = contenido;
}*/

function mostrarContrasenia(event) {
    event.preventDefault();
    let contraseniaInput = document.getElementById('txtContrasenia');
    let toggleIcon = document.getElementById('togglePassword');
    
    if (contraseniaInput.type === 'password') {
        contraseniaInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        contraseniaInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}


async function refreshTarjeta() {
    // Obtener el idPersona almacenado en el LocalStorage
    let idPersona = localStorage.getItem('idUsuario');

    // Verificar si se obtuvo el idPersona correctamente
    if (!idPersona) {
        console.error('No se pudo obtener el idPersona');
        return;
    }

    // Construir la URL del endpoint getAll con el idPersona
    let url = `http://localhost:8090/AgromercadoBackend/api/tarjeta/getAll?idPersona=${idPersona}`;

    try {
        // Realizar la solicitud al API
        let resp = await fetch(url);
        let datos = await resp.json();

        // Verificar si hay algún error en la respuesta
        if (datos.error) {
            throw new Error(datos.error);
        }

        // Llenar la tabla con los datos de las tarjetas
        fillTableTarjeta(datos);
    } catch (error) {
        console.error(error);
        Swal.fire('', error.message, 'warning'); // Mostrar mensaje de error al usuario si ocurre algún problema
    }
}

function fillTableTarjeta(tarjetas)
{
    //Aqui vamos a ir guardando el contenido del
    //tbody de la tabla de compra:
    let contenido = '';
    
    
    //Recorremos el arreglo elemento por elemento:
    for (let i = 0; i < tarjetas.length; i++)
    {
    
        contenido += '<tr>' +
                '<td>' + tarjetas[i].nombreTarjeta + '</td>' +
                '<td>' + tarjetas[i].numeroTarjeta + '</td>' +
                '<td>' + tarjetas[i].email + '</td>' +
                '<td>' + tarjetas[i].domicilio + '</td>' +
                '<td>' + tarjetas[i].ciudad + '</td>' +
                '</tr>';
    }
    
 
    document.getElementById("tbodyTarjeta").innerHTML = contenido;
}

fillTableCompraRealizada();
function fillTableCompraRealizada() {
    // Obtener todas las compras realizadas del localStorage
    const comprasRealizadasJSON = localStorage.getItem('comprasRealizadas');

    // Verificar si hay datos en el localStorage
    if (!comprasRealizadasJSON) {
        console.error('No hay datos de compras realizadas en el localStorage');
        return;
    }

    try {
        // Parsear los datos de todas las compras realizadas del formato JSON
        const comprasRealizadas = JSON.parse(comprasRealizadasJSON);

        // Obtener el tbody de la tabla de compras
        const tbodyCompra = document.getElementById("tbodyCompra");

        // Limpiar el contenido anterior de la tabla
        tbodyCompra.innerHTML = '';

        // Iterar sobre todas las compras realizadas para crear filas en la tabla
        comprasRealizadas.forEach(compra => {
            // Crear una fila para la tabla con los datos de la compra actual
            const filaCompra = `
                <tr>
                    <td>${compra.fecha}</td>
                    <td>${compra.tarjeta}</td>
                    <td>${compra.precioTotal}</td>
                </tr>
            `;
            // Agregar la fila a la tabla de compras
            tbodyCompra.innerHTML += filaCompra;
        });
    } catch (error) {
        console.error('Error al parsear los datos de compras realizadas:', error);
        // Manejar el error, mostrar un mensaje al usuario, etc.
    }
}

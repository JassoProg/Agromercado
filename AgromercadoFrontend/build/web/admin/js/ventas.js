let inputFileFotoProducto;


inputFileFotoProducto = document.getElementById("inputFileFotoProducto");
inputFileFotoProducto.onchange = (evt) => {
    cargarFotografia(inputFileFotoProducto);
};
saveProducto(event);
saveTarjeta(event);


const tarjeta = document.querySelector('#tarjeta'),
        btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
        formulario = document.querySelector('#formulario-tarjeta'),
        numeroTarjeta = document.querySelector('#tarjeta .numero'),
        nombreTarjeta = document.querySelector('#tarjeta .nombre'),
        logoMarca = document.querySelector('#logo-marca'),
        firma = document.querySelector('#tarjeta .firma p'),
        mesExpiracion = document.querySelector('#tarjeta .mes'),
        yearExpiracion = document.querySelector('#tarjeta .year');
ccv = document.querySelector('#tarjeta .ccv');

// * Volteamos la tarjeta para mostrar el frente.
const mostrarFrente = () => {
    if (tarjeta.classList.contains('active')) {
        tarjeta.classList.remove('active');
    }
}

// * Rotacion de la tarjeta
tarjeta.addEventListener('click', () => {
    tarjeta.classList.toggle('active');
});

// * Boton de abrir formulario
btnAbrirFormulario.addEventListener('click', () => {
    btnAbrirFormulario.classList.toggle('active');
    formulario.classList.toggle('active');
});

// * Select del mes generado dinamicamente.
for (let i = 1; i <= 12; i++) {
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectMes.appendChild(opcion);
}

// * Select del año generado dinamicamente.
const yearActual = new Date().getFullYear();
for (let i = yearActual; i <= yearActual + 8; i++) {
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectYear.appendChild(opcion);
}

// * Input numero de tarjeta
formulario.txtNumeroTarjeta.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.txtNumeroTarjeta.value = valorInput
            // Eliminamos espacios en blanco
            .replace(/\s/g, '')
            // Eliminar las letras
            .replace(/\D/g, '')
            // Ponemos espacio cada cuatro numeros
            .replace(/([0-9]{4})/g, '$1 ')
            // Elimina el ultimo espaciado
            .trim();

    numeroTarjeta.textContent = valorInput;

    if (valorInput == '') {
        numeroTarjeta.textContent = '#### #### #### ####';

        logoMarca.innerHTML = '';
    }

    if (valorInput[0] == 4) {
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = '../../media/img/visa.png';

        logoMarca.appendChild(imagen);
    } else if (valorInput[0] == 5) {
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = '../../media/img/mastercard.png';
        logoMarca.appendChild(imagen);
    }

    // Volteamos la tarjeta para que el usuario vea el frente.
    mostrarFrente();
});

// * Input nombre de tarjeta
formulario.txtNombreTarjeta.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.txtNombreTarjeta.value = valorInput.replace(/[0-9]/g, '');
    nombreTarjeta.textContent = valorInput;
    firma.textContent = valorInput;

    if (valorInput == '') {
        nombreTarjeta.textContent = 'Jhon Doe';
    }

    mostrarFrente();
});

// * Select mes
formulario.selectMes.addEventListener('change', (e) => {
    mesExpiracion.textContent = e.target.value;
    mostrarFrente();
});

// * Select Año
formulario.selectYear.addEventListener('change', (e) => {
    yearExpiracion.textContent = e.target.value.slice(2);
    mostrarFrente();
});

// * CCV
formulario.txtCVV.addEventListener('keyup', () => {
    if (!tarjeta.classList.contains('active')) {
        tarjeta.classList.toggle('active');
    }

    formulario.txtCVV.value = formulario.txtCVV.value
            // Eliminar los espacios
            .replace(/\s/g, '')
            // Eliminar las letras
            .replace(/\D/g, '');

    ccv.textContent = formulario.txtCVV.value;
});

// * Input email
formulario.txtEmail.addEventListener('keyup', (e) => {
    let valorInput = e.target.value.trim();
    if (valorInput.length > 40) {
        formulario.txtEmail.value = valorInput.slice(0, 40);
    }
});

// * Input domicilio
formulario.txtDomicilio.addEventListener('keyup', (e) => {
    let valorInput = e.target.value.trim();
    // Utilizamos una expresión regular para permitir letras y números
    valorInput = valorInput.replace(/[^a-zA-Z0-9\s]/g, '');
    if (valorInput.length > 40) {
        formulario.txtDomicilio.value = valorInput.slice(0, 40);
    }
});

// * Input código postal
formulario.txtCodigoPostal.addEventListener('keyup', (e) => {
    let valorInput = e.target.value.trim();
    // Utilizamos una expresión regular para permitir solo números y limitamos a 5 caracteres
    formulario.txtCodigoPostal.value = valorInput.replace(/\D/g, '').slice(0, 5);
});

// * Input ciudad y país
formulario.txtCiudad.addEventListener('keyup', (e) => {
    let valorInput = e.target.value.trim();
    // Utilizamos una expresión regular para permitir solo letras y limitamos a 40 caracteres
    formulario.txtCiudad.value = valorInput.replace(/[^a-zA-Z\s]/g, '').slice(0, 40);
});

formulario.txtPais.addEventListener('keyup', (e) => {
    let valorInput = e.target.value.trim();
    // Utilizamos una expresión regular para permitir solo letras y limitamos a 40 caracteres
    formulario.txtPais.value = valorInput.replace(/[^a-zA-Z\s]/g, '').slice(0, 40);
});

// * Input código ZIP
formulario.txtCodigoZip.addEventListener('keyup', (e) => {
    let valorInput = e.target.value.trim();
    // Utilizamos una expresión regular para permitir solo números y limitamos a 5 caracteres
    formulario.txtCodigoZip.value = valorInput.replace(/\D/g, '').slice(0, 5);
});


function cargarFotografia(objetoInputFile)
{
    //Revisamos que el usuario haya seleccionado un archivo:
    if (objetoInputFile.files && objetoInputFile.files[0])
    {
        let reader = new FileReader();



        //Agregamos un oyente al lector del archivo para que,
        //en cuanto el usuario cargue una imagen, esta se lea
        //y se convierta de forma automatica en una cadena de Base64:
        reader.onload = function (e)
        {
            //TAREA: LEER SOBRE EL ALGORITMO BASE 64

            let fotoB64 = e.target.result;
            document.getElementById("imgFoto").src = fotoB64;
            document.getElementById("txtaCodigoImagen").value =
                    fotoB64.substring(fotoB64.indexOf(",") + 1, fotoB64.length);
        };



        //Leemos el archivo que selecciono el usuario y lo
        //convertimos en una cadena con la Base64:
        reader.readAsDataURL(objetoInputFile.files[0]);
    }
}

async function mostrarDialogoFotografia() {
    document.getElementById("inputFileFotoProducto").click();
}


async function validarCamposProducto() {
    const nombreProducto = document.getElementById("txtNombreProducto").value.trim();
    const descripcion = document.getElementById("txtDescripcion").value.trim();
    const cantidad = document.getElementById("txtCantidad").value.trim();
    const precioCompra = document.getElementById("txtPrecioCompra").value.trim();
    const estatus = document.getElementById("cmbEstatus").value.trim();
    const fotoProducto = document.getElementById("inputFileFotoProducto").value.trim();

    if (nombreProducto === '') {
        Swal.fire('Error', 'Por favor ingrese el nombre del producto.', 'error');
        return false;
    }

    if (descripcion === '') {
        Swal.fire('Error', 'Por favor ingrese la descripción del producto.', 'error');
        return false;
    }

    if (cantidad === '') {
        Swal.fire('Error', 'Por favor ingrese la cantidad disponible del producto.', 'error');
        return false;
    }

    if (precioCompra === '') {
        Swal.fire('Error', 'Por favor ingrese el precio de compra del producto.', 'error');
        return false;
    }

    if (estatus === '') {
        Swal.fire('Error', 'Por favor seleccione el estatus del producto.', 'error');
        return false;
    }

    if (fotoProducto === '') {
        Swal.fire('Error', 'Por favor seleccione una imagen para el producto.', 'error');
        return false;
    }

    // Si todos los campos requeridos están llenos, retorna verdadero
    return true;
}


async function saveProducto(event) {
    event.preventDefault();
    
    const camposValidos = await validarCamposProducto();
    
    if (!camposValidos) {
        return; // Si los campos no son válidos, detenemos el proceso de guardado
    }
    
    let url = "http://localhost:8090/AgromercadoBackend/api/producto/save";
    let params = null;
    let resp = null;
    let datos = null;

    //UN OBJETO DONDE GUARDEMOS LOS DATOS DEL CLIENTE:
    let producto = null;
    producto = new Object();

    producto.nombreProducto = document.getElementById("txtNombreProducto").value;
    producto.descripcion = document.getElementById("txtDescripcion").value;
    producto.stock = document.getElementById("txtCantidad").value;
    producto.precioCompra = document.getElementById("txtPrecioCompra").value;
    producto.estatus = document.getElementById("cmbEstatus").value;
    producto.rutaFoto = document.getElementById("inputFileFotoProducto").value;
    producto.foto = document.getElementById("txtaCodigoImagen").value;



    // Declaramos un objeto donde guardaremos los datos del producto:


    params = {
        datosProducto: JSON.stringify(producto)
    };

    let ctype = 'application/x-www-form-urlencoded;charset=UTF-8';
    // Realizamos la solicitud POST para registrar el producto
    resp = await fetch(url,
            {
                method: "POST",
                headers: {
                    'Content-Type': ctype
                },
                body: new URLSearchParams(params)
            });

    datos = await resp.json();
    console.log(params);

    if (datos.error != null)
    {
        Swal.fire('Error al guardar los datos del producto.', datos.error, 'warning');
        return;
    }
    if (datos.exception != null)
    {
        Swal.fire('', datos.exception, 'danger');
        return;
    }
    
    Swal.fire('Movimiento Realizado', 'Datos de Producto Actualizados correctamente.', 'success');

}

async function validarCamposTarjeta() {
    const numeroTarjeta = document.getElementById("txtNumeroTarjeta").value.trim();
    const nombreTarjeta = document.getElementById("txtNombreTarjeta").value.trim();
    const email = document.getElementById("txtEmail").value.trim();
    const domiclio = document.getElementById("txtDomicilio").value.trim();
    const codigoPostal = document.getElementById("txtCodigoPostal").value.trim();
    const ciudad = document.getElementById("txtCiudad").value.trim();
    const pais = document.getElementById("txtPais").value.trim();
    const cvv = document.getElementById("txtCVV").value.trim();

    if (numeroTarjeta === '') {
        Swal.fire('Error', 'Por favor ingrese el numero de tarjeta', 'error');
        return false;
    }

    if (nombreTarjeta === '') {
        Swal.fire('Error', 'Por favor ingrese el nombre de la tarjeta.', 'error');
        return false;
    }

    if (email === '') {
        Swal.fire('Error', 'Por favor ingrese la email.', 'error');
        return false;
    }

    if (domiclio === '') {
        Swal.fire('Error', 'Por favor ingrese el domicilio.', 'error');
        return false;
    }

    if (codigoPostal === '') {
        Swal.fire('Error', 'Por favor ingrese el codigo postal.', 'error');
        return false;
    }

    if (ciudad === '') {
        Swal.fire('Error', 'Por favor ingrese la ciudad.', 'error');
        return false;
    }
    if (pais === '') {
        Swal.fire('Error', 'Por favor ingrese un país', 'error');
        return false;
    }
    if (cvv === '') {
        Swal.fire('Error', 'Por favor ingrese el cvv', 'error');
        return false;
    }

    // Si todos los campos requeridos están llenos, retorna verdadero
    return true;
}


async function saveTarjeta(event) {
    event.preventDefault();
    const camposValidos = await validarCamposTarjeta();
    
    if (!camposValidos) {
        return; // Si los campos no son válidos, detenemos el proceso de guardado
    }
    
    
    let url = "http://localhost:8090/AgromercadoBackend/api/tarjeta/save";
    let params = null;
    let resp = null;
    let datos = null;
    
    let idUsuario = localStorage.getItem('idUsuario');
    //UN OBJETO DONDE GUARDEMOS LOS DATOS DEL CLIENTE:
    let tarjeta = null;
    tarjeta = new Object();
    tarjeta.persona = {}; // Inicializar el objeto persona
    
    // Declaramos un objeto donde guardaremos los datos de la tarjeta:

    tarjeta.numeroTarjeta = document.getElementById("txtNumeroTarjeta").value;
    tarjeta.nombreTarjeta = document.getElementById("txtNombreTarjeta").value;
    tarjeta.email = document.getElementById("txtEmail").value;
    tarjeta.codigoPostal = document.getElementById("txtCodigoPostal").value;
    tarjeta.domicilio = document.getElementById("txtDomicilio").value;
    tarjeta.ciudad = document.getElementById("txtCiudad").value;
    tarjeta.pais = document.getElementById("txtPais").value;
    tarjeta.mes = document.getElementById("selectMes").value;
    tarjeta.anio = document.getElementById("selectYear").value;
    tarjeta.cvv = document.getElementById("txtCVV").value;
    tarjeta.persona.idPersona = idUsuario; 


    params = {
        datosTarjeta: JSON.stringify(tarjeta)
    };

    let ctype = 'application/x-www-form-urlencoded;charset=UTF-8';
    // Realizamos la solicitud POST para registrar el producto
    resp = await fetch(url,
            {
                method: "POST",
                headers: {
                    'Content-Type': ctype
                },
                body: new URLSearchParams(params)
            });

    datos = await resp.json();
    console.log(params);

    if (datos.error != null)
    {
        Swal.fire('Error al guardar los datos de la tarjeta.', datos.error, 'warning');
        return;
    }
    if (datos.exception != null)
    {
        Swal.fire('', datos.exception, 'danger');
        return;
    }

    Swal.fire('Movimiento Realizado', 'Datos de Tarjeta Actualizados correctamente.', 'success');
}


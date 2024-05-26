//Script de JavaScript
//Usuario para entrar: Administrador, Contraseña: Administrador

let usuario = [];
// Insertar nuevo usuario-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function save(token)
{
    //Declaramos variables.
    let url = "http://localhost:8090/AgromercadoBackend/api/usuario/save";
    let params = null;
    let resp = null;
    let datos = null;

    //UN OBJETO DONDE GUARDEMOS LOS DATOS DEL USUARIO:
    let per = null;


    //Creamos una nueva instancia del Objeto:

    per = new Object();
    per.usuario = new Object();

    //Inicio de Validación
    // Validar campos en blanco
    if (!validarCamposEnBlanco()) {
        Swal.fire('Campos en blanco', 'Favor de completar todos los campos', 'warning');
        return;
    }

    // Validar nombre
    const nombre = document.getElementById("txtNombre").value;
    if (!validarNombre(nombre) || !comienzaConMayuscula(nombre)) {
        Swal.fire('Nombre inválido', 'El nombre no debe contener caracteres especiales, ni números y debe comenzar con mayúscula.', 'warning');
        return;
    }

    // Validar apellidos
    const apellidoPaterno = document.getElementById("txtApellidoPaterno").value;
    const apellidoMaterno = document.getElementById("txtApellidoMaterno").value;
    if (!validarApellidos(apellidoPaterno) || !validarApellidos(apellidoMaterno) ||
            !comienzaConMayuscula(apellidoPaterno) || !comienzaConMayuscula(apellidoMaterno)) {
        Swal.fire('Apellidos inválidos', 'Los apellidos no deben contener caracteres especiales, espacios ni números y deben comenzar con mayúscula.', 'warning');
        return;
    }

    // Validar correo electrónico
    const correo = document.getElementById("txtCorreo").value;
    if (!validarEmail(correo)) {
        Swal.fire('Correo electrónico inválido', 'Ingrese un correo electrónico válido.', 'warning');
        return;
    }

    // Validar RFC
    const rfc = document.getElementById("txtRfc").value;
    if (!validarRFC(rfc)) {
        Swal.fire('RFC inválido', 'El RFC debe contener al menos 10 o 13 caracteres alfanuméricos.', 'warning');
        return;
    }

    // Validar CURP
    const curp = document.getElementById("txtCurp").value;
    if (!validarCURP(curp)) {
        Swal.fire('CURP inválido', 'La CURP debe tener por lo menos 18 caracteres alfanuméricos.', 'warning');
        return;
    }
    // Validar teléfono
    const telefono = document.getElementById("txtTelefono").value;
    if (!validarTelefono(telefono)) {
        Swal.fire('Teléfono inválido', 'El teléfono debe comenzar con "477" seguido de 7 dígitos adicionales.', 'warning');
        return;
    }

    //Fin de valicación 

    //CONTINUAMOS LLENANDO LOS DATOS DEL OBJETO.
    //DATOS DE PERSONA:
    per.nombre = document.getElementById("txtNombre").value;
    per.apellidoPaterno = document.getElementById("txtApellidoPaterno").value;
    per.apellidoMaterno = document.getElementById("txtApellidoMaterno").value;
    per.genero = document.getElementById("cmbGenero").value;
    per.fechaNacimiento = document.getElementById("txtFechaNacimiento").value;
    per.rfc = document.getElementById("txtRfc").value;
    per.curp = document.getElementById("txtCurp").value;
    per.telefono = document.getElementById("txtTelefono").value;

    //DATOS DEL USUARIO:
    per.usuario.nombreUsuario = document.getElementById("txtNombreUsuario").value;
    per.usuario.contrasenia = document.getElementById("txtNuevaContrasenia").value;
    per.usuario.correo = document.getElementById("txtCorreo").value;
    per.usuario.token = token;

    params = {
        datosUsuario: JSON.stringify(per)
    };

    let ctype = 'application/x-www-form-urlencoded;charset=UTF-8';
    resp = await fetch(url,
            {
                method: "POST",
                headers: {'Content-Type': ctype},
                body: new URLSearchParams(params)
            });

    datos = await resp.json();

    if (datos.error != null)
    {
        Swal.fire('Error al guardar los datos del usuario.', datos.error, 'warning');
        return;
    }
    if (datos.exception != null)
    {
        Swal.fire('', datos.exception, 'danger');
        return;
    }
    limpiarCamposRegistro();
    Swal.fire('Movimiento Realizado', 'Datos de Usuario Actualizados correctamente.', 'success');
}
// Fin de insertar nuevo usuario --------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Generar Token de usuario ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function generarToken() {
    var usuario = document.getElementById("txtNombreUsuario").value;

    try {
        // Realizar la llamada al servicio REST
        const response = await fetch('http://localhost:8090/AgromercadoBackend/api/login/gen?nombreU=' + usuario);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();


        if (data && data.error) {
            alert("Error: " + data.error);
        } else if (data) {
            //alert("Token generado: " + data);
            //localStorage.setItem('usuario', usuario);
            //localStorage.setItem('contrasena', document.getElementById("txtContrasenia").value);
            localStorage.setItem('token', data);
            await save(data);
        } else {
            alert("Error: No se recibió data del servicio");
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
// Fin de Generación de Token ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Funcion para limpiar los campos de registro
function limpiarCamposRegistro()
{
    // Datos de Usuario:
    document.getElementById("txtNombreUsuario").value = '';
    document.getElementById("txtNuevaContrasenia").value = '';
    document.getElementById("txtCorreo").value = '';

    // Datos de Persona:
    document.getElementById("txtNombre").value = '';
    document.getElementById("txtApellidoPaterno").value = '';
    document.getElementById("txtApellidoMaterno").value = '';
    document.getElementById("cmbGenero").value = '';
    document.getElementById("txtFechaNacimiento").value = '';
    document.getElementById("txtRfc").value = '';
    document.getElementById("txtCurp").value = '';
    document.getElementById("txtTelefono").value = '';
}
// Fin de funcion para limpiar los campos de registro

// Espacio para formato de las validaciones --------------------------------------------------------------------------------------------------------------------------------------------------------------
function validarNombre(nombre) {
    return  /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/.test(nombre);
}

function validarApellidos(apellido) {
    return /^[A-Za-z]+$/.test(apellido);
}

function validarEmail(correo) {
    // Expresión regular para validar el formato del correo electrónico
    const formatoCorrecto = /^\w+([.-_+]?\w+)@\w+([.-]?\w+)(\.\w{2,10})+$/.test(correo);
    return formatoCorrecto;
}

function validarTelefono(telefono) {
    // Expresión regular para validar que el teléfono tenga 10 dígitos y solo contenga números
    const formatoCorrecto = /^\d{10}$/.test(telefono);
    return formatoCorrecto;
}

function validarCamposEnBlanco() {
    // Array con los IDs de los campos que deben validarse
    const camposAValidar = ["txtNombreUsuario", "txtCorreo",
        "txtNuevaContrasenia", "txtNombre", "txtApellidoPaterno",
        "txtApellidoMaterno", "cmbGenero", "txtFechaNacimiento",
        "txtRfc", "txtCurp", "txtTelefono"];

    // Verificar que ningún campo esté en blanco
    for (const campoId of camposAValidar) {
        const valorCampo = document.getElementById(campoId).value.trim();
        if (valorCampo === '') {
            return false;
        }
    }
    return true;
}

function comienzaConMayuscula(cadena) {
    return /^[A-Z]/.test(cadena);
}

function validarRFC(rfc) {
    // Expresión regular para validar el RFC
    // Debe contener al menos 10 o 13 caracteres alfanuméricos
    const formatoCorrecto = /^[A-Za-z0-9]{10,13}$/.test(rfc);
    return formatoCorrecto;
}

function validarCURP(curp) {
    // Expresión regular para validar el CURP
    // Debe tener por lo menos 18 caracteres
    const formatoCorrecto = /^[A-Za-z0-9]{18,}$/.test(curp);
    return formatoCorrecto;
}

function validarTelefono(telefono) {
    // Expresión regular para validar el teléfono
    // Los primeros 3 dígitos deben ser 477
    const formatoCorrecto = /^477\d{7}$/.test(telefono);
    return formatoCorrecto;
}
// Fin de formato de las validaciones ---------------------------------------------------------------------------------------------------------------------------------------------------------------------


// Inicio de Login------------------------------------------------------------------------------------------

async function login() {
    let url = "http://localhost:8090/AgromercadoBackend/api/login/validar?";
    let usu = document.getElementById("txtUsuario").value;
    let contrasenia = document.getElementById("txtContrasenia").value;
    let resp = null;
    let data = null;

    url += "usuario=" + usu + "&password=" + contrasenia;

    resp = await fetch(url);
    data = await resp.json();

    if (data.exception != null) {
        Swal.fire('', 'Ocurri&oacute;o un error interno. Intente m&aacute;s tarde.', 'danger');
        return;
    }
    if (data.error != null) {
        Swal.fire('Error', data.error, 'warning');
        return;
    }

    // Guardar el token en localStorage
    localStorage.setItem('usuario', data.nombreUsuario);
    localStorage.setItem('token', data.token);
    localStorage.setItem('idUsuario', data.idUsuario);

    window.location.replace('principal.html');


}

function mostrarContrasenia(event) {
    event.preventDefault();
    let contraseniaInput = document.getElementById('txtNuevaContrasenia');
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
// Fin de Login
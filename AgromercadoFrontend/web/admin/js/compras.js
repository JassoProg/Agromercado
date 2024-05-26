document.addEventListener("DOMContentLoaded", function () {
    // Obtener los productos del carrito desde localStorage
    let productosEnCompras = JSON.parse(localStorage.getItem('productosEnCompras')) || [];
    // Renderizar los productos en el contenedor de compras
    renderizarProductosEnCompra(productosEnCompras);
});

function renderizarProductosEnCompra(productosEnCompras) {
    let htmlProductos = '';
    productosEnCompras.forEach(function (producto, index) {
        htmlProductos += `
            <div class="card" data-id="${producto.id}">
                <div class="compra-image">
                    <img src="data:image/png;base64,${producto.foto}" alt="${producto.nombreProducto}" />
                </div>
                <div class="compra-details">
                    <h3>${producto.nombreProducto}</h3>
                    <p>Descripción: ${producto.descripcion}</p>
                    <p>Precio: $${producto.precioCompra}</p>
                    <p>Stock: ${producto.stock}</p>
                    <input type="number" min="1" max="${producto.stock}" value="1" class="cantidad-input">
                    <button class="eliminar-btn" data-id="${producto.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="agregar-carrito-btn" data-id="${producto.id}">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        `;
    });
    document.getElementById("contenedorCompras").innerHTML = htmlProductos;
    // Agregar evento de escucha a los botones de eliminar (necesario después de renderizar los productos)
    const botonesEliminar = document.querySelectorAll('.eliminar-btn');
    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', eliminarProducto);
    });
    // Agregar evento de escucha a los botones de agregar al carrito
    document.querySelectorAll('.agregar-carrito-btn').forEach(btn => {
        btn.addEventListener('click', agregarProductoAlCarrito);
    });
}
function agregarProductoAlCarrito(event) {
    const botonAgregar = event.currentTarget; // El botón en el que se hizo clic
    const idProducto = botonAgregar.dataset.id;

    // Encontrar el contenedor del producto que contiene el botón
    const contenedorProducto = botonAgregar.closest('.card');

    // Obtener la información del producto del contenedor
    const nombreProducto = contenedorProducto.querySelector('h3').innerText;
    const precioTexto = contenedorProducto.querySelector('p:nth-of-type(2)').innerText;
    const precioProducto = parseFloat(precioTexto.substring(precioTexto.indexOf('$') + 1));

    // Obtener la cantidad seleccionada
    const cantidadSeleccionada = parseInt(contenedorProducto.querySelector('.cantidad-input').value); // Obtener el precio y convertirlo a número

    // Verificar si el producto ya está en el carrito
    const productosEnCarrito = document.querySelectorAll('.item-carrito h4');
    for (const productoEnCarrito of productosEnCarrito) {
        if (productoEnCarrito.innerText === nombreProducto) {
            // Mostrar una alerta de SweetAlert informando que el producto ya está en el carrito
            Swal.fire({
                icon: 'error',
                title: 'Producto ya en el carrito',
                text: `${nombreProducto} ya ha sido agregado al carrito.`,
                timer: 2000,
                timerProgressBar: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                iconHtml: '<i class="fas fa-exclamation-circle"></i>' // Icono personalizado de Font Awesome
            });
            return; // Salir de la función si el producto ya está en el carrito
        }
    }

    // Si el producto no está en el carrito, continuar con la lógica para agregarlo

    const imagenProducto = contenedorProducto.querySelector('img').src;

    // Calcular el precio total
    const precioTotal = precioProducto * cantidadSeleccionada;

    // Crear el HTML del producto agregado al carrito
    const htmlProductoCarrito = `
        <div class="item-carrito">
            <img src="${imagenProducto}" alt="Imagen del producto">
            <div>
                <h4>${nombreProducto}</h4>
                <p>Precio: $${precioTotal.toFixed(2)}</p> <!-- Mostrar el precio total -->
                <p>Cantidad: ${cantidadSeleccionada}</p>
            </div>
        </div>
    `;

    // Agregar el HTML al contenedor de carrito
    const carritoContent = document.querySelector('.carrito-content');
    carritoContent.innerHTML += htmlProductoCarrito;

    const totalActual = parseFloat(document.querySelector('.total').innerText.replace('$', ''));
    const nuevoTotal = totalActual + precioTotal;

    // Actualizar el contenido del elemento con la clase total con el nuevo total calculado
    document.querySelector('.total').innerText = `$${nuevoTotal.toFixed(2)}`;


    // Mostrar una alerta de SweetAlert de confirmación
    Swal.fire({
        icon: 'success',
        title: 'Producto agregado al carrito',
        text: `${nombreProducto} se ha agregado al carrito.`,
        timer: 2000,
        timerProgressBar: true,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        iconHtml: '<i class="fas fa-cart-plus"></i>' // Icono personalizado de Font Awesome
    });
}

function eliminarProducto(event) {
    const idProducto = event.target.dataset.id;

    // Eliminar el card del DOM
    const cardProducto = event.target.closest('.card');
    cardProducto.remove();

    // Eliminar el producto del localStorage
    let productosEnCompras = JSON.parse(localStorage.getItem('productosEnCompras')) || [];
    productosEnCompras = productosEnCompras.filter(producto => producto.id !== idProducto);
    localStorage.setItem('productosEnCompras', JSON.stringify(productosEnCompras));

    Swal.fire({
        icon: 'success',
        title: 'Producto eliminado',
        text: 'El producto ha sido eliminado del carrito.',
        timer: 2000,
        timerProgressBar: true,
        showClass: {
            popup: 'animate_animated animate_fadeInDown'
        },
        hideClass: {
            popup: 'animate_animated animate_fadeOutUp'
        },
        iconHtml: '<i class="fas fa-trash"></i>' // Icono personalizado de Font Awesome
    });


    // Eliminar el producto del carrito visualmente
    const productosEnCarrito = document.querySelectorAll('.item-carrito');
    productosEnCarrito.forEach(item => {
        if (item.dataset.id === idProducto) {
            item.remove();
        }
    });


}

document.querySelector('.vaciar-carrito-btn').addEventListener('click', vaciarCarrito);

function vaciarCarrito() {
    // Limpiar el carrito visualmente
    const carritoContent = document.querySelector('.carrito-content');
    carritoContent.innerHTML = '';
    

    // Limpiar el carrito en el localStorage    
    localStorage.removeItem('productosEnCompras');
}

cargarTarjetas();
async function cargarTarjetas()
{
    // Obtener el idPersona almacenado en el LocalStorage
    let idPersona = localStorage.getItem('idUsuario');

    // Verificar si se obtuvo el idPersona correctamente
    if (!idPersona) {
        console.error('No se pudo obtener el idPersona');
        return;
    }

    // Construir la URL del endpoint getAll con el idPersona
    let url = `http://localhost:8090/AgromercadoBackend/api/tarjeta/getAll?idPersona=${idPersona}`;
    let contenido = '';

    // Realizar la solicitud al API
    let resp = await fetch(url);
    let datos = await resp.json();

    // Verificar si hay algún error en la respuesta
    if (datos.error != null)
    {
        Swal.fire('', datos.error, 'warning');
        return;
    }

    if (datos.exception != null)
    {
        Swal.fire('', datos.exception, 'danger');
        return;
    }

    //LLenamos las opciones del combo box con el ID y Nombre de la Sucursal:
    for (let i = 0; i < datos.length; i++)
        contenido += '<option value="' + datos[i].idTarjeta + '">' + datos[i].nombreTarjeta + '</option>';

    document.getElementById("cmbTarjeta").innerHTML = contenido;


}

function enviarCompraACarrito(event) {
    event.preventDefault(); // Evitar que el formulario se envíe
    
    // Obtener el precio total del carrito
    const total = document.querySelector('.total').innerText.replace('$', '');

    // Obtener el nombre de la tarjeta seleccionada
    const tarjetaSeleccionada = document.getElementById('cmbTarjeta').value;
    
    // Obtener la fecha actual
    const fechaHoy = new Date().toLocaleDateString();

    // Obtener las compras anteriores del localStorage o inicializar como un arreglo vacío si no hay compras previas
    let comprasAnteriores = JSON.parse(localStorage.getItem('comprasRealizadas')) || [];

    // Agregar la nueva compra a la lista de compras
    comprasAnteriores.push({
        precioTotal: total,
        tarjeta: tarjetaSeleccionada,
        fecha: fechaHoy
    });

    // Guardar la lista actualizada de compras en el localStorage
    localStorage.setItem('comprasRealizadas', JSON.stringify(comprasAnteriores));

    // Mostrar SweetAlert de compra realizada
    Swal.fire({
        icon: 'success',
        title: '¡Compra realizada!',
        text: 'Tu compra se ha realizado con éxito.',
        showConfirmButton: false,
        timer: 2000
    });
}


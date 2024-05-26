refreshTableProducto();

let producto = [];

async function inicializar(event)
{
    event.preventDefault();
    refreshTableProducto();
}

async function refreshTableProducto() {
    let url = "http://localhost:8090/AgromercadoBackend/api/producto/getAll";
    let resp = await fetch(url);
    let datos = await resp.json();
    if (datos.error != null) {
        Swal.fire('', datos.error, 'warning');
        return;
    }
    if (datos.exception != null) {
        Swal.fire('', datos.exception, 'danger');
        return;
    }

    producto = datos;

    // Limpiar el contenedor de cards antes de agregar nuevos productos
    document.getElementById("cardProductos").innerHTML = '';

    // Aquí vamos a ir guardando el contenido del tbody de la tabla de productos:
    let contenido = '';

    // Recorremos el arreglo elemento por elemento:
    for (let i = 0; i < producto.length; i++) {
        // Creamos el contenido del card para este producto
        let cardProducto = '<div class="productos">' +
                '<div class="card">' +
                '<img src = ' + "data:image/png;base64," + producto[i].foto + ' alt="' + producto[i].nombreProducto + '" />' + // Marcador de posición para la imagen
                '<h4>' + producto[i].nombreProducto + '</h4>' +
                '<p></p>' +
                '<div class="produc">' +
                '<table>' +
                '<tr>' +
                '<td><span>$' + producto[i].precioCompra + '</span></td>' +
                '</tr>' +
                '<tr>' +
                '<td>Precio</td>' +
                '</tr>' +
                '</table>' +
                '</div>' +
                '<button class="btn-comprar"><i class="fas fa-shopping-cart"></i>Agregar al carrito</button>' +
                '<button class="btn-ver-detalles" data-index="' + i + '"><i class="fas fa-info-circle"></i> Ver Detalles</button>' +
                '</div>' +
                '</div>';

        // Agregamos el card del producto al contenedor
        document.getElementById("cardProductos").innerHTML += cardProducto;

        // Creamos el contenido de la fila de la tabla para este producto
        contenido += '<tr>' +
                '<td>' + producto[i].idProducto + '</td>' +
                '<td>' + producto[i].nombreProducto + '</td>' +
                '<td>' + producto[i].precioCompra + '</td>' +
                '<td>' + producto[i].descripcion + '</td>' +
                '<td>' + producto[i].stock + '</td>' +
                '<td>' + producto[i].estatus + '</td>' +
                '</tr>';
    }

    // Insertamos el contenido en la tabla de productos
    document.getElementById("tbodyProducto").innerHTML = contenido;
}



// Agregar manejador de eventos para el botón "Ver Detalles"
document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('btn-ver-detalles')) {
    // Obtener el índice del producto en el array "producto"
    let index = e.target.getAttribute('data-index');
    // Mostrar los detalles del producto en el modal
    mostrarDetallesModal(producto[index]);
  }
});

// Función para mostrar los detalles del producto en el modal
function mostrarDetallesModal(producto) {
  // Mostrar el modal
  document.getElementById('myModal').style.display = 'block';
  // Rellenar los detalles del producto en el modal
  document.getElementById('modal-product-name').textContent = producto.nombreProducto;
  document.getElementById('modal-product-description').textContent = 'Descripción: ' + producto.descripcion;
  document.getElementById('modal-product-precio').textContent = 'Precio: ' + producto.precioCompra;
  document.getElementById('modal-product-stock').textContent = 'Stock: ' + producto.stock;
  document.getElementById('modal-product-image').querySelector('img').src = 'data:image/png;base64,' + producto.foto;
}

// Agregar manejador de eventos para el botón de cerrar del modal
document.querySelector('.close').addEventListener('click', function() {
  // Ocultar el modal al hacer clic en el botón de cerrar
  document.getElementById('myModal').style.display = 'none';
});



function buscarPosicionProductoPorId(id)
{
    for (let i = 0;
            i < producto.length; i++)
    {
        if (producto[i].id === id)
            return i;
    }
    return -1;
}


document.addEventListener("DOMContentLoaded", function() {
    // Obtener el campo de búsqueda
    const searchInput = document.getElementById("searchInput");

    // Agregar un evento de escucha para el campo de entrada
    searchInput.addEventListener("input", function() {
        const searchTerm = searchInput.value.toLowerCase(); // Obtener el texto de búsqueda en minúsculas

        // Filtrar los productos que coincidan con el término de búsqueda
        const filteredProducts = producto.filter(function(product) {
            return product.nombreProducto.toLowerCase().includes(searchTerm);
        });

        // Limpiar el contenedor de cards antes de agregar los nuevos productos filtrados
        document.getElementById("cardProductos").innerHTML = '';

        // Agregar los cards de los productos filtrados al contenedor
        filteredProducts.forEach(function(product) {
            const cardProducto = '<div class="productos">' +
                '<div class="card">' +
                '<img src="' + "data:image/png;base64," + product.foto + '" alt="' + product.nombreProducto + '" />' +
                '<h4>' + product.nombreProducto + '</h4>' +
                '<p></p>' +
                '<div class="produc">' +
                '<table>' +
                '<tr>' +
                '<td><span>$' + product.precioCompra + '</span></td>' +
                '</tr>' +
                '<tr>' +
                '<td>Precio</td>' +
                '</tr>' +
                '</table>' +
                '</div>' +
                '<button class="btn-comprar"><i class="fas fa-shopping-cart"></i>Agregar al carrito</button>' +
                '<button class="btn-ver-detalles"><i class="fas fa-info-circle"></i> Ver Detalles</button>' +
                '</div>' +
                '</div>';

            // Agregar el card del producto al contenedor
            document.getElementById("cardProductos").innerHTML += cardProducto;
        });
    });
});



document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('btn-comprar')) {
        let index = e.target.parentElement.querySelector('.btn-ver-detalles').getAttribute('data-index');
        let selectedProduct = producto[index];
        agregarProductoAlLocalStorage(selectedProduct);
    }
});



function agregarProductoAlLocalStorage(producto) {
    // Verificar si ya hay productos en el carrito en localStorage
    let productosEnCompras = JSON.parse(localStorage.getItem('productosEnCompras')) || [];
    // Agregar el nuevo producto al carrito
    productosEnCompras.push(producto);
    // Guardar los productos en el carrito de nuevo en localStorage
    localStorage.setItem('productosEnCompras', JSON.stringify(productosEnCompras));
    // Mostrar una alerta de SweetAlert al usuario
    Swal.fire({
        title: '¡Agregado!',
        text: 'Producto agregado a tus compras exitosamente.',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        iconHtml: '<i class="fas fa-shopping-cart"></i>' // Icono personalizado de Font Awesome
    });
}
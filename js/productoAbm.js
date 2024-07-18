const url = new URLSearchParams(window.location.search);
const id = url.get('');

let productos = JSON.parse(localStorage.getItem('productos')) || [];

let contPId = document.getElementById('productoID');
let contPNombre = document.getElementById('productoNombre');
let contPDetalle = document.getElementById('productoDetalle');
let contPUrl = document.getElementById('productoImagen');
let contPPrecio = document.getElementById('productoPrecio');
let contPPEnOferta = document.getElementById('productoPrecioEnOferta');
let contPCantidad = document.getElementById('productoCantidad');
let contPMarca = document.getElementById('productoMarca');
let contPEnOferta = document.getElementById('productoEnOferta');
let contPDestacado = document.getElementById('productoDestacado');
let contPCategorias = document.getElementById('productoCategorias');

// Verificar si hay un único parámetro en la URL y productos existentes
if (url.size === 1 && productos.length) {
    let producto = productos.find(p => p.id === parseInt(id));
    
    if (producto) {
        // Mostrar los datos del producto encontrado en los campos del formulario
        contPId.value = producto.id;
        contPNombre.value = producto.nombre;
        contPDetalle.value = producto.detalle;
        contPUrl.value = producto.imagenPrincipal;
        contPPrecio.value = producto.precio;
        contPPEnOferta.value = producto.precionEnOferta;
        contPCantidad.value = producto.cantidad;
        contPMarca.value = producto.marca;
        contPEnOferta.checked = producto.enOferta;
        contPDestacado.checked = producto.destacado;
        contPCategorias.value = producto.categorias.join(', ');
    }
}

// Función para generar un ID único basado en la fecha y hora actual
function generarIDUnico() {
    let fecha = new Date();

    let ano = fecha.getFullYear(); // Año de 4 dígitos
    let mes = ('0' + (fecha.getMonth() + 1)).slice(-2); // Mes de 2 dígitos
    let dia = ('0' + fecha.getDate()).slice(-2); // Día de 2 dígitos
    let horas = ('0' + fecha.getHours()).slice(-2); // Horas de 2 dígitos
    let minutos = ('0' + fecha.getMinutes()).slice(-2); // Minutos de 2 dígitos
    let segundos = ('0' + fecha.getSeconds()).slice(-2); // Segundos de 2 dígitos

    let id = `${ano}${mes}${dia}${horas}${minutos}${segundos}`;
    return id;
}

// Función para limpiar los campos del formulario después de agregar o editar un producto
function limpiarCampos() {
    contPId.value = '';
    contPNombre.value = '';
    contPDetalle.value = '';
    contPUrl.value = '';
    contPPrecio.value = '';
    contPPEnOferta.value = '';
    contPCantidad.value = '';
    contPMarca.value = '';
    contPEnOferta.checked = false;
    contPDestacado.checked = false;
    contPCategorias.value = '';
}

// Función para cargar un nuevo producto o actualizar uno existente
function cargarNuevo(e) {
    e.preventDefault();
    
    // Obtener los valores de los campos del formulario
    let nuevoProducto = {
        id: parseInt(contPId.value) || parseInt(generarIDUnico()), // Si no hay ID, generar uno nuevo
        nombre: contPNombre.value,
        detalle: contPDetalle.value,
        marca: contPMarca.value,
        categorias: contPCategorias.value.split(',').map(cat => cat.trim()),
        precio: contPPrecio.value,
        cantidad: contPCantidad.value,
        imagenPrincipal: contPUrl.value,
        destacado: contPDestacado.checked,
        enOferta: contPEnOferta.checked,
        precioEnOferta: contPPEnOferta.value
    };

    // Buscar si existe un producto con el mismo ID
    let index = productos.findIndex(p => p.id === nuevoProducto.id);
    
    if (index !== -1) {
        // Mostrar advertencia o confirmación para editar el producto existente
        if (confirm(`Estás por editar el producto existente con ID ${nuevoProducto.id}. ¿Deseas continuar?`)) {
            // Actualizar los datos del producto existente
            productos[index] = nuevoProducto;

            // Guardar productos actualizados en localStorage
            localStorage.setItem('productos', JSON.stringify(productos));
        }
    } else {
        // Agregar nuevo producto al array de productos
        productos.push(nuevoProducto);

        // Guardar productos actualizados en localStorage
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    // Limpiar los campos del formulario después de agregar/editar
    limpiarCampos();
}

// Evento para escuchar el click en el botón de agregar/guardar producto
const btnAgregar = document.getElementById('btnAgregar');
btnAgregar.addEventListener('click', cargarNuevo);

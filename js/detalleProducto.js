const productos = JSON.parse(localStorage.getItem('productos'))|| [];

const url = new URLSearchParams(window.location.search);
const parametro = url.get('');

const producto = productos_json.find(p => p.id === parseInt(parametro));

const contenedor_detalle_producto = document.getElementById('contenedor-detalle-producto');

contenedor_detalle_producto.innerHTML = 
`
         <!-- Imagen del producto -->
            <div class="col-lg-6">
                <img src="${producto.imagenPrincipal}" alt="Nombre del Producto" class="img-fluid producto-imagen">
            </div>
            <!-- Detalles del producto -->
            <div class="col-lg-6 producto-detalle">
                <h2 class="mb-4">${producto.nombre}</h2>
                <p class="lead mb-4">${producto.detalle}</p>
                <p><strong>Precio:</strong> $ ${producto.precio}</p>
                <p><strong>Precio Oferta:</strong> <span class="text-success">$ ${producto.precioEnOferta ? producto.precioEnOferta : "sin oferta" }</span></p>
                <p><strong>Disponibilidad:</strong> ${producto.cantidad}</p>
                <p><strong>Marca:</strong> ${producto.marca}</p>
                <div class="mt-4">
                    <button class="btn btn-primary me-3">Agregar al Carrito</button>
                    <button class="btn btn-outline-primary">Agregar a Favoritos</button>
                </div>
            </div>
`
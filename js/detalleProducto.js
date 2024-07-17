const productos = JSON.parse(localStorage.getItem('productos'))|| [];

const url = new URLSearchParams(window.location.search);
const parametro = url.get('');

const producto = productos_json.find(p => p.id === parseInt(parametro));

const contenedor_detalle_producto = document.getElementById('contenedor-detalle-producto');


const agregarProductoAFavoritos = () => {
    const userLogeado = JSON.parse(sessionStorage.getItem('usuarioLogeado'));
    if (userLogeado === "guest" || !userLogeado) {
        alert('Debe ingresar con su usuario para utilizar este servicio.')
        window.location.href = "../index.html"
    } 

    let favoritosLS = JSON.parse(localStorage.getItem(`productosFavoritos:${userLogeado.username}`)) || [];
    
    let productoFavorito = {
        "id": producto.id,
        "nombre":producto.nombre
    }
    if (!favoritosLS.length) {
        favoritosLS.push(productoFavorito);
    } else {
        let existe = favoritosLS.some(pf => pf.id === productoFavorito.id);
        if (!existe) {
            favoritosLS.push(productoFavorito);
        } else {
            alert('El producto ya se encuentra en favoritos')
            window.location.href = "../pages/productos.html?=Favoritos"
        }
    }
    localStorage.setItem(`productosFavoritos:${userLogeado.username}`, JSON.stringify(favoritosLS));


}

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
                    <button class="btn btn-outline-primary" id="btn-AgregarFavorito">Agregar a Favoritos</button>
                </div>
            </div>
`
const btnAgregarFavorito = document.getElementById('btn-AgregarFavorito');
btnAgregarFavorito.addEventListener('click', agregarProductoAFavoritos)

let productos_json = JSON.parse(localStorage.getItem('productos')) || [];
let productos = [];


const url = new URLSearchParams(window.location.search);
const parametro = url.get('');

switch (parametro) {
    case null:
        productos = productos_json;
        break;
    case "Amd":
    case "Intel":
        productos = productos_json.filter(p => p.marca.toLowerCase() === parametro.toLowerCase());
        break;
    case "Destacados":
        productos = productos_json.filter(p => p.destacado);
        console.log('if destacados', productos);
        break;
    case "Oferta":
        productos = productos_json.filter(p => p.enOferta);
        break;
    case "Favoritos":
        let userLogeado = JSON.parse(sessionStorage.getItem('usuarioLogeado')) || "guest";
        if (userLogeado === "guest") {
             alert('El producto ya se encuentra en favoritos')
            window.location.href = "../pages/productos.html?=Favoritos"
        } else {
            let productosFavoritosLS = JSON.parse(localStorage.getItem(`productosFavoritos:${userLogeado.username}`)) || [];
            productos = productos_json.filter(producto => 
                productosFavoritosLS.some(favorito => favorito.id === producto.id)
            );
            if (!productos.length) {
                alert("Actualmente no cuentas con productos agregados a favoritos, comienza ahora!")
                window.location.href = "../pages/productos.html";
            }
        }
       
        break;
    default:
        productos = productos_json.filter(p => p.categorias.some(cat => cat.toLowerCase() === parametro.toLowerCase()));
        break;
}

const contenedor_productos = document.getElementById('contenedor-productos');
console.log('desp de switch', productos);

const titulo = document.getElementById('titulo-productos');
titulo.innerHTML = `Productos filtrado por: ${parametro ? parametro : 'Todos'}`;

contenedor_productos.innerHTML = productos.map(p =>
    `
       <div class="card m-3 card-local contenedor-producto-local" style="width: 18rem;">
          <img src='${p.imagenPrincipal}' class="card-img-top img-card-producto" alt="imagenProducto">
          <div class="card-body">
            <h5 class="card-text text-truncate w-100 titulo-producto">${p.nombre}</h5>
            <p class="card-text text-truncate-local">${p.detalle}</p>
            ${p.enOferta ? `
            <h6 class="card-title w-100 text-center fw-bold fs-5 text p-2 mb-3 border-bottom-local align-h6 precio-producto text-decoration-line-through fs-6 text ">$ ${p.precio}</h6>
            <h6 class="card-title w-100 text-center fw-bold fs-5 text p-2 mb-3 border-bottom-local align-h6 precio-producto text-success">$ ${p.precioEnOferta}</h6>` :
            `<h6 class="card-title w-100 text-center fw-bold fs-5 text p-2 mb-3 border-bottom-local align-h6 precio-producto">$ ${p.precio}</h6>`
            }
            <div class="d-flex w-100 justify-content-evenly">
              <a class="btn btn-Comprar" id="AgregarAlCarrito">Comprar</a>
              <a href="../pages/detalleProducto.html?=${p.id}" class="btn btn-Detalle">Detalles</a>
            </div>
          </div>
        </div>
    `
).join("");

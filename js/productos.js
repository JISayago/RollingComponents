let usuarioLogeado = JSON.parse(sessionStorage.getItem('usuarioLogeado')) || [];
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
    usuarioLogeado = JSON.parse(sessionStorage.getItem('usuarioLogeado')) || "guest";
    if (usuarioLogeado === "guest") {
        alert('El producto ya se encuentra en favoritos')
        window.location.href = "../pages/productos.html?=Favoritos"
    } else {
        let productosFavoritosLS = JSON.parse(localStorage.getItem(`productosFavoritos:${usuarioLogeado.username}`)) || [];
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

const agregarAlCarrito = (id) => {
    let carrito = JSON.parse(localStorage.getItem(`carrito-${usuarioLogeado.username}`)) || [];
    let producto = productos_json.find(p => p.id === parseInt(id));
    
    if (producto) {
        let existingItem = carrito.find(item => item.id === producto.id);
        
        if (existingItem) {
            // Si el producto ya está en el carrito, aumentar la cantidad
            existingItem.cantidad += 1;
        } else {
            // Si el producto no está en el carrito, agregarlo con cantidad 1
            producto.cantidad = 1;
            carrito.push(producto);
        }
        if (usuarioLogeado.tipoUsuario === 1) {
            
            localStorage.setItem(`carrito-${usuarioLogeado.username}`, JSON.stringify(carrito));
        } else {
            alert("Con este tipo de usuario no puede agregar al carrito!");
            window.location.href = "./login.html"
        }
    }
}
    
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
              <button class="btn btn-Comprar" id="AgregarAlCarrito" onclick="agregarAlCarrito('${p.id}')">Comprar</button>
              <a href="../pages/detalleProducto.html?=${p.id}" class="btn btn-Detalle">Detalles</a>
            </div>
          </div>
        </div>
    `
    ).join("");
    
let productos_json = JSON.parse(localStorage.getItem('productos'))|| [];
let productos = [];

const url = new URLSearchParams(window.location.search);
const parametro = url.get('');


if (parametro) {
    if (parametro === "Amd" || parametro === "Intel") {
        productos = productos_json.filter(p => p.marca.toLowerCase() === parametro.toLowerCase());
    } else {        
        productos = productos_json.filter(p => p.categorias.some(cat => cat.toLowerCase() === parametro.toLowerCase()));
        console.log(productos)
    }
} else {
    productos = productos_json;
    
}
const contenedor_productos = document.getElementById('contenedor-productos');
if (!productos.length) {
    productos = productos_json;
} 

const titulo = document.getElementById('titulo-productos');
    titulo.innerHTML = `Productos filtrado por: ${parametro ? parametro : 'Todos'}`
    contenedor_productos.innerHTML = productos.map(p =>
        `
           <div class="card m-3 card-local contenedor-producto-local" style="width: 18rem;">
              <img src='${p.imagenPrincipal}' class="card-img-top img-card-producto" alt="imagenProducto">
              <div class="card-body">
                <h5 class="card-text text-truncate w-100 titulo-producto">${p.nombre}</h5>
                <p class="card-text text-truncate-local">${p.detalle}</p>
                <h6 class="card-title w-100 text-center fw-bold fs-5 text p-2 mb-3 border-bottom-local align-h6 precio-producto">$ ${p.precio}</h6>
                <div class="d-flex w-100 justify-content-evenly">
                  <a class="btn btn-Comprar" id="AgregarAlCarrito">Comprar</a>
                  <a href="../pages/detalleProducto.html?=${p.id}" class="btn btn-Detalle">Detalles</a>
                </div>
              </div>
            </div>
        `
    ).join("");

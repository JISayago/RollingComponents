const userL = JSON.parse(sessionStorage.getItem('usuarioLogeado')) || [];
let productos_carritoLS = [];
let totalPrecios = 0;
if (userL.length === 0) {
    alert('Debe logearse para poder hacer uso de esta funcionalidad');
    window.location.href = "../pages/login.html"
} else {
    productos_carritoLS = JSON.parse(localStorage.getItem(`carrito-${userL.username}`))
    totalPrecios = productos_carritoLS.reduce((total, producto) => {
        return total + producto.precio;
        }, 0);
}

function eliminarDelCarrito(id) {
    let index = productos_carritoLS.findIndex(pc => pc.id === id);

    if (index !== -1) {
        productos_carritoLS.splice(index, 1);

        localStorage.setItem(`carrito-${userL.username}`, JSON.stringify(productos_carritoLS));
        window.location.href = '../pages/carrito.html'
    } else {
        console.log(`No se encontró un producto con ID ${id} en el carrito.`);
    }
}
function comprarCarrito() {
    alert('Producto/s comprados correctamente, se te enviará un mail con los detalles de la compra.')
    localStorage.removeItem(`carrito-${userL.username}`);
    window.location.href = '../index.html'
}

const productos_carrito = document.getElementById('productos-carrito');
productos_carrito.innerHTML = productos_carritoLS.map( pc => 
`<div class="product-card">
<img src="${pc.imagenPrincipal}" class="img-fluid" alt="Producto 1">
<h5 class="mt-3">${pc.nombre}</h5>
<p class="">$ ${pc.precio}</p>
<div class="input-group mb-3 justify-content-center">
  <input type="text" class="form-control text-center input-cantidad" placeholder="Cantidad" value="1" id="cantidad-producto1">
</div>
<button class="btn btn-danger" onclick="eliminarDelCarrito(${pc.id})">Eliminar del Carrito</button>
</div>`)

const carritoTotal = document.getElementById('carrito-total');
carritoTotal.innerHTML = `$ ${totalPrecios}`
const btnComprar = document.getElementById('btn-comprar');
btnComprar.addEventListener('click',comprarCarrito)
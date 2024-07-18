let user = JSON.parse(sessionStorage.getItem('usuarioLogeado')) || false;
const pagina = window.location.href;
const carrito = JSON.parse(localStorage.getItem(`carrito-${user.username}`));
const contenedor_nav = document.getElementById('contenedor-nav');
const cerrarSesion = (username) => {
    if (username) {
        sessionStorage.removeItem('usuarioLogeado');
        window.location.href = "../pages/login.html"
}
}

if (pagina.includes('index.html')) {
  contenedor_nav.innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-dark bg-black">
    <div class="container-fluid p-2">
      <a class="navbar-brand p-3" href="./index.html"><img src="./assets/logobSinFondo.png" alt="Imagen del Logo"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
        ${user.tipoUsuario === 0 ? 
      `<ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="./pages/productos.html">Productos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./pages/adminPanel.html">Administración</a>
            </li>
          </ul>` : `<ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="./pages/productos.html">Productos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./pages/productos.html?=Favoritos">Favoritos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./pages/contacto.html">Contacto</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./pages/sobreNosotros.html">Sobre Nosotros</a>
            </li>
          </ul>`}
      </div>
      <div class="d-flex align-items-center">
      ${user ? `<button class="nav-link me-3" onclick="cerrarSesion('${user.username}')">Cerrar Sesión</button>` :
      `<a class="nav-link me-3" href="./pages/login.html">Login</a>
        <a class="nav-link me-3" href="./pages/registro.html">Registro</a>`}
        
      </div>
    </div>
  </nav>
  
  <!-- Second Navbar -->
  <nav class="navbar navbar-dark bg-black pb-4 px-3">
    <div class="container-fluid justify-content-between">
      <div class="navbar-nav"></div>
      <form class="d-flex mx-auto" role="search" style="width: 100%; max-width: 600px;">
        <input class="form-control me-2" type="search" placeholder="Ej: Ryzen 5 1400" aria-label="Search">
        <a class="btn btn-buscar" href='./pages/Error404.html'>Buscar</a>
      </form>
      <div class="cart-container position-relative">
        <a class="nav-link" href="./pages/carrito.html"><img src="./assets/carritosinfondo.png" alt="Cart Icon" style="width: 35px; height: 35px;"></a>
        <div class="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cart-count">
          0
        </div>
      </div>
    </div>
  </nav>
  `;
} else {
  contenedor_nav.innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-dark bg-black">
    <div class="container-fluid p-2">
      <a class="navbar-brand p-3" href="../index.html"><img src="../assets/logobSinFondo.png" alt="Imagen del Logo"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
        ${user.tipoUsuario === 0 ? 
      `<ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="./productos.html">Productos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./adminPanel.html">Administración</a>
            </li>
          </ul>` : `<ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="./productos.html">Productos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./productos.html?=Favoritos">Favoritos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./contacto.html">Contacto</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./sobreNosotros.html">Sobre Nosotros</a>
            </li>
          </ul>`}
      </div>
      <div class="d-flex align-items-center">
      ${user ? `<button class="nav-link me-3" onclick="cerrarSesion('${user.username}')">Cerrar Sesión</button>` :
      `<a class="nav-link me-3" href="./login.html">Login</a>
        <a class="nav-link me-3" href="./registro.html">Registro</a>`}
        
      </div>
    </div>
  </nav>
  
  <!-- Second Navbar -->
  <nav class="navbar navbar-dark bg-black pb-4 px-3">
    <div class="container-fluid justify-content-between">
      <div class="navbar-nav"></div>
      <form class="d-flex mx-auto" role="search" style="width: 100%; max-width: 600px;">
        <input class="form-control me-2" type="search" placeholder="Ej: Ryzen 5 1400" aria-label="Search">
        <a class="btn btn-buscar" href='./Error404.html'>Buscar</a>
      </form>
      <div class="cart-container position-relative">
        <a class="nav-link" href="./carrito.html"><img src="../assets/carritosinfondo.png" alt="Cart Icon" style="width: 35px; height: 35px;"></a>
        <div class="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cart-count">
          0
        </div>
      </div>
    </div>
  </nav>
  `;
}

// Aquí puedes actualizar el número del carrito
const divContador = document.getElementById('cart-count');
divContador.innerHTML = carrito.length || 0; // Actualiza este número según tu lógica



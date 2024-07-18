if ((!sessionStorage.getItem('vioHeroPage')) || (sessionStorage.getItem('vioHeroPage') === 'false')) {
    sessionStorage.setItem('vioHeroPage', 'false');
    window.location.href = "./pages/heroPage.html"
}

const usuarioLogeado = JSON.parse(sessionStorage.getItem('usuarioLogeado')) || [];


const categorias_array = [
    { id: 1, nombre: "Accesorios", enPrincipal: true },
    { id: 2, nombre: "Componentes", enPrincipal: true },
    { id: 3, nombre: "Monitores", enPrincipal: true },
    { id: 4, nombre: "Mobiliario", enPrincipal: true },
    { id: 5, nombre: "Ofertas", enPrincipal: false },
    { id: 6, nombre: "Almacenamiento", enPrincipal: false },
    { id: 7, nombre: "Redes", enPrincipal: false },
    { id: 8, nombre: "Refrigeración", enPrincipal: false },
    { id: 9, nombre: "Software", enPrincipal: true },
    { id: 10, nombre: "Audio", enPrincipal: true }
];

if (!localStorage.getItem('categorias')) {
    localStorage.setItem('categorias', JSON.stringify(categorias_array));
    categorias = categorias_array;
}
else {
    categorias = JSON.parse(localStorage.getItem('categorias'));
}


const productos_array = [
    {
        id: 1,
        nombre: "Mouse Logitech G300s",
        detalle: "Mouse gaming con diseño ergonómico y 9 botones programables",
        marca: "Logitech",
        categorias: ["Accesorios"],
        precio: 2999.99,
        cantidad: 15,
        imagenPrincipal: "https://picsum.photos/800/400?random=1",
        destacado: true,
        enOferta: false,
        precioEnOferta: null,
        eliminado: false
    },
    {
        id: 2,
        nombre: "Teclado Mecánico Razer BlackWidow",
        detalle: "Teclado mecánico con switches Razer Green y retroiluminación RGB",
        marca: "Razer",
        categorias: ["Accesorios"],
        precio: 7999.99,
        cantidad: 10,
        imagenPrincipal: "https://picsum.photos/800/400?random=2",
        destacado: false,
        enOferta: true,
        precioEnOferta: 6799.99,
        eliminado: false
    },
    {
        id: 3,
        nombre: "Silla Gamer DXRacer",
        detalle: "Silla gamer ergonómica con soporte lumbar y ajuste de altura",
        marca: "DXRacer",
        categorias: ["Mobiliario", "Ofertas"],
        precio: 14999.99,
        cantidad: 5,
        imagenPrincipal: "https://picsum.photos/800/400?random=3",
        destacado: true,
        enOferta: false,
        precioEnOferta: null,
        eliminado: false
    },
    {
        id: 4,
        nombre: "Monitor ASUS TUF Gaming 27\"",
        detalle: "Monitor gaming 27\" Full HD con 165Hz y tecnología FreeSync",
        marca: "ASUS",
        categorias: ["Monitores"],
        precio: 24999.99,
        cantidad: 8,
        imagenPrincipal: "https://picsum.photos/800/400?random=4",
        destacado: false,
        enOferta: true,
        precioEnOferta: 20999.99,
        eliminado: false
    },
    {
        id: 5,
        nombre: "Placa Madre ASUS ROG Strix B550-F",
        detalle: "Placa madre para procesadores AMD Ryzen con soporte para PCIe 4.0",
        marca: "ASUS",
        categorias: ["Componentes"],
        precio: 18999.99,
        cantidad: 12,
        imagenPrincipal: "https://picsum.photos/800/400?random=5",
        destacado: true,
        enOferta: false,
        precioEnOferta: null,
        eliminado: false
    },
    {
        id: 6,
        nombre: "Procesador AMD Ryzen 5 5600X",
        detalle: "Procesador AMD Ryzen 5 de 6 núcleos y 12 hilos con arquitectura Zen 3",
        marca: "AMD",
        categorias: ["Componentes"],
        precio: 22999.99,
        cantidad: 10,
        imagenPrincipal: "https://picsum.photos/800/400?random=6",
        destacado: false,
        enOferta: true,
        precioEnOferta: 19999.99,
        eliminado: false
    },
    {
        id: 7,
        nombre: "Placa de Video NVIDIA GeForce RTX 3060",
        detalle: "Placa de video con 12GB de VRAM GDDR6 y trazado de rayos en tiempo real",
        marca: "NVIDIA",
        categorias: ["Componentes"],
        precio: 79999.99,
        cantidad: 7,
        imagenPrincipal: "https://picsum.photos/800/400?random=7",
        destacado: true,
        enOferta: false,
        precioEnOferta: null,
        eliminado: false
    },
    {
        id: 8,
        nombre: "Mouse Razer DeathAdder Elite",
        detalle: "Mouse gaming con sensor óptico avanzado y diseño ergonómico",
        marca: "Razer",
        categorias: ["Accesorios"],
        precio: 4999.99,
        cantidad: 13,
        imagenPrincipal: "https://picsum.photos/800/400?random=8",
        destacado: false,
        enOferta: true,
        precioEnOferta: 4299.99,
        eliminado: false
    },
    {
        id: 9,
        nombre: "Teclado Corsair K95 RGB Platinum",
        detalle: "Teclado mecánico con switches Cherry MX y retroiluminación RGB",
        marca: "Corsair",
        categorias: ["Accesorios"],
        precio: 9999.99,
        cantidad: 9,
        imagenPrincipal: "https://picsum.photos/800/400?random=9",
        destacado: true,
        enOferta: false,
        precioEnOferta: null,
        eliminado: false
    },
    {
        id: 10,
        nombre: "Silla Gamer Akracing Core Series",
        detalle: "Silla gamer con estructura de acero y espuma de alta densidad",
        marca: "Akracing",
        categorias: ["Mobiliario"],
        precio: 17999.99,
        cantidad: 4,
        imagenPrincipal: "https://picsum.photos/800/400?random=10",
        destacado: false,
        enOferta: true,
        precioEnOferta: 15999.99,
        eliminado: false
    },
    {
        id: 11,
        nombre: "Monitor LG UltraGear 34\"",
        detalle: "Monitor gaming curvo 34\" UltraWide QHD con 144Hz",
        marca: "LG",
        categorias: ["Monitores"],
        precio: 34999.99,
        cantidad: 6,
        imagenPrincipal: "https://picsum.photos/800/400?random=11",
        destacado: true,
        enOferta: false,
        precioEnOferta: null,
        eliminado: false
    },
    {
        id: 12,
        nombre: "Placa Madre MSI MPG Z490 Gaming Edge",
        detalle: "Placa madre para procesadores Intel con soporte para PCIe 4.0",
        marca: "MSI",
        categorias: ["Componentes"],
        precio: 20999.99,
        cantidad: 11,
        imagenPrincipal: "https://picsum.photos/800/400?random=12",
        destacado: false,
        enOferta: true,
        precioEnOferta: 17999.99,
        eliminado: false
    },
    {
        id: 13,
        nombre: "Procesador Intel Core i7-10700K",
        detalle: "Procesador Intel Core i7 de 8 núcleos y 16 hilos con arquitectura Comet Lake",
        marca: "Intel",
        categorias: ["Componentes"],
        precio: 27999.99,
        cantidad: 8,
        imagenPrincipal: "https://picsum.photos/800/400?random=13",
        destacado: true,
        enOferta: false,
        precioEnOferta: null,
        eliminado: false
    },
    {
        id: 14,
        nombre: "Placa de Video AMD Radeon RX 6800 XT",
        detalle: "Placa de video con 16GB de VRAM GDDR6 y trazado de rayos en tiempo real",
        marca: "AMD",
        categorias: ["Componentes"],
        precio: 89999.99,
        cantidad: 5,
        imagenPrincipal: "https://picsum.photos/800/400?random=14",
        destacado: false,
        enOferta: true,
        precioEnOferta: 79999.99,
        eliminado: false
    },
    {
        id: 15,
        nombre: "Disco Duro Externo Seagate Expansion 2TB",
        detalle: "Disco duro externo de 2TB con conexión USB 3.0",
        marca: "Seagate",
        categorias: ["Almacenamiento"],
        precio: 5999.99,
        cantidad: 20,
        imagenPrincipal: "https://picsum.photos/800/400?random=15",
        destacado: false,
        enOferta: true,
        precioEnOferta: 5499.99,
        eliminado: false
    },
    {
        id: 16,
        nombre: "Router TP-Link Archer AX6000",
        detalle: "Router Wi-Fi 6 de doble banda con velocidad combinada de hasta 6000Mbps",
        marca: "TP-Link",
        categorias: ["Redes"],
        precio: 12999.99,
        cantidad: 6,
        imagenPrincipal: "https://picsum.photos/800/400?random=16",
        destacado: true,
        enOferta: false,
        precioEnOferta: null,
        eliminado: false
    },
    {
        id: 17,
        nombre: "Sistema de Refrigeración líquida NZXT Kraken X73 RGB",
        detalle: "Sistema de refrigeración líquida para CPU con iluminación RGB",
        marca: "NZXT",
        categorias: ["Refrigeración"],
        precio: 8999.99,
        cantidad: 10,
        imagenPrincipal: "https://picsum.photos/800/400?random=17",
        destacado: false,
        enOferta: true,
        precioEnOferta: 7999.99,
        eliminado: false
    },
    {
        id: 18,
        nombre: "Software Adobe Creative Cloud",
        detalle: "Suscripción anual a Adobe Creative Cloud para diseño gráfico y edición de video",
        marca: "Adobe",
        categorias: ["Software"],
        precio: 23999.99,
        cantidad: 15,
        imagenPrincipal: "https://picsum.photos/800/400?random=18",
        destacado: true,
        enOferta: false,
        precioEnOferta: null,
        eliminado: false
    },
    {
        id: 19,
        nombre: "Auriculares SteelSeries Arctis 7",
        detalle: "Auriculares inalámbricos para gaming con sonido envolvente y micrófono retráctil",
        marca: "SteelSeries",
        categorias: ["Audio"],
        precio: 8999.99,
        cantidad: 8,
        imagenPrincipal: "https://picsum.photos/800/400?random=19",
        destacado: false,
        enOferta: true,
        precioEnOferta: 7999.99,
        eliminado: false
    },
    {
        id: 33,
        nombre: "Microsoft Office 365 Personal",
        detalle: "Suscripción anual para 1 usuario con acceso a aplicaciones de Office",
        marca: "Microsoft",
        categorias: ["Software"],
        precio: 4999.99,
        cantidad: 20,
        imagenPrincipal: "https://picsum.photos/800/400?random=33",
        destacado: true,
        enOferta: false,
        precioEnOferta: null,
        eliminado: false
    },
    {
        id: 34,
        nombre: "Antivirus Norton 360 Deluxe",
        detalle: "Protección avanzada para dispositivos y privacidad en línea",
        marca: "Norton",
        categorias: ["Software"],
        precio: 2999.99,
        cantidad: 15,
        imagenPrincipal: "https://picsum.photos/800/400?random=34",
        destacado: false,
        enOferta: true,
        precioEnOferta: 2499.99,
        eliminado: false
    },
    {
        id: 35,
        nombre: "Auriculares Inalámbricos Sony WH-1000XM4",
        detalle: "Cancelación activa de ruido y calidad de sonido excepcional",
        marca: "Sony",
        categorias: ["Audio"],
        precio: 18999.99,
        cantidad: 10,
        imagenPrincipal: "https://picsum.photos/800/400?random=35",
        destacado: true,
        enOferta: false,
        precioEnOferta: null,
        eliminado: false
    },
    {
        id: 36,
        nombre: "Parlantes Bluetooth Bose SoundLink Revolve+",
        detalle: "Sonido profundo y envolvente con conectividad Bluetooth",
        marca: "Bose",
        categorias: ["Audio"],
        precio: 12999.99,
        cantidad: 12,
        imagenPrincipal: "https://picsum.photos/800/400?random=36",
        destacado: false,
        enOferta: true,
        precioEnOferta: 10999.99,
        eliminado: false
    }
];


if (!localStorage.getItem('productos')) {
    localStorage.setItem('productos', JSON.stringify(productos_array));
    productos = productos_array;
}
else {
    productos_json = JSON.parse(localStorage.getItem('productos'));
    productos = productos_json;
}

const agregarAlCarritoIndex = (id) => {
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
            window.location.href = "./pages/login.html"
        }
    }
}


const contendor_categorias = document.getElementById('contenedor-categorias-index');

contendor_categorias.innerHTML = categorias
.filter(c => c.enPrincipal)
.map(c =>
            `
            <div class="col-md-4 mb-2">
                <a href="./pages/productos.html?=${c.nombre}" class="btn btn-outline-secondary w-100 categoria_link">${c.nombre}</a>
              </div>
    `)
    .join("");
    
    
    const contenedor_productos_destacados = document.getElementById('productos-destacados-index');
    const productos_destacados = productos_array.filter(p => p.destacado).slice(0, 4);
    contenedor_productos_destacados.innerHTML = productos_destacados.map(p =>
        `
           <div class="card m-3 card-local contenedor-producto-local" style="width: 18rem;">
              <img src='${p.imagenPrincipal}' class="card-img-top img-card-producto" alt="imagenProducto">
              <div class="card-body">
                <h5 class="card-text text-truncate w-100 titulo-producto">${p.nombre}</h5>
                <p class="card-text text-truncate-local">${p.detalle}</p>
                <h6 class="card-title w-100 text-center fw-bold fs-5 text p-2 mb-3 border-bottom-local align-h6 precio-producto">$ ${p.precio}</h6>
                <div class="d-flex w-100 justify-content-evenly">
              <button class="btn btn-Comprar" id="AgregarAlCarrito" onclick="agregarAlCarritoIndex('${p.id}')">Comprar</button>
              <a href="./pages/detalleProducto.html?=${p.id}" class="btn btn-Detalle">Detalles</a>
            </div>
              </div>
            </div>
        `
    ).join("");
    
    const contenedor_productos_oferta = document.getElementById('productos-oferta-index');
    const productos_oferta = productos_array.filter(p => p.enOferta).slice(0, 4);
    contenedor_productos_oferta.innerHTML = productos_oferta.map(p =>
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
              <button class="btn btn-Comprar" id="AgregarAlCarrito" onclick="agregarAlCarritoIndex('${p.id}')">Comprar</button>
              <a href="./pages/detalleProducto.html?=${p.id}" class="btn btn-Detalle">Detalles</a>
            </div>
              </div>
            </div>
        `
    ).join("");
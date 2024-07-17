const userLogeado = JSON.parse(sessionStorage.getItem('usuarioLogeado'));
const body = document.getElementById('body-usuarios');
body.classList.add('d-none');
if (!userLogeado ||userLogeado.tipoUsuario !== 0 ) {
    alert('¡Permisos insuficientes!');
    window.location.href = "../pages/login.html"
}

body.classList.remove('d-none');
const tabla = document.getElementById('cuerpo-tabla');
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];


/*let nuevoUsuario = {
nombre: "Bloqueado",
apellido: "bloqueado",
username: "bloq",
email: "bloq@gmail.com",
password: "123456789",
tipoUsuario: 1,
esteBloqueado: true
};
usuarios.push(nuevoUsuario);
localStorage.setItem('usuarios', JSON.stringify(usuarios));
*/
const adminNoAdmin = (username) => {
    const usuarioLS = usuarios.find(u => u.username === username);
    
    if (usuarioLS) {
        usuarioLS.tipoUsuario = usuarioLS.tipoUsuario === 0 ? 1 : 0;
        const index = usuarios.findIndex(u => u.username === username);
        usuarios[index] = usuarioLS;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
    window.location.href = "../pages/gestionUsuarios.html"
}
const bloquearDesbloquear = (username) => {
    const usuarioLS = usuarios.find(u => u.username === username);
    
    if (usuarioLS) {
        usuarioLS.estaBloqueado = !usuarioLS.estaBloqueado; 
        console.log(usuarioLS)
        const index = usuarios.findIndex(u => u.username === username);
        usuarios[index] = usuarioLS;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
    
    window.location.href = "../pages/gestionUsuarios.html";
}
tabla.innerHTML = usuarios.map(u => 
    `<tr>
        <td>${u.username}</td>
        <td>${u.email}</td>
        <td>${u.tipoUsuario === 0 ? 'Si' : 'No'}</td>
        <td>${u.estaBloqueado ? 'Si' : 'No'}</td>
        <td>
            ${u.tipoUsuario === 0 
                ? `<button class="btn btn-warning btn-sm" onclick="adminNoAdmin('${u.username}')">Quitar Admin</button>` 
                : `<button class="btn btn-warning btn-sm" onclick="adminNoAdmin('${u.username}')">Hacer Admin</button>`
            }
            ${u.estaBloqueado 
                ? `<button class="btn btn-success btn-sm" onclick="bloquearDesbloquear('${u.username}')">Desbloquear</button>` 
                : `<button class="btn btn-success btn-sm" onclick="bloquearDesbloquear('${u.username}')">Bloquear</button>`
            }
        </td>
    </tr>`
).join("");

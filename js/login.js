let inputContrasenia = "";
let inputUsuario = "";

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
if (!usuarios.length) {
    let nuevoUsuario = {
        nombre: "Administrador",
        apellido: "SuperAdmin",
        username: "Sadmin",
        email: "superadmin@gmail.com",
        password: "sadmin",
        tipoUsuario: 0,
        esteBloqueado: false
    };
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}
let intentosFallidos = 0;

const ingresoAlSistema = () => {
    const usuarioInputElement = document.getElementById('usuarioInput');
    const contraseniaInputElement = document.getElementById('contraseniaInput');

    inputUsuario = usuarioInputElement.value;
    inputContrasenia = contraseniaInputElement.value;

    const usuarioErrorElement = document.getElementById('usuarioError');
    const contraseniaErrorElement = document.getElementById('contraseniaError');

    const usuarioError = validacionUsuario(inputUsuario);
    usuarioErrorElement.innerText = usuarioError;

    const contraseniaError = validacionContrasenia(inputContrasenia);
    contraseniaErrorElement.innerText = contraseniaError;

    usuarioInputElement.classList.remove('is-invalid');
    usuarioErrorElement.classList.remove('text-danger');
    contraseniaInputElement.classList.remove('is-invalid');
    contraseniaErrorElement.classList.remove('text-danger');

    let usuarioValido = usuarioError === "";
    let contraseniaValida = contraseniaError === "";

    if (!usuarioValido) {
        usuarioInputElement.classList.add('is-invalid');
        usuarioErrorElement.classList.add('text-danger');
    }

    if (!contraseniaValida) {
        contraseniaInputElement.classList.add('is-invalid');
        contraseniaErrorElement.classList.add('text-danger');
    }

    if (usuarioValido && contraseniaValida) {
        const usuarioEncontrado = usuarios.find(user => user.username === inputUsuario);
        if (usuarioEncontrado) {
            if (usuarioEncontrado.password === inputContrasenia) {
                alert('Ingreso exitoso!');
                // Redireccionar o cualquier otra acción que desees
                    sessionStorage.removeItem('usuarioLogeado') 
                    sessionStorage.setItem('usuarioLogeado', JSON.stringify(usuarioEncontrado)) 
                    window.location.href = '../index.html'; // Ejemplo de redireccionamiento
            } else {
                intentosFallidos++;
                contraseniaErrorElement.innerText = "Contraseña incorrecta.";
                contraseniaInputElement.classList.add('is-invalid');
                contraseniaErrorElement.classList.add('text-danger');
                if (intentosFallidos >= 3) {
                    alert('Usuario bloqueado. Demasiados intentos fallidos.');
                    // Lógica para bloquear al usuario
                }
            }
        } else {
            usuarioErrorElement.innerText = "Usuario no encontrado.";
            usuarioInputElement.classList.add('is-invalid');
            usuarioErrorElement.classList.add('text-danger');
        }
    }
}

const validacionUsuario = (usuario) => {
    usuario = usuario.toLowerCase();

    if (usuario.trim() === "") {
        return "El nombre de usuario no puede estar vacío.";
    }

    if (usuario.length < 5) {
        return "El nombre de usuario debe tener al menos 5 caracteres.";
    }
    if (usuario.length > 10) {
        return "El nombre de usuario no puede tener más de 10 caracteres.";
    }

    const regex = /^[a-z0-9]+$/;
    if (!regex.test(usuario)) {
        return "El nombre de usuario solo puede contener letras y números.";
    }
    return "";
}

const validacionContrasenia = (contrasenia) => {
    // Verificar que no esté vacío
    if (contrasenia.trim() === "") {
        return "La contraseña no puede estar vacía.";
    }

    // Verificar longitud mínima de 5 y máxima de 20 caracteres
    if (contrasenia.length < 5 || contrasenia.length > 20) {
        return "La contraseña debe tener entre 5 y 20 caracteres.";
    }

    // Verificar que solo contenga letras y números
    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(contrasenia)) {
        return "La contraseña solo puede contener letras y números.";
    }
    return "";
}

const btnIngreso = document.getElementById('inicioSesionBtn');
btnIngreso.addEventListener('click', ingresoAlSistema);

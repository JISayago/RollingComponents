// Variables globales
let nombre = "";
let apellido = "";
let usuario = "";
let email = "";
let contrasenia = "";
let confirmarContrasenia = "";
let termsAccepted = "";

const registroEnSistema = () => {
    nombre = document.getElementById('firstName').value.trim();
    apellido = document.getElementById('lastName').value.trim();
    usuario = document.getElementById('username').value.trim().toLowerCase();
    email = document.getElementById('email').value.trim();
    contrasenia = document.getElementById('password').value.trim();
    confirmarContrasenia = document.getElementById('confirmPassword').value.trim();
    termsAccepted = document.getElementById('terms').checked;
    
    let isValid = true;
    
    // Reset all error messages and classes
    resetErrors();
    
    // Validaciones para nombre
    if (nombre === "") {
        setError('firstName', 'El nombre no puede estar vacío.');
        isValid = false;
    }
    
    // Validaciones para apellido
    if (apellido === "") {
        setError('lastName', 'El apellido no puede estar vacío.');
        isValid = false;
    }
    
    // Validaciones para usuario
    const usuarioError = validarUsuario(usuario);
    if (usuarioError !== "") {
        setError('username', usuarioError);
        isValid = false;
    }
    
    // Validaciones para email
    const emailError = validarEmail(email);
    if (emailError !== "") {
        setError('email', emailError);
        isValid = false;
    }
    
    // Validaciones para contraseña
    const contraseniaError = validarContrasenia(contrasenia);
    if (contraseniaError !== "") {
        setError('password', contraseniaError);
        isValid = false;
    }
    
    // Validaciones para confirmar contraseña
    if (contrasenia !== confirmarContrasenia) {
        setError('confirmPassword', 'Las contraseñas no coinciden.');
        isValid = false;
    }
    
    // Validación de términos y condiciones
    if (!termsAccepted) {
        setError('terms', 'Debes aceptar los términos y condiciones.');
        isValid = false;
    }
    
    // Si todas las validaciones pasan
    if (isValid) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        if (usuarios.find(user => user.username === usuario)) {
            setError('username', 'El nombre de usuario ya está en uso.');
        } else {
            let nuevoUsuario = {
                nombre: nombre,
                apellido: apellido,
                username: usuario,
                email: email,
                password: contrasenia
            };
            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            alert('Registro exitoso!');
            window.location.href = 'login.html';
        }
    }
}

document.getElementById('registroBtn').addEventListener('click', registroEnSistema);

const resetErrors = () => {
    let errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.innerText = "";
    });
    let inputElements = document.querySelectorAll('.form-control');
    inputElements.forEach(element => {
        element.classList.remove('is-invalid');
    });
}

const setError = (elementId, message) => {
    let element = document.getElementById(elementId);
    element.classList.add('is-invalid');
    document.getElementById(elementId + 'Error').innerText = message;
}

const validarUsuario = (usuario) => {
    if (usuario === "") {
        return "El nombre de usuario no puede estar vacío.";
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

const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        return "El email no es válido.";
    }
    return "";
}

const validarContrasenia = (contrasenia) => {
    if (contrasenia.length < 5 || contrasenia.length > 20) {
        return "La contraseña debe tener entre 5 y 20 caracteres.";
    }
    const regex = /^[A-Za-z0-9]+$/;
    if (!regex.test(contrasenia)) {
        return "La contraseña solo puede contener letras y números.";
    }
    return "";
}

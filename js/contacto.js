document.getElementById('contactForm').addEventListener('submit', function(event) {
    // Obtener los valores de los campos
    var email = document.getElementById('email').value;
    var motivo = document.getElementById('motivo').value;
    var mensaje = document.getElementById('mensaje').value;

    // Obtener los elementos de error
    var emailErrorElement = document.getElementById('emailError');
    var motivoErrorElement = document.getElementById('motivoError');
    var mensajeErrorElement = document.getElementById('mensajeError');

    // Reiniciar los estilos de error
    document.getElementById('email').classList.remove('is-invalid');
    emailErrorElement.classList.remove('text-danger');
    document.getElementById('motivo').classList.remove('is-invalid');
    motivoErrorElement.classList.remove('text-danger');
    document.getElementById('mensaje').classList.remove('is-invalid');
    mensajeErrorElement.classList.remove('text-danger');

    // Validar el campo de correo electrónico
    var emailError = "";
    if (email === "") {
        emailError = "El campo de correo electrónico no puede estar vacío.";
    } else {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            emailError = "Por favor, introduce una dirección de correo electrónico válida.";
        }
    }
    emailErrorElement.innerText = emailError;

    // Validar el campo de motivo
    var motivoError = "";
    if (motivo === "") {
        motivoError = "El campo de motivo no puede estar vacío.";
    } else if (motivo.length > 20) {
        motivoError = "El motivo no puede tener más de 20 caracteres.";
    }
    motivoErrorElement.innerText = motivoError;

    // Validar el campo de mensaje
    var mensajeError = "";
    if (mensaje === "") {
        mensajeError = "El campo de mensaje no puede estar vacío.";
    } else if (mensaje.length > 250) {
        mensajeError = "El mensaje no puede tener más de 250 caracteres.";
    }
    mensajeErrorElement.innerText = mensajeError;

    // Aplicar estilos de error si hay errores
    if (emailError) {
        document.getElementById('email').classList.add('is-invalid');
        emailErrorElement.classList.add('text-danger');
    }
    if (motivoError) {
        document.getElementById('motivo').classList.add('is-invalid');
        motivoErrorElement.classList.add('text-danger');
    }
    if (mensajeError) {
        document.getElementById('mensaje').classList.add('is-invalid');
        mensajeErrorElement.classList.add('text-danger');
    }

    // Prevenir el envío del formulario si hay errores
    if (emailError || motivoError || mensajeError) {
        event.preventDefault();
    }
    if (!emailError && !motivoError && !mensajeError) {
       alert('El mensaje fue enviado correctamente.')
    }
});
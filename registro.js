// $('#signup').click(function() {
//     $('.pinkbox').css('transform', 'translateX(80%)');
//     $('.signin').addClass('nodisplay');
//     $('.signup').removeClass('nodisplay');
//   });
  
//   $('#signin').click(function() {
//     $('.pinkbox').css('transform', 'translateX(0%)');
//     $('.signup').addClass('nodisplay');
//     $('.signin').removeClass('nodisplay');
//   });

$(document).ready(function() {
    console.log("JavaScript cargado y listo");
// Mover la caja rosa y alternar secciones
$('#signup').click(function() {
    $('.pinkbox').css('transform', 'translateX(80%)');
    $('.signin').addClass('nodisplay');
    $('.signup').removeClass('nodisplay');
});

$('#signin').click(function() {
    $('.pinkbox').css('transform', 'translateX(0%)');
    $('.signup').addClass('nodisplay');
    $('.signin').removeClass('nodisplay');
});

// Validación del formulario de registro
$('#registerForm').on('submit', function(e) {
    e.preventDefault();  // Prevenir el envío por defecto
    console.log("Formulario de registro enviado");

    var username = $('#username').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var confirmPassword = $('#confirmPassword').val();
    var date = $('#date').val();

    if (username === "" || email === "" || password === "" || confirmPassword === "" || date === "") {
    $('#formMessage').text('Todos los campos son obligatorios').css('color', 'red');
    return;
    }

    if (password !== confirmPassword) {
    $('#formMessage').text('Las contraseñas no coinciden').css('color', 'red');
    return;
    }
    console.log("Datos validados, enviando al servidor");

    $.ajax({
    url: 'registro.php',
    type: 'POST',
    data: { username: username, email: email, password: password, date: date },
    success: function(response) {
        $('#formMessage').text(response).css('color', 'green');
        // Redirigir a la página de inicio después del registro exitoso
        if(response.includes("Registro exitoso")) {
        window.location.href = 'IsMaJo.html';
        }
    }
    
    });
});

// Validación del formulario de inicio de sesión
$('#loginForm').on('submit', function(e) {
    e.preventDefault(); // Prevenir el envío por defecto

    var username = $('#loginForm input[name="username"]').val();
    var password = $('#loginForm input[name="password"]').val();

    if (username === "" || password === "") {
    alert('Por favor, completa todos los campos');
    return;
    }

    $.ajax({
    url: 'login.php',
    type: 'POST',
    data: { username: username, password: password },
    success: function(response) {
        if(response.includes("Inicio de sesión exitoso")) {
        // Guardar la sesión del usuario y redirigir a la página principal
        window.location.href = 'IsMaJo.html';
        } else {
        alert(response);
        }
    }
    });
});

// Botón de cierre de sesión
$('#logout').click(function() {
    $.ajax({
    url: 'logout.php',
    type: 'POST',
    success: function(response) {
        window.location.href = 'registro.html';
    }
    });
});
});
  

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="/css/inicio.css">
    <script src="/js/login.js"></script>
</head>
<body>
    <div class="inicio">
        <h2>Iniciar sesión</h2>
        
        <form id="formulario-login">
            <input type="text" id="usuario" placeholder="Usuario o email" required>
            <input type="password" id="password" placeholder="Contraseña" required>

            <button type="submit" id="enviar">Enviar</button>
        </form>

        <h3>Si no te has registrado, hazlo ahora</h3>
        <button type="submit" id="registro">Registrarse</button>
    </div>
</body>
</html>
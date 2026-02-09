<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="/css/login.css">
</head>
<body>
    <div class="contenedor-login">
        <h2>Iniciar sesión</h2>
        <form id="formulario-login">
            <input type="text" id="usuario" placeholder="Email o usuario" require>
            <input type="password" id="password" placeholder="Contraseña" require>

            <button type="submit">Enviar</button>
        </form>

        <h3>Si no te has registrado, hazlo ahora</h3>
        <button type="submit">Registrarse</button>

        <div class="mensaje" id="mensaje"></div>
    </div>

    <script src="/js/login.js"></script>
</body>
</html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="contenedor-login">
        <h2>Iniciar sesión</h2>
        <form id="formulario-login">
            <input type="text" id="usuario" placeholder="Email o usuario" require>
            <input type="password" id="password" placeholder="Contraseña" require>

            <button type="submit">Enviar</button>
        </form>

        <div class="mensaje" id="mensaje"></div>
    </div>
</body>
</html>
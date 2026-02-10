<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
    <link rel="stylesheet" href="/css/inicio.css">
    <script src="/js/registro.js"></script>
</head>
<body>
    <div class="inicio">
        <h2>Registro de usuario</h2>
        
        <form id="formulario-registro">
            <input type="text" id="nombre" placeholder="Nombre" required>
            <input type="text" id="apellido" placeholder="Apellido" required>
            <input type="date" id="fecha_nacimiento" required>
            
            <input type="email" id="email" placeholder="Email" required>
            <input type="password" id="password" placeholder="Contraseña" required>
            
            <input type="number" id="peso_base" placeholder="Peso actual" required>
            <input type="number" id="altura_base" placeholder="Altura actual" required>

            <button type="submit" id="registro">Registrarse</button>
        </form>

        <h3>¿Ya tienes cuenta?</h3>
        <button type="submit" id="iniciar_sesion">Iniciar Sesión</button>
    </div>
</body>
</html>
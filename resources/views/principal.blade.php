<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página principal</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <script pt src="{{ asset('js/logout.js') }}"></script>
    <script src="{{ asset('js/bloque.js') }}"></script>
    <script src="{{ asset('js/perfil.js') }}"></script>
    <script src="{{ asset('js/planes.js') }}"></script>
    <script src="{{ asset('js/resultados.js') }}"></script>
    <script src="{{ asset('js/sesiones.js') }}"></script>
    <script src="{{ asset('js/sesionbloque.js') }}"></script>
    <script src="{{ asset('js/historico.js') }}"></script>
</head>
<body>
    <header>
        <h1>Entrenamientos ciclistas</h1>
        <nav>
            <ul id="menu">
                <li>Inicio</li>
                <li>Entrenamientos
                    <div class="submenu">
                        <p id="sesiones">Sesiones</p>
                        <p id="planes">Planes</p>
                        <p id="resultados">Resultado</p>
                    </div>
                </li>
                <li>Bloques
                    <div class="submenu">
                        <p id="bloques">Bloques</p>
                        <p id="sesion_bloque">Sesiones</p>
                    </div>
                </li>
                <li>Usuario
                    <div class="submenu">
                        <p id="perfil">Perfil</p>
                        <p id="historico">Historico</p>
                        <button type="submit" id="cerrar_sesion">Cerrar Sesión</button>
                    </div>
                </li>
            </ul>
        </nav>
    </header>
    
    <main>
        <div id="contenido"></div>
    </main>
    
    <footer></footer>
</body>
</html>
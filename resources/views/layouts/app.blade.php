<!DOCTYPE html>
<html>
    <style>
        input:focus {
            border: 1px solid #d6d6d6 !important;
            outline: none;
        }
        #results {
            border: 1px solid #d6d6d6;
            /*display: inline-block;*/
            display: none;
            position: absolute;
            left: 8px;
            margin-top: 26px;
            width: 400px;
            padding: 10px;
            list-style: none;
            z-index: 1000;
            background-color: white;
            border-top-width: 0px;
            border-radius: 0 0 15px 15px;
        }

        #results li {
            padding: 10px;
        }

        #results li:hover {
            background-color: #d6d6d6;
        }
        #search {
            width: 400px;
            padding: 10px;
            border-radius: 15px;
            border: 1px solid #d6d6d6;
        }
        .column {
            display: table-cell;
            width: 45%;
        }
        #detallearticulo{
            border: 1px solid gray;
            padding: 20px;
        }
        #detalle_titulo
        {
            color: #8800FF;
        }
        .detalle_info {
            display: inline-block;
            margin-left: 5px;
            margin-right: 5px;
            font-size: 0.9em;
            font-style: italic;
            font-weight: bold;
        }   
        p#detalle_contenido {
            font-size: 1.2em;
            font-family: roboto;
        }
        .card{
            margin: 10px; 
            border-radius: 8px; 
            transition: box-shadow 0.3s ease, transform 0.2s ease; 
        }
        .card:hover {
            cursor: pointer; 
            box-shadow: 0 8px 24px rgba(0,0,0,0.2); 
            transform: translateY(-2px); 
        }
    </style>
    <script>
        let timeout = null;
        var index = 1;
        var offset = 0;
        var limit = 5; 

        function init()
        {
            document.getElementById('search').addEventListener('input', function (e) {
                const query = e.target.value;

                clearTimeout(timeout);

                timeout = setTimeout(() => {
                    if (query.length < 2) {
                        document.getElementById('results').style.display="none";
                        document.getElementById('results').innerHTML = '';
                        return;
                    }

                    fetch(`/api/articles?q=${encodeURIComponent(query)}`)
                        .then(res => res.json())
                        .then(data => {
                            const ul = document.getElementById('results');
                            ul.innerHTML = '';

                            data.forEach(article => {
                                const li = document.createElement('li');
                                li.textContent = article.title;
                                ul.appendChild(li);
                            });
                            document.getElementById('results').style.display="inline-block";
                        });
                    }, 300); // debounce 300ms
            });
            
            document.addEventListener('scrollend', function(e)
            {
                console.log("scroll end");
                var scrollY = window.scrollY; 
                if ( screen.height + window.scrollY >= document.body.offsetHeight-100)
                {
                    // añadir más articulos al div con id=container
                    desde = document.getElementsByClassName("card mt-3").length;
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function() {
                        if (this.readyState == 4) {
                            if ( this.status == 200 ){
                                // devuelve una lista de articulos
                                var data = xhttp.responseText;
                                // recorrer la lista y por cada articulo llamar a la funcion pintarArticulo
                                var articulos = JSON.parse(data);
                                console.log(articulos);
                                for (var i=0; i<articulos.length; i++)
                                {
                                    pintarArticulo(articulos[i].id, articulos[i].title, articulos[i].content, articulos[i].author);
                                } 
                            }else{
                                // la peticion ha terminado pero no ha devuelto codigo 200
                                console.log("error de peticion: " + this.status);
                            }
                        }
                    };
                    xhttp.open("GET", "/api/articles?desde=" + desde + "&limit=" + limit, true);
                    xhttp.send();
                     /*           
                    for ( var i=0; i<5; i++)
                    {
                        pintarArticulo("Titulo articulo " + index, "Texto del contenido del articulo " + index, "");
                        index++;
                    }   
                        */

                }
            });

            var elementos_card = document.getElementsByClassName("card");
            for( var i=0; i<elementos_card.length; i++)
            {
                elementos_card[i].addEventListener('click', function(e)
                {
                    
                    // elementos_card[i]
                    //articulo_1
                    var id_text = this.id; 
                    verDetalleArticulo(id_text.split("_")[1]); 
                });
            }
        }

        function verDetalleArticulo(id)
        {
            console.log("click en articulo: " + id);

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if ( this.status == 200 ){
                        // devuelve una lista de articulos
                        var data = xhttp.responseText;
                        var articulo = JSON.parse(data);
                        /*
                            {
                                "id": 1, 
                                "title": "un título", 
                                "body": "un texto cualquiera para este articulo", 
                                "author": "un autor",
                                "published": "2025-12-27", 
                                "created": "2025-12-01" 
                            }
                        */
                       document.getElementById("detalle_titulo_articulo").innerText= articulo.title;
                       console.log("articulo actualizado " + this.status); 
                       document.getElementById("detalle_contenido").innerText= articulo.body;
                       console.log("contenido actualizado: " + this.status); 
                       document.getElementById("detalle_autor").innerText= articulo.author;
                       console.log("autor actualizado: " + articulo.author);
                       document.getElementById("detalle_fecha_creacion").innerText= articulo.created;
                       console.log("detalle actualizado: " + articulo.created);
                       document.getElementById("detalle_fecha_publicacion").innerText= articulo.published;
                       console.log("fecha actualizada: " + articulo.published);
         
                    }else{
                        // la peticion ha terminado pero no ha devuelto codigo 200
                        console.log("error de peticion: " + this.status);
                    }
                }
            };
            xhttp.open("GET", "/api/articles/" + id, true); //GET /api/articles/1
            xhttp.send();
        }

        function pintarArticulo( id, titulo, contenido, autor)
        {
            let contenedor = document.getElementById("listadoarticulos"); 
            let articuloDiv = document.createElement("div"); 
            articuloDiv.setAttribute("class", "card mt-3"); 
            articuloDiv.setAttribute("id", "articulo_" + id);
            let cardDiv = document.createElement("div"); 
            cardDiv.setAttribute("class", "card-body");
            articuloDiv.appendChild(cardDiv); 
            let h3 = document.createElement("h3");
            cardDiv.appendChild(h3);  
            let a = document.createElement("a"); 
            a.setAttribute("href", "");
            a.innerText=titulo + ", " + autor; 
            h3.appendChild(a); 
            let p = document.createElement("p"); 
            p.innerText = contenido; 
            cardDiv.appendChild(p); 

            contenedor.appendChild(articuloDiv);

           articuloDiv.addEventListener('click', function(e)
            {
                verDetalleArticulo(id); 
            });
        }

    </script>

<head>
    <meta charset="UTF-8">
    <title>Mi Aplicación</title>

    {{-- aquí puedes cargar CSS, Bootstrap, Vite, etc --}}
</head>
<body onload="init()">
    <header>
        <h1>Mi Web</h1>
        {{-- Menú, navbar, etc --}}
    </header>

    <main class="container">
        @yield('content')   {{-- → Aquí se insertan las vistas hijas --}}
    </main>

    <footer>
        <p>Footer aquí</p>
    </footer>
</body>
</html>
@extends('layouts.app')
@section('content')

<input type="text" id="search" placeholder="Buscar artículos...">
<ul id="results"></ul>

<div class="container" id="container">
    <div id="listadoarticulos" class="column">
        <h1>Artículos</h1>
        <a href="{{ route('articles.create') }}" class="btn btn-primary">Crear artículo</a>
        @foreach($articles as $article)
        <div class="card mt-3" id="articulo_{{ $article->id }}">
        <div class="card-body">
        <h3>{{ $article->title }}</h3>
        <p>{{ Str::limit($article->content, 150) }}</p>
        </div>
        </div>
        @endforeach
    
        <div class="mt-3">

        </div>
    </div>
    <div id="detallearticulo" class="column">
        <!-- titulo -->
         <h1 id="detalle_titulo_articulo">T&iacute;tulo del art&iacute;culo</h1>
         <div>
            <!-- autor -->
            <div class="detalle_info" id="detalle_autor">Juan Perez</div>
            <!-- fecha creacion -->
            <div class="detalle_info" id="detalle_fecha_creacion">1-12-2025</div>
            <!-- fecha publicacion -->
            <div class="detalle_info" id="detalle_fecha_publicacion">5-12-2025</div>
        </div>
        <!-- contenido -->
        <p id="detalle_contenido">What is Lorem Ipsum?
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book. It has survived not only five centuries, but also the leap into 
            electronic typesetting, remaining essentially unchanged. It was popularised in 
            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

    </div>


</div>
@endsection
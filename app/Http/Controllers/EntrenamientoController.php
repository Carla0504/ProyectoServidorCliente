<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EntrenamientoController extends Controller
{
    //resultados de entrenamiento 
    // (registrar resultados de una sesión de entrenamiento y consulta resultados)
    //no se que campos hay que rellenar
    public function register(Request $request){
        $data = $request->validate([
            'ciclista' => 'required|string|max:255',
            'tipo_de_entrenamiento' => 'required|string|max:255',

        ]);
    }
}

<?php

namespace App\Http\Controllers;
use App\Models\ResultadoEntrenamiento;
use Illuminate\Http\Request;

class ResultadoEntrenamientoController extends Controller
{
    //validacion (hayq ue hacerla no la quites)
    public function create(Request $request){
        $data = $request->validate([
            // falta establecer campos usando los resultado de una sesión.
        ]);

        $resultado = ResultadoEntrenamiento::create($data);

        return response()->json([
            'message'=>'Resultado entrenamiento creado correctamente',
            'data' => $resultado
        ], 201);
    }

    public function get($id) {
        $data = [];

        if (isset($id))
            $data = ResultadoEntrenamiento::query()->
                where('id', $id)->
                get();

        return response()->json($data);
    }
}

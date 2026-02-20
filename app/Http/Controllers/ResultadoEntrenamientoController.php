<?php

namespace App\Http\Controllers;
use App\Models\ResultadoEntrenamiento;
use Illuminate\Http\Request;

class ResultadoEntrenamientoController extends Controller
{
    public function listDetails(){
        $data = ResultadoEntrenamiento::all();

        return response()->json($data);
    }

    //validacion (hayq ue hacerla no la quites)
    public function create(Request $request){
        // $ciclistaId = $request->session()->get('ciclista_id');
        
        $request->validate([
            'id_ciclista' => 'required|numeric|exists:ciclista,id',
            'id_sesion' => 'required|numeric|exists:sesion_entrenamiento,id',
            'id_bicicleta' => 'required|numeric|exists:bicicleta,id',
            'fecha' => 'required|date',
            'duracion' => 'required|string|max:255',
            'kilometros' => 'required|numeric',
            'recorrido' => 'required|string|max:255',
            'pulso_medio' => 'required|numeric',
            'pulso_max' => 'required|numeric',
            'potencia_media' => 'required|numeric',
            'potencia_normalizada' => 'required|numeric',
            'velocidad_media' => 'required|numeric',
            'puntos_estres_tss' => 'required|numeric',
            'factor_intensidad_if' => 'required|numeric',
            'ascenso_metros' => 'required|numeric',
            'comentario' => 'required|string|max:255',
        ]);

        $resultado = ResultadoEntrenamiento::create([
            'id_ciclista' => $request->id_ciclista,
            'id_bicicleta' => $request->id_bicicleta,
            'id_sesion' => $request->id_sesion,
            'fecha' => $request->fecha,
            'duracion' => $request->duracion,
            'kilometros' => $request->kilometros,
            'recorrido' => $request->recorrido,
            'pulso_medio' => $request->pulso_medio,
            'pulso_max' => $request->pulso_max,
            'potencia_media' => $request->potencia_media,
            'potencia_normalizada' => $request->potencia_normalizada,
            'velocidad_media' => $request->velocidad_media,
            'puntos_estres_tss' => $request->puntos_estres_tss,
            'factor_intensidad_if' => $request->factor_intensidad_if,
            'ascenso_metros' => $request->ascenso_metros,
            'comentario' => $request->comentario
        ]);

       return response()->json(['message' => 'Resultado guardado', 'data' => $resultado], 201);
    }

    public function getResultados($id) {
        /*$ciclistaId = session()->get('ciclista_id');

        if (!$ciclistaId) {
            return response()->json(['message' => 'No autorizado'], 401);
        }*/
        if ($id) {
            $resultado = ResultadoEntrenamiento::where('id', $id)->get();
            return $resultado ? response()->json($resultado) : response()->json(['message' => 'No encontrado'], 404);
        }
        
        //$historico = ResultadoEntrenamiento::where('id_ciclista',$ciclistaId)->orderBy('fecha','desc')->get();

        return response()->json($resultado);
        
    }
}

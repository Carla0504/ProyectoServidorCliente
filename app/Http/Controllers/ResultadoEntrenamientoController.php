<?php

namespace App\Http\Controllers;
use App\Models\ResultadoEntrenamiento;
use Illuminate\Http\Request;

class ResultadoEntrenamientoController extends Controller
{
    //validacion (hayq ue hacerla no la quites)
    public function create(Request $request){
        $ciclistaId = $request->session()->get('ciclista_id');
        
        $request->validate([
            'id_sesion' => 'required',
            'id_bicicleta' => 'required',
            'fecha' => 'required|date',
            'duracion' => 'required',
            'kilometros' => 'required|numeric'
        ]);

        $resultado = ResultadoEntrenamiento::create([
            'id_ciclista' => $ciclistaId,
            'id_bicicleta' => $request->id_bicicleta,
            'id_sesion' => $request->id_sesion,
            'fecha' => $request->fecha,
            'duracion' => $request->duracion,
            'kilometros' => $request->kilometros,
            'recorrido' => $request->recorrido,
            'pulso_medio' => $request->pulso_medio,
            'pulso_max' => $request->pulso_max,
            'comentario' => $request->comentario
        ]);

       return response()->json(['message' => 'Resultado guardado', 'data' => $resultado], 201);
    }

    public function getResultados($id) {
        $ciclistaId = session()->get('ciclista_id');

        if(!$ciclistaId){
            return response()->json(['message' => 'No autorizafo'], 401);
        }
        if($id){
            $resultado = Entrenamiento::where('id_ciclista', $ciclistaId)->find($id);
            return $resultado ? response()->json($resultado) : response()->json(['message' => 'No encontrado'], 404);
        }
        
        $historico = Entrenamiento::where('id_ciclista',$ciclistaId)->orderBy('fecha','desc')->get();

        return response()->json($historico);
        
    }
}

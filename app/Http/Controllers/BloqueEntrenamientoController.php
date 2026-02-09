<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BloqueEntrenamientoController extends Controller
{
    //validacion (hayq ue hacerla no la quites)
    public function create(Request $request){
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string|max:255',
            'tipo' => 'required|string|max:255',
            'duracion'=> 'required', //no se validar ints miralo
            'potencia_pct_min'=>'required',
            'potencia_pct_max'=>'required',
            'pulso_reserva_pct'=>'required',
            'comentario' => 'required',//en el coso de laravel pone que en body se pone asi asique suponemos que aqui tambien
        ]);

        if ($data->fails()) return response()->json($data->errors(), 400);

        $data => BloqueEntrenamiento::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'tipo' => $request->tipo,
            'duracion' => $request->duracion_estimada,
            'potencia_pct_min' => $request->potencia_pct_min,
            'potencia_pct_max' => $request->potencia_pct_max,
            'pulso_reserva_pct' => $request->pulso_reserva_pct,
            'comentario' => $request->comentario,
        ]);

        return response()->json(['message'=>'Bloque creado']);
    }

    public function listDetails(){
        $data => BloqueEntrenamiento::all();
    }
}

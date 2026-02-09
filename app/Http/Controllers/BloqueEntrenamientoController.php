<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BloqueEntrenamientoController extends Controller
{
    //
    public function create(Request $request){
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
}

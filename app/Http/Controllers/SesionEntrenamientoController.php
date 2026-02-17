<?php

namespace App\Http\Controllers;

use App\Models\SesionEntrenamiento;
use Illuminate\Http\Request;

class SesionEntrenamientoController extends Controller
{
    public function listDetails(){
        $data = SesionEntrenamiento::all();

        return response()->json($data);
    }
    
    public function create(Request $request){
        $data = $request->validate([
            'fecha' => 'required|date',
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string|max:255',
            'completa' => 'required|boolean'
        ]);

        $plan = SesionEntrenamiento::create($data);

        return response()->json([
            'message'=>'Plan creado correctamente',
            'data' => $plan 
        ], 201);
    }

    public function get($id) {
        $data = [];

        if (isset($id))
            $data = SesionEntrenamiento::query()->
                where('id', $id)->
                get();

        return response()->json($data);
    }

    public function destroy(SesionEntrenamiento $sesion_entrenamiento)
    {
        $sesion_entrenamiento->delete();

        return response()->json([
            "message" => "Sesión eliminada correctamente"
        ]);
    }
}
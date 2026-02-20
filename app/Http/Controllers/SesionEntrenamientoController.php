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
            'id_plan' => 'required|numeric',
            'fecha' => 'required|date',
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string|max:255',
            'completada' => 'required|numeric'
        ]);

        $sesion = SesionEntrenamiento::create($data);

        return response()->json([
            'message'=>'Sesión creada correctamente',
            'data' => $sesion 
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

    public function destroy($id)
    {
        $sesion_entrenamiento = SesionEntrenamiento::findOrFail($id);
        $sesion_entrenamiento->foreign('sesion_entrenamiento_id')
        ->references('id')
        ->on('sesion_entrenamientos')
        ->onDelete('cascade');


        return response()->json([
            "message" => "Sesion entrenamiento eliminado correctamente"
        ]);
    }
}
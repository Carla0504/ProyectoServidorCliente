<?php

namespace App\Http\Controllers;
use App\Models\PlanEntrenamiento;
use Illuminate\Http\Request;

class PlanEntrenamientoController extends Controller
{
    // listar todos
    public function listDetails(){
        $data = PlanEntrenamiento::all();

        return response()->json($data);
    }

    //validacion (hayq ue hacerla no la quites)
    public function create(Request $request){
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string|max:255',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date',
            'descripcion' => 'required|string|max:255',
            'activo' => 'required|numeric',
        ]);

        $plan = PlanEntrenamiento::create($data);

        return response()->json([
            'message'=>'Plan creado correctamente',
            'data' => $plan 
        ], 201);
    }

    public function get($id) {
        $data = [];

        if (isset($id))
            $data = PlanEntrenamiento::query()->
                where('id', $id)->
                get();

        return response()->json($data);
    }

    public function destroy(PlanEntrenamiento $plan_entrenamiento)
    {
        $plan_entrenamiento->delete();

        return response()->json([
            "message" => "Plan eliminado correctamente"
        ]);
    }
}

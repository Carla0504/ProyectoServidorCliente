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
            'id_ciclista' => 'required|numeric|exists:ciclista,id',
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string|max:255',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date',
            'objetivo' => 'required|string|max:255',
            'activo' => 'required|numeric',
        ]);

        $plan = PlanEntrenamiento::create($data);

        return response()->json([
            'message'=>'Plan creado correctamente',
            'data' => $plan 
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'id_ciclista' => 'required|numeric|exists:ciclista,id',
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string|max:255',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date',
            'objetivo' => 'required|string|max:255',
            'activo' => 'required|numeric',
        ]);

        $plan = PlanEntrenamiento::findOrFail($id);
        $plan->update($data);

        return response()->json([
            'message'=>'Plan modificado correctamente',
            'data' => $plan
        ], 200);
    }

    public function get($id) {
        $data = [];

        if (isset($id))
            $data = PlanEntrenamiento::query()->
                where('id', $id)->
                get();

        return response()->json($data);
    }

    public function destroy($id)
    {
        $plan = PlanEntrenamiento::findOrFail($id);

        foreach ($plan->sesiones as $sesion) {
            $sesion->entrenamientos()->delete();
            $sesion->delete();
        }

        $plan->delete();

        return response()->json([
            "message" => "Plan eliminado correctamente"
        ]);
    }
}

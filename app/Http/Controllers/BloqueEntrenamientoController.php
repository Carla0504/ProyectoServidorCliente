<?php

namespace App\Http\Controllers;
use App\Models\BloqueEntrenamiento;
use Illuminate\Http\Request;

class BloqueEntrenamientoController extends Controller
{
    // listar todos
    public function listDetails(){
        $data = BloqueEntrenamiento::all();

        return response()->json($data);
    }

    //validacion (hayq ue hacerla no la quites)
    public function create(Request $request){
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string|max:255',
            'tipo' => 'required|string|max:255',
            'duracion_estimada'=> 'required|numeric',
            'potencia_pct_min'=>'required|numeric',
            'potencia_pct_max'=>'required|numeric',
            'pulso_pct_max'=>'required|numeric',
            'pulso_reserva_pct'=>'required|numeric',
            'comentario' => 'required|string|max:255',//en el coso de laravel pone que en body se pone asi asique suponemos que aqui tambien
        ]);

        $bloque = BloqueEntrenamiento::create($data);

        return response()->json([
            'message'=>'Bloque creado correctamente',
            'data' => $bloque 
        ], 201);
    }

    public function get($id) {
        $data = [];

        if (isset($id))
            $data = BloqueEntrenamiento::query()->
                where('id', $id)->
                get();

        return response()->json($data);
    }

    public function destroy(BloqueEntrenamiento $bloque_entrenamiento)
    {
        $bloque_entrenamiento->delete();

        return response()->json([
            "message" => "Bloque eliminado correctamente"
        ]);
    }
}

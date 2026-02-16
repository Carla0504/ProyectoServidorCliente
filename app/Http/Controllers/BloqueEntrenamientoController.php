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
            'descripcion' => 'nullable|string|max:255',
            'tipo' => 'required|string|max:255',
            'duracion_estimada'=> 'nullable', //no se validar ints miralo
            'potencia_pct_min'=>'nullable|numeric',
            'potencia_pct_max'=>'nullable|numeric',
            'pulso_pct_max'=>'nullable|numeric',
            'pulso_reserva_pct'=>'nullable|numeric',
            'comentario' => 'nullable|string|max:255',//en el coso de laravel pone que en body se pone asi asique suponemos que aqui tambien
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

    public function destroy(Request $request, BloqueEntrenamiento $data) {
        try {
            $data->delete();
            $response = [
                "status" => "ok",
                "message" => "Bloque eliminado correctamente"
            ];
            return response()->json($response);
        } catch (Exception $e) {
            $response = [
                "status" => "error",
                "message" => $e->getMessage()
            ];
            return response()->json($response);
        }
    }
}

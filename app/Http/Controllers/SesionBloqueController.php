<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SesionBloque;

class SesionBloqueController extends Controller
{
    // listar todos
    public function listDetails(){
        $data = SesionBloque::all();

        return response()->json($data);
    }

    //validacion (hayq ue hacerla no la quites)
    public function create(Request $request){
        $data = $request->validate([
            'id_sesion_entrenamiento' => 'required|numeric',
            'id_bloque_entrenamiento' => 'required|numeric',
            'orden' => 'required|numeric',
            'repeticiones' => 'required|numeric',
        ]);

        $sesionbloque = SesionBloque::create($data);

        return response()->json([
            'message'=>'Sesion bloque creado correctamente',
            'data' => $sesionbloque 
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'id_sesion_entrenamiento' => 'required|numeric',
            'id_bloque_entrenamiento' => 'required|numeric',
            'orden' => 'required|numeric',
            'repeticiones' => 'required|numeric',
        ]);

        $sesionbloque = SesionBloque::findOrFail($id);
        $sesionbloque->update($data);

        return response()->json([
            'message'=>'Sesion bloque modificado correctamente',
            'data' => $sesionbloque
        ], 200);
    }

    public function get($id) {
        $data = [];

        if (isset($id))
            $data = SesionBloque::query()->
                where('id', $id)->
                get();

        return response()->json($data);
    }

    public function destroy($id)
    {
        $sesionbloque = SesionBloque::findOrFail($id);
        $sesionbloque->delete();

        return response()->json([
            "message" => "Sesion bloque eliminado correctamente"
        ]);
    }
}

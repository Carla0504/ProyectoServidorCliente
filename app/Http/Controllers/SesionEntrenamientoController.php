<?php

namespace App\Http\Controllers;

use App\Models\SesionEntrenamiento;
use Illuminate\Http\Request;

class SesionEntrenamientoController extends Controller
{
    public function listDetails(Request $request) {
        //scroll infinito lo que hicimos con la travellist
        $offset = $request->query('offset', 0);
        $limit = $request->query('limit', 10);

        $sesiones = SesionEntrenamiento::with('bloques') //carda bloques relacionados
            ->skip($offset)
            ->take($limit)
            ->get();

        return response()->json($sesiones);
    }

    public function create(Request $request) {
        $sesion = SesionEntrenamiento::create($request->all());
        return response()->json($sesion, 201);
    }

    public function get($id) {
        $sesion = SesionEntrenamiento::with('bloques')->find($id);
        if (!$sesion) return response()->json(['message' => 'No encontrado'], 404);
        return response()->json($sesion);
    }

    public function destroy(SesionEntrenamiento $sesion_entrenamiento)
    {
        $sesion_entrenamiento->delete();

        return response()->json([
            "message" => "Sesion eliminado correctamente"
        ]);
    }
}
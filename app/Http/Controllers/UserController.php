<?php

namespace App\Http\Controllers;
use App\Models\Ciclista;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function register(Request $request) {
        //
        $data = $request->validate( [
            'nombre' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:ciclista',
            'password' => 'required|string|min:8', //la coma por si acaso
        ]);

        if ($data->fails()) return response()->json($data->errors(), 400); //si no hay datos o datos erroneos da error

        $ciclista = Ciclista::create([
            'nombre' => $request->nombre,
            'apellidos' => $request->apellidos,
            'fecha_nacimiento' => $request->fecha_nacimiento,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'peso_base' => $request->peso_base,
            'altura_base' => $request->altura_base,
        ]);

        return response()->json(['message' => 'Usuario registrado'], 201);
    }

    public function login(Request $request) {
        $ciclista = Ciclista::where('email', $request->email)->first();

        if (!$ciclista || !Hash::check($request->password, $ciclista->password)) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }

        // Generación del token obligatorio 
        $token = $ciclista->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $ciclista
        ]);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Sesión cerrada']);
    }
}

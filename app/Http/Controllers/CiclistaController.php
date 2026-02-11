<?php

namespace App\Http\Controllers;
use App\Models\Ciclista;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash; //cifrado

class CiclistaController extends Controller
{
    //registro de ciclista 
    public function register(Request $request) {
        //recibe datos 
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
            'password' => Hash::make($request->password),//se supone que con esto se encripta la contraseña, preguntar a profe sino
            'peso_base' => $request->peso_base,
            'altura_base' => $request->altura_base,
        ]);

        return response()->json(['message' => 'Usuario registrado'], 201);
    }


    public function login(Request $request) {
        $ciclista = Ciclista::where('email', $request->email)->first();

        //si no existe o la contraaseña no es correcta da error
        if (!$ciclista || !Hash::check($request->password, $ciclista->password)) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }

        //general el token que es como un coso que te dice que si existe (como un DNi digital mas o menos)
        $token = $ciclista->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $ciclista
        ]);
    }

    //borra el token para salie de la sesion
    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Sesión cerrada']);
    }
}
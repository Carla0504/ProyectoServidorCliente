<?php

namespace App\Http\Controllers;

use App\Models\Ciclista;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash; //cifrado

class CiclistaController extends Controller
{
    //registro de ciclista 
    public function register(Request $request) {

        $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:ciclista',
            'password' => 'required|string|min:8',
        ]);

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
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $ciclista = Ciclista::where('email', $request->email)->first();

        if (!$ciclista || !Hash::check($request->password, $ciclista->password)) {
            return response()->json(['message' => 'Credenciales inválidas']);//,401 -> esto daba el error, siento los dolores de cabeza guapetones
        }
        // Esto equivale al session_start() y $_SESSION['user'] = ... que es la session que utiliza laravel
        $request->session()->put('ciclista_id', $ciclista->id);//guarda id ciclista
        $request->session()->put('ciclista_nombre', $ciclista->nombre);//guarda nombre ciclista

        return response()->json([
            'message' => 'Login correcto',
            'user' => $ciclista
        ]);
    }

    //borra el token para salie de la sesion
    public function logout(Request $request) {
        //borra datos del ciclista en la sesion
        $request->session()->forget(['ciclista_id', 'ciclista_nombre']);
        $request->session()->invalidate();
        $request->session()->regenerateToken();//segun un señor sin esto podria petar asi que mejor se qeda

        return response()->json(['message' => 'Sesión cerrada']);
        }
}
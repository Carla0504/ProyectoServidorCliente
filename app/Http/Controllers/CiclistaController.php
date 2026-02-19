<?php
namespace App\Http\Controllers;

use App\Models\Ciclista;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\HistoricoCiclista;

class CiclistaController extends Controller
{
    public function showLoginForm()
    {
        return view('login');
    }


    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ], [
            'email.required' => 'El email es obligatorio',
            'email.email' => 'El email debe ser válido',
            'password.required' => 'La contraseña es obligatoria'
        ]);

        //busca por mail
        $ciclista = Ciclista::where('email', $request->email)->first();

        //verificacion 
        if (!$ciclista || !Hash::check($request->password, $ciclista->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Credenciales incorrectas' . $ciclista->password
            ], 401);
        }

        session_start();//para nada nos ha faltado esto en todos los logins
        $_SESSION['ciclista_id'] = $ciclista->id;
        $_SESSION['ciclista_nombre'] = $ciclista->nombre;
        $_SESSION['ciclista_email'] = $ciclista->email;
        $_SESSION['logueado'] = true;

        return response()->json([
            'success' => true,
            'message' => 'Login correcto',
            'user' => [
                'id' => $ciclista->id,
                'nombre' => $ciclista->nombre,
                'email' => $ciclista->email
            ]
        ]);
    }

    public function register(Request $request)
    {
        //validacion de registro
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
            'email' => 'required|email|unique:ciclista,email',
            'password' => 'required|string|min:6',
            'fecha_nacimiento' => 'required|date',
            'peso' => 'required|numeric|min:1|max:200',
            'altura' => 'required|numeric|min:50|max:250'
        ], [
            'nombre.required' => 'El nombre es obligatorio',
            'apellidos.required' => 'Los apellidos son obligatorios',
            'email.required' => 'El email es obligatorio',
            'email.unique' => 'Este email ya está registrado',
            'password.required' => 'La contraseña es obligatoria',
            'password.min' => 'La contraseña debe tener al menos 6 caracteres',
            'fecha_nacimiento.required' => 'La fecha de nacimiento es obligatoria',
            'peso.required' => 'El peso es obligatorio',
            'altura.required' => 'La altura es obligatoria'
        ]);

        //crea ciclista/user
        $ciclista = Ciclista::create([
            'nombre' => $request->nombre,
            'apellidos' => $request->apellidos,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'fecha_nacimiento' => $request->fecha_nacimiento,
            'peso' => $request->peso,
            'altura' => $request->altura
        ]);

        //inicia sesion despues del log
        session_start();
        $_SESSION['ciclista_id'] = $ciclista->id;
        $_SESSION['ciclista_nombre'] = $ciclista->nombre;
        $_SESSION['ciclista_email'] = $ciclista->email;
        $_SESSION['logueado'] = true;

        return response()->json([
            'success' => true,
            'message' => 'Registro correcto',
            'user' => [
                'id' => $ciclista->id,
                'nombre' => $ciclista->nombre,
                'email' => $ciclista->email
            ]
        ], 201);
    }
    //por si no esta logueado
    public function showRegisterForm()
    {
        return view('registro');
    }

 
    public function logout(Request $request)
    {
        session_start();
        
        $_SESSION = array();
        
        session_destroy();

        return response()->json([
            'success' => true,
            'message' => 'Sesión cerrada correctamente'
        ]);
    }

    //poara ver si la sesion está activa
    public function checkSession(Request $request){
        session_start();
        
        if (isset($_SESSION['logueado']) && $_SESSION['logueado'] === true) {
            return response()->json([
                'logueado' => true,
                'user' => [
                    'id' => $_SESSION['ciclista_id'],
                    'nombre' => $_SESSION['ciclista_nombre'],
                    'email' => $_SESSION['ciclista_email']
                ]
            ]);
        }

        return response()->json([
            'logueado' => false
        ]);
    }

    public function mostrarHistoricoCiclista()
    {
        session_start();

        if (!isset($_SESSION['ciclista_id'])) {
            return response()->json(['message' => 'No autorizado'], 401);
        }

        $ciclistaId = $_SESSION['ciclista_id'];

        $historico = HistoricoCiclista::where('id_ciclista', $ciclistaId)
                        ->orderBy('fecha', 'desc')
                        ->get();

        return response()->json($historico);
    }
}
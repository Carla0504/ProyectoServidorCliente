<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// aqui se importan los controllers
// use App\Http\Controllers\AuthController;
// use App\Http\Controllers\BloqueController;

// rutas de autenticacion
Route::post('/register', [AuthController::class, 'register']); 
Route::post('/login', [AuthController::class, 'login']); 
Route::post('/logout', [AuthController::class, 'logout']); 

// bloques de entrenamiento (crear, borrar, ver)
Route::get('/bloque', [BloqueController::class, 'index']); 
Route::post('/bloque/crear', [BloqueController::class, 'store']); 
Route::get('/bloque/{id}', [BloqueController::class, 'show']); 
Route::delete('/bloque/{id}/eliminar', [BloqueController::class, 'destroy']); 

// sesiones de entrenamiento (crear, borrar, ver)
Route::get('/sesion', [SesionController::class, 'index']);
Route::post('/sesion/crear', [SesionController::class, 'store']); 
Route::get('/sesion/{id}', [SesionController::class, 'show']); 
Route::delete('/sesion/{id}', [SesionController::class, 'destroy']); 

// planer de entrenamiento (crear, borrar, ver)
Route::get('/plan', [PlanController::class, 'index']); 
Route::post('/plan/crear', [PlanController::class, 'store']); 
Route::put('/plan/{id}', [PlanController::class, 'update']); 
Route::delete('/plan/{id}', [PlanController::class, 'destroy']); 

// resultados crear y ver
Route::post('/resultado/crear', [ResultadoController::class, 'store']); 
Route::get('/resultado/{id}', [ResultadoController::class, 'show']); 
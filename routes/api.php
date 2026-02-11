<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// aqui se importan los controllers
// use App\Http\Controllers\ControllerQueSea;
use App\Http\Controllers\CiclistaController;
use App\Http\Controllers\BloqueController;
use App\Http\Controllers\SesionEntrenamientoController;

// rutas de autenticacion
Route::post('/register', [CiclistaController::class, 'register']); 
Route::post('/login', [CiclistaController::class, 'login']); 
Route::post('/logout', [CiclistaController::class, 'logout']); 

// bloques de entrenamiento (crear, borrar, ver)
Route::get('/bloque', [BloqueController::class, 'index']); 
Route::post('/bloque/crear', [BloqueController::class, 'store']); 
Route::get('/bloque/{id}', [BloqueController::class, 'show']); 
Route::delete('/bloque/{id}/eliminar', [BloqueController::class, 'destroy']); 

// sesiones de entrenamiento (crear, borrar, ver)
Route::get('/sesion', [SesionEntrenamientoController::class, 'index']);
Route::post('/sesion/crear', [SesionEntrenamientoController::class, 'store']); 
Route::get('/sesion/{id}', [SesionEntrenamientoController::class, 'show']); 
Route::delete('/sesion/{id}', [SesionEntrenamientoController::class, 'destroy']); 

//sesion-plan entrenamiento
Route::get('/sesionbloque', [BloqueController::class, 'index']);
Route::post('/sesionbloque/crear', [BloqueController::class, 'store']); 
Route::delete('/sesionbloque/{id}', [BloqueController::class, 'destroy']);

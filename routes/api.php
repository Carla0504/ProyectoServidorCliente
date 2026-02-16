<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// aqui se importan los controllers
// use App\Http\Controllers\ControllerQueSea;
use App\Http\Controllers\CiclistaController;
use App\Http\Controllers\BloqueEntrenamientoController;
use App\Http\Controllers\SesionEntrenamientoController;

// rutas de autenticacion
Route::post('/register', [CiclistaController::class, 'register']); 
Route::post('/login', [CiclistaController::class, 'login']); 
Route::post('/logout', [CiclistaController::class, 'logout']); 

// bloques de entrenamiento (crear, borrar, ver)
Route::get('/bloque', [BloqueEntrenamientoController::class, 'listDetails']); 
Route::post('/bloque/crear', [BloqueEntrenamientoController::class, 'create']); 
Route::get('/bloque/{id}', [BloqueEntrenamientoController::class, 'get']); 
Route::delete('/bloque/{bloque_entrenamiento}/eliminar', [BloqueEntrenamientoController::class, 'destroy']); 

// sesiones de entrenamiento (crear, borrar, ver)
Route::get('/sesion', [SesionEntrenamientoController::class, 'listDetails']);
Route::post('/sesion/crear', [SesionEntrenamientoController::class, 'create']); 
Route::get('/sesion/{id}', [SesionEntrenamientoController::class, 'get']); 
Route::delete('/sesion/{id}', [SesionEntrenamientoController::class, 'destroy']); 

//sesion-plan entrenamiento
Route::get('/sesionbloque', [BloqueEntrenamientoController::class, 'listDetails']);
Route::post('/sesionbloque/crear', [BloqueEntrenamientoController::class, 'create']); 
Route::delete('/sesionbloque/{id}', [BloqueEntrenamientoController::class, 'destroy']);

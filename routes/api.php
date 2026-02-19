<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// aqui se importan los controllers
// use App\Http\Controllers\ControllerQueSea;
use App\Http\Controllers\CiclistaController;
use App\Http\Controllers\BloqueEntrenamientoController;
use App\Http\Controllers\PlanEntrenamientoController;
use App\Http\Controllers\SesionEntrenamientoController;
use App\Http\Controllers\ResultadoEntrenamientoController;
use App\Http\Controllers\SesionPlanEntrenamientoController;

// rutas de autenticacion
Route::post('/register', [CiclistaController::class, 'register']); 
Route::post('/login', [CiclistaController::class, 'login']); 
Route::post('/logout', [CiclistaController::class, 'logout']); 
Route::get('/historico-ciclista', [CiclistaController::class, 'mostrarHistoricoCiclista']);

// bloques de entrenamiento (crear, borrar, ver, listar)
Route::get('/bloque', [BloqueEntrenamientoController::class, 'listDetails']); 
Route::post('/bloque/crear', [BloqueEntrenamientoController::class, 'create']); 
Route::get('/bloque/{id}', [BloqueEntrenamientoController::class, 'get']); 
Route::delete('/bloque/{id}', [BloqueEntrenamientoController::class, 'destroy']); 

// planes de entrenamiento (crear, borrar, modificar, listar)
Route::get('/plan', [PlanEntrenamientoController::class, 'listDetails']);
Route::post('/plan/crear', [PlanEntrenamientoController::class, 'create']); 
Route::put('/plan/{id}', [PlanEntrenamientoController::class, 'update']); 
Route::delete('/plan/{id}', [PlanEntrenamientoController::class, 'destroy']); 

// sesiones de entrenamiento (crear, borrar, ver)
Route::get('/sesion', [SesionEntrenamientoController::class, 'listDetails']);
Route::post('/sesion/crear', [SesionEntrenamientoController::class, 'create']); 
Route::get('/sesion/{id}', [SesionEntrenamientoController::class, 'get']); 
Route::delete('/sesion/{id}', [SesionEntrenamientoController::class, 'destroy']);

// resultado de entrenamiento (ver, crear)
Route::post('/resultado/crear', [ResultadoEntrenamientoController::class, 'create']);
Route::get('/resultado/{id}', [ResultadoEntrenamientoController::class, 'getResultados']);
Route::get('/resultado', [ResultadoEntrenamientoController::class, 'listDetails']);

//Route::get('/resultado', [ResultadoEntrenamientoController::class, 'cargarHistorico']);

//sesion-plan entrenamiento (listar, crear, borrar)
Route::get('/sesionbloque', [SesionPlanEntrenamientoController::class, 'listDetails']);
Route::post('/sesionbloque/crear', [SesionPlanEntrenamientoController::class, 'create']); 
Route::delete('/sesionbloque/{id}', [SesionPlanEntrenamientoController::class, 'destroy']);

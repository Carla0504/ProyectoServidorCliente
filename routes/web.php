<?php

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ArticleController;

Route::get('/', function () {

  return view('login');
});

Route::get('/principal', function () {

  return view('principal');
});

Route::get('/registro', function () {

  return view('registro');
});



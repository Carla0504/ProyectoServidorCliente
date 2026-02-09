<?php

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ArticleController;

Route::get('/', function () {

  return view('login');
});


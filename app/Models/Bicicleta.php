<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bicicleta extends Model
{
    protected $table = 'bicicleta';

    protected $fillable = [
        'id_bicicleta',
        'nombre',
        'tipo',
        'comentario'
    ];
}

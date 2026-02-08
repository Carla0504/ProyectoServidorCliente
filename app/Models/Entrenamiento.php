<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
//use Illuminate\Database\Eloquent\Factories\HasFactory;

class Entrenamiento extends Model
{
    use HasFactory;

    protected $table = 'entrenamiento';

    protected $fillable = [
        'id_ciclista',
        'id_sesion',
        'fecha',
        'duracion',
        'kilometros',
        'pulso_medio',
        'pulso_max',
        'potencia_media',
        'potencia_normalizada',
        'velocidad_media',
        'comentario'
    ];
}
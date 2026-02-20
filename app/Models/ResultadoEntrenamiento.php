<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;//tampoco se si esto se queda
use App\Models\Ciclista;

class ResultadoEntrenamiento extends Model
{
    // el entrenamiento es el propio resultado
    protected $table = 'entrenamiento';

    protected $fillable = [
        // faltan campos
        'id_ciclista',
        'id_bicicleta',
        'id_sesion',
        'fecha',
        'duracion',
        'kilometros',
        'recorrido',
        'pulso_medio',
        'pulso_max',
        'potencia_media',
        'potencia_normalizada',
        'velocidad_media',
        'puntos_estres_tss',
        'factor_intensidad_if',
        'ascenso_metros',
        'comentario'
    ];

    //la relacion para el id
    public function ciclista() {
        return $this->belongsTo(Cliclista::class, 'id_ciclista');
    }
}
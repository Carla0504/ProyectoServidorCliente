<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; //no es seguro si esto se queda o no

class BloqueEntrenamiento extends Model
{
    protected $table = 'bloque_entrenamiento';//tabla que va a utilizar
    public $timestamps = false;//dijo iker que lo meta

    protected $fillable = [
        'nombre',
        'descripcion',
        'tipo',
        'duracion_estimada',
        'potencia_pct_min',
        'potencia_pct_max',
        'pulso_pct_max',
        'pulso_reserva_pct',
        'comentario'
    ];

    //Para las sesiones (N:M) 
    public function sesiones()
    {
        return $this->belongsToMany(SesionEntrenamiento::class, 'sesion_bloque', 'id_bloque_entrenamiento', 'id_sesion_entrenamiento')
                    ->withPivot('orden', 'repeticiones'); //campos de la tabla intermedia
    }
}

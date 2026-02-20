<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;//tampoco se si esto se queda
use App\Models\PlanEntrenamiento;
use App\Models\BloqueEntrenamiento;

class SesionEntrenamiento extends Model
{
    protected $table = 'sesion_entrenamiento';

    public $timestamps = false; // quita los campos updated_at y created_at del update.

    protected $fillable = [
        'id_plan',
        'fecha',
        'nombre',
        'descripcion',
        'completada'
    ];

    //relaciona con el plan
    public function plan()
    {
        return $this->belongsTo(PlanEntrenamiento::class, 'id_plan');
    }

    //relaciona con el bloque por eso el belongTo
    public function bloques()
    {
        return $this->belongsToMany(BloqueEntrenamiento::class, 'sesion_bloque', 'id_sesion_entrenamiento', 'id_bloque_entrenamiento')
                    ->withPivot('orden', 'repeticiones');
    }
}
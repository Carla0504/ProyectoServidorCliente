<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PlanEntrenamiento extends Model
{
    protected $table = 'plan_entrenamiento';

    protected $fillable = [
        'id_ciclista',
        'nombre',
        'descripcion',
        'fecha_inicio',
        'fecha_fin',
        'objetivo',
        'activo'
    ];

    public function ciclista()
    {
        return $this->belongsTo(Ciclista::class, 'id_ciclista');
    }

    public function sesiones()
    {
        return $this->hasMany(SesionEntrenamiento::class, 'id_plan');
    }
}
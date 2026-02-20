<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;//tampoco se si esto se queda
use App\Models\SesionEntrenamiento;
use App\Models\BloqueEntrenamiento;

class SesionBloque extends Model
{
    protected $table = 'sesion_bloque';

    public $timestamps = false; // quita los campos updated_at y created_at del update.

    protected $fillable = [
        'id_sesion_entrenamiento',
        'id_bloque_entrenamiento',
        'orden',
        'repeticiones',
    ];

    public function sesion()
    {
        return $this->belongsTo(SesionEntrenamiento::class, 'id_sesion_entrenamiento');
    }

    public function bloque()
    {
        return $this->belongsTo(BloqueEntrenamiento::class, 'id_bloque_entrenamiento');
    }
}

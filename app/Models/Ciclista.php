<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens; //Coso de los tokens Ver si en clase dicen otra cosa


class Ciclista extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'ciclista';

    //campos que tiene el ciclista
    protected $fillable = [
        'nombre',
        'apellidos',
        'fecha_nacimiento',
        'email',
        'password',
        'peso_base',
        'altura_base',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    //porque tiene mas de un plan (creo)
    public function planes()
    {
        return $this->hasMany(PlanEntrenamiento::class, 'id_ciclista');
    }
}
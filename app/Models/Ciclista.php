<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable; 
use Illuminate\Notifications\Notifiable;
use App\Models\PlanEntrenamiento;
//use Illuminate\Database\Eloquent\Factories\HasFactory; 

class Ciclista extends Authenticatable
{
    //use HasFactory, Notifiable; 
    use Notifiable;

    protected $table = 'ciclista';

    public $timestamps = false;


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
        'password'
    ];

    public function planes()
    {
        return $this->hasMany(PlanEntrenamiento::class, 'id_ciclista');
    }

    public function sesionesEntrenamiento()
    {
        return $this->hasMany(SesionEntrenamiento::class, 'ciclista_id');
    }
}
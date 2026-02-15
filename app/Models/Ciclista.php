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

    public function planes()
    {
        return $this->hasMany(PlanEntrenamiento::class, 'id_ciclista');
    }
}
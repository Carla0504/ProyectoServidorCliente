<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class insercion_datos extends Seeder
{
    public function run()
    {
        // 0. Limpieza total en orden inverso para no romper FK
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('entrenamiento')->truncate();
        DB::table('componentes_bicicleta')->truncate();
        DB::table('bicicleta')->truncate();
        DB::table('tipo_componente')->truncate();
        DB::table('sesion_bloque')->truncate();
        DB::table('sesion_entrenamiento')->truncate();
        DB::table('bloque_entrenamiento')->truncate();
        DB::table('plan_entrenamiento')->truncate();
        DB::table('historico_ciclista')->truncate();
        DB::table('ciclista')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // 1. CICLISTAS
        DB::table('ciclista')->insert([
            [
                'id' => 1,
                'nombre' => 'Juan',
                'apellidos' => 'Pérez',
                'fecha_nacimiento' => '1990-05-10',
                'peso_base' => 70.50,
                'altura_base' => 175,
                'email' => 'test1@prueba.com',
                'password' => Hash::make('prueba'),
            ],
            [
                'id' => 2,
                'nombre' => 'Ana',
                'apellidos' => 'Rodríguez',
                'fecha_nacimiento' => '1992-08-20',
                'peso_base' => 60.00,
                'altura_base' => 165,
                'email' => 'test2@prueba.com',
                'password' => Hash::make('prueba'),
            ]
        ]);

        // 2. TIPO DE COMPONENTE (Obligatorio para componentes_bicicleta)
        DB::table('tipo_componente')->insert([
            ['id' => 1, 'nombre' => 'Cadena', 'descripcion' => 'Transmisión'],
            ['id' => 2, 'nombre' => 'Cubierta', 'descripcion' => 'Neumáticos'],
        ]);

        // 3. BICICLETAS (Usando los tipos del ENUM de tu migración)
        DB::table('bicicleta')->insert([
            ['id' => 1, 'nombre' => 'Mi Flaca', 'tipo' => 'carretera', 'comentario' => 'Bici principal'],
            ['id' => 2, 'nombre' => 'La de monte', 'tipo' => 'mtb', 'comentario' => 'Para barro'],
        ]);

        // 4. COMPONENTES BICICLETA
        DB::table('componentes_bicicleta')->insert([
            [
                'id_bicicleta' => 1,
                'id_tipo_componente' => 1,
                'marca' => 'Shimano',
                'modelo' => 'Ultegra',
                'especificacion' => '114 eslabones',
                'velocidad' => '11v',
                'posicion' => 'ambas',
                'fecha_montaje' => '2026-01-01',
                'km_actuales' => 500.00,
                'km_max_recomendado' => 3000.00,
                'activo' => true
            ]
        ]);

        // 5. PLAN ENTRENAMIENTO
        DB::table('plan_entrenamiento')->insert([
            [
                'id' => 1,
                'id_ciclista' => 1,
                'nombre' => 'Plan Invierno',
                'descripcion' => 'Base aeróbica',
                'fecha_inicio' => '2026-01-01',
                'fecha_fin' => '2026-03-31',
                'objetivo' => 'Resistencia',
                'activo' => true
            ]
        ]);

        // 6. SESIÓN ENTRENAMIENTO (Necesaria para el entrenamiento si id_sesion no es null)
        DB::table('sesion_entrenamiento')->insert([
            [
                'id' => 1,
                'id_plan' => 1,
                'fecha' => '2026-02-05',
                'nombre' => 'Rodaje Z2',
                'completada' => true
            ]
        ]);

        // 7. ENTRENAMIENTO (Tabla final)
        DB::table('entrenamiento')->insert([
            [
                'id_ciclista' => 1,
                'id_bicicleta' => 1,
                'id_sesion' => 1,
                'fecha' => '2026-02-05 10:00:00',
                'duracion' => '01:30:00',
                'kilometros' => 45.50,
                'recorrido' => 'Vuelta al Soto',
                'pulso_medio' => 135,
                'pulso_max' => 160,
                'potencia_media' => 180,
                'potencia_normalizada' => 195,
                'velocidad_media' => 30.30,
                'puntos_estres_tss' => 75.00,
                'factor_intensidad_if' => 0.750,
                'ascenso_metros' => 400,
                'comentario' => 'Buenas sensaciones'
            ]
        ]);
    }
}
<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class InsercionDatos extends Seeder
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

        // 1. Ciclistas
        DB::table('ciclista')->insert([
            ['nombre' => 'Alejandro', 'apellidos' => 'Valverde', 'fecha_nacimiento' => '1980-04-25', 'peso_base' => 61.5, 'altura_base' => 177, 'email' => 'valverde@example.com', 'password' => Hash::make('password123')],
            ['nombre' => 'Marianne', 'apellidos' => 'Vos', 'fecha_nacimiento' => '1987-05-13', 'peso_base' => 58.0, 'altura_base' => 168, 'email' => 'vos@example.com', 'password' => Hash::make('password123')],
            ['nombre' => 'Tadej', 'apellidos' => 'Pogacar', 'fecha_nacimiento' => '1998-09-21', 'peso_base' => 66.0, 'altura_base' => 176, 'email' => 'pogacar@example.com', 'password' => Hash::make('password123')],
        ]);

        // 2. Histórico Ciclista
        DB::table('historico_ciclista')->insert([
            ['id_ciclista' => 1, 'fecha' => '2024-01-01', 'peso' => 62.0, 'ftp' => 380, 'pulso_max' => 185, 'pulso_reposo' => 42, 'potencia_max' => 1100, 'grasa_corporal' => 8.5, 'vo2max' => 82.0, 'comentario' => null],
            ['id_ciclista' => 2, 'fecha' => '2024-01-05', 'peso' => 58.2, 'ftp' => 310, 'pulso_max' => 190, 'pulso_reposo' => 45, 'potencia_max' => 950, 'grasa_corporal' => 12.0, 'vo2max' => 75.0, 'comentario' => null],
            ['id_ciclista' => 3, 'fecha' => '2024-01-10', 'peso' => 66.5, 'ftp' => 415, 'pulso_max' => 192, 'pulso_reposo' => 38, 'potencia_max' => 1250, 'grasa_corporal' => 7.5, 'vo2max' => 88.0, 'comentario' => null],
        ]);

        // 3. Plan de Entrenamiento
        DB::table('plan_entrenamiento')->insert([
            ['id_ciclista' => 1, 'nombre' => 'Base Aeróbica', 'descripcion' => 'Fase 1', 'fecha_inicio' => '2024-01-01', 'fecha_fin' => '2024-03-31', 'objetivo' => 'Fondo', 'activo' => true],
            ['id_ciclista' => 2, 'nombre' => 'Preparación Clásicas', 'descripcion' => 'Fase 2', 'fecha_inicio' => '2024-02-01', 'fecha_fin' => '2024-04-15', 'objetivo' => 'Potencia', 'activo' => true],
            ['id_ciclista' => 3, 'nombre' => 'Específico Escalada', 'descripcion' => 'Fase 3', 'fecha_inicio' => '2024-03-01', 'fecha_fin' => '2024-07-21', 'objetivo' => 'Montaña', 'activo' => false],
        ]);

        // 4. Bloque de Entrenamiento
        DB::table('bloque_entrenamiento')->insert([
            ['nombre' => 'Calentamiento', 'descripcion' => null, 'tipo' => 'rodaje', 'duracion_estimada' => '00:20:00', 'potencia_pct_min' => 55.0, 'potencia_pct_max' => 70.0, 'pulso_pct_max' => 65.0, 'pulso_reserva_pct' => 50.0, 'comentario' => null],
            ['nombre' => 'Series FTP', 'descripcion' => null, 'tipo' => 'intervalos', 'duracion_estimada' => '00:10:00', 'potencia_pct_min' => 95.0, 'potencia_pct_max' => 105.0, 'pulso_pct_max' => 90.0, 'pulso_reserva_pct' => 85.0, 'comentario' => null],
            ['nombre' => 'Recuperación', 'descripcion' => null, 'tipo' => 'recuperacion', 'duracion_estimada' => '00:45:00', 'potencia_pct_min' => 40.0, 'potencia_pct_max' => 50.0, 'pulso_pct_max' => 55.0, 'pulso_reserva_pct' => 40.0, 'comentario' => null],
        ]);

        // 5. Sesión de Entrenamiento
        DB::table('sesion_entrenamiento')->insert([
            ['id_plan' => 1, 'fecha' => '2024-02-15', 'nombre' => 'Sesión Martes', 'descripcion' => null, 'completada' => true],
            ['id_plan' => 2, 'fecha' => '2024-02-16', 'nombre' => 'Sesión Miércoles', 'descripcion' => null, 'completada' => false],
            ['id_plan' => 1, 'fecha' => '2024-02-17', 'nombre' => 'Sesión Jueves', 'descripcion' => null, 'completada' => true],
        ]);

        // 6. Sesión Bloque
        DB::table('sesion_bloque')->insert([
            ['id_sesion_entrenamiento' => 1, 'id_bloque_entrenamiento' => 1, 'orden' => 1, 'repeticiones' => 1],
            ['id_sesion_entrenamiento' => 1, 'id_bloque_entrenamiento' => 2, 'orden' => 2, 'repeticiones' => 4],
            ['id_sesion_entrenamiento' => 3, 'id_bloque_entrenamiento' => 3, 'orden' => 1, 'repeticiones' => 1],
        ]);

        // 7. Tipo Componente
        DB::table('tipo_componente')->insert([
            ['nombre' => 'Cadena', 'descripcion' => null],
            ['nombre' => 'Cubierta', 'descripcion' => null],
            ['nombre' => 'Pastillas', 'descripcion' => null],
        ]);

        // 8. Bicicleta
        DB::table('bicicleta')->insert([
            ['nombre' => 'Tarmac SL8', 'tipo' => 'carretera', 'comentario' => null],
            ['nombre' => 'Canyon Grizl', 'tipo' => 'gravel', 'comentario' => null],
            ['nombre' => 'Wahoo Kickr', 'tipo' => 'rodillo', 'comentario' => null],
        ]);

        // 9. Componentes Bicicleta
        DB::table('componentes_bicicleta')->insert([
            ['id_bicicleta' => 1, 'id_tipo_componente' => 1, 'marca' => 'Shimano', 'modelo' => 'Dura-Ace', 'especificacion' => '12v', 'velocidad' => '12v', 'posicion' => null, 'fecha_montaje' => '2024-01-01', 'km_actuales' => 1200, 'km_max_recomendado' => 4000, 'activo' => true, 'comentario' => null],
            ['id_bicicleta' => 1, 'id_tipo_componente' => 2, 'marca' => 'Continental', 'modelo' => 'GP5000', 'especificacion' => '28mm', 'velocidad' => null, 'posicion' => 'trasera', 'fecha_montaje' => '2024-01-01', 'km_actuales' => 1200, 'km_max_recomendado' => 5000, 'activo' => true, 'comentario' => null],
            ['id_bicicleta' => 2, 'id_tipo_componente' => 3, 'marca' => 'SRAM', 'modelo' => 'Force', 'especificacion' => 'Orgánicas', 'velocidad' => null, 'posicion' => 'delantera', 'fecha_montaje' => '2024-01-10', 'km_actuales' => 450, 'km_max_recomendado' => 2000, 'activo' => true, 'comentario' => null],
        ]);

        // 10. Entrenamiento
        DB::table('entrenamiento')->insert([
            ['id_ciclista' => 1, 'id_bicicleta' => 1, 'id_sesion' => 1, 'fecha' => '2024-02-15 10:00:00', 'duracion' => '02:30:00', 'kilometros' => 75.5, 'recorrido' => 'Ruta Norte', 'pulso_medio' => 145, 'pulso_max' => 178, 'potencia_media' => 240, 'potencia_normalizada' => 265, 'velocidad_media' => 30.2, 'puntos_estres_tss' => 150.5, 'factor_intensidad_if' => 0.85, 'ascenso_metros' => 1200, 'comentario' => null],
            ['id_ciclista' => 2, 'id_bicicleta' => 3, 'id_sesion' => null, 'fecha' => '2024-02-15 18:30:00', 'duracion' => '01:00:00', 'kilometros' => 30.0, 'recorrido' => 'Indoor', 'pulso_medio' => 130, 'pulso_max' => 160, 'potencia_media' => 210, 'potencia_normalizada' => 215, 'velocidad_media' => 30.0, 'puntos_estres_tss' => 60.0, 'factor_intensidad_if' => 0.70, 'ascenso_metros' => 0, 'comentario' => null],
            ['id_ciclista' => 3, 'id_bicicleta' => 2, 'id_sesion' => null, 'fecha' => '2024-02-16 09:00:00', 'duracion' => '04:00:00', 'kilometros' => 110.2, 'recorrido' => 'Pistas Sierra', 'pulso_medio' => 135, 'pulso_max' => 170, 'potencia_media' => 220, 'potencia_normalizada' => 245, 'velocidad_media' => 27.5, 'puntos_estres_tss' => 210.0, 'factor_intensidad_if' => 0.78, 'ascenso_metros' => 1500, 'comentario' => null],
        ]);
    }
}
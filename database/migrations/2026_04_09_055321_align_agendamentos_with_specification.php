<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('agendamentos', function (Blueprint $table) {
            if (!Schema::hasColumn('agendamentos', 'disciplina')) {
                $table->string('disciplina')->nullable()->after('professor_id');
            }

            if (!Schema::hasColumn('agendamentos', 'dia_semana')) {
                $table->string('dia_semana', 20)->nullable()->after('disciplina');
            }

            if (!Schema::hasColumn('agendamentos', 'bloco_horario')) {
                $table->string('bloco_horario', 50)->nullable()->after('dia_semana');
            }

            if (!Schema::hasColumn('agendamentos', 'modalidade')) {
                $table->enum('modalidade', ['presencial', 'ead'])->nullable()->after('bloco_horario');
            }
        });

        if (
            Schema::hasColumn('agendamentos', 'titulo') &&
            Schema::hasColumn('agendamentos', 'disciplina')
        ) {
            DB::statement("
                UPDATE agendamentos
                SET disciplina = titulo
                WHERE disciplina IS NULL
            ");
        }

        if (
            Schema::hasColumn('agendamentos', 'hora') &&
            Schema::hasColumn('agendamentos', 'bloco_horario')
        ) {
            DB::statement("
                UPDATE agendamentos
                SET bloco_horario = TIME_FORMAT(hora, '%H:%i')
                WHERE bloco_horario IS NULL
            ");
        }

        if (
            Schema::hasColumn('agendamentos', 'tipo') &&
            Schema::hasColumn('agendamentos', 'modalidade')
        ) {
            DB::statement("
                UPDATE agendamentos
                SET modalidade = tipo
                WHERE modalidade IS NULL
            ");
        }

        if (
            Schema::hasColumn('agendamentos', 'data') &&
            Schema::hasColumn('agendamentos', 'dia_semana')
        ) {
            DB::statement("
                UPDATE agendamentos
                SET dia_semana = CASE DAYOFWEEK(data)
                    WHEN 1 THEN 'domingo'
                    WHEN 2 THEN 'segunda'
                    WHEN 3 THEN 'terca'
                    WHEN 4 THEN 'quarta'
                    WHEN 5 THEN 'quinta'
                    WHEN 6 THEN 'sexta'
                    WHEN 7 THEN 'sabado'
                END
                WHERE dia_semana IS NULL
            ");
        }
    }

    public function down(): void
    {
        Schema::table('agendamentos', function (Blueprint $table) {
            if (Schema::hasColumn('agendamentos', 'disciplina')) {
                $table->dropColumn('disciplina');
            }

            if (Schema::hasColumn('agendamentos', 'dia_semana')) {
                $table->dropColumn('dia_semana');
            }

            if (Schema::hasColumn('agendamentos', 'bloco_horario')) {
                $table->dropColumn('bloco_horario');
            }

            if (Schema::hasColumn('agendamentos', 'modalidade')) {
                $table->dropColumn('modalidade');
            }
        });
    }
};
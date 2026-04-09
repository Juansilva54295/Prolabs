<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('agendamentos', function (Blueprint $table) {
            if (Schema::hasColumn('agendamentos', 'titulo')) {
                $table->dropColumn('titulo');
            }

            if (Schema::hasColumn('agendamentos', 'data')) {
                $table->dropColumn('data');
            }

            if (Schema::hasColumn('agendamentos', 'hora')) {
                $table->dropColumn('hora');
            }

            if (Schema::hasColumn('agendamentos', 'tipo')) {
                $table->dropColumn('tipo');
            }
        });
    }

    public function down(): void
    {
        Schema::table('agendamentos', function (Blueprint $table) {
            if (!Schema::hasColumn('agendamentos', 'titulo')) {
                $table->string('titulo')->nullable();
            }

            if (!Schema::hasColumn('agendamentos', 'data')) {
                $table->date('data')->nullable();
            }

            if (!Schema::hasColumn('agendamentos', 'hora')) {
                $table->time('hora')->nullable();
            }

            if (!Schema::hasColumn('agendamentos', 'tipo')) {
                $table->string('tipo')->nullable();
            }
        });
    }
};
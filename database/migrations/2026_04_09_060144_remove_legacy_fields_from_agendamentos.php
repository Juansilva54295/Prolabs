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
            $table->string('titulo')->nullable();
            $table->date('data')->nullable();
            $table->time('hora')->nullable();
            $table->enum('tipo', ['presencial', 'ead'])->nullable();
        });
    }
};
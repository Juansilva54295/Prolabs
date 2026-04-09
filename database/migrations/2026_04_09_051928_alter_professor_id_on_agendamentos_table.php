<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('agendamentos', function (Blueprint $table) {
            $table->dropForeign(['professor_id']);
        });

        Schema::table('agendamentos', function (Blueprint $table) {
            $table->unsignedBigInteger('professor_id')->nullable()->change();
        });

        Schema::table('agendamentos', function (Blueprint $table) {
            $table->foreign('professor_id')
                ->references('id')
                ->on('professores')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('agendamentos', function (Blueprint $table) {
            $table->dropForeign(['professor_id']);
        });

        Schema::table('agendamentos', function (Blueprint $table) {
            $table->unsignedBigInteger('professor_id')->nullable(false)->change();
        });

        Schema::table('agendamentos', function (Blueprint $table) {
            $table->foreign('professor_id')
                ->references('id')
                ->on('professores')
                ->cascadeOnDelete();
        });
    }
};
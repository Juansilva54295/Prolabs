<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->nullable()->constrained('roles')->nullOnDelete();
            $table->string('google_id')->nullable()->unique();
            $table->string('profile_photo_path')->nullable();
            $table->enum('profile_photo_source', ['google', 'local'])->nullable();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropColumn([
                'role_id',
                'google_id',
                'profile_photo_path',
                'profile_photo_source',
                'deleted_at',
            ]);
        });
    }
};
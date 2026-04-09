<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Professor extends Model
{
    use SoftDeletes;

    protected $table = 'professores'; // 🔥 ESSA LINHA RESOLVE O ERRO

    protected $fillable = [
        'name',
        'email',
    ];

    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class);
    }

    public function agendamentos(): HasMany
    {
        return $this->hasMany(Agendamento::class);
    }
}
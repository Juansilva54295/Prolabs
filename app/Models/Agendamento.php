<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Agendamento extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'professor_id',
        'disciplina',
        'dia_semana',
        'bloco_horario',
        'modalidade',
        'observacao',
    ];

    protected $casts = [
        'data' => 'date:Y-m-d',
    ];

    public function professor(): BelongsTo
    {
        return $this->belongsTo(Professor::class);
    }
}
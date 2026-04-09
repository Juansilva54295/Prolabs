<?php

namespace App\Http\Requests;

use App\Models\Agendamento;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class UpdateAgendamentoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'disciplina' => ['required', 'string', 'max:255'],
            'dia_semana' => ['required', 'string', 'max:20'],
            'bloco_horario' => ['required', 'string', 'max:50'],
            'modalidade' => ['required', 'in:presencial,ead'],
            'observacao' => ['nullable', 'string'],
            'professor_id' => ['nullable', 'exists:professores,id'],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            $agendamento = $this->route('agendamento');

            $agendamentoId = $agendamento instanceof Agendamento
                ? $agendamento->id
                : $agendamento;

            $modalidade = $this->input('modalidade');
            $professorId = $this->input('professor_id');
            $diaSemana = $this->input('dia_semana');
            $blocoHorario = $this->input('bloco_horario');

            if ($modalidade === 'presencial' && empty($professorId)) {
                $validator->errors()->add(
                    'professor_id',
                    'O professor é obrigatório para agendamentos presenciais.'
                );
                return;
            }

            if ($modalidade === 'ead') {
                $existeConflitoEad = Agendamento::query()
                    ->where('modalidade', 'ead')
                    ->where('dia_semana', $diaSemana)
                    ->where('bloco_horario', $blocoHorario)
                    ->where('id', '!=', $agendamentoId)
                    ->exists();

                if ($existeConflitoEad) {
                    $validator->errors()->add(
                        'bloco_horario',
                        'Já existe um agendamento EAD para este dia e horário.'
                    );
                }
            }

            if ($modalidade === 'presencial' && !empty($professorId)) {
                $existeConflitoProfessor = Agendamento::query()
                    ->where('professor_id', $professorId)
                    ->where('dia_semana', $diaSemana)
                    ->where('bloco_horario', $blocoHorario)
                    ->where('id', '!=', $agendamentoId)
                    ->exists();

                if ($existeConflitoProfessor) {
                    $validator->errors()->add(
                        'professor_id',
                        'Este professor já possui um agendamento neste dia e horário.'
                    );
                }
            }
        });
    }

    public function messages(): array
    {
        return [
            'disciplina.required' => 'A disciplina é obrigatória.',
            'dia_semana.required' => 'O dia da semana é obrigatório.',
            'bloco_horario.required' => 'O bloco horário é obrigatório.',
            'modalidade.required' => 'A modalidade é obrigatória.',
            'modalidade.in' => 'A modalidade deve ser presencial ou ead.',
            'professor_id.exists' => 'O professor informado não existe.',
        ];
    }
}
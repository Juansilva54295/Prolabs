<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAlunoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $aluno = $this->route('aluno');

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($aluno->user_id),
            ],
            'password' => ['nullable', 'string', 'min:6'],
            'matricula' => [
                'required',
                'string',
                'max:255',
                Rule::unique('alunos', 'matricula')->ignore($aluno->id),
            ],
            'curso' => ['required', 'string', 'max:255'],
            'semestre' => ['required', 'string', 'max:255'],
        ];
    }
}
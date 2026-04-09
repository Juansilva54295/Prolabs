<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAlunoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['nullable', 'string', 'min:6'],
            'matricula' => ['required', 'string', 'max:255', 'unique:alunos,matricula'],
            'curso' => ['required', 'string', 'max:255'],
            'semestre' => ['required', 'string', 'max:255'],
        ];
    }
}
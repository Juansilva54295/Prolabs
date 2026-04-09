<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAlunoRequest;
use App\Http\Requests\UpdateAlunoRequest;
use App\Models\Aluno;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AlunoController extends Controller
{
    public function index(): JsonResponse
    {
        $alunos = Aluno::with('user')->orderByDesc('id')->get();

        return response()->json($alunos);
    }

    public function store(StoreAlunoRequest $request): JsonResponse
    {
        $aluno = DB::transaction(function () use ($request) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password ?? '123456'),
                'role' => 'aluno',
            ]);

            return Aluno::create([
                'user_id' => $user->id,
                'matricula' => $request->matricula,
                'curso' => $request->curso,
                'semestre' => $request->semestre,
            ]);
        });

        return response()->json(
            $aluno->load('user'),
            201
        );
    }

    public function show(Aluno $aluno): JsonResponse
    {
        return response()->json($aluno->load('user'));
    }

    public function update(UpdateAlunoRequest $request, Aluno $aluno): JsonResponse
    {
        DB::transaction(function () use ($request, $aluno) {
            $aluno->user->update([
                'name' => $request->name,
                'email' => $request->email,
            ]);

            if ($request->filled('password')) {
                $aluno->user->update([
                    'password' => Hash::make($request->password),
                ]);
            }

            $aluno->update([
                'matricula' => $request->matricula,
                'curso' => $request->curso,
                'semestre' => $request->semestre,
            ]);
        });

        return response()->json($aluno->fresh()->load('user'));
    }

    public function destroy(Aluno $aluno): JsonResponse
    {
        DB::transaction(function () use ($aluno) {
            $aluno->delete();
            $aluno->user->delete();
        });

        return response()->json([
            'message' => 'Aluno excluído com sucesso.'
        ]);
    }
}
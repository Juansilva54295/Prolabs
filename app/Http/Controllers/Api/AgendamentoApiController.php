<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAgendamentoRequest;
use App\Http\Requests\UpdateAgendamentoRequest;
use App\Models\Agendamento;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AgendamentoApiController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Agendamento::with('professor');

        if ($request->filled('professor_id')) {
            $query->where('professor_id', $request->professor_id);
        }

        if ($request->filled('dia_semana')) {
            $query->where('dia_semana', $request->dia_semana);
        }

        if ($request->filled('modalidade')) {
            $query->where('modalidade', $request->modalidade);
        }

        $agendamentos = $query
            ->orderBy('dia_semana')
            ->orderBy('bloco_horario')
            ->get();

        return response()->json($agendamentos);
    }

    public function store(StoreAgendamentoRequest $request): JsonResponse
    {
        $agendamento = Agendamento::create($request->validated());
        $agendamento->load('professor');

        return response()->json([
            'message' => 'Agendamento criado com sucesso.',
            'data' => $agendamento,
        ], 201);
    }

    public function show(Agendamento $agendamento): JsonResponse
    {
        $agendamento->load('professor');

        return response()->json($agendamento);
    }

    public function update(UpdateAgendamentoRequest $request, Agendamento $agendamento): JsonResponse
    {
        $agendamento->update($request->validated());
        $agendamento->load('professor');

        return response()->json([
            'message' => 'Agendamento atualizado com sucesso.',
            'data' => $agendamento,
        ]);
    }

    public function destroy(Agendamento $agendamento): JsonResponse
    {
        $agendamento->delete();

        return response()->json([
            'message' => 'Agendamento removido com sucesso.',
        ]);
    }
}
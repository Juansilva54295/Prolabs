<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAgendamentoRequest;
use App\Http\Requests\UpdateAgendamentoRequest;
use App\Models\Agendamento;
use App\Models\Professor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class AgendamentoController extends Controller
{
    public function index(Request $request): View
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
            ->paginate(10)
            ->withQueryString();

        $professores = Professor::orderBy('name')->get();

        return view('agendamentos.index', compact('agendamentos', 'professores'));
    }

    public function create(): View
    {
        $professores = Professor::orderBy('name')->get();

        return view('agendamentos.create', compact('professores'));
    }

    public function store(StoreAgendamentoRequest $request): RedirectResponse
    {
        Agendamento::create($request->validated());

        return redirect()
            ->route('agendamentos.index')
            ->with('success', 'Agendamento criado com sucesso.');
    }

    public function show(Agendamento $agendamento): View
    {
        $agendamento->load('professor');

        return view('agendamentos.show', compact('agendamento'));
    }

    public function edit(Agendamento $agendamento): View
    {
        $professores = Professor::orderBy('name')->get();

        return view('agendamentos.edit', compact('agendamento', 'professores'));
    }

    public function update(UpdateAgendamentoRequest $request, Agendamento $agendamento): RedirectResponse
    {
        $agendamento->update($request->validated());

        return redirect()
            ->route('agendamentos.index')
            ->with('success', 'Agendamento atualizado com sucesso.');
    }

    public function destroy(Agendamento $agendamento): RedirectResponse
    {
        $agendamento->delete();

        return redirect()
            ->route('agendamentos.index')
            ->with('success', 'Agendamento removido com sucesso.');
    }
}
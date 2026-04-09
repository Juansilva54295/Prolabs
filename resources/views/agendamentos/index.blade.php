<h1>Lista de Agendamentos</h1>

@if(session('success'))
    <p style="color: green">{{ session('success') }}</p>
@endif

<a href="{{ route('agendamentos.create') }}">Novo Agendamento</a>

<hr>

<form method="GET" action="{{ route('agendamentos.index') }}" style="margin-bottom: 20px;">
    <label for="professor_id">Professor:</label>
    <select name="professor_id" id="professor_id">
        <option value="">Todos</option>
        @foreach($professores as $professor)
            <option value="{{ $professor->id }}" {{ request('professor_id') == $professor->id ? 'selected' : '' }}>
                {{ $professor->name }}
            </option>
        @endforeach
    </select>

    <label for="dia_semana">Dia da Semana:</label>
    <select name="dia_semana" id="dia_semana">
        <option value="">Todos</option>
        <option value="segunda" {{ request('dia_semana') == 'segunda' ? 'selected' : '' }}>Segunda</option>
        <option value="terca" {{ request('dia_semana') == 'terca' ? 'selected' : '' }}>Terça</option>
        <option value="quarta" {{ request('dia_semana') == 'quarta' ? 'selected' : '' }}>Quarta</option>
        <option value="quinta" {{ request('dia_semana') == 'quinta' ? 'selected' : '' }}>Quinta</option>
        <option value="sexta" {{ request('dia_semana') == 'sexta' ? 'selected' : '' }}>Sexta</option>
        <option value="sabado" {{ request('dia_semana') == 'sabado' ? 'selected' : '' }}>Sábado</option>
    </select>

    <label for="modalidade">Modalidade:</label>
    <select name="modalidade" id="modalidade">
        <option value="">Todas</option>
        <option value="presencial" {{ request('modalidade') == 'presencial' ? 'selected' : '' }}>Presencial</option>
        <option value="ead" {{ request('modalidade') == 'ead' ? 'selected' : '' }}>EAD</option>
    </select>

    <button type="submit">Filtrar</button>
    <a href="{{ route('agendamentos.index') }}">Limpar</a>
</form>

<table border="1" cellpadding="10">
    <thead>
        <tr>
            <th>Disciplina</th>
            <th>Professor</th>
            <th>Dia da Semana</th>
            <th>Bloco de Horário</th>
            <th>Modalidade</th>
            <th>Ações</th>
        </tr>
    </thead>
    <tbody>
        @forelse($agendamentos as $agendamento)
            <tr>
                <td>{{ $agendamento->disciplina }}</td>
                <td>{{ $agendamento->professor->name ?? 'Sem professor' }}</td>
                <td>{{ ucfirst($agendamento->dia_semana) }}</td>
                <td>{{ $agendamento->bloco_horario }}</td>
                <td>{{ strtoupper($agendamento->modalidade) }}</td>
                <td>
                    <a href="{{ route('agendamentos.show', $agendamento) }}">Ver</a>
                    <a href="{{ route('agendamentos.edit', $agendamento) }}">Editar</a>

                    <form action="{{ route('agendamentos.destroy', $agendamento) }}" method="POST" style="display:inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" onclick="return confirm('Deseja remover este agendamento?')">
                            Excluir
                        </button>
                    </form>
                </td>
            </tr>
        @empty
            <tr>
                <td colspan="6">Nenhum agendamento encontrado.</td>
            </tr>
        @endforelse
    </tbody>
</table>

{{ $agendamentos->links() }}
<h1>Professores</h1>

<a href="{{ route('professores.create') }}">Novo Professor</a>

@foreach ($professores as $professor)
    <p>
        {{ $professor->name }} - {{ $professor->email }}

        <a href="{{ route('professores.edit', $professor) }}">Editar</a>

    <form action="{{ route('professores.destroy', $professor) }}" method="POST" style="display:inline;">
        @csrf
        @method('DELETE')
        <button type="submit">Excluir</button>
    </form>
    </p>
@endforeach
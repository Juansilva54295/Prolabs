<h1>Editar Professor</h1>

<form method="POST" action="{{ route('professores.update', $professor) }}">
    @csrf
    @method('PUT')

    <input type="text" name="name" value="{{ $professor->name }}">
    <input type="email" name="email" value="{{ $professor->email }}">

    <button type="submit">Atualizar</button>
</form>
<h1>Criar Professor</h1>

<form method="POST" action="{{ route('professores.store') }}">
    @csrf

    <input type="text" name="name" placeholder="Nome">
    <input type="email" name="email" placeholder="Email">

    <button type="submit">Salvar</button>
</form>
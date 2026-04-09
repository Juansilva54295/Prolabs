<h1>Meu Perfil</h1>

@if(session('success'))
    <p style="color: green">{{ session('success') }}</p>
@endif

<form method="POST" action="{{ route('profile.update') }}">
    @csrf
    @method('PATCH')

    <div>
        <label>Nome</label>
        <input type="text" name="name" value="{{ old('name', $user->name) }}">
        @error('name')
            <p style="color:red">{{ $message }}</p>
        @enderror
    </div>

    <div>
        <label>Email</label>
        <input type="email" value="{{ $user->email }}" disabled>
    </div>

    <div>
        <label>Google ID</label>
        <input type="text" value="{{ $user->google_id }}" disabled>
    </div>

    <button type="submit">Salvar</button>
</form>

<hr>

<form method="POST" action="{{ route('profile.destroy') }}">
    @csrf
    @method('DELETE')
    <button type="submit" onclick="return confirm('Deseja excluir sua conta?')">
        Excluir conta
    </button>
</form>
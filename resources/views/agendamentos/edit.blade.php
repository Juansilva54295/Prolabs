<h1>Editar Agendamento</h1>

<form action="{{ route('agendamentos.update', $agendamento) }}" method="POST">
    @csrf
    @method('PUT')
    @include('agendamentos._form')
</form>

<a href="{{ route('agendamentos.index') }}">Voltar</a>
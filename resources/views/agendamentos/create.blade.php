<h1>Novo Agendamento</h1>

<form action="{{ route('agendamentos.store') }}" method="POST">
    @csrf
    @include('agendamentos._form')
</form>

<a href="{{ route('agendamentos.index') }}">Voltar</a>
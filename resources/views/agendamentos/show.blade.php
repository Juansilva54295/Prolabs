<h1>Detalhes do Agendamento</h1>

<p><strong>Disciplina:</strong> {{ $agendamento->disciplina }}</p>
<p><strong>Professor:</strong> {{ $agendamento->professor->name ?? 'Sem professor' }}</p>
<p><strong>Dia da Semana:</strong> {{ ucfirst($agendamento->dia_semana) }}</p>
<p><strong>Bloco de Horário:</strong> {{ $agendamento->bloco_horario }}</p>
<p><strong>Modalidade:</strong> {{ strtoupper($agendamento->modalidade) }}</p>
<p><strong>Observação:</strong> {{ $agendamento->observacao }}</p>

<a href="{{ route('agendamentos.edit', $agendamento) }}">Editar</a>
<a href="{{ route('agendamentos.index') }}">Voltar</a>
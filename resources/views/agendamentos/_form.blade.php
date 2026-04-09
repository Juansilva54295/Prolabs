<div>
    <label>Professor</label>
    <select name="professor_id">
        <option value="">Selecione</option>
        @foreach($professores as $professor)
            <option value="{{ $professor->id }}" {{ old('professor_id', $agendamento->professor_id ?? '') == $professor->id ? 'selected' : '' }}>
                {{ $professor->name }}
            </option>
        @endforeach
    </select>
    @error('professor_id')
        <div style="color:red">{{ $message }}</div>
    @enderror
</div>

<div>
    <label>Disciplina</label>
    <input type="text" name="disciplina" value="{{ old('disciplina', $agendamento->disciplina ?? '') }}">
    @error('disciplina')
        <div style="color:red">{{ $message }}</div>
    @enderror
</div>

<div>
    <label>Dia da Semana</label>
    <select name="dia_semana">
        <option value="">Selecione</option>
        @foreach(['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'] as $dia)
            <option value="{{ $dia }}" {{ old('dia_semana', $agendamento->dia_semana ?? '') === $dia ? 'selected' : '' }}>
                {{ ucfirst($dia) }}
            </option>
        @endforeach
    </select>
    @error('dia_semana')
        <div style="color:red">{{ $message }}</div>
    @enderror
</div>

<div>
    <label>Bloco de Horário</label>
    <input type="time" name="bloco_horario"
        value="{{ old('bloco_horario', isset($agendamento) ? substr($agendamento->bloco_horario ?? '', 0, 5) : '') }}">
    @error('bloco_horario')
        <div style="color:red">{{ $message }}</div>
    @enderror
</div>

<div>
    <label>Modalidade</label>
    <select name="modalidade">
        <option value="">Selecione</option>
        <option value="presencial" {{ old('modalidade', $agendamento->modalidade ?? '') === 'presencial' ? 'selected' : '' }}>
            Presencial
        </option>
        <option value="ead" {{ old('modalidade', $agendamento->modalidade ?? '') === 'ead' ? 'selected' : '' }}>
            EAD
        </option>
    </select>
    @error('modalidade')
        <div style="color:red">{{ $message }}</div>
    @enderror
</div>

<div>
    <label>Observação</label>
    <textarea name="observacao">{{ old('observacao', $agendamento->observacao ?? '') }}</textarea>
    @error('observacao')
        <div style="color:red">{{ $message }}</div>
    @enderror
</div>

<button type="submit">Salvar</button>
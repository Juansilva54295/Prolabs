import { useEffect, useState } from 'react';
import { getProfessores } from '../services/professores';
import Mensagem from './Mensagem';

const DIAS_SEMANA = [
  'segunda',
  'terca',
  'quarta',
  'quinta',
  'sexta',
  'sabado',
];

const MODALIDADES = [
  'presencial',
  'ead',
];

function AgendamentoForm({
  initialData = {
    disciplina: '',
    dia_semana: '',
    bloco_horario: '',
    modalidade: '',
    observacao: '',
    professor_id: '',
  },
  onSubmit,
  loading = false,
  textoBotao = 'Salvar',
}) {
  const [form, setForm] = useState(initialData);
  const [professores, setProfessores] = useState([]);
  const [erro, setErro] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm({
      disciplina: initialData.disciplina || '',
      dia_semana: initialData.dia_semana || '',
      bloco_horario: initialData.bloco_horario || '',
      modalidade: initialData.modalidade || '',
      observacao: initialData.observacao || '',
      professor_id: initialData.professor_id ?? '',
    });
  }, [initialData]);

  useEffect(() => {
    carregarProfessores();
  }, []);

  const carregarProfessores = async () => {
    try {
      const data = await getProfessores();

      if (Array.isArray(data)) {
        setProfessores(data);
      } else if (Array.isArray(data.data)) {
        setProfessores(data.data);
      } else {
        setProfessores([]);
      }
    } catch (error) {
      setErro('Erro ao carregar professores.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let novoForm = {
      ...form,
      [name]: value,
    };

    if (name === 'modalidade' && value === 'ead') {
      novoForm.professor_id = '';
    }

    setForm(novoForm);

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));

    setErro('');
  };

  const validarFrontend = () => {
    const novosErros = {};

    if (!form.disciplina.trim()) {
      novosErros.disciplina = 'A disciplina é obrigatória.';
    }

    if (!form.dia_semana) {
      novosErros.dia_semana = 'O dia da semana é obrigatório.';
    }

    if (!form.bloco_horario.trim()) {
      novosErros.bloco_horario = 'O bloco de horário é obrigatório.';
    }

    if (!form.modalidade) {
      novosErros.modalidade = 'A modalidade é obrigatória.';
    }

    if (form.modalidade === 'presencial' && !form.professor_id) {
      novosErros.professor_id = 'Professor é obrigatório para modalidade presencial.';
    }

    setErrors(novosErros);

    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErro('');
    setErrors({});

    if (!validarFrontend()) {
      return;
    }

    const payload = {
      disciplina: form.disciplina,
      dia_semana: form.dia_semana,
      bloco_horario: form.bloco_horario,
      modalidade: form.modalidade,
      observacao: form.observacao,
      professor_id: form.professor_id || null,
    };

    try {
      await onSubmit(payload);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        setErro(error.response.data.message);
      } else {
        setErro('Erro ao salvar agendamento.');
      }
    }
  };

  const getFieldError = (field) => {
    const value = errors[field];

    if (Array.isArray(value)) {
      return value[0];
    }

    return value || '';
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Mensagem tipo="erro" texto={erro} />

      <div className="form-group">
        <label htmlFor="disciplina">Disciplina</label>
        <input
          id="disciplina"
          type="text"
          name="disciplina"
          value={form.disciplina}
          onChange={handleChange}
          placeholder="Digite a disciplina"
        />
        {getFieldError('disciplina') && (
          <small className="campo-erro">{getFieldError('disciplina')}</small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="dia_semana">Dia da semana</label>
        <select
          id="dia_semana"
          name="dia_semana"
          value={form.dia_semana}
          onChange={handleChange}
        >
          <option value="">Selecione</option>
          {DIAS_SEMANA.map((dia) => (
            <option key={dia} value={dia}>
              {dia}
            </option>
          ))}
        </select>
        {getFieldError('dia_semana') && (
          <small className="campo-erro">{getFieldError('dia_semana')}</small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="bloco_horario">Bloco de horário</label>
        <input
          id="bloco_horario"
          type="text"
          name="bloco_horario"
          value={form.bloco_horario}
          onChange={handleChange}
          placeholder="Ex: 08:00 às 10:00"
        />
        {getFieldError('bloco_horario') && (
          <small className="campo-erro">{getFieldError('bloco_horario')}</small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="modalidade">Modalidade</label>
        <select
          id="modalidade"
          name="modalidade"
          value={form.modalidade}
          onChange={handleChange}
        >
          <option value="">Selecione</option>
          {MODALIDADES.map((modalidade) => (
            <option key={modalidade} value={modalidade}>
              {modalidade}
            </option>
          ))}
        </select>
        {getFieldError('modalidade') && (
          <small className="campo-erro">{getFieldError('modalidade')}</small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="professor_id">Professor</label>
        <select
          id="professor_id"
          name="professor_id"
          value={form.professor_id}
          onChange={handleChange}
          disabled={form.modalidade === 'ead'}
        >
          <option value="">
            {form.modalidade === 'ead' ? 'Não obrigatório para EAD' : 'Selecione'}
          </option>

          {professores.map((professor) => (
            <option key={professor.id} value={professor.id}>
              {professor.name}
            </option>
          ))}
        </select>
        {getFieldError('professor_id') && (
          <small className="campo-erro">{getFieldError('professor_id')}</small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="observacao">Observação</label>
        <textarea
          id="observacao"
          name="observacao"
          value={form.observacao}
          onChange={handleChange}
          placeholder="Digite uma observação"
        />
        {getFieldError('observacao') && (
          <small className="campo-erro">{getFieldError('observacao')}</small>
        )}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : textoBotao}
      </button>
    </form>
  );
}

export default AgendamentoForm;
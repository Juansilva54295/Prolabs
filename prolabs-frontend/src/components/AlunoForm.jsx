import { useEffect, useState } from 'react';
import Mensagem from './Mensagem';

function AlunoForm({
  initialData,
  onSubmit,
  loading = false,
  textoBotao = 'Salvar',
  modoEdicao = false,
}) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    matricula: '',
    curso: '',
    semestre: '',
  });

  const [erro, setErro] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!initialData) return;

    setForm((prev) => ({
      ...prev,
      name: initialData.name || '',
      email: initialData.email || '',
      password: '',
      matricula: initialData.matricula || '',
      curso: initialData.curso || '',
      semestre: initialData.semestre || '',
    }));
  }, [
    initialData?.name,
    initialData?.email,
    initialData?.matricula,
    initialData?.curso,
    initialData?.semestre,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));

    setErro('');
  };

  const validarFrontend = () => {
    const novosErros = {};

    if (!form.name.trim()) {
      novosErros.name = 'O nome é obrigatório.';
    }

    if (!form.email.trim()) {
      novosErros.email = 'O email é obrigatório.';
    }

    if (!modoEdicao && !form.password.trim()) {
      novosErros.password = 'A senha é obrigatória.';
    }

    if (!form.matricula.trim()) {
      novosErros.matricula = 'A matrícula é obrigatória.';
    }

    if (!form.curso.trim()) {
      novosErros.curso = 'O curso é obrigatório.';
    }

    if (!form.semestre.trim()) {
      novosErros.semestre = 'O semestre é obrigatório.';
    }

    setErrors(novosErros);

    return Object.keys(novosErros).length === 0;
  };

  const getFieldError = (field) => {
    const value = errors[field];

    if (Array.isArray(value)) {
      return value[0];
    }

    return value || '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErro('');
    setErrors({});

    if (!validarFrontend()) {
      return;
    }

    const payload = {
      name: form.name,
      email: form.email,
      matricula: form.matricula,
      curso: form.curso,
      semestre: form.semestre,
    };

    if (form.password.trim()) {
      payload.password = form.password;
    }

    try {
      await onSubmit(payload);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        setErro(error.response.data.message);
      } else {
        setErro('Erro ao salvar aluno.');
      }
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Mensagem tipo="erro" texto={erro} />

      <div className="form-group">
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Digite o nome do aluno"
        />
        {getFieldError('name') && (
          <small className="campo-erro">{getFieldError('name')}</small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Digite o email do aluno"
        />
        {getFieldError('email') && (
          <small className="campo-erro">{getFieldError('email')}</small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">
          {modoEdicao ? 'Nova senha (opcional)' : 'Senha'}
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder={modoEdicao ? 'Deixe vazio para manter a senha atual' : 'Digite a senha'}
        />
        {getFieldError('password') && (
          <small className="campo-erro">{getFieldError('password')}</small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="matricula">Matrícula</label>
        <input
          id="matricula"
          type="text"
          name="matricula"
          value={form.matricula}
          onChange={handleChange}
          placeholder="Digite a matrícula"
        />
        {getFieldError('matricula') && (
          <small className="campo-erro">{getFieldError('matricula')}</small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="curso">Curso</label>
        <input
          id="curso"
          type="text"
          name="curso"
          value={form.curso}
          onChange={handleChange}
          placeholder="Digite o curso"
        />
        {getFieldError('curso') && (
          <small className="campo-erro">{getFieldError('curso')}</small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="semestre">Semestre</label>
        <input
          id="semestre"
          type="text"
          name="semestre"
          value={form.semestre}
          onChange={handleChange}
          placeholder="Digite o semestre"
        />
        {getFieldError('semestre') && (
          <small className="campo-erro">{getFieldError('semestre')}</small>
        )}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : textoBotao}
      </button>
    </form>
  );
}

export default AlunoForm;
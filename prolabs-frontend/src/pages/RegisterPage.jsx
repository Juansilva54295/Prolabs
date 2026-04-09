import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/auth';
import Mensagem from '../components/Mensagem';

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [errors, setErrors] = useState({});

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

  const getFieldError = (field) => {
    const value = errors[field];

    if (Array.isArray(value)) {
      return value[0];
    }

    return value || '';
  };

  const validarFormulario = () => {
    const novosErros = {};

    if (!form.name.trim()) {
      novosErros.name = 'O nome é obrigatório.';
    }

    if (!form.email.trim()) {
      novosErros.email = 'O email é obrigatório.';
    }

    if (!form.password.trim()) {
      novosErros.password = 'A senha é obrigatória.';
    }

    if (!form.password_confirmation.trim()) {
      novosErros.password_confirmation = 'A confirmação de senha é obrigatória.';
    }

    if (
      form.password.trim() &&
      form.password_confirmation.trim() &&
      form.password !== form.password_confirmation
    ) {
      novosErros.password_confirmation = 'As senhas não coincidem.';
    }

    setErrors(novosErros);

    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErro('');
    setMensagem('');
    setErrors({});

    if (!validarFormulario()) {
      return;
    }

    try {
      setLoading(true);

      await registerUser(form);

      setMensagem('Cadastro realizado com sucesso.');

      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        setErro(error.response.data.message);
      } else {
        setErro('Erro ao realizar cadastro.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Registrar</h2>

      <Mensagem tipo="sucesso" texto={mensagem} />
      <Mensagem tipo="erro" texto={erro} />

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Digite seu nome"
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
            placeholder="Digite seu email"
          />
          {getFieldError('email') && (
            <small className="campo-erro">{getFieldError('email')}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Digite sua senha"
          />
          {getFieldError('password') && (
            <small className="campo-erro">{getFieldError('password')}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password_confirmation">Confirmar senha</label>
          <input
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
            placeholder="Confirme sua senha"
          />
          {getFieldError('password_confirmation') && (
            <small className="campo-erro">{getFieldError('password_confirmation')}</small>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Registrar'}
        </button>
      </form>

      <div style={{ marginTop: '15px' }}>
        <span>Já tem conta? </span>
        <Link to="/login">Entrar</Link>
      </div>
    </div>
  );
}

export default RegisterPage;
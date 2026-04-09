import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div>
      <h2>Login</h2>

      <form className="form">
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Digite seu email" />
        </div>

        <div className="form-group">
          <label>Senha</label>
          <input type="password" placeholder="Digite sua senha" />
        </div>

        <button type="submit">Entrar</button>
      </form>

      <div style={{ marginTop: '15px' }}>
        <span>Não tem conta? </span>
        <Link to="/register">Registrar</Link>
      </div>

      <hr />

      <a
        href="http://127.0.0.1:8000/auth/google"
        className="btn-google"
      >
        Entrar com Google
      </a>
    </div>
  );
}

export default LoginPage;
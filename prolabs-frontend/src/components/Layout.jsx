import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className="container">
      <header className="header">
        <h1>ProLabs</h1>

        <nav className="nav">
          <Link to="/agendamentos">Agendamentos</Link>
          <Link to="/agendamentos/novo">Novo Agendamento</Link>
          <Link to="/login">Login</Link>
          <Link to="/perfil">Perfil</Link>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}

export default Layout;
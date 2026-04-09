import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AgendamentosListPage from './pages/AgendamentosListPage';
import AgendamentoCreatePage from './pages/AgendamentoCreatePage';
import AgendamentoEditPage from './pages/AgendamentoEditPage';
import AlunosListPage from './pages/AlunosListPage';
import AlunoCreatePage from './pages/AlunoCreatePage';
import AlunoEditPage from './pages/AlunoEditPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PerfilPage from './pages/PerfilPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AgendamentosListPage />} />

        <Route path="/agendamentos" element={<AgendamentosListPage />} />
        <Route path="/agendamentos/novo" element={<AgendamentoCreatePage />} />
        <Route path="/agendamentos/:id/editar" element={<AgendamentoEditPage />} />

        <Route path="/alunos" element={<AlunosListPage />} />
        <Route path="/alunos/novo" element={<AlunoCreatePage />} />
        <Route path="/alunos/:id/editar" element={<AlunoEditPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
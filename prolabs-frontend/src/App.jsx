import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AgendamentosListPage from './pages/AgendamentosListPage';
import AgendamentoCreatePage from './pages/AgendamentoCreatePage';
import AgendamentoEditPage from './pages/AgendamentoEditPage';
import LoginPage from './pages/LoginPage';
import PerfilPage from './pages/PerfilPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AgendamentosListPage />} />
        <Route path="/agendamentos" element={<AgendamentosListPage />} />
        <Route path="/agendamentos/novo" element={<AgendamentoCreatePage />} />
        <Route path="/agendamentos/:id/editar" element={<AgendamentoEditPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
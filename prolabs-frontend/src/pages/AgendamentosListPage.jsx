import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAgendamentos, deleteAgendamento } from '../services/agendamentos';
import AgendamentoTable from '../components/AgendamentoTable';
import Mensagem from '../components/Mensagem';

function AgendamentosListPage() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(true);

  const carregarAgendamentos = async () => {
    try {
      setLoading(true);
      setErro('');

      const data = await getAgendamentos();

      if (Array.isArray(data)) {
        setAgendamentos(data);
      } else if (Array.isArray(data.data)) {
        setAgendamentos(data.data);
      } else {
        setAgendamentos([]);
      }
    } catch (error) {
      setErro('Erro ao carregar agendamentos.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir este agendamento?');

    if (!confirmar) return;

    try {
      await deleteAgendamento(id);
      setMensagem('Agendamento excluído com sucesso.');
      carregarAgendamentos();
    } catch (error) {
      setErro('Erro ao excluir agendamento.');
    }
  };

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Agendamentos</h2>

        <Link to="/agendamentos/novo">
          <button type="button">Novo Agendamento</button>
        </Link>
      </div>

      <Mensagem tipo="sucesso" texto={mensagem} />
      <Mensagem tipo="erro" texto={erro} />

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <AgendamentoTable agendamentos={agendamentos} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default AgendamentosListPage;
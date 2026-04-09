import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAgendamento } from '../services/agendamentos';
import AgendamentoForm from '../components/AgendamentoForm';
import Mensagem from '../components/Mensagem';

function AgendamentoCreatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const handleCreate = async (payload) => {
    try {
      setLoading(true);
      await createAgendamento(payload);
      setMensagem('Agendamento cadastrado com sucesso.');

      setTimeout(() => {
        navigate('/agendamentos');
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Novo Agendamento</h2>

      <Mensagem tipo="sucesso" texto={mensagem} />

      <AgendamentoForm
        onSubmit={handleCreate}
        loading={loading}
        textoBotao="Cadastrar"
      />
    </div>
  );
}

export default AgendamentoCreatePage;
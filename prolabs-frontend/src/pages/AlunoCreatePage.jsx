import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAluno } from '../services/alunos';
import AlunoForm from '../components/AlunoForm';
import Mensagem from '../components/Mensagem';

function AlunoCreatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const handleCreate = async (payload) => {
    try {
      setLoading(true);
      await createAluno(payload);
      setMensagem('Aluno cadastrado com sucesso.');

      setTimeout(() => {
        navigate('/alunos');
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Novo Aluno</h2>

      <Mensagem tipo="sucesso" texto={mensagem} />

      <AlunoForm
        onSubmit={handleCreate}
        loading={loading}
        textoBotao="Cadastrar"
        modoEdicao={false}
      />
    </div>
  );
}

export default AlunoCreatePage;
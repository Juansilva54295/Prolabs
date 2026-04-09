import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAlunos, deleteAluno } from '../services/alunos';
import AlunoTable from '../components/AlunoTable';
import Mensagem from '../components/Mensagem';

function AlunosListPage() {
  const [alunos, setAlunos] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(true);

  const carregarAlunos = async () => {
    try {
      setLoading(true);
      setErro('');

      const data = await getAlunos();

      if (Array.isArray(data)) {
        setAlunos(data);
      } else if (Array.isArray(data.data)) {
        setAlunos(data.data);
      } else {
        setAlunos([]);
      }
    } catch (error) {
      setErro('Erro ao carregar alunos.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir este aluno?');

    if (!confirmar) return;

    try {
      await deleteAluno(id);
      setMensagem('Aluno excluído com sucesso.');
      carregarAlunos();
    } catch (error) {
      setErro('Erro ao excluir aluno.');
    }
  };

  useEffect(() => {
    carregarAlunos();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Alunos</h2>

        <Link to="/alunos/novo">
          <button type="button">Novo Aluno</button>
        </Link>
      </div>

      <Mensagem tipo="sucesso" texto={mensagem} />
      <Mensagem tipo="erro" texto={erro} />

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <AlunoTable alunos={alunos} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default AlunosListPage;
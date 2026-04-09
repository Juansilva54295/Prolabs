import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAlunoById, updateAluno } from '../services/alunos';
import AlunoForm from '../components/AlunoForm';
import Mensagem from '../components/Mensagem';

function AlunoEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [aluno, setAluno] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    carregarAluno();
  }, [id]);

  const carregarAluno = async () => {
    try {
      setLoadingPage(true);
      setErro('');

      const data = await getAlunoById(id);
      setAluno(data);
    } catch (error) {
      setErro('Erro ao carregar aluno.');
    } finally {
      setLoadingPage(false);
    }
  };

  const handleUpdate = async (payload) => {
    try {
      setLoadingSubmit(true);
      await updateAluno(id, payload);
      setMensagem('Aluno atualizado com sucesso.');

      setTimeout(() => {
        navigate('/alunos');
      }, 1000);
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loadingPage) {
    return <p>Carregando...</p>;
  }

  if (erro) {
    return <Mensagem tipo="erro" texto={erro} />;
  }

  if (!aluno) {
    return <p>Aluno não encontrado.</p>;
  }

  return (
    <div>
      <h2>Editar Aluno</h2>

      <Mensagem tipo="sucesso" texto={mensagem} />

      <AlunoForm
        initialData={{
          name: aluno.user?.name || '',
          email: aluno.user?.email || '',
          matricula: aluno.matricula || '',
          curso: aluno.curso || '',
          semestre: aluno.semestre || '',
        }}
        onSubmit={handleUpdate}
        loading={loadingSubmit}
        textoBotao="Salvar Alterações"
        modoEdicao={true}
      />
    </div>
  );
}

export default AlunoEditPage;
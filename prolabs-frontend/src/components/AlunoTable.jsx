import { Link } from 'react-router-dom';

function AlunoTable({ alunos, onDelete }) {
  if (!alunos.length) {
    return <p>Nenhum aluno encontrado.</p>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Matrícula</th>
            <th>Curso</th>
            <th>Semestre</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.user?.name || '-'}</td>
              <td>{aluno.user?.email || '-'}</td>
              <td>{aluno.matricula}</td>
              <td>{aluno.curso}</td>
              <td>{aluno.semestre}</td>
              <td>
                <div className="actions">
                  <Link to={`/alunos/${aluno.id}/editar`}>
                    <button type="button" className="btn-secondary">
                      Editar
                    </button>
                  </Link>

                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() => onDelete(aluno.id)}
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AlunoTable;
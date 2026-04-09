import { Link } from 'react-router-dom';

function AgendamentoTable({ agendamentos, onDelete }) {
  if (!agendamentos.length) {
    return <p>Nenhum agendamento encontrado.</p>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Disciplina</th>
            <th>Professor</th>
            <th>Dia da semana</th>
            <th>Bloco de horário</th>
            <th>Modalidade</th>
            <th>Observação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map((agendamento) => (
            <tr key={agendamento.id}>
              <td>{agendamento.disciplina}</td>
              <td>{agendamento.professor?.name || 'Sem professor'}</td>
              <td>{agendamento.dia_semana}</td>
              <td>{agendamento.bloco_horario}</td>
              <td>{agendamento.modalidade}</td>
              <td>{agendamento.observacao || '-'}</td>
              <td>
                <div className="actions">
                  <Link to={`/agendamentos/${agendamento.id}/editar`}>
                    <button type="button" className="btn-secondary">Editar</button>
                  </Link>

                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() => onDelete(agendamento.id)}
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

export default AgendamentoTable;
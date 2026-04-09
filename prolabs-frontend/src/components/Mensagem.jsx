function Mensagem({ tipo = 'sucesso', texto }) {
  if (!texto) return null;

  return (
    <div className={`mensagem ${tipo}`}>
      {texto}
    </div>
  );
}

export default Mensagem;
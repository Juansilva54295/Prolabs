import { useEffect, useState } from 'react';
import { getProfile } from '../services/profile';
import Mensagem from '../components/Mensagem';

function PerfilPage() {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      setLoading(true);
      setErro('');

      const data = await getProfile();
      console.log('Perfil carregado:', data);

      setPerfil(data);
    } catch (error) {
      console.error('Erro completo do perfil:', error);
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      console.error('URL:', error.config?.url);

      if (error.response?.status === 401) {
        setErro('Usuário não autenticado.');
      } else if (error.response?.status === 404) {
        setErro('Rota do perfil não encontrada.');
      } else {
        setErro('Erro ao carregar perfil do usuário.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Carregando perfil...</p>;
  }

  if (erro) {
    return <Mensagem tipo="erro" texto={erro} />;
  }

  if (!perfil) {
    return <p>Perfil não encontrado.</p>;
  }

  return (
    <div>
      <h2>Perfil do Usuário</h2>

      <div className="card">
        {perfil.profile_photo_path ? (
          <div style={{ marginBottom: '20px' }}>
            <img
              src={perfil.profile_photo_path}
              alt={perfil.name}
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid #ddd',
              }}
            />
          </div>
        ) : null}

        <p><strong>Nome:</strong> {perfil.name || '-'}</p>
        <p><strong>Email:</strong> {perfil.email || '-'}</p>
        <p><strong>Role:</strong> {perfil.role || '-'}</p>
        <p><strong>Google ID:</strong> {perfil.google_id || '-'}</p>
      </div>
    </div>
  );
}

export default PerfilPage;
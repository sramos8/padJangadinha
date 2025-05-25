import { useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '../lib/api';
import Cookies from 'js-cookie';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // sua lógica de autenticação
    console.log('➡️ Enviando login para backend com:', email, senha);
    
        try {
          const res = await api.post('/auth/login', { email, senha });
          console.log('✅ Resposta do backend:', res.data);
          Cookies.set('token', res.data.access_token);
          localStorage.setItem('token', res.data.access_token);
          localStorage.setItem('nome', res.data.nome);
           // 👉 Grava no localStorage
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    
          router.push('/');
        } catch (err) {
          console.error('❌ Erro no login:', err.response?.data || err.message);
          alert('Erro ao fazer login');
        }
      
  };

  return (
    <>
      <h2>Entrar</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha:</label>
          <input
            type="password"
            className="form-control"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </>
  );
}

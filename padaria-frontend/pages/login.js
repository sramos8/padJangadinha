/* import { useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '../lib/api';
import Cookies from 'js-cookie';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('➡️ Enviando login para backend com:', email, senha);

    try {
      const res = await api.post('/auth/login', { email, senha });
      console.log('✅ Resposta do backend:', res.data);
      Cookies.set('token', res.data.access_token);
      router.push('/');
    } catch (err) {
      console.error('❌ Erro no login:', err.response?.data || err.message);
      alert('Erro ao fazer login');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-2">
        <input className="border p-2 w-full" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="border p-2 w-full" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} type="password" />
        <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded">Entrar</button>
      </form>
    </div>
  );
}
 */
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="login-container">
      <LoginForm />
    </div>
  );
}
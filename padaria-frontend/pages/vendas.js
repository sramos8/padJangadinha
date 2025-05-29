import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
//import { api } from '../lib/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import api from '../services/api'; // ou '@/services/api' se você usa paths personalizados

export default function Vendas() {
  const [produtos, setProdutos] = useState([]);
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const router = useRouter();
  // Verifica se o usuário está autenticado
  useAuth();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    api.get('/produtos').then(res => setProdutos(res.data)).catch(console.error);
  }, []);

  const registrarVenda = async (e) => {
  e.preventDefault();
  try {
    await api.post('/vendas', {
      produto_id: produtoId,
      quantidade: parseInt(quantidade),
    });
    setProdutoId('');
    setQuantidade('');
    alert('Venda registrada com sucesso');
  } catch (err) {
    console.error('❌ Erro ao realizar venda:', err.response?.data || err.message);
    alert('Erro ao registrar venda');
  }
};

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Registrar Venda</h1>
      <form onSubmit={registrarVenda} className="space-y-2">
        <select className="border p-2 w-full" value={produtoId} onChange={e => setProdutoId(e.target.value)}>
          <option value="">Selecione um produto</option>
          {produtos.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
        <input className="border p-2 w-full" placeholder="Quantidade" value={quantidade} onChange={e => setQuantidade(e.target.value)} />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Registrar</button>
      </form>
    </div>
  );
}
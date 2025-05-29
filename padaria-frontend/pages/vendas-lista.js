import { useEffect, useState } from 'react';
//import { api } from '../lib/api';
import { useAuth } from '../hooks/useAuth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import api from '../services/api'; // ou '@/services/api' se você usa paths personalizados

export default function ListaVendas() {
  const [vendas, setVendas] = useState([]);
  const [produtosMap, setProdutosMap] = useState({});
  const router = useRouter();
  // Verifica se o usuário está autenticado

  useAuth();

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/login')
    }
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        const [vendasRes, produtosRes] = await Promise.all([
          api.get('/vendas'),
          api.get('/produtos'),
        ]);

        console.log('Vendas:', vendasRes.data);
        console.log('Produtos:', produtosRes.data);

        setVendas(vendasRes.data);

        const map = {};
        produtosRes.data.forEach((p) => {
          map[p.id] = p.nome;
        });
        setProdutosMap(map);
      } catch (err) {
        console.error('Erro ao buscar dados', err);
      }
    }

    fetchData();
  }, []);

  const excluirVenda = async (id) => {
    if (confirm('Tem certeza que deseja excluir esta venda?')) {
      try {
        await api.delete(`/vendas/${id}`);
        setVendas((v) => v.filter((venda) => venda.id !== id));
      } catch (err) {
        console.error('Erro ao excluir', err);
        alert('Erro ao excluir venda');
      }
    }
  };

  const itensAgrupadosPorData = vendas.reduce((acc, item) => {
    const data = new Date(item.created_at).toLocaleDateString();
    if (!acc[data]) acc[data] = [];
    acc[data].push(item);
    return acc;
  }, {});

  const hoje = new Date().toLocaleDateString();

  return (
    <div className="p-6 space-y-6">
    <h1 className="text-2xl font-bold">Vendas Realizadas</h1>

    <div className="space-y-4">
      {Object.entries(itensAgrupadosPorData).map(([data, vendas]) => {
        const isHoje = data === hoje;

        return (
          <details key={data} className="border rounded shadow-sm" open={isHoje}>
            <summary className="cursor-pointer p-3 bg-gray-100 hover:bg-gray-200 font-medium">
              {new Date(data).toLocaleDateString('pt-BR')} ({vendas.length} venda{vendas.length > 1 ? 's' : ''})
            </summary>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Total (R$)</th>
                    <th>Data</th>
                    <th className="text-center">Funcionário</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {vendas.map((venda) => (
                    <tr key={venda.id} className="hover text-center">
                      <td>{produtosMap[venda.produto_id] || 'Desconhecido'}</td>
                      <td>{venda.quantidade}</td>
                      <td>{venda.total?.toFixed(2)}</td>
                      <td>{new Date(venda.created_at).toLocaleString('pt-BR')}</td>
                      <td>{venda.users?.nome || 'Desconhecido'}</td>
                      <td className="space-x-2">
                        <button
                          onClick={() => excluirVenda(venda.id)}
                          className="btn btn-sm btn-danger"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                  {vendas.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center p-4 text-gray-500">
                        Nenhuma venda registrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </details>
        );
      })}
    </div>
  </div>
);

}

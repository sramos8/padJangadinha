import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../hooks/useAuth';

export default function ListaVendas() {
  const [vendas, setVendas] = useState([]);
  const [produtosMap, setProdutosMap] = useState({});
  useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const [vendasRes, produtosRes] = await Promise.all([
          api.get('/vendas'),
          api.get('/produtos'),
        ]);

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

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Vendas Realizadas</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Produto</th>
            <th className="p-2 border">Quantidade</th>
            <th className="p-2 border">Total (R$)</th>
            <th className="p-2 border">Data</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((venda) => (
            <tr key={venda.id} className="text-center">
              <td className="border p-2">{produtosMap[venda.produto_id] || 'Desconhecido'}</td>
              <td className="border p-2">{venda.quantidade}</td>
              <td className="border p-2">{venda.total?.toFixed(2)}</td>
              <td className="border p-2">{new Date(venda.created_at).toLocaleString()}</td>
              <td className="border p-2">
                <button
                  onClick={() => excluirVenda(venda.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {vendas.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                Nenhuma venda registrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

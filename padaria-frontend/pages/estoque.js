/* import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Estoque() {
  const [produtos, setProdutos] = useState([]);
  useAuth();

  useEffect(() => {
    api.get('/produtos/').then(res => setProdutos(res.data)).catch(console.error);
  }, []);

  return (
<div className="p-6">
  <h1 className="text-2xl font-bold mb-4">Estoque Atual</h1>

  <div className="overflow-x-auto">
    <table className="min-w-full table-auto border border-gray-200 rounded-lg">
      <thead className="bg-gray-100 text-gray-700 text-left">
        <tr>
          <th className="px-4 py-2 border-b">Produto</th>
          <th className="px-4 py-2 border-b">Quantidade</th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((p) => (
          <tr key={p.id} className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">{p.nome}</td>
            <td className="px-4 py-2 border-b">{p.quantidade} unidades</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


  );
} */
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Estoque() {
  const [estoque, setEstoque] = useState([]);
  const [produtos, setProdutos] = useState({});
  useAuth();

  useEffect(() => {
    // Buscar produtos para mapear nomes
    api.get('/produtos')
      .then(res => {
        const map = {};
        res.data.forEach(p => map[p.id] = p.nome);
        setProdutos(map);
      })
      .catch(err => console.error('Erro ao buscar produtos:', err));

    // Buscar estoque
    api.get('/estoque')
      .then(res => setEstoque(res.data))
      .catch(err => console.error('Erro ao buscar estoque:', err));
  }, []);

  console.log('Produtos:', produtos);
  console.log('Estoque:', estoque); 
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Estoque de Produtos</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Produto</th>
            <th className="p-2 border">Quantidade em Estoque</th>
            <th className="p-2 border">Funcionário Responsável</th>
          </tr>
        </thead>
        <tbody>
          {estoque.map(item => (
            <tr key={item.id} className="text-center">
              <td className="p-2 border">{item.nome || 'Produto desconhecido'}</td>
              <td className="p-2 border">{item.quantidade}</td>
              <td className="p-2 border">{item.users?.nome || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

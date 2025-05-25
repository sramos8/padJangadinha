import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);

  const carregarProdutos = () => {
    api.get('/produtos').then(res => setProdutos(res.data)).catch(console.error);
  };

  useEffect(() => {
    carregarProdutos();
    const listener = () => carregarProdutos();
    document.addEventListener('produtosAtualizados', listener);
    return () => document.removeEventListener('produtosAtualizados', listener);
  }, []);

  return (
<div className="w-screen px-4"> {/* Padding opcional */}
  <div className="overflow-x-auto w-full">
    <table className="w-full table-auto border border-gray-300 text-sm">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="px-4 py-2 border-b">Produto</th>
          <th className="px-4 py-2 border-b">Preço (R$)</th>
          <th className="px-4 py-2 border-b">Quantidade</th>
          <th className="px-4 py-2 border-b text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((p) => (
          <tr key={p.id} className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">{p.nome}</td>
            <td className="px-4 py-2 border-b text-green-700">{p.preco.toFixed(2)}</td>
            <td className="px-4 py-2 border-b">{p.quantidade}</td>
            <td className="px-4 py-2 border-b text-center">
              <button onClick={() => handleEditar(p.id)} className="text-blue-600 mx-1">
                <FaEdit />
              </button>
              <button onClick={() => handleExcluir(p.id)} className="text-red-600 mx-1">
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>




  );
}
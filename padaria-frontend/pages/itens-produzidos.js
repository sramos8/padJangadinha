import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../hooks/useAuth';

export default function ItensProduzidos() {
  const [produtos, setProdutos] = useState([]);
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [unidade, setUnidade] = useState('');
  const [lista, setLista] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  useAuth();

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const [resProdutos, resItens] = await Promise.all([
      api.get('/produtos'),
      api.get('/itens-produzidos'),
    ]);
    setProdutos(resProdutos.data);
    setLista(resItens.data);
  };

  const cadastrar = async (e) => {
    e.preventDefault();

    const payload = {
      produto_id: produtoId,
      quantidade: parseFloat(quantidade),
      unidade,
    };

    if (editandoId) {
      await api.put(`/itens-produzidos/${editandoId}`, payload);
      setEditandoId(null);
    } else {
      await api.post('/itens-produzidos', payload);
    }

    setProdutoId('');
    setQuantidade('');
    setUnidade('');
    carregarDados();
  };

  const remover = async (id) => {
    if (confirm('Deseja realmente remover este item?')) {
      await api.delete(`/itens-produzidos/${id}`);
      carregarDados();
    }
  };

  const editar = (item) => {
    setEditandoId(item.id);
    setProdutoId(item.produto_id);
    setQuantidade(item.quantidade);
    setUnidade(item.unidade);
  };

  const itensAgrupadosPorData = lista.reduce((acc, item) => {
    const data = new Date(item.criado_em).toLocaleDateString();
    if (!acc[data]) acc[data] = [];
    acc[data].push(item);
    return acc;
  }, {});

  const hoje = new Date().toLocaleDateString();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        {editandoId ? 'Editar Item Produzido' : 'Cadastrar Item Produzido'}
      </h1>

      <form onSubmit={cadastrar} className="space-y-2">
        <select value={produtoId} onChange={e => setProdutoId(e.target.value)} className="form-control">
          <option value="">Selecione um produto</option>
          {produtos.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
        <input
          value={quantidade}
          onChange={e => setQuantidade(e.target.value)}
          placeholder="Quantidade"
          className="form-control"
          type="number"
        />
       <select
        value={unidade}
        onChange={e => setUnidade(e.target.value)}
        className="form-control"
        >
        <option value="">Selecione a unidade</option>
        {[
            'BANDEJA',
            'CAIXA',
            'DUZIA',
            'GRAMAS',
            'KG',
            'LATA',
            'LITRO',
            'ML',
            'UNID',
        ]
            .sort()
            .map((unid) => (
            <option key={unid} value={unid}>
                {unid.charAt(0) + unid.slice(1).toLowerCase()}
            </option>
            ))}
        </select>

        <button type="submit" className="btn btn-primary">
          {editandoId ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      <h2 className="text-xl font-bold mt-6">Histórico</h2>

      <div className="space-y-4">
        {Object.entries(itensAgrupadosPorData).map(([data, itens]) => {
          const isHoje = data === hoje;
          return (
            <details key={data} className="border rounded shadow-sm" open={isHoje}>
              <summary className="cursor-pointer p-3 bg-gray-100 hover:bg-gray-200 font-medium">
                {new Date(data).toLocaleDateString('pt-BR')} ({itens.length} item{itens.length > 1 ? 's' : ''})
              </summary>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th>Produto</th>
                      <th>Quantidade</th>
                      <th>Unidade</th>
                      <th>Hora</th>
                      <th className="text-center">Usuário</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itens.map(item => (
                    <tr key={item.id} className="hover">
                        <td>{item.produtos?.nome || '—'}</td>
                        <td>{item.quantidade}</td>
                        <td>{item.unidade}</td>
                        <td>{new Date(item.criado_em).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</td>
                        <td className="text-center">{item.owner?.nome || '—'}</td>
                        <td className="space-x-2">
                        <button onClick={() => editar(item)} className="btn btn-sm btn-warning">Editar</button>
                        <button onClick={() => remover(item.id)} className="btn btn-sm btn-danger">Excluir</button>
                        </td>
                    </tr>
                    ))}
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

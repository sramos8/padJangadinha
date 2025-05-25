import { useState } from 'react';
import { api } from '../lib/api';

export default function CadastroProduto() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const handleCadastrar = async (e) => {
    e.preventDefault();
    try {
      await api.post('/produtos', { nome, preco: parseFloat(preco), quantidade: parseInt(quantidade) });
      setNome(''); setPreco(''); setQuantidade('');
      document.dispatchEvent(new Event('produtosAtualizados'));
    } catch (err) {
        console.error('❌ Erro ao cadastrar produto:', err.response?.data || err.message);
      alert('Erro ao cadastrar produto');
    }
  };

  return (
/*     <form onSubmit={handleCadastrar} className="space-y-2">
      <input className="border p-2 w-full" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Preço" value={preco} onChange={e => setPreco(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Quantidade" value={quantidade} onChange={e => setQuantidade(e.target.value)} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Cadastrar Produto</button>
    </form> */
<form onSubmit={handleCadastrar} className="row g-3">
  <div className="col-md-4">
    <input
      type="text"
      className="form-control"
      placeholder="Nome"
      required
      value={nome}
      onChange={(e) => setNome(e.target.value)}
    />
  </div>

  <div className="col-md-3">
    <input
      type="number"
      className="form-control"
      placeholder="Preço"
      required
      value={preco}
      onChange={(e) => setPreco(e.target.value)}
    />
  </div>

  <div className="col-md-3">
    <input
      type="number"
      className="form-control"
      placeholder="Quantidade"
      required
      value={quantidade}
      onChange={(e) => setQuantidade(e.target.value)}
    />
  </div>

  <div className="col-md-2">
    <button
    type="submit"
    className="btn btn-success rounded-2 py-1.5 px-5"
  >
    Cadastrar
  </button>
  </div>
</form>


    

  );
}
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/dashboard.css';
export default function Home() {
  const [resumo, setResumo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResumo() {
      try {
        const token = localStorage.getItem('token'); // ou como você salva o JWT
        const response = await axios.get('http://localhost:3001/relatorio/resumo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResumo(response.data);
      } catch (error) {
        console.error('Erro ao buscar resumo:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchResumo();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (!resumo) return <p>Erro ao carregar resumo.</p>;

  return (
    <div className="dashboard-container container">
      <div className="text-center">
        <h1 className="dashboard-title">Painel da Padaria</h1>
        <p className="dashboard-subtitle">
          Painel da Padaria.
        </p>
        <button className="btn btn-primary">Get Started</button>
      </div>

      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card text-center">
            <h5>Relatórios</h5>
            <p>Total de Vendas: R$ {resumo.totalVendas.toFixed(2)}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <h5>Estoque</h5>
            <p>Total em Estoque: {resumo.totalEstoque}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <h5>Equipe</h5>
            <p>Total de Produtos: {resumo.totalProdutos}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

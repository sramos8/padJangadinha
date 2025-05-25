import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/dashboard.css';


export default function Home() {
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
            <p>Acompanhe as vendas e movimentações da padaria</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <h5>Estoque</h5>
            <p>Gerencie os produtos com controle total de entrada/saída</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <h5>Equipe</h5>
            <p>Visualize e edite os membros da sua equipe</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import CadastroProduto from '../components/CadastroProduto';
import ListaProdutos from '../components/ListaProdutos';
import { useAuth } from '../hooks/useAuth';

export default function Produtos() {
  useAuth();
  return (
    <div className="p-6 space-y-6 w-screen w-full">

      <h1 className="text-2xl font-bold">Produtos</h1>
      <div><CadastroProduto /></div>
      
      <div></div>
      <div className="w-screen">

        <h2 className="text-xl font-semibold">Lista de Produtos</h2>
        <p className="text-gray-500">Aqui estão os produtos cadastrados.</p>
        <ListaProdutos />
      </div>
    </div>
    
  );
}
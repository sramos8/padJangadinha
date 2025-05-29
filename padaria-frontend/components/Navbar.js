import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Package, Archive, ShoppingCart, Users, ShoppingBasket } from 'lucide-react'

export default function Navbar() {
  const [nome, setNome] = useState('');
  const [user, setUser] = useState('');
  const [dataHora, setDataHora] = useState('');
  const router = useRouter();


  useEffect(() => {
    const nomeUsuario = localStorage.getItem('nome');
    const userData = localStorage.getItem('user');
    if (nomeUsuario) setNome(nomeUsuario);
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

    useEffect(() => {
    const atualizarHora = () => {
      const agora = new Date();
      const dataFormatada = agora.toLocaleDateString('pt-BR');
      const horaFormatada = agora.toLocaleTimeString('pt-BR');
      setDataHora(`${dataFormatada} ${horaFormatada}`);
    };

    atualizarHora(); // inicial
    const intervalo = setInterval(atualizarHora, 1000); // atualiza a cada segundo

    return () => clearInterval(intervalo); // limpa ao desmontar
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
   

    // 🔴 2. Remove dados do usuário do localStorage (se estiverem lá)
    localStorage.removeItem('nome');
    localStorage.removeItem('user');
    
    router.push('/login');
  };
  
  const imagemUrl = '/img/logo.png'; // URL da imagem do logo
  const altText = 'Logo da Padaria Jangadinha'; // Texto alternativo para a imagem

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 gap-3">
      
    <Link className="navbar-brand" href="/">
      <div className="d-flex align-items-center gap-3">
        <img src={imagemUrl} alt={altText} width={32} height={32} />
        <span>Padaria Jangadinha</span>
      </div>
    </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav">
         <Link className="nav-link d-flex align-items-center gap-1 hover-effect" href="/produtos"><Package size={16} />Gerenciar Produtos</Link>
          <Link className="nav-link d-flex align-items-center gap-1 hover-effect" href="/estoque"><Archive size={16} />Controle de Estoque</Link>
          <Link className="nav-link d-flex align-items-center gap-1 hover-effect" href="/vendas"><ShoppingCart size={16} />Registrar Vendas</Link>
          <Link className="nav-link d-flex align-items-center gap-1 hover-effect" href="/vendas-lista"><ShoppingBasket size={16} />Lista de Vendas</Link>
          <Link className="nav-link d-flex align-items-center gap-1 hover-effect" href="/itens-produzidos"><ShoppingBasket size={16} />Atualizar Estoque</Link>
        </div>
        
        {/* Alinhado totalmente à direita */}
        <div className="d-flex align-items-center ms-auto gap-3">
          <div className="text-muted" style={{ fontSize: '0.8rem' }}>{dataHora}</div>
           <span className="text-dark gap-5">{user.nome}
          <Link href="/usuarios" className="flex items-center space-x-1 hover:text-gray-300" alt="Usuários" title="Usuários" >   
            <Users size={16} />
        </Link>
             </span>
         {/*  <Image
            src="/usuario.png"
            alt="Usuário"
            width={32}
            height={32}
            className="rounded-circle"
          /> */}
          
          <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
    </nav>

  );
}
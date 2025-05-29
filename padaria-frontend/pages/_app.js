import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import '../public/css/login.css';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Head from 'next/head';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutos

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  const titulosPorRota = {
    '/produtos': 'Gerenciar Produtos',
    '/vendas-lista': 'Lista de Vendas',
    '/vendas': 'Registrar Vendas',
    '/estoque': 'Controle de Estoque',
    '/itens-produzidos': 'Atualizar Estoque',
    '/usuarios': 'Usuários',
  };

  const rota = router.pathname;
  const tituloBase = titulosPorRota[rota] || 'Painel';
  const tituloCompleto = `${tituloBase} – Padaria Jangadinha`;

  useEffect(() => {
    let timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        Cookies.remove('token');
        localStorage.removeItem('nome');
        localStorage.removeItem('user');
        router.push('/login');
      }, INACTIVITY_LIMIT);
    };

    const eventos = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
    eventos.forEach((evento) => window.addEventListener(evento, resetTimer));

    resetTimer(); // Iniciar no carregamento

    return () => {
      clearTimeout(timeout);
      eventos.forEach((evento) => window.removeEventListener(evento, resetTimer));
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>{tituloCompleto}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Sistema de gerenciamento para padarias" />
        <link rel="icon" href="/img/favicon.ico" />
      </Head>
      {!isLoginPage && <Navbar />}
      <Component {...pageProps} />
    </>
  );
}

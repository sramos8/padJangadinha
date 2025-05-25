import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import '../public/css/login.css';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {

  const router = useRouter();

  const isLoginPage = router.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Component {...pageProps} />
    </>
  );
}
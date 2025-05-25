import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export function useAuth() {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) router.push('/login');
  }, []);
}
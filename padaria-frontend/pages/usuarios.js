import { useEffect, useState } from 'react';
//import { api } from '../lib/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import api from '../services/api'; // ou '@/services/api' se você usa paths personalizados

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [novoUsuario, setNovoUsuario] = useState({
    nome: '',
    email: '',
    senha: '',
    username: '',
    role: 'user'
  });
  const router = useRouter();

  const fetchUsuarios = async () => {
    try {
      const res = await api.get('/users');
      setUsuarios(res.data);
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
    }
  };

 useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/login')
    }
  }, [])

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users', novoUsuario);
      setNovoUsuario({ nome: '', email: '', senha: '', username: '', role: 'user' });
      fetchUsuarios();
    } catch (err) {
      console.error('Erro ao cadastrar usuário:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsuarios();
    } catch (err) {
      console.error('Erro ao excluir usuário:', err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gerenciar Usuários</h1>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input className="form-control" placeholder="Nome" value={novoUsuario.nome} onChange={e => setNovoUsuario({ ...novoUsuario, nome: e.target.value })} />
        <input className="form-control" placeholder="Email" value={novoUsuario.email} onChange={e => setNovoUsuario({ ...novoUsuario, email: e.target.value })} />
        <input className="form-control" placeholder="Senha" type="password" value={novoUsuario.senha} onChange={e => setNovoUsuario({ ...novoUsuario, senha: e.target.value })} />
        <input className="form-control" placeholder="Username" value={novoUsuario.username} onChange={e => setNovoUsuario({ ...novoUsuario, username: e.target.value })} />
        <select className="form-select" value={novoUsuario.role} onChange={e => setNovoUsuario({ ...novoUsuario, role: e.target.value })}>
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </select>
        <button type="submit" className="btn btn-success">Cadastrar</button>
      </form>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nome}</td>
              <td>{u.email}</td>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

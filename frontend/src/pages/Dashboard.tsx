import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AuthService } from '../services/api'
import { logout } from '../redux/authSlice'
import type { RootState } from '../redux/store'

interface CurrentUser {
  userId: string
  role: 'ADMIN' | 'USER'
}

const Dashboard: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userRole } = useSelector((state: RootState) => state.auth)
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await AuthService.getCurrentUser()
        setCurrentUser(response.data.user)
      } catch (err: any) {
        setError('Não foi possível carregar os dados do usuário.')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div>
      <header>
        <h1>Dashboard</h1>
        <button type="button" onClick={handleLogout}>Sair</button>
      </header>

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <section>
          <p><strong>ID do usuário:</strong> {currentUser?.userId}</p>
          <p><strong>Função:</strong> {currentUser?.role ?? userRole}</p>

          <div>
            <h2>Bem-vindo ao sistema</h2>
            <p>Aqui você pode acessar suas informações e as funcionalidades disponíveis conforme sua permissão.</p>
          </div>

          {userRole === 'ADMIN' && (
            <div>
              <h3>Área administrativa</h3>
              <p>Como administrador, você pode acessar a gestão de usuários.</p>
              <Link to="/admin/users">Ir para gestão de usuários</Link>
            </div>
          )}

          <div>
            <h3>Próximos passos</h3>
            <ul>
              <li>Verificar suas tarefas</li>
              <li>Criar novos registros</li>
              <li>Usar a navegação protegida</li>
            </ul>
          </div>
        </section>
      )}
    </div>
  )
}

export default Dashboard

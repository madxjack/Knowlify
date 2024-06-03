import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { Header } from './components/nav/Header'
// import NavBar from './components/nav/NavBar'
import RegisterPage from './pages/RegisterPage'
import Footer from './components/footer/Footer'
import BarterListPage from './pages/barter/BarterListPage'
import BarterDetailsPage from './pages/barter/BarterDetailsPage'
import TransactionListPage from './pages/transaction/TransactionListPage'
import TransactionDetailsPage from './pages/transaction/TransactionDetailsPage'
import SkillListPage from './pages/skill/SkillListPage'
import SkillDetailsPage from './pages/skill/SkillDetailsPage'
import TestPage from './TestPage'
import DashboardPage from './pages/DashboardPage'
import CreateBarterPage from './pages/barter/CreateBarterPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoutes from './pages/auth/ProtectedRoutes'

function App() {
  return (
    <div className="app min-h-screen flex flex-col font-[Circular, -Apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif] text-black/80">
      <Router>
        <div className='border-b'>{<Header />}</div>
        <main className='flex-1 '>
          <div className='px-10 mx-auto pt-10 pb-10 lg:max-w-screen-xl'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route element={<ProtectedRoutes />}>
                <Route path='/barters' element={<BarterListPage />} />
                <Route path='/barter/:id' element={<BarterDetailsPage />} />
                <Route path='/barter/create' element={<CreateBarterPage />} />
                <Route path='/transactions' element={<TransactionListPage />} />
                <Route
                  path='/transaction/:id'
                  element={<TransactionDetailsPage />}
                />
                <Route path='/skills' element={<SkillListPage />} />
                <Route path='/skill/:id' element={<SkillDetailsPage />} />
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/profile' element={<ProfilePage />} />
              </Route>
              <Route path='test' element={<TestPage />} />
            </Routes>
          </div>
        </main>
        <div className='border-t'>{<Footer />}</div>
      </Router>
    </div>
  )
}

export default App

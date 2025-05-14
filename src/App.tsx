import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Arena from './pages/Arena'
import Battleground from './pages/Battleground'
import FileManager from './components/FileManager'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoutes from './components/ProtectedRoutes'
import Register from './components/Register'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'
import LoginPage from './components/Login'
import QuestionSetup from './components/QuestionSetup'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
              <Route element={<ProtectedRoutes/>}>
                <Route path="/" element={<FileManager />} />
                <Route path="/arena" element={<Arena />} />
                <Route path="/battleground" element={<Battleground />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
    </ThemeProvider>
  )
}

export default App;

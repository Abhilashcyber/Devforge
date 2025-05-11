import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Arena from './pages/Arena'
import Battleground from './pages/Battleground'
import FileManager from './components/FileManager'
import { AuthProvider } from './contexts/AuthContext'
import Login from './components/Login'
import ProtectedRoutes from './components/ProtectedRoutes'
import Register from './components/Register'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'
import { PlaygroundProvider } from './contexts/PlaygroundContext'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <AuthProvider>
        <PlaygroundProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<ProtectedRoutes/>}>
                <Route path="/" element={<FileManager />} />
                <Route path="/arena" element={<Arena />} />
                <Route path="/battleground" element={<Battleground />} />
              </Route>
            </Routes>
          </Router>
          </PlaygroundProvider>
        </AuthProvider>
    </ThemeProvider>
  )
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Workspace from './pages/Workspace'
import Arena from './pages/Arena'
import Battleground from './pages/Battleground'
import Playground from './pages/Playground'
import FileManager from './components/FileManager'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FileManager />} />
        <Route path="/arena" element={<Arena />} />
        <Route path="/battleground" element={<Battleground />} />
      </Routes>
    </Router>
  )
}

export default App

import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import TournamentDraw from './pages/TournamentDraw'
import Scraper from './pages/Scraper'

function App() {
  return (
    <>
      <nav style={{ display: 'flex', gap: 12, padding: 12 }}>
        <Link to="/">Draw</Link>
        <Link to="/scrape">Scrape</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TournamentDraw />} />
        <Route path="/scrape" element={<Scraper />} />
      </Routes>
    </>
  )
}

export default App

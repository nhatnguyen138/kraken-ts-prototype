import { Routes, Route } from 'react-router-dom'
import './styles.scss'

// Components
import Header from './components/Header'

// Pages
import Home from './pages/Home'
import Chart from './pages/Chart'

export default function App() {
  return (
    <div className="app-container">
      <div className="app-content">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chart" element={<Chart />} />
        </Routes>
      </div>
    </div>
  )
}

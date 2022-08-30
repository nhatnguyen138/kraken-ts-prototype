import { useLocation, useNavigate } from 'react-router-dom'
import './styles.scss'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <header>
      {location.pathname!=="/" &&
        <div
          className="button prevent-highlight"
          onClick={() => navigate("/")}
        >
          &#10140;
        </div>
      }
      <div className="text prevent-highlight">
        Live Crypto Ticker by{' '}
        <a href={'https://nhatnguyen138.netlify.app'} target="_blank" rel="noopener noreferrer">
          &#64;NhatNguyen138
        </a>
      </div>
    </header>
  )
}

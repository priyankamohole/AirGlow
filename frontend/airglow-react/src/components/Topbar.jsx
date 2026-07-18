import { useNavigate } from 'react-router-dom'

export default function Topbar({ title }) {
  const navigate = useNavigate()

  return (
    <div className="topbar">
      <h1>{title}</h1>
      <div className="topbar-right">
        <div className="icon-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
            <path d="M10 20a2 2 0 0 0 4 0" />
          </svg>
          <span className="dot-badge"></span>
        </div>
        <div className="avatar" style={{ cursor: 'pointer' }} onClick={() => navigate('/app/settings')}>AD</div>
      </div>
    </div>
  )
}

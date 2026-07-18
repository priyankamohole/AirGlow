import { NavLink, useNavigate } from 'react-router-dom'
import { LogoIcon, navIcons } from './icons.jsx'

const navItems = [
  { to: '/app/dashboard', key: 'dashboard', label: 'Dashboard' },
  { to: '/app/dags', key: 'dags', label: 'DAGs' },
  { to: '/app/runs', key: 'runs', label: 'Runs' },
  { to: '/app/schedules', key: 'schedules', label: 'Schedules' },
  { to: '/app/outputs', key: 'outputs', label: 'Outputs' },
  { to: '/app/webhooks', key: 'webhooks', label: 'Webhooks' },
  { to: '/app/users', key: 'users', label: 'Users' },
  { to: '/app/settings', key: 'settings', label: 'Settings' },
  { to: '/app/documentation', key: 'documentation', label: 'Documentation' }
]

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <div className="sidebar">
      <div className="brand-logo">
        <LogoIcon />
        AirGlow
      </div>

      {navItems.map(item => (
        <NavLink
          key={item.key}
          to={item.to}
          className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
        >
          {navIcons[item.key]}
          {item.label}
        </NavLink>
      ))}

      <div className="sidebar-footer" onClick={() => navigate('/')}>
        <div className="avatar">AD</div>
        <div className="who">
          <div className="name">Admin User</div>
          <div className="email">admin@airglow.com</div>
        </div>
      </div>
    </div>
  )
}

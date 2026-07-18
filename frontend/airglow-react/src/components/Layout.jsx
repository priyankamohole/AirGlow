import { Outlet, useLocation, useParams } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'

const titles = {
  dashboard: 'Dashboard',
  dags: 'DAGs',
  'dags/new': 'Create new DAG',
  runs: 'Runs',
  webhooks: 'Webhooks',
  schedules: 'Schedules',
  outputs: 'Outputs',
  users: 'Users',
  settings: 'Settings',
  documentation: 'Documentation'
}

export default function Layout() {
  const location = useLocation()
  const params = useParams()
  const segment = location.pathname.replace('/app/', '')

  let title = titles[segment]
  if (!title && segment.startsWith('dags/new')) title = 'Create new DAG'
  if (!title && params.id) title = 'Run details'
  if (!title) title = 'AirGlow'

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main">
        <Topbar title={title} />
        <Outlet />
      </div>
    </div>
  )
}

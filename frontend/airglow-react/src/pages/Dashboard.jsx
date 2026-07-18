import { Link } from 'react-router-dom'
import Badge from '../components/Badge.jsx'
import { navIcons } from '../components/icons.jsx'
import { runsData } from '../data/mockData.js'

const statIcons = {
  blue: navIcons.dags,
  green: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  red: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  amber: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 9h16" />
    </svg>
  )
}

const stats = [
  { label: 'Total DAGs', value: '24', delta: '+3 this week', dir: 'up', color: 'blue' },
  { label: 'Successful runs', value: '152', delta: '+18 this week', dir: 'up', color: 'green' },
  { label: 'Failed runs', value: '6', delta: '-2 this week', dir: 'down', color: 'red' },
  { label: 'Total records', value: '15.6K', delta: '+2.4K this week', dir: 'up', color: 'amber' }
]

const health = ['API gateway', 'Database', 'Redis', 'Celery workers', 'Celery beat']

export default function Dashboard() {
  return (
    <div className="page">
      <div className="stat-grid">
        {stats.map(s => (
          <div className="stat-card" key={s.label}>
            <div className="stat-top">
              <div className={`stat-icon ${s.color}`}>{statIcons[s.color]}</div>
              <span className="stat-label">{s.label}</span>
            </div>
            <div className="stat-value">{s.value}</div>
            <div className={`stat-delta ${s.dir}`}>{s.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-head">
            <h3>Runs overview</h3>
            <div className="legend-row">
              <span><span className="legend-dot" style={{ background: 'var(--green)' }}></span>Successful</span>
              <span><span className="legend-dot" style={{ background: 'var(--red)' }}></span>Failed</span>
            </div>
          </div>
          <svg viewBox="0 0 640 220" width="100%" height="220">
            <line x1="30" y1="10" x2="30" y2="180" stroke="#e6e8ee" />
            <line x1="30" y1="180" x2="630" y2="180" stroke="#e6e8ee" />
            <text x="6" y="14" fontSize="11" fill="#98a2b3">40</text>
            <text x="6" y="57" fontSize="11" fill="#98a2b3">30</text>
            <text x="6" y="100" fontSize="11" fill="#98a2b3">20</text>
            <text x="6" y="143" fontSize="11" fill="#98a2b3">10</text>
            <text x="10" y="184" fontSize="11" fill="#98a2b3">0</text>
            <polyline fill="none" stroke="var(--green)" strokeWidth="2.5" points="30,110 130,140 230,95 330,120 430,70 530,90 620,60" />
            <polyline fill="none" stroke="var(--red)" strokeWidth="2.5" points="30,168 130,158 230,170 330,150 430,163 530,155 620,165" />
            <text x="30" y="200" fontSize="11" fill="#98a2b3">May 12</text>
            <text x="130" y="200" fontSize="11" fill="#98a2b3">May 13</text>
            <text x="230" y="200" fontSize="11" fill="#98a2b3">May 14</text>
            <text x="330" y="200" fontSize="11" fill="#98a2b3">May 15</text>
            <text x="430" y="200" fontSize="11" fill="#98a2b3">May 16</text>
            <text x="530" y="200" fontSize="11" fill="#98a2b3">May 17</text>
            <text x="595" y="200" fontSize="11" fill="#98a2b3">May 18</text>
          </svg>
        </div>

        <div className="card">
          <div className="card-head"><h3>Runs by status</h3></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <svg width="120" height="120" viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#f2f4f7" strokeWidth="6"></circle>
              <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#12b76a" strokeWidth="6" strokeDasharray="92 100" strokeDashoffset="25"></circle>
              <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#f04438" strokeWidth="6" strokeDasharray="4 100" strokeDashoffset="-67"></circle>
              <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#98a2b3" strokeWidth="6" strokeDasharray="4 100" strokeDashoffset="-71"></circle>
            </svg>
            <div style={{ fontSize: 13, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span><span className="legend-dot" style={{ background: 'var(--green)' }}></span> Success &nbsp;152 (92%)</span>
              <span><span className="legend-dot" style={{ background: 'var(--red)' }}></span> Failed &nbsp;6 (4%)</span>
              <span><span className="legend-dot" style={{ background: '#98a2b3' }}></span> Running &nbsp;7 (4%)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-head">
            <h3>Recent runs</h3>
            <Link to="/app/runs">View all runs &rarr;</Link>
          </div>
          <table>
            <thead>
              <tr><th>Run ID</th><th>DAG name</th><th>Status</th><th>Start time</th><th>Duration</th><th>Records</th></tr>
            </thead>
            <tbody>
              {runsData.map(r => (
                <tr key={r.id} className="link-row">
                  <td><Link to={`/app/runs/${r.id}`}>{r.id}</Link></td>
                  <td>{r.dag}</td>
                  <td><Badge status={r.status} /></td>
                  <td>{r.start}</td>
                  <td>{r.duration}</td>
                  <td>{r.records}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-head"><h3>System health</h3></div>
          <div className="health-list">
            {health.map(h => (
              <div className="health-item" key={h}>
                <div className="health-left"><span className="health-dot"></span>{h}</div>
                <span className="health-status">Healthy</span>
              </div>
            ))}
          </div>
          <a className="view-details" href="#health">View details &rarr;</a>
        </div>
      </div>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import Badge from '../components/Badge.jsx'
import { IconPlay, IconEdit, IconDots } from '../components/icons.jsx'
import { dagsData } from '../data/mockData.js'

export default function Dags() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <div className="page-head">
        <h2>DAGs</h2>
        <button className="btn btn-primary btn-sm" onClick={() => navigate('/app/dags/new')}>+ Create DAG</button>
      </div>
      <div className="card flush">
        <table>
          <thead>
            <tr><th>ID</th><th>DAG name</th><th>Type</th><th>Schedule</th><th>Status</th><th>Last run</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {dagsData.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.type}</td>
                <td><code>{d.schedule}</code></td>
                <td><Badge status={d.status} /></td>
                <td>{d.lastRun}</td>
                <td>
                  <div className="row-actions">
                    <button title="Run"><IconPlay /></button>
                    <button title="Edit"><IconEdit /></button>
                    <button title="More"><IconDots /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

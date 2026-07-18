import Badge from '../components/Badge.jsx'
import { IconEdit, IconDots } from '../components/icons.jsx'
import { webhooksData } from '../data/mockData.js'

export default function Webhooks() {
  return (
    <div className="page">
      <div className="page-head">
        <h2>Webhooks</h2>
        <button className="btn btn-primary btn-sm" onClick={() => alert('Add webhook form goes here.')}>+ Add webhook</button>
      </div>
      <div className="card flush">
        <table>
          <thead>
            <tr><th>ID</th><th>DAG name</th><th>Callback URL</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {webhooksData.map(w => (
              <tr key={w.id}>
                <td>{w.id}</td>
                <td>{w.dag}</td>
                <td style={{ color: 'var(--text2)' }}>{w.url}</td>
                <td><Badge status={w.status} /></td>
                <td>
                  <div className="row-actions">
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

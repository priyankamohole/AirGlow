import { Link } from 'react-router-dom'
import Badge from '../components/Badge.jsx'
import { runsData } from '../data/mockData.js'

export default function Runs() {
  return (
    <div className="page">
      <div className="page-head"><h2>Runs</h2></div>
      <div className="card flush">
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
    </div>
  )
}

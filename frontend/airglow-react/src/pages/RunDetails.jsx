import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Badge from '../components/Badge.jsx'
import { runsData, runLogs } from '../data/mockData.js'

const tabs = ['Logs', 'Input', 'Output', 'Metrics']

export default function RunDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState('Logs')

  const run = runsData.find(r => String(r.id) === id) || runsData[0]
  const logs = runLogs[run.id] || []

  return (
    <div className="page">
      <div className="breadcrumb" onClick={() => navigate('/app/runs')}>&larr; Back to runs</div>
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="run-info-grid">
          <div className="cell"><div className="lbl">Run ID</div><div className="val">{run.id}</div></div>
          <div className="cell"><div className="lbl">DAG name</div><div className="val">{run.dag}</div></div>
          <div className="cell"><div className="lbl">Status</div><div className="val"><Badge status={run.status} /></div></div>
          <div className="cell"><div className="lbl">Start time</div><div className="val">{run.start}</div></div>
          <div className="cell"><div className="lbl">Duration</div><div className="val">{run.duration}</div></div>
          <div className="cell"><div className="lbl">Records</div><div className="val">{run.records}</div></div>
        </div>

        <div className="tabs">
          {tabs.map(t => (
            <div key={t} className={'tab' + (tab === t ? ' active' : '')} onClick={() => setTab(t)}>{t}</div>
          ))}
        </div>

        {tab === 'Logs' ? (
          <div className="terminal">
            {logs.length ? logs.map((l, i) => (
              <div key={i}><span className="ts">{l.ts}</span><span className={l.ok ? 'ok' : ''}>{l.text}</span></div>
            )) : <div style={{ color: 'var(--text3)' }}>No logs recorded for this run.</div>}
          </div>
        ) : (
          <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text2)' }}>
            No {tab.toLowerCase()} data to show for this run.
          </div>
        )}
      </div>
    </div>
  )
}

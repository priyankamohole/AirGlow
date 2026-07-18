import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const steps = ['Source', 'Transform', 'Destination', 'Schedule', 'Review']

export default function CreateDag() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  function next() {
    if (step >= steps.length - 1) {
      navigate('/app/dags')
      return
    }
    setStep(s => s + 1)
  }

  return (
    <div className="page">
      <div className="page-head"><h2>Create new DAG</h2></div>

      <div className="stepper">
        {steps.map((label, i) => (
          <div key={label} style={{ display: 'contents' }}>
            <div className={'step' + (i === step ? ' active' : i < step ? ' done' : '')}>
              <span className="num">{i + 1}</span>{label}
            </div>
            {i < steps.length - 1 && <div className="step-line"></div>}
          </div>
        ))}
      </div>

      {step === 0 ? (
        <div className="wizard-grid">
          <div className="card">
            <div className="card-head"><h3>Source configuration</h3></div>
            <div className="field">
              <label>Source type</label>
              <select defaultValue="REST API">
                <option>REST API</option>
                <option>PostgreSQL</option>
                <option>MySQL</option>
                <option>S3 bucket</option>
                <option>Google Sheets</option>
              </select>
            </div>
            <div className="field">
              <label>API endpoint</label>
              <input type="text" defaultValue="https://jsonplaceholder.typicode.com/users" />
            </div>
            <div className="field">
              <label>Method</label>
              <select defaultValue="GET"><option>GET</option><option>POST</option></select>
            </div>
            <div className="field">
              <label>Headers (JSON)</label>
              <textarea rows={3} defaultValue={'{"Content-Type": "application/json"}'} />
            </div>
          </div>

          <div className="card">
            <div className="card-head"><h3>Preview data</h3></div>
            <div className="code-preview">
{`[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz"
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv"
  },
  ...`}
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-head"><h3>{steps[step]}</h3></div>
          <p style={{ color: 'var(--text2)', margin: '0 0 14px' }}>Configure this step for your pipeline.</p>
          <div className="field">
            <label>Notes</label>
            <textarea rows={4} placeholder="Describe the configuration for this step..." />
          </div>
        </div>
      )}

      <div className="wizard-actions">
        <button className="btn" onClick={() => navigate('/app/dags')}>Cancel</button>
        <button className="btn btn-primary" onClick={next}>
          {step === steps.length - 1 ? 'Create DAG' : 'Next'}
        </button>
      </div>
    </div>
  )
}

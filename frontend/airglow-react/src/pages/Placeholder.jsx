export default function Placeholder({ title }) {
  return (
    <div className="page">
      <div className="placeholder-page">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M3 9.5h18" />
        </svg>
        <h3>{title}</h3>
        <p>This part of AirGlow isn't wired up in this prototype yet.</p>
      </div>
    </div>
  )
}

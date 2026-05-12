export default function StatusPill({ status }) {
  const cls = {
    up: 'status-up',
    warning: 'status-warning',
    paused: 'status-paused',
    down: 'status-down',
  }[status] || 'status-paused'

  const label = {
    up: 'Up',
    warning: 'Warning',
    paused: 'Paused',
    down: 'Down',
  }[status] || status

  return <span className={cls}>{label}</span>
}

export default function FilterBar({ label, options, active, onChange }) {
  return (
    <div className="filter-bar">
      {label && <span className="filter-bar-label">{label}</span>}
      {options.map((opt) => {
        const value = typeof opt === 'string' ? opt : opt.value
        const display = typeof opt === 'string' ? opt : opt.label
        return (
          <button
            key={value}
            className={`filter-btn${active === value ? ' active' : ''}`}
            onClick={() => onChange(value)}
          >
            {display}
          </button>
        )
      })}
    </div>
  )
}

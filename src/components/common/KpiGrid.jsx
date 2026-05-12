export default function KpiGrid({ kpis }) {
  return (
    <div className="kpi-grid">
      {kpis.map((k, i) => (
        <div key={i} className={`kpi${k.cls ? ' ' + k.cls : ''}`}>
          <div className="num">{k.num}</div>
          <div className="label">{k.label}</div>
          {k.sub && <div className="sub">{k.sub}</div>}
        </div>
      ))}
    </div>
  )
}

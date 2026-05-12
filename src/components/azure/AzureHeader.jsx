export default function AzureHeader({ tenant, generated, totalRules, dcrVMs, dcrCount }) {
  return (
    <header>
      <h1>Azure Monitor &mdash; Vertex Product Alert Coverage</h1>
      <p>
        Tenant: <strong>{tenant}</strong> &nbsp;&middot;&nbsp;
        Generated: <strong>{generated}</strong> &nbsp;&middot;&nbsp;
        Total Alert Rules: <strong>{totalRules}</strong> &nbsp;&middot;&nbsp;
        VMs via DCR: <strong>{dcrVMs}</strong> ({dcrCount} DCRs)
      </p>
    </header>
  )
}

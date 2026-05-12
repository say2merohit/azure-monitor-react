export default function AlertFlowSection() {
  return (
    <div className="section">
      <h2>How Azure Monitoring Works &mdash; Alert Flow by Type</h2>

      {/* VM + DCR */}
      <div className="pipeline">
        <div className="pipeline-title">🖥️ VM &amp; Infrastructure Monitoring &mdash; via AMA Agent + DCR</div>
        <div className="pipe-flow">
          <div className="pipe-step"><div className="pipe-icon2">🖥️</div><div className="pipe-label">Virtual Machine</div><div className="pipe-sub">Azure IaaS VM<br />(Windows / Linux)</div></div>
          <div className="pipe-arrow">→</div>
          <div className="pipe-step"><div className="pipe-icon2">🤖</div><div className="pipe-label">AMA Agent</div><div className="pipe-sub">Azure Monitor Agent<br />installed on VM</div></div>
          <div className="pipe-arrow">→</div>
          <div className="pipe-step"><div className="pipe-icon2">📋</div><div className="pipe-label">DCR</div><div className="pipe-sub">Data Collection Rule<br />defines what to collect</div></div>
          <div className="pipe-arrow">→</div>
          <div className="pipe-step store"><div className="pipe-icon2">📊</div><div className="pipe-label">Log Analytics Workspace</div><div className="pipe-sub">Data stored &amp; queried<br />here (Perf / Events)</div></div>
          <div className="pipe-arrow">→</div>
          <div className="pipe-step"><div className="pipe-icon2">🔔</div><div className="pipe-label">Alert Rules</div><div className="pipe-sub">Fire when threshold<br />is breached</div></div>
          <div className="pipe-arrow">→</div>
          <div className="pipe-step dest"><div className="pipe-icon2">📟</div><div className="pipe-label">OpsGenie</div><div className="pipe-sub">On-call notification<br />&amp; escalation</div></div>
        </div>
        <div className="pipe-covers"><b>Covers:</b> Disk space &middot; Memory &middot; Windows service status &middot; Heartbeat &nbsp;&mdash;&nbsp; <em>VM must be DCR-attached for these alerts to fire</em></div>
      </div>

      <div className="pipe-grid">
        {/* Platform Metrics */}
        <div className="pipeline">
          <div className="pipeline-title">📈 Platform Metrics &mdash; Agentless (CPU only)</div>
          <div className="pipe-flow">
            <div className="pipe-step"><div className="pipe-icon2">🖥️</div><div className="pipe-label">Virtual Machine</div><div className="pipe-sub">Azure IaaS VM</div></div>
            <div className="pipe-arrow">→</div>
            <div className="pipe-step store"><div className="pipe-icon2">☁️</div><div className="pipe-label">Azure Monitor Metrics</div><div className="pipe-sub">Hypervisor-level<br />data (no agent needed)</div></div>
            <div className="pipe-arrow">→</div>
            <div className="pipe-step"><div className="pipe-icon2">🔔</div><div className="pipe-label">Alert Rules</div><div className="pipe-sub">Threshold breach</div></div>
            <div className="pipe-arrow">→</div>
            <div className="pipe-step dest"><div className="pipe-icon2">📟</div><div className="pipe-label">OpsGenie</div><div className="pipe-sub">Notification</div></div>
          </div>
          <div className="pipe-covers"><b>Covers:</b> CPU percentage &nbsp;&mdash;&nbsp; <em>No agent or DCR required</em></div>
        </div>

        {/* Activity Log */}
        <div className="pipeline">
          <div className="pipeline-title">❤️ Availability &amp; Up/Down &mdash; Activity Log</div>
          <div className="pipe-flow">
            <div className="pipe-step"><div className="pipe-icon2">🖥️</div><div className="pipe-label">VM / Resource</div><div className="pipe-sub">Any Azure resource</div></div>
            <div className="pipe-arrow">→</div>
            <div className="pipe-step store"><div className="pipe-icon2">📜</div><div className="pipe-label">Azure Activity Log</div><div className="pipe-sub">Platform-level<br />state change events</div></div>
            <div className="pipe-arrow">→</div>
            <div className="pipe-step"><div className="pipe-icon2">🔔</div><div className="pipe-label">Alert Rules</div><div className="pipe-sub">On state change</div></div>
            <div className="pipe-arrow">→</div>
            <div className="pipe-step dest"><div className="pipe-icon2">📟</div><div className="pipe-label">OpsGenie</div><div className="pipe-sub">Notification</div></div>
          </div>
          <div className="pipe-covers"><b>Covers:</b> VM start / stop / deallocate &middot; Resource health changes &middot; Service health &nbsp;&mdash;&nbsp; <em>No agent required</em></div>
        </div>
      </div>

      <div className="pipe-grid">
        {/* App Insights */}
        <div className="pipeline">
          <div className="pipeline-title">📊 App Performance &mdash; Application Insights</div>
          <div className="pipe-flow">
            <div className="pipe-step"><div className="pipe-icon2">🚀</div><div className="pipe-label">App Service /<br />Function App</div><div className="pipe-sub">Instrumented app</div></div>
            <div className="pipe-arrow">→</div>
            <div className="pipe-step store"><div className="pipe-icon2">🔭</div><div className="pipe-label">Application Insights</div><div className="pipe-sub">Telemetry &amp;<br />request traces stored</div></div>
            <div className="pipe-arrow">→</div>
            <div className="pipe-step"><div className="pipe-icon2">🧠</div><div className="pipe-label">Smart Detection</div><div className="pipe-sub">ML anomaly<br />detection rules</div></div>
            <div className="pipe-arrow">→</div>
            <div className="pipe-step dest"><div className="pipe-icon2">📟</div><div className="pipe-label">OpsGenie</div><div className="pipe-sub">Notification</div></div>
          </div>
          <div className="pipe-covers"><b>Covers:</b> Failure rate anomalies &middot; Response time degradation &middot; Dependency failures &middot; Memory leaks</div>
        </div>

        {/* App Gateway */}
        <div className="pipeline">
          <div className="pipeline-title">🌐 App Gateway &amp; WAF</div>
          <div className="pipe-flow">
            <div className="pipe-step"><div className="pipe-icon2">🌐</div><div className="pipe-label">App Gateway / WAF</div><div className="pipe-sub">Inbound traffic</div></div>
            <div className="pipe-arrow">→</div>
            <div className="pipe-step store"><div className="pipe-icon2">☁️</div><div className="pipe-label">Azure Monitor Metrics</div><div className="pipe-sub">Gateway metrics<br />&amp; access logs</div></div>
            <div className="pipe-arrow">→</div>
            <div className="pipe-step"><div className="pipe-icon2">🔔</div><div className="pipe-label">Alert Rules</div><div className="pipe-sub">Threshold breach</div></div>
            <div className="pipe-arrow">→</div>
            <div className="pipe-step dest"><div className="pipe-icon2">📟</div><div className="pipe-label">OpsGenie</div><div className="pipe-sub">Notification</div></div>
          </div>
          <div className="pipe-covers"><b>Covers:</b> Unhealthy backend VMs &middot; WAF blocked requests &middot; Throughput &middot; Latency &middot; Failed requests</div>
        </div>
      </div>

      {/* Certificate Expiry */}
      <div className="pipeline">
        <div className="pipeline-title">🔐 Certificate Expiry Monitoring</div>
        <div className="pipe-flow">
          <div className="pipe-step"><div className="pipe-icon2">🌐</div><div className="pipe-label">App Gateway /<br />Key Vault</div><div className="pipe-sub">Hosts SSL certificates</div></div>
          <div className="pipe-arrow">→</div>
          <div className="pipe-step store"><div className="pipe-icon2">📅</div><div className="pipe-label">Azure Monitor</div><div className="pipe-sub">Certificate expiry<br />date tracked</div></div>
          <div className="pipe-arrow">→</div>
          <div className="pipe-step"><div className="pipe-icon2">🔔</div><div className="pipe-label">Alert Rules</div><div className="pipe-sub">X days before expiry</div></div>
          <div className="pipe-arrow">→</div>
          <div className="pipe-step dest"><div className="pipe-icon2">📟</div><div className="pipe-label">OpsGenie</div><div className="pipe-sub">Notification &amp;<br />renewal reminder</div></div>
        </div>
        <div className="pipe-covers"><b>Covers:</b> SSL / TLS certificate expiry across all App Gateways &amp; Key Vault-managed certificates</div>
      </div>
    </div>
  )
}

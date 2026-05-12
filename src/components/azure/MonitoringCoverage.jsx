export default function MonitoringCoverage() {
  return (
    <div className="section" style={{ marginBottom: '22px' }}>
      <h2>Monitoring Coverage &mdash; What We Alert On by Service Type</h2>
      <div className="svc-grid">
        <div className="svc-card">
          <div className="svc-icon-row">🖥️</div>
          <div className="svc-name">Virtual Machine</div>
          <div className="svc-pills">
            <span className="mp mp-s0">CPU</span>
            <span className="mp mp-s0">Memory</span>
            <span className="mp mp-s0">Disk</span>
            <span className="mp mp-s0">Up / Down</span>
            <span className="mp mp-s1">Windows Services</span>
          </div>
        </div>
        <div className="svc-card">
          <div className="svc-icon-row">🌐</div>
          <div className="svc-name">Application Gateway</div>
          <div className="svc-pills">
            <span className="mp mp-s0">Backend Health</span>
            <span className="mp mp-s1">WAF Blocked Requests</span>
            <span className="mp mp-s1">Failed Requests</span>
            <span className="mp mp-s1">Throughput</span>
            <span className="mp mp-s1">Capacity</span>
          </div>
        </div>
        <div className="svc-card">
          <div className="svc-icon-row">🚀</div>
          <div className="svc-name">App Service</div>
          <div className="svc-pills">
            <span className="mp mp-s0">Availability</span>
            <span className="mp mp-s1">Response Time</span>
          </div>
        </div>
        <div className="svc-card">
          <div className="svc-icon-row">🔭</div>
          <div className="svc-name">Application Insights</div>
          <div className="svc-pills">
            <span className="mp mp-s0">Availability Tests</span>
            <span className="mp mp-s3">Failure Anomalies</span>
          </div>
        </div>
        <div className="svc-card">
          <div className="svc-icon-row">💾</div>
          <div className="svc-name">Azure DB for MySQL</div>
          <div className="svc-pills">
            <span className="mp mp-s0">CPU</span>
            <span className="mp mp-s1">Storage</span>
            <span className="mp mp-s1">Memory</span>
          </div>
        </div>
        <div className="svc-card">
          <div className="svc-icon-row">💾</div>
          <div className="svc-name">Azure DB for PostgreSQL</div>
          <div className="svc-pills">
            <span className="mp mp-s0">CPU</span>
            <span className="mp mp-s1">Storage</span>
            <span className="mp mp-s1">Memory</span>
          </div>
        </div>
        <div className="svc-card">
          <div className="svc-icon-row">⎈</div>
          <div className="svc-name">Kubernetes Service</div>
          <div className="svc-pills">
            <span className="mp mp-s0">Node CPU</span>
            <span className="mp mp-s0">Node Memory</span>
          </div>
        </div>
        <div className="svc-card">
          <div className="svc-icon-row">📊</div>
          <div className="svc-name">Log Analytics Workspace</div>
          <div className="svc-pills">
            <span className="mp mp-s1">Query Health</span>
            <span className="mp mp-s1">Agent Heartbeat</span>
          </div>
        </div>
        <div className="svc-card">
          <div className="svc-icon-row">⚡</div>
          <div className="svc-name">Logic App</div>
          <div className="svc-pills">
            <span className="mp mp-s1">Failed Runs</span>
          </div>
        </div>
        <div className="svc-card">
          <div className="svc-icon-row">📋</div>
          <div className="svc-name">Subscription</div>
          <div className="svc-pills">
            <span className="mp mp-s4">Service Health Events</span>
            <span className="mp mp-s4">Azure Service Issues</span>
          </div>
        </div>
        <div className="svc-card">
          <div className="svc-icon-row">🔌</div>
          <div className="svc-name">API Management Service</div>
          <div className="svc-pills">
            <span className="mp mp-s1">Request Failures</span>
            <span className="mp mp-s1">Gateway Errors</span>
          </div>
        </div>
        <div className="svc-card">
          <div className="svc-icon-row">🔐</div>
          <div className="svc-name">Certificate Management</div>
          <div className="svc-pills">
            <span className="mp mp-s1">Certificate Expiry</span>
          </div>
        </div>
      </div>
    </div>
  )
}

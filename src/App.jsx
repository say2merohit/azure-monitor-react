import azureKpis from './data/azure_kpis.json'
import AzureHeader from './components/azure/AzureHeader'
import KpiGrid from './components/common/KpiGrid'
import MonitoringCoverage from './components/azure/MonitoringCoverage'
import AlertFlowSection from './components/azure/AlertFlowSection'
import AlertSeverityBars from './components/azure/AlertSeverityBars'
import ProductMatrix from './components/azure/ProductMatrix'
import ProductCards from './components/azure/ProductCards'
import PRTGSection from './components/prtg/PRTGSection'
import UptimeRobotSection from './components/uptimerobot/UptimeRobotSection'
import Footer from './Footer'

export default function App() {
  return (
    <>
      <AzureHeader
        tenant={azureKpis.tenant}
        generated={azureKpis.generated}
        totalRules={azureKpis.totalRules}
        dcrVMs={azureKpis.dcrVMs}
        dcrCount={azureKpis.dcrCount}
      />
      <div className="container">
        <KpiGrid kpis={azureKpis.kpis} />
        <MonitoringCoverage />
        <AlertFlowSection />
        <AlertSeverityBars />
        <ProductMatrix />
        <ProductCards />
        <PRTGSection />
        <UptimeRobotSection />
      </div>
      <Footer />
    </>
  )
}

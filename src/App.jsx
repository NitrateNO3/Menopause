import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import RouteEffects from './components/RouteEffects'
import { LeadProvider } from './components/LeadModal'

export default function App() {
  return (
    <LeadProvider>
      <RouteEffects />
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </LeadProvider>
  )
}

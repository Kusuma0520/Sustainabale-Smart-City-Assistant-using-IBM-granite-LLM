import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import PolicySearch from './pages/PolicySearch'
import CitizenFeedback from './pages/CitizenFeedback'
import KPIForecasting from './pages/KPIForecasting'
import EcoTips from './pages/EcoTips'
import AnomalyDetection from './pages/AnomalyDetection'
import ChatAssistant from './pages/ChatAssistant'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/policy-search" element={<PolicySearch />} />
          <Route path="/citizen-feedback" element={<CitizenFeedback />} />
          <Route path="/kpi-forecasting" element={<KPIForecasting />} />
          <Route path="/eco-tips" element={<EcoTips />} />
          <Route path="/anomaly-detection" element={<AnomalyDetection />} />
          <Route path="/chat-assistant" element={<ChatAssistant />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
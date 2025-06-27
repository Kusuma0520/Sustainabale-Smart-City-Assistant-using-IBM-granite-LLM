import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Upload, Eye, Download, MapPin, Clock, TrendingUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts'

const AnomalyDetection = () => {
  const [selectedDataset, setSelectedDataset] = useState('energy')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)

  const datasets = [
    { value: 'energy', label: 'Energy Consumption', unit: 'MWh' },
    { value: 'water', label: 'Water Usage', unit: 'ML' },
    { value: 'waste', label: 'Waste Generation', unit: 'Tons' },
    { value: 'traffic', label: 'Traffic Flow', unit: 'Vehicles/hour' },
    { value: 'air_quality', label: 'Air Quality Index', unit: 'AQI' }
  ]

  const energyData = [
    { time: '00:00', value: 2400, normal: 2350, anomaly: false },
    { time: '04:00', value: 1800, normal: 1850, anomaly: false },
    { time: '08:00', value: 3200, normal: 2800, anomaly: true },
    { time: '12:00', value: 3500, normal: 3400, anomaly: false },
    { time: '16:00', value: 3800, normal: 3600, anomaly: false },
    { time: '20:00', value: 2900, normal: 3000, anomaly: false },
    { time: '24:00', value: 2200, normal: 2300, anomaly: false }
  ]

  const anomalies = [
    {
      id: 1,
      type: 'High Energy Consumption',
      location: 'Sector 12, Industrial Zone',
      severity: 'High',
      value: '3,200 MWh',
      threshold: '2,800 MWh',
      deviation: '+14.3%',
      timestamp: '2024-01-15 08:30:00',
      description: 'Unusual spike in energy consumption detected in industrial sector',
      status: 'Active'
    },
    {
      id: 2,
      type: 'Water Pressure Drop',
      location: 'District 5, Residential Area',
      severity: 'Medium',
      value: '45 PSI',
      threshold: '60 PSI',
      deviation: '-25%',
      timestamp: '2024-01-15 06:15:00',
      description: 'Significant drop in water pressure indicating possible leak',
      status: 'Investigating'
    },
    {
      id: 3,
      type: 'Traffic Congestion',
      location: 'Main Street & 5th Avenue',
      severity: 'Low',
      value: '850 vehicles/hour',
      threshold: '600 vehicles/hour',
      deviation: '+41.7%',
      timestamp: '2024-01-15 07:45:00',
      description: 'Higher than normal traffic flow during off-peak hours',
      status: 'Resolved'
    }
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const runAnalysis = async () => {
    setIsAnalyzing(true)
    // Simulate ML analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisComplete(true)
    }, 4000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-100 border-red-200'
      case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'Low': return 'text-blue-600 bg-blue-100 border-blue-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-red-600 bg-red-100'
      case 'Investigating': return 'text-yellow-600 bg-yellow-100'
      case 'Resolved': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Anomaly Detection System</h1>
            <p className="text-gray-600">AI-powered monitoring for unusual patterns in city infrastructure</p>
          </div>
        </div>
      </motion.div>

      {/* Analysis Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Analysis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Dataset</label>
            <select
              value={selectedDataset}
              onChange={(e) => setSelectedDataset(e.target.value)}
              className="input-field"
            >
              {datasets.map((dataset) => (
                <option key={dataset.value} value={dataset.value}>
                  {dataset.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Custom Data</label>
            <div className="flex space-x-2">
              <input
                type="file"
                accept=".csv,.json"
                onChange={handleFileUpload}
                className="hidden"
                id="anomaly-upload"
              />
              <label htmlFor="anomaly-upload" className="btn-secondary cursor-pointer flex items-center space-x-2 flex-1">
                <Upload className="w-4 h-4" />
                <span>{uploadedFile ? uploadedFile.name : 'Choose File'}</span>
              </label>
              <button
                onClick={runAnalysis}
                disabled={isAnalyzing}
                className="btn-primary flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>{isAnalyzing ? 'Analyzing...' : 'Analyze'}</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Real-time Monitoring */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Real-time Monitoring</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Live Data</span>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={energyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="normal" 
              stroke="#10b981" 
              strokeWidth={2} 
              name="Normal Range"
              strokeDasharray="5 5"
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              strokeWidth={2} 
              name="Actual Value"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Detected Anomalies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Detected Anomalies</h3>
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {anomalies.map((anomaly) => (
            <div key={anomaly.id} className={`border-l-4 rounded-lg p-4 ${
              anomaly.severity === 'High' ? 'border-red-500 bg-red-50' :
              anomaly.severity === 'Medium' ? 'border-yellow-500 bg-yellow-50' :
              'border-blue-500 bg-blue-50'
            }`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">{anomaly.type}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{anomaly.location}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(anomaly.severity)}`}>
                    {anomaly.severity}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(anomaly.status)}`}>
                    {anomaly.status}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-3">{anomaly.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Current Value:</span>
                  <span className="ml-2 text-gray-900">{anomaly.value}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Threshold:</span>
                  <span className="ml-2 text-gray-900">{anomaly.threshold}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Deviation:</span>
                  <span className={`ml-2 font-medium ${
                    anomaly.deviation.startsWith('+') ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {anomaly.deviation}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-xs text-gray-500 mt-3">
                <Clock className="w-3 h-3" />
                <span>Detected: {anomaly.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Data</h3>
              <p className="text-gray-600 mb-4">IBM Granite LLM is processing your data for anomaly detection...</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default AnomalyDetection
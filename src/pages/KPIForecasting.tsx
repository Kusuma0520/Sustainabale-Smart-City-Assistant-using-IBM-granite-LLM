import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Upload, BarChart3, Download, Calendar, Target } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

const KPIForecasting = () => {
  const [selectedKPI, setSelectedKPI] = useState('energy')
  const [forecastPeriod, setForecastPeriod] = useState('6')
  const [uploadedData, setUploadedData] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [forecastGenerated, setForecastGenerated] = useState(false)

  const kpiOptions = [
    { value: 'energy', label: 'Energy Consumption', unit: 'MWh', color: '#f59e0b' },
    { value: 'water', label: 'Water Usage', unit: 'Million Liters', color: '#3b82f6' },
    { value: 'waste', label: 'Waste Generation', unit: 'Tons', color: '#10b981' },
    { value: 'emissions', label: 'CO2 Emissions', unit: 'Tons CO2', color: '#ef4444' },
    { value: 'transport', label: 'Public Transport Usage', unit: 'Passengers', color: '#8b5cf6' }
  ]

  const historicalData = [
    { month: 'Jan 2023', energy: 2400, water: 1800, waste: 1200, emissions: 850, transport: 45000 },
    { month: 'Feb 2023', energy: 2210, water: 1900, waste: 1100, emissions: 780, transport: 47000 },
    { month: 'Mar 2023', energy: 2290, water: 1700, waste: 1300, emissions: 820, transport: 48500 },
    { month: 'Apr 2023', energy: 2000, water: 1600, waste: 1000, emissions: 720, transport: 52000 },
    { month: 'May 2023', energy: 2181, water: 1750, waste: 1150, emissions: 760, transport: 54000 },
    { month: 'Jun 2023', energy: 2500, water: 1900, waste: 1400, emissions: 890, transport: 51000 },
    { month: 'Jul 2023', energy: 2650, water: 2100, waste: 1500, emissions: 920, transport: 49000 },
    { month: 'Aug 2023', energy: 2580, water: 2000, waste: 1450, emissions: 900, transport: 50500 },
    { month: 'Sep 2023', energy: 2300, water: 1850, waste: 1250, emissions: 810, transport: 53000 },
    { month: 'Oct 2023', energy: 2150, water: 1700, waste: 1100, emissions: 750, transport: 55000 },
    { month: 'Nov 2023', energy: 2400, water: 1950, waste: 1350, emissions: 840, transport: 52500 },
    { month: 'Dec 2023', energy: 2600, water: 2200, waste: 1600, emissions: 950, transport: 48000 }
  ]

  const forecastData = [
    { month: 'Jan 2024', energy: 2350, water: 1750, waste: 1180, emissions: 800, transport: 56000 },
    { month: 'Feb 2024', energy: 2280, water: 1680, waste: 1120, emissions: 770, transport: 57500 },
    { month: 'Mar 2024', energy: 2200, water: 1620, waste: 1080, emissions: 740, transport: 59000 },
    { month: 'Apr 2024', energy: 2150, water: 1580, waste: 1050, emissions: 720, transport: 60500 },
    { month: 'May 2024', energy: 2100, water: 1540, waste: 1020, emissions: 700, transport: 62000 },
    { month: 'Jun 2024', energy: 2080, water: 1520, waste: 1000, emissions: 690, transport: 63500 }
  ]

  const combinedData = [...historicalData, ...forecastData]

  const currentKPI = kpiOptions.find(kpi => kpi.value === selectedKPI)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedData(file)
    }
  }

  const generateForecast = async () => {
    setIsProcessing(true)
    // Simulate ML processing
    setTimeout(() => {
      setIsProcessing(false)
      setForecastGenerated(true)
    }, 3000)
  }

  const insights = [
    {
      title: 'Trend Analysis',
      description: `${currentKPI?.label} shows a declining trend of 8% over the forecast period`,
      type: 'positive'
    },
    {
      title: 'Seasonal Pattern',
      description: 'Peak consumption typically occurs in summer months (Jun-Aug)',
      type: 'info'
    },
    {
      title: 'Target Achievement',
      description: 'Projected to meet 2024 sustainability targets with current trend',
      type: 'positive'
    },
    {
      title: 'Risk Assessment',
      description: 'Low risk of exceeding budget allocations based on forecast',
      type: 'positive'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">KPI Forecasting</h1>
            <p className="text-gray-600">AI-powered predictions for city sustainability metrics</p>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select KPI</label>
            <select
              value={selectedKPI}
              onChange={(e) => setSelectedKPI(e.target.value)}
              className="input-field"
            >
              {kpiOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Forecast Period</label>
            <select
              value={forecastPeriod}
              onChange={(e) => setForecastPeriod(e.target.value)}
              className="input-field"
            >
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="12">12 Months</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={generateForecast}
              disabled={isProcessing}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>{isProcessing ? 'Generating...' : 'Generate Forecast'}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Data Upload */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Historical Data</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">Upload CSV file with historical KPI data</p>
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileUpload}
            className="hidden"
            id="data-upload"
          />
          <label htmlFor="data-upload" className="btn-secondary cursor-pointer inline-block">
            Choose File
          </label>
          {uploadedData && (
            <p className="text-sm text-green-600 mt-2">✓ {uploadedData.name} uploaded</p>
          )}
        </div>
      </motion.div>

      {/* Forecast Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {currentKPI?.label} Forecast
          </h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className="text-xs text-gray-600">Historical</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentKPI?.color }}></div>
              <span className="text-xs text-gray-600">Forecast</span>
            </div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [
                `${value} ${currentKPI?.unit}`,
                name === selectedKPI ? currentKPI?.label : name
              ]}
            />
            <Area
              type="monotone"
              dataKey={selectedKPI}
              stroke={currentKPI?.color}
              fill={currentKPI?.color}
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Forecast Insights</h3>
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  insight.type === 'positive' ? 'bg-green-100' :
                  insight.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  {insight.type === 'positive' && <Target className="w-4 h-4 text-green-600" />}
                  {insight.type === 'warning' && <Calendar className="w-4 h-4 text-yellow-600" />}
                  {insight.type === 'info' && <BarChart3 className="w-4 h-4 text-blue-600" />}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{insight.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
            <span className="text-gray-700">IBM Granite LLM is generating forecast...</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default KPIForecasting
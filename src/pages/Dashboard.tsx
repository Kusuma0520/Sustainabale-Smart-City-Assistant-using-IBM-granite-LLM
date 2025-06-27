import React from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Zap, 
  Droplets, 
  Recycle, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const Dashboard = () => {
  const kpiData = [
    { name: 'Jan', energy: 2400, water: 1800, waste: 1200 },
    { name: 'Feb', energy: 2210, water: 1900, waste: 1100 },
    { name: 'Mar', energy: 2290, water: 1700, waste: 1300 },
    { name: 'Apr', energy: 2000, water: 1600, waste: 1000 },
    { name: 'May', energy: 2181, water: 1750, waste: 1150 },
    { name: 'Jun', energy: 2500, water: 1900, waste: 1400 },
  ]

  const feedbackData = [
    { category: 'Water', count: 45 },
    { category: 'Energy', count: 32 },
    { category: 'Waste', count: 28 },
    { category: 'Transport', count: 21 },
    { category: 'Green Spaces', count: 15 },
  ]

  const stats = [
    {
      name: 'Active Citizens',
      value: '12,847',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Energy Saved',
      value: '2.4 MWh',
      change: '+8%',
      changeType: 'increase',
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      name: 'Water Conservation',
      value: '1.8M L',
      change: '+15%',
      changeType: 'increase',
      icon: Droplets,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Waste Recycled',
      value: '89%',
      change: '-2%',
      changeType: 'decrease',
      icon: Recycle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ]

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Energy Usage Detected',
      description: 'Sector 12 showing 25% increase in energy consumption',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'success',
      title: 'Water Quality Improved',
      description: 'District 5 water quality metrics exceed standards',
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'info',
      title: 'New Policy Document',
      description: 'Green Building Standards 2024 uploaded for review',
      time: '6 hours ago'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="gradient-bg rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">City Health Dashboard</h1>
          <p className="text-blue-100">
            Real-time insights into your city's sustainability metrics and citizen engagement
          </p>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.changeType === 'increase' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KPI Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sustainability Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={kpiData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="energy" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="water" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="waste" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Citizen Feedback */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Citizen Feedback by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={feedbackData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Alerts & Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts & Updates</h3>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
              {alert.type === 'warning' && (
                <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
              )}
              {alert.type === 'success' && (
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              )}
              {alert.type === 'info' && (
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
              )}
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard
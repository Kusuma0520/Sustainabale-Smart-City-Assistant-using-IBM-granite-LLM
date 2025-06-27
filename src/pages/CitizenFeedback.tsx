import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Send, MapPin, Camera, Clock, CheckCircle } from 'lucide-react'

const CitizenFeedback = () => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    location: '',
    priority: 'medium'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const categories = [
    'Water & Utilities',
    'Energy & Power',
    'Waste Management',
    'Transportation',
    'Green Spaces',
    'Public Safety',
    'Infrastructure',
    'Other'
  ]

  const recentReports = [
    {
      id: 1,
      title: 'Broken Water Pipe on Main Street',
      category: 'Water & Utilities',
      location: 'Main Street & 5th Ave',
      status: 'In Progress',
      priority: 'high',
      submittedAt: '2 hours ago',
      reporter: 'Anonymous'
    },
    {
      id: 2,
      title: 'Street Light Not Working',
      category: 'Infrastructure',
      location: 'Park Avenue',
      status: 'Resolved',
      priority: 'medium',
      submittedAt: '1 day ago',
      reporter: 'John D.'
    },
    {
      id: 3,
      title: 'Overflowing Trash Bin',
      category: 'Waste Management',
      location: 'Central Park Entrance',
      status: 'Pending',
      priority: 'low',
      submittedAt: '2 days ago',
      reporter: 'Sarah M.'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({
        category: '',
        title: '',
        description: '',
        location: '',
        priority: 'medium'
      })
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000)
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'text-green-600 bg-green-100'
      case 'In Progress': return 'text-blue-600 bg-blue-100'
      case 'Pending': return 'text-yellow-600 bg-yellow-100'
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
          <div className="p-2 bg-green-100 rounded-lg">
            <MessageSquare className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Citizen Feedback Portal</h1>
            <p className="text-gray-600">Report issues, share suggestions, and help improve your city</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Submit a Report</h2>
          
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex items-center space-x-2"
            >
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">Report submitted successfully!</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="input-field"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Brief description of the issue"
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide detailed information about the issue"
                rows={4}
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Street address or landmark"
                  required
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex items-center space-x-4 pt-2">
              <button
                type="button"
                className="btn-secondary flex items-center space-x-2"
              >
                <Camera className="w-4 h-4" />
                <span>Add Photo</span>
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex items-center space-x-2 flex-1"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Report'}</span>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Recent Reports */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h2>
          
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{report.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(report.priority)}`}>
                    {report.priority}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{report.location}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                    <span className="text-xs text-gray-500">{report.category}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{report.submittedAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CitizenFeedback
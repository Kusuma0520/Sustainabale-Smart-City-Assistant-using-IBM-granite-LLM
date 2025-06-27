import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Leaf, Recycle, Zap, Droplets, Car, Home, Sparkles } from 'lucide-react'

const EcoTips = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [generatedTip, setGeneratedTip] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const categories = [
    { id: 'all', name: 'All Tips', icon: Lightbulb, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { id: 'energy', name: 'Energy', icon: Zap, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { id: 'water', name: 'Water', icon: Droplets, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { id: 'waste', name: 'Waste', icon: Recycle, color: 'text-green-600', bgColor: 'bg-green-50' },
    { id: 'transport', name: 'Transport', icon: Car, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { id: 'home', name: 'Home', icon: Home, color: 'text-indigo-600', bgColor: 'bg-indigo-50' }
  ]

  const ecoTips = [
    {
      id: 1,
      category: 'energy',
      title: 'Switch to LED Bulbs',
      description: 'LED bulbs use 75% less energy and last 25 times longer than incandescent bulbs.',
      impact: 'Save $75/year on electricity',
      difficulty: 'Easy',
      icon: Zap
    },
    {
      id: 2,
      category: 'water',
      title: 'Fix Leaky Faucets',
      description: 'A single dripping faucet can waste over 3,000 gallons of water per year.',
      impact: 'Save 3,000+ gallons annually',
      difficulty: 'Easy',
      icon: Droplets
    },
    {
      id: 3,
      category: 'waste',
      title: 'Start Composting',
      description: 'Composting food scraps reduces methane emissions and creates nutrient-rich soil.',
      impact: 'Reduce waste by 30%',
      difficulty: 'Medium',
      icon: Recycle
    },
    {
      id: 4,
      category: 'transport',
      title: 'Use Public Transportation',
      description: 'Taking public transit instead of driving can reduce your carbon footprint significantly.',
      impact: 'Reduce CO2 by 4,800 lbs/year',
      difficulty: 'Easy',
      icon: Car
    },
    {
      id: 5,
      category: 'home',
      title: 'Improve Home Insulation',
      description: 'Proper insulation can reduce heating and cooling costs by up to 15%.',
      impact: 'Save $200+ annually',
      difficulty: 'Hard',
      icon: Home
    },
    {
      id: 6,
      category: 'energy',
      title: 'Unplug Electronics',
      description: 'Electronics consume energy even when turned off. Unplug to save phantom power.',
      impact: 'Save 10% on electricity',
      difficulty: 'Easy',
      icon: Zap
    },
    {
      id: 7,
      category: 'water',
      title: 'Install Low-Flow Showerheads',
      description: 'Low-flow showerheads can reduce water usage by up to 50% without sacrificing pressure.',
      impact: 'Save 2,900 gallons/year',
      difficulty: 'Medium',
      icon: Droplets
    },
    {
      id: 8,
      category: 'waste',
      title: 'Buy in Bulk',
      description: 'Buying in bulk reduces packaging waste and often saves money.',
      impact: 'Reduce packaging by 40%',
      difficulty: 'Easy',
      icon: Recycle
    }
  ]

  const filteredTips = ecoTips.filter(tip => 
    (selectedCategory === 'all' || tip.category === selectedCategory) &&
    (searchKeyword === '' || tip.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
     tip.description.toLowerCase().includes(searchKeyword.toLowerCase()))
  )

  const generateCustomTip = async () => {
    if (!searchKeyword.trim()) return
    
    setIsGenerating(true)
    
    // Simulate AI tip generation
    setTimeout(() => {
      const tips = [
        `For ${searchKeyword}: Consider using energy-efficient alternatives that can reduce your environmental impact by up to 40%. Smart scheduling and automation can help optimize usage patterns.`,
        `Regarding ${searchKeyword}: Implement a circular economy approach by reusing, recycling, and reducing consumption. This can lead to significant cost savings and environmental benefits.`,
        `For sustainable ${searchKeyword} practices: Focus on renewable alternatives and efficient usage patterns. Community-based solutions often provide the best long-term results.`,
        `When dealing with ${searchKeyword}: Prioritize local, sustainable options that support your community while reducing transportation emissions and environmental impact.`
      ]
      
      setGeneratedTip(tips[Math.floor(Math.random() * tips.length)])
      setIsGenerating(false)
    }, 2000)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Hard': return 'text-red-600 bg-red-100'
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
            <Leaf className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Eco Tips & Sustainability Guide</h1>
            <p className="text-gray-600">Discover actionable tips to reduce your environmental impact</p>
          </div>
        </div>
      </motion.div>

      {/* AI Tip Generator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Eco Tip Generator</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Enter a keyword (e.g., plastic, solar, recycling)..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="input-field flex-1"
          />
          <button
            onClick={generateCustomTip}
            disabled={isGenerating || !searchKeyword.trim()}
            className="btn-primary flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Generating...' : 'Generate Tip'}</span>
          </button>
        </div>
        
        {generatedTip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <div className="flex items-start space-x-2">
              <Sparkles className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-900 mb-1">AI-Generated Eco Tip</h3>
                <p className="text-green-800 text-sm">{generatedTip}</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`p-2 rounded-lg ${category.bgColor} mx-auto w-fit mb-2`}>
                <category.icon className={`w-5 h-5 ${category.color}`} />
              </div>
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tips Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredTips.map((tip, index) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <tip.icon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(tip.difficulty)}`}>
                  {tip.difficulty}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{tip.description}</p>
            
            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Leaf className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Impact:</span>
              </div>
              <p className="text-sm text-green-700 mt-1">{tip.impact}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredTips.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tips found</h3>
          <p className="text-gray-600">Try adjusting your search or category filter</p>
        </motion.div>
      )}
    </div>
  )
}

export default EcoTips
import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bot, Send, User, Sparkles, MessageCircle } from 'lucide-react'

interface Message {
  id: number
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your Smart City AI Assistant powered by IBM Granite LLM. I can help you with urban sustainability questions, policy information, eco-friendly tips, and city planning insights. How can I assist you today?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const suggestedQuestions = [
    'How can my city reduce carbon emissions?',
    'What are the best practices for waste management?',
    'How to improve public transportation?',
    'What are green building standards?',
    'How to increase citizen engagement?',
    'What are smart city technologies?'
  ]

  const generateResponse = (userMessage: string): string => {
    const responses: { [key: string]: string } = {
      'carbon emissions': 'To reduce carbon emissions, cities can implement several strategies:\n\n• **Green Transportation**: Expand public transit, promote electric vehicles, and create bike-friendly infrastructure\n• **Energy Efficiency**: Retrofit buildings with LED lighting, smart HVAC systems, and renewable energy sources\n• **Urban Planning**: Develop compact, mixed-use neighborhoods to reduce travel distances\n• **Green Spaces**: Increase urban forests and parks to absorb CO2\n• **Waste Management**: Implement circular economy principles and reduce landfill methane emissions\n\nThese measures can typically reduce city-wide emissions by 20-40% within 5-10 years.',
      
      'waste management': 'Effective waste management involves a comprehensive approach:\n\n• **Reduce**: Implement policies to minimize single-use plastics and packaging\n• **Reuse**: Create community swap programs and repair cafes\n• **Recycle**: Establish robust sorting and processing facilities\n• **Compost**: Set up organic waste collection and processing\n• **Education**: Run citizen awareness campaigns\n• **Technology**: Use IoT sensors for smart bin monitoring and route optimization\n\nBest practice cities achieve 60-80% waste diversion from landfills.',
      
      'public transportation': 'Improving public transportation requires strategic planning:\n\n• **Network Design**: Create comprehensive routes connecting key destinations\n• **Frequency**: Increase service frequency to reduce wait times\n• **Accessibility**: Ensure all stations and vehicles are accessible\n• **Integration**: Connect different transport modes (bus, rail, bike-share)\n• **Technology**: Implement real-time tracking and mobile ticketing\n• **Electrification**: Transition to electric buses and trains\n• **Affordability**: Offer competitive pricing and subsidies\n\nWell-designed systems can increase ridership by 30-50%.',
      
      'green building': 'Green building standards focus on sustainability:\n\n• **Energy Efficiency**: High-performance insulation, windows, and HVAC systems\n• **Renewable Energy**: Solar panels, geothermal systems, and wind power\n• **Water Conservation**: Low-flow fixtures, rainwater harvesting, and greywater systems\n• **Materials**: Use sustainable, locally-sourced, and recycled materials\n• **Indoor Air Quality**: Non-toxic materials and proper ventilation\n• **Certifications**: LEED, BREEAM, or local green building standards\n\nGreen buildings typically use 30-50% less energy and water than conventional buildings.',
      
      'citizen engagement': 'Increasing citizen engagement requires multiple approaches:\n\n• **Digital Platforms**: Create user-friendly apps and websites for feedback\n• **Community Events**: Host town halls, workshops, and neighborhood meetings\n• **Participatory Budgeting**: Let citizens vote on spending priorities\n• **Transparency**: Publish open data and regular progress reports\n• **Education**: Provide clear information about city initiatives\n• **Incentives**: Offer rewards for participation and sustainable behaviors\n• **Accessibility**: Ensure all communication is multilingual and accessible\n\nEngaged communities see 40-60% higher participation in city programs.',
      
      'smart city': 'Smart city technologies enhance urban efficiency:\n\n• **IoT Sensors**: Monitor air quality, traffic, noise, and infrastructure\n• **Data Analytics**: Use AI to optimize city services and predict needs\n• **Smart Grids**: Implement intelligent energy distribution systems\n• **Connected Transportation**: Traffic management and autonomous vehicle infrastructure\n• **Digital Services**: Online portals for permits, payments, and services\n• **5G Networks**: Enable high-speed connectivity for all systems\n• **Cybersecurity**: Protect critical infrastructure and citizen data\n\nSmart city initiatives can improve service efficiency by 20-30% while reducing costs.'
    }

    // Find the best matching response
    const lowerMessage = userMessage.toLowerCase()
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response
      }
    }

    // Default response
    return `Thank you for your question about "${userMessage}". As your Smart City AI Assistant, I can provide insights on:\n\n• Urban sustainability and environmental policies\n• Infrastructure planning and optimization\n• Citizen engagement strategies\n• Green technology implementation\n• Public transportation systems\n• Waste management solutions\n• Energy efficiency measures\n\nCould you please be more specific about which aspect you'd like to explore? I'm here to help with detailed, actionable advice for your city's needs.`
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI processing time
    setTimeout(() => {
      const assistantMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: generateResponse(inputMessage),
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question)
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
          <div className="p-2 bg-blue-100 rounded-lg">
            <Bot className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Smart City AI Assistant</h1>
            <p className="text-gray-600">Powered by IBM Granite LLM - Your urban sustainability expert</p>
          </div>
        </div>
      </motion.div>

      {/* Chat Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        {/* Messages */}
        <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex space-x-2 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`p-2 rounded-lg ${
                  message.type === 'user' ? 'bg-blue-100' : 'bg-white border'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Bot className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div className={`p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border border-gray-200'
                }`}>
                  <div className="whitespace-pre-line text-sm">
                    {message.content}
                  </div>
                  <div className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex space-x-2 max-w-3xl">
                <div className="p-2 rounded-lg bg-white border">
                  <Bot className="w-5 h-5 text-gray-600" />
                </div>
                <div className="p-3 rounded-lg bg-white border border-gray-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about urban sustainability, city planning, or environmental policies..."
            className="input-field flex-1 resize-none"
            rows={2}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="btn-primary flex items-center space-x-2 px-4"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Suggested Questions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900">Suggested Questions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedQuestion(question)}
              className="text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">{question}</span>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default ChatAssistant
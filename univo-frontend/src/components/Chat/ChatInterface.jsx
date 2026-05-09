import React, { useState } from 'react'
import { FaTimes, FaPaperPlane } from 'react-icons/fa'

const ChatInterface = ({ subject, user, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Prof. Michael Chen",
      role: "Faculty",
      message: "Welcome to Data Structures discussion forum! Feel free to ask any questions related to the course.",
      timestamp: "2024-01-15 10:00",
      isFaculty: true
    },
    {
      id: 2,
      user: "Sarah Johnson",
      role: "Student",
      message: "Professor, can you explain the concept of recursion with an example?",
      timestamp: "2024-01-15 10:15",
      isFaculty: false
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = () => {
    if (!newMessage.trim()) return
    
    const message = {
      id: messages.length + 1,
      user: user.name,
      role: user.role === 'faculty' ? 'Faculty' : 'Student',
      message: newMessage,
      timestamp: new Date().toLocaleString(),
      isFaculty: user.role === 'faculty'
    }
    
    setMessages([...messages, message])
    setNewMessage('')
    
    // Simulate faculty typing
    if (user.role !== 'faculty') {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const response = {
          id: messages.length + 2,
          user: subject.lecturer,
          role: "Faculty",
          message: "Great question! I'll explain recursion in detail. Recursion is a technique where a function calls itself...",
          timestamp: new Date().toLocaleString(),
          isFaculty: true
        }
        setMessages(prev => [...prev, response])
      }, 2000)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl h-[600px] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{subject.name}</h3>
            <p className="text-sm text-gray-500">Community Discussion</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.isFaculty ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[70%] ${message.isFaculty ? 'bg-gray-100' : 'bg-primary-600 text-white'} rounded-lg p-3`}>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-semibold">{message.user}</span>
                  <span className="text-xs opacity-75">{message.role}</span>
                </div>
                <p className="text-sm">{message.message}</p>
                <span className="text-xs opacity-75 mt-1 block">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your question here..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={sendMessage}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface
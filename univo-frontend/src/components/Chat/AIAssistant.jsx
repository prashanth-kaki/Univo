import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaMagic, FaStar, FaHistory, FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import api from '../../services/api';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    "Summarize my Database notes",
    "Help with Data Structures assignment",
    "What is my schedule for tomorrow?",
    "Mid-exam preparation questions"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      if (messages.length === 0) {
        setMessages([{ id: Date.now(), text: "Hi there! I'm Univo AI. I can help you with your academic queries. How can I help today?", sender: 'ai' }]);
      }
      scrollToBottom();
      fetchHistory();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping]);

  const fetchHistory = async () => {
    try {
      const res = await api.get('/ai/history');
      if (res.data?.logs) {
        setHistory(res.data.logs);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const newMsg = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const res = await api.post('/ai/chat', { message: text, sessionId });
      if (res.data?.reply) {
        setMessages(prev => [...prev, { id: Date.now(), text: res.data.reply, sender: 'ai' }]);
        if (res.data.sessionId) {
          setSessionId(res.data.sessionId);
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now(), text: "Sorry, I am having trouble connecting to the server.", sender: 'ai' }]);
    } finally {
      setIsTyping(false);
      fetchHistory();
    }
  };

  const loadSession = (log) => {
    setSessionId(log.sessionId);
    const loadedMessages = log.messages.map((m, i) => ({
      id: Date.now() + i,
      text: m.content,
      sender: m.role === 'user' ? 'user' : 'ai'
    }));
    setMessages(loadedMessages);
    setShowHistory(false);
  };

  const clearHistory = async (sid) => {
    try {
      await api.delete(`/ai/history/${sid}`);
      setHistory(prev => prev.filter(l => l.sessionId !== sid));
      if (sessionId === sid) {
        setSessionId(null);
        setMessages([{ id: Date.now(), text: "Session cleared. How can I help you?", sender: 'ai' }]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-full text-white flex items-center justify-center text-2xl shadow-xl shadow-indigo-500/30 z-50 group border-4 border-white"
          >
            <FaStar className="absolute top-2 right-2 text-yellow-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
            <FaRobot className="group-hover:animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[380px] h-[600px] max-h-[85vh] bg-white rounded-3xl shadow-2xl shadow-slate-900/20 flex flex-col overflow-hidden z-50 border border-slate-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex justify-between items-center shrink-0 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-xl">
                  <FaRobot />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">Univo AI</h3>
                  <div className="flex items-center gap-1.5 text-xs text-indigo-100 font-medium">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    Online & Ready
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                <button 
                  onClick={() => setShowHistory(!showHistory)}
                  className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-colors", showHistory ? "bg-white/30" : "bg-white/10 hover:bg-white/20")}
                  title="Chat History"
                >
                  <FaHistory />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            {showHistory ? (
              <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 flex flex-col gap-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Recent Sessions</div>
                {history.length === 0 ? (
                  <div className="text-slate-500 text-sm text-center py-4">No recent history</div>
                ) : (
                  history.map((log) => (
                    <div key={log.sessionId} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <button onClick={() => loadSession(log)} className="text-sm font-medium text-slate-700 text-left hover:text-indigo-600 truncate flex-1">
                          {log.messages.length > 0 ? log.messages[0].content : 'Empty Session'}
                        </button>
                        <button onClick={() => clearHistory(log.sessionId)} className="text-slate-400 hover:text-red-500 ml-2">
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                      <div className="text-[10px] text-slate-400">{new Date(log.createdAt).toLocaleDateString()}</div>
                    </div>
                  ))
                )}
                <button 
                  onClick={() => {
                    setSessionId(null);
                    setMessages([{ id: Date.now(), text: "Started a new session. How can I help?", sender: 'ai' }]);
                    setShowHistory(false);
                  }}
                  className="mt-4 py-2 border border-indigo-200 text-indigo-600 font-bold text-sm rounded-xl hover:bg-indigo-50 transition-colors"
                >
                  Start New Session
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 flex flex-col gap-4 custom-scrollbar">
                {messages.map((msg) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id} 
                    className={cn("flex", msg.sender === 'user' ? "justify-end" : "justify-start")}
                  >
                    <div className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 shadow-sm",
                      msg.sender === 'user' 
                        ? "bg-indigo-600 text-white rounded-tr-sm" 
                        : "bg-white text-slate-700 border border-slate-100 rounded-tl-sm whitespace-pre-wrap"
                    )}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex gap-1.5 items-center h-10">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Suggestions */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4 pb-2 bg-slate-50/50 shrink-0">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pl-1">
                  <FaMagic /> Suggested
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((prompt, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleSend(prompt)}
                      className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg hover:border-indigo-300 hover:text-indigo-600 transition-colors shadow-sm text-left"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100 shrink-0">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex items-end gap-2 bg-slate-50 rounded-2xl p-1.5 border border-slate-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all"
              >
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(inputValue);
                    }
                  }}
                  placeholder="Ask Univo AI..."
                  className="w-full bg-transparent border-none outline-none resize-none max-h-32 min-h-[44px] py-3 px-3 text-sm text-slate-700 placeholder:text-slate-400 custom-scrollbar"
                  rows={1}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 disabled:opacity-50 transition-all hover:bg-indigo-700 active:scale-95 shadow-md shadow-indigo-500/20 mb-0.5"
                >
                  <FaPaperPlane className="ml-[-2px]" />
                </button>
              </form>
              <div className="text-center mt-2 text-[10px] text-slate-400 font-medium">
                AI can make mistakes. Verify important info.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;

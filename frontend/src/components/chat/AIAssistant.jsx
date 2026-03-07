import React, { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import './AIAssistant.css';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: '¡Hola! Soy tu asistente de Roth Belle. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulated AI Response
    setTimeout(() => {
      const aiResponse = { 
        id: Date.now() + 1, 
        type: 'ai', 
        text: '¡Entendido! Estoy analizando tu consulta sobre Roth Belle. Como prototipo, puedo decirte que nuestras prendas están diseñadas con la mayor calidad.' 
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="ai-assistant-wrapper">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="ai-chat-window"
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="ai-chat-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={20} />
                <h3>Asistente IA</h3>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', color: 'white' }}>
                <X size={20} />
              </button>
            </div>

            <div className="ai-chat-messages">
              {messages.map(msg => (
                <div key={msg.id} className={`message ${msg.type}`}>
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form className="ai-chat-input" onSubmit={handleSend}>
              <input 
                type="text" 
                placeholder="Escribe tu duda..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit" className="ai-send-btn">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        className="ai-fab"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>
    </div>
  );
};

export default AIAssistant;

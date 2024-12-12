'use client'

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "How can I help you find scholarships today? Here are some common questions:", isBot: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    {
      question: "How do I apply for scholarships in Europe?",
      answer: "To apply for scholarships in Europe, you typically need to:\n\n1. Research available scholarships through university websites and scholarship databases\n2. Check eligibility requirements carefully\n3. Prepare required documents (transcripts, CV, motivation letter)\n4. Submit applications before deadlines\n5. Follow up on your applications\n\nMany European universities offer their own scholarships, and there are also EU-funded programs like Erasmus+."
    },
    {
      question: "What are the requirements for international students?",
      answer: "Common requirements for international students include:\n\n• Language proficiency (usually English or local language)\n• Academic transcripts with good grades\n• Letters of recommendation\n• Proof of financial means\n• Valid passport\n• Student visa\n• Health insurance\n\nSpecific requirements vary by country and university."
    },
    {
      question: "What are the best scholarship programs in Europe?",
      answer: "Some of the top scholarship programs in Europe include:\n\n1. Erasmus Mundus Joint Masters\n2. DAAD Scholarships (Germany)\n3. Eiffel Excellence Scholarship (France)\n4. Holland Scholarship (Netherlands)\n5. Swedish Institute Scholarships\n\nThese programs offer full or partial funding and are highly competitive."
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = async (text: string) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setMessages(prev => [...prev, { id: Date.now(), text, isBot: true }]);
    setIsTyping(false);
  };

  const handleSendMessage = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now(), text, isBot: false }]);
    setMessage('');
    
    // Find matching question and send response
    const matchingQuestion = suggestedQuestions.find(q => q.question === text);
    if (matchingQuestion) {
      simulateTyping(matchingQuestion.answer);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-end justify-end">
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-xl rounded-2xl p-4 mb-4 w-96 h-[600px] border border-gray-100 absolute bottom-0 right-0"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-blue-500 p-1.5 rounded-lg">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Scholarship Assistant</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>
            
            <div className="h-[450px] overflow-y-auto border rounded-xl p-3 mb-4 bg-gray-50">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${
                    msg.isBot
                      ? 'bg-blue-500 text-white rounded-2xl rounded-tl-none'
                      : 'bg-gray-200 text-gray-800 rounded-2xl rounded-tr-none ml-auto'
                  } p-3 max-w-[85%] mb-3 whitespace-pre-wrap`}
                >
                  <p>{msg.text}</p>
                </motion.div>
              ))}
              
              {messages.length === 1 && (
                <div className="grid gap-2 mt-4">
                  {suggestedQuestions.map((q, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSendMessage(q.question)}
                      className="text-left p-2 bg-white rounded-lg hover:bg-gray-100 text-sm text-gray-700 border transition-colors"
                    >
                      {q.question}
                    </motion.button>
                  ))}
                </div>
              )}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-blue-500 text-white p-3 rounded-2xl rounded-tl-none max-w-[85%] mb-3"
                >
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && message.trim()) {
                    handleSendMessage(message);
                  }
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => message.trim() && handleSendMessage(message)}
                className={`p-2 rounded-xl transition-colors ${
                  message.trim() 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'bg-gray-100 text-gray-400'
                }`}
                disabled={!message.trim()}
              >
                <Send size={20} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-colors"
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
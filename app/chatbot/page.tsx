'use client'

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageCircle } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

export default function ChatPage() {
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
    
    const matchingQuestion = suggestedQuestions.find(q => q.question === text);
    if (matchingQuestion) {
      simulateTyping(matchingQuestion.answer);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle className="text-blue-600 h-6 w-6" />
              <h1 className="text-2xl font-bold text-blue-600">Scholarship Assistant</h1>
            </div>
            <nav className="flex gap-6 text-gray-600">
              <a href="#" className="hover:text-blue-600">Login</a>
              <select className="bg-transparent">
                <option>EN</option>
                <option>PT</option>
              </select>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Scholarship Assistant</h2>
          <p className="text-xl text-gray-600">
            Direct and <span className="text-blue-600">evidence-based</span> scholarship guidance
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a question about scholarships and funding..."
              className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-24"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && message.trim()) {
                  handleSendMessage(message);
                }
              }}
            />
            <button
              onClick={() => message.trim() && handleSendMessage(message)}
              className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={!message.trim()}
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        {messages.length === 1 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-600">Suggestions:</span>
            </div>
            <div className="grid gap-3">
              {suggestedQuestions.map((q, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(q.question)}
                  className="text-left p-4 rounded-xl border hover:border-blue-500 transition-colors"
                >
                  {q.question}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.length > 1 && (
          <div className="mt-8 space-y-4">
            {messages.slice(1).map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${
                  msg.isBot
                    ? 'bg-blue-50 border border-blue-100'
                    : 'bg-gray-50 border border-gray-100'
                } p-4 rounded-xl whitespace-pre-wrap`}
              >
                <p>{msg.text}</p>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-blue-50 border border-blue-100 p-4 rounded-xl"
              >
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </motion.div>
            )}
          </div>
        )}
      </main>

      <footer className="py-4 text-center text-gray-500 text-sm">
        <p>This tool is not a replacement for official scholarship guidance - Terms of use</p>
      </footer>
    </div>
  );
}
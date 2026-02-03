
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface GeminiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '您好！我是您的 ExpenseWise 财务助手。我可以帮您分析预算状况、起草费用控制策略，或审核特定的报账申请。有什么可以帮您的吗？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: input,
        config: {
          systemInstruction: 'You are a professional corporate financial assistant integrated into a budget control platform. Provide concise, expert advice on budgeting, expense auditing, and financial policy creation. Always be helpful and professional.',
        },
      });

      const assistantMsg: Message = { 
        role: 'assistant', 
        content: response.text || '对不起，我现在无法处理您的请求。' 
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: '连接 AI 助手失败，请检查 API 配置。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-8 right-8 w-96 h-[600px] bg-white border border-gray-200 rounded-3xl shadow-2xl flex flex-col z-[100] animate-in slide-in-from-right-8 duration-300">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-black text-white rounded-t-3xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold">ExpenseWise AI</h4>
            <span className="text-[10px] text-indigo-300 uppercase font-black">Powered by Gemini</span>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 text-sm ${
              m.role === 'user' 
                ? 'bg-black text-white rounded-br-none' 
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {m.role === 'assistant' ? <Bot size={14} className="text-indigo-500" /> : <User size={14} className="text-gray-400" />}
                <span className="text-[10px] font-bold opacity-50 uppercase">{m.role === 'assistant' ? 'Assistant' : 'You'}</span>
              </div>
              <p className="leading-relaxed whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl p-4 flex items-center gap-3">
              <Loader2 className="animate-spin text-indigo-500" size={16} />
              <span className="text-xs text-gray-500 font-medium">正在思考...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-gray-100">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="提问或描述需求..."
            rows={2}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 bottom-3 p-2 bg-black text-white rounded-xl disabled:opacity-30 hover:bg-gray-800 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiAssistant;

import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { cn } from '../components/MainLayout';

const AICoach = () => {
  const { coachMessages, addCoachMessage } = useStore();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [coachMessages]);

  const handleSend = () => {
    if (!input.trim()) return;
    addCoachMessage('user', input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickPrompts = [
    "Chỉ có 20 phút",
    "Gợi ý bữa tối ít tinh bột",
    "Tuần này tôi chỉ tập được 3 buổi",
    "Hai tuần rồi cân tôi không giảm",
    "Đổi mục tiêu sang Tăng cơ",
    "Bench Press hôm nay quá nặng"
  ];

  const handleQuickPrompt = (text: string) => {
    addCoachMessage('user', text);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-surface">
      <header className="p-4 bg-surface-container-lowest flex items-center gap-3 shadow-sm z-10 border-b border-outline-variant/30 pt-safe">
        <div className="w-10 h-10 bg-gradient-to-br from-tertiary to-primary rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(16,185,129,0.3)]">
          <span className="material-symbols-outlined text-[20px] text-on-primary">robot_2</span>
        </div>
        <div>
          <h1 className="text-[18px] font-bold text-on-surface leading-tight tracking-tight">VietFit AI</h1>
          <p className="text-[11px] text-primary font-bold flex items-center gap-1.5 uppercase tracking-wider mt-0.5">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" /> Trợ lý của bạn
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center pb-2">
          <div className="inline-block bg-surface-container-high text-secondary text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Hôm nay
          </div>
        </div>
        
        {coachMessages.map((msg) => (
          <div key={msg.id} className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[85%] rounded-[20px] p-3 px-4",
              msg.role === 'user' 
                ? "bg-primary text-on-primary rounded-tr-[4px]" 
                : "bg-surface-container-lowest border border-outline-variant/40 text-on-surface rounded-tl-[4px] shadow-sm"
            )}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-1.5 mb-1.5 text-tertiary">
                  <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
                  <span className="text-[10px] font-black uppercase tracking-wider">VietFit AI</span>
                </div>
              )}
              <p className="text-[15px] whitespace-pre-wrap leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-surface-container-lowest border-t border-outline-variant/30 space-y-3 pb-safe-bottom">
        {/* Quick Prompts */}
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide -mx-4 px-4">
          {quickPrompts.map(prompt => (
            <button 
              key={prompt}
              onClick={() => handleQuickPrompt(prompt)}
              className="shrink-0 bg-surface-container text-on-surface-variant text-[13px] font-bold px-4 py-2 rounded-[14px] border border-outline-variant/20 hover:bg-surface-container-high transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[14px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span> {prompt}
            </button>
          ))}
        </div>

        <div className="relative flex items-center mb-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Bạn cần hỗ trợ gì?"
            className="w-full bg-surface-variant/40 border border-outline-variant/40 focus:border-primary focus:bg-surface-container-lowest rounded-full pl-5 pr-14 py-3.5 text-[15px] outline-none transition-all placeholder:text-secondary"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-1.5 w-11 h-11 bg-primary text-on-primary rounded-full flex items-center justify-center disabled:opacity-50 disabled:bg-surface-container disabled:text-secondary transition-all active:scale-95 shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICoach;

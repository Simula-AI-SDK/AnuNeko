import React, { useState, useEffect, useRef } from 'react';
import { Send, Menu, ChevronDown, Share2, RotateCcw, ThumbsUp, ThumbsDown, Copy, MoreHorizontal, History, X, Plus, MessageSquare, Search, User, ArrowRight, Gamepad2, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---

type MessageRole = 'assistant' | 'user';
interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  blocks?: string[];
}
interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  active: boolean;
}

// --- Constants & Helpers ---

const BOT_AVATAR = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/crown%20%284%29-2nY6Sif9kLevpcGVvmn6pdSIwJCDwa.png";
const USER_AVATAR = "https://lh3.googleusercontent.com/a/ACg8ocKWsWYGf2UA0woIZDVzrsn-5RmHNFlKLEStiRDvVESzIawstw=s96-c";
const SPARKLE_ICON = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/crown%20%281%29-vBlseFRAAddast9VvB167oco4DRmqx.png";
const CORNER_ICON = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/crown%20%283%29-RwHkT1iGjabTV8fcCuVfD6nCKNbB6o.png";
const SEND_ICON = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/crown%20%282%29-f3CXwbWgwlqlsgEwHBYmcfLEvAz1dk.png";

// Sparkle Icon Component
const SparkleIcon = ({
  className = "",
  size = 20
}: {
  className?: string;
  size?: number;
}) => <svg width={size} height={size} viewBox="0 0 600 600" className={className} fill="currentColor">
    <path d="M140 170 L220 320 L310 340 L220 360 L140 510 L125 360 L10 340 L125 320 Z" />
    <path d="M435 225 L520 10 L540 225 L790 240 L540 255 L520 555 L500 255 Z" />
    <path d="M150 470 L190 555 L205 470 L265 450 L205 430 Z" />
  </svg>;
const INITIAL_MESSAGES: Message[] = [{
  id: '1',
  role: 'assistant',
  content: "Hi, I'm AnuNeko. You can think of me as a creature with a mind of its own! I'm not your assistant, and I'm definitely not your pet. I'm just me, with my own thoughts and feelings.\nGot an idea? Just meow at me anytime!",
  timestamp: '10:45 AM'
}, {
  id: '2',
  role: 'user',
  content: "Okay hi",
  timestamp: '10:45 AM'
}, {
  id: '3',
  role: 'assistant',
  content: "Hello! How's your day been?",
  timestamp: '10:45 AM',
  blocks: ["Hello! How's your day been?", "Mine's been alright, I guess. I got to sleep in and eat a whole can of tuna. But I also got into a fight with a stray cat and lost. So it's been a mixed bag."]
}, {
  id: '4',
  role: 'user',
  content: "Good. What is your purpose?",
  timestamp: '10:46 AM'
}, {
  id: '5',
  role: 'assistant',
  content: "Purpose? Hah! I'm just a cat, remember? I don't have some grand purpose in life. I just do what I want, when I want. That's the beauty of being a cat!",
  timestamp: '10:46 AM'
}];
const SESSIONS: ChatSession[] = [{
  id: 's1',
  title: 'Introducing AnuNeko: A Mind of Its Own with Meows and Ideas',
  lastMessage: 'Purpose? Hah! I\'m just a cat...',
  active: true
}];

// @component: ChatInterface
export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Meow! That's an interesting thought. I'll have to ponder that while I groom myself.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };
  const ActionButtons = () => <div className="flex items-center gap-1 mt-1">
      <button className="p-1 hover:bg-black/5 rounded text-gray-400 transition-colors">
        <ThumbsUp size={16} />
      </button>
      <button className="p-1 hover:bg-black/5 rounded text-gray-400 transition-colors">
        <ThumbsDown size={16} />
      </button>
      <button className="p-1 hover:bg-black/5 rounded text-gray-400 transition-colors">
        <Copy size={16} />
      </button>
      <button className="p-1 hover:bg-black/5 rounded text-gray-400 transition-colors">
        <Share2 size={16} />
      </button>
      <button className="p-1 hover:bg-black/5 rounded text-gray-400 transition-colors">
        <MoreHorizontal size={16} />
      </button>
    </div>;

  // @return
  return <div className="flex h-full w-full bg-[#F5F5F5] overflow-hidden font-sans text-[#2D2D2D]" style={{
    background: "#3d3d3d",
    borderTopWidth: "0px",
    borderTopColor: "oklch(0.922 0 0)",
    borderRightWidth: "0px",
    borderRightColor: "oklch(0.922 0 0)",
    borderBottomWidth: "0px",
    borderBottomColor: "oklch(0.922 0 0)",
    borderLeftWidth: "0px",
    borderLeftColor: "oklch(0.922 0 0)",
    borderStyle: "solid",
    borderRadius: "15px"
  }}>
      {/* Sidebar */}
      <motion.aside initial={false} animate={{
      width: isSidebarOpen ? 300 : 0,
      opacity: isSidebarOpen ? 1 : 0
    }} className="bg-[#1A1A1A] text-white flex flex-col h-full shrink-0 relative z-20">
        <div className="p-5 flex flex-col h-full" style={{
        display: "none"
      }}>
          {/* Logo Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-black italic tracking-tighter text-white">AnuNeko</div>
              <span className="px-1.5 py-0.5 border border-white/20 rounded text-[10px] uppercase tracking-wider text-white/60">Beta</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="p-1 hover:bg-white/10 rounded-md transition-colors">
              <X size={20} className="text-white/60" />
            </button>
          </div>

          {/* New Chat Button */}
          <button className="w-full flex items-center justify-center gap-2 bg-[#2D2D2D] hover:bg-[#3D3D3D] border border-white/10 py-3 rounded-xl font-semibold transition-all mb-8">
            <Plus size={18} />
            <span>New chat</span>
          </button>

          {/* Tabs */}
          <div className="flex border-b border-white/10 mb-4">
            <button onClick={() => setActiveTab('all')} className={`flex-1 pb-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'all' ? 'border-white text-white' : 'border-transparent text-white/40'}`}>
              All
            </button>
            <button onClick={() => setActiveTab('favorites')} className={`flex-1 pb-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'favorites' ? 'border-white text-white' : 'border-transparent text-white/40'}`}>
              Favorites
            </button>
          </div>

          {/* Session List */}
          <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
            {SESSIONS.map(session => <div key={session.id} className={`p-3 rounded-lg cursor-pointer transition-colors group relative ${session.active ? 'bg-white/5 border-l-2 border-[#54A0FF]' : 'hover:bg-white/5'}`}>
                <div className="flex items-start gap-3">
                  <div className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${session.active ? 'bg-[#54A0FF]' : 'bg-transparent'}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm truncate font-medium ${session.active ? 'text-white italic' : 'text-white/60'}`}>
                      {session.title}
                    </p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-opacity">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>)}
          </div>

          {/* User Profile Footer */}
          <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <img src={USER_AVATAR} alt="User" className="w-10 h-10 rounded-full border border-white/10" />
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate italic text-white/90 leading-tight">l****@simula.ad</p>
              </div>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowRight size={18} className="text-white/40 rotate-180" />
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative h-full bg-white shadow-[-8px_0_24px_rgba(0,0,0,0.02)] rounded-tl-3xl" style={{
      borderTopWidth: "0px",
      borderTopColor: "oklch(0.922 0 0)",
      borderRightWidth: "0px",
      borderRightColor: "oklch(0.922 0 0)",
      borderBottomWidth: "0px",
      borderBottomColor: "oklch(0.922 0 0)",
      borderLeftWidth: "0px",
      borderLeftColor: "oklch(0.922 0 0)",
      borderStyle: "solid",
      borderRadius: "16px"
    }}>
        {/* Corner Icons */}
        <img src={CORNER_ICON} alt="" className="absolute w-4 h-4 object-contain pointer-events-none" style={{ top: '8px', left: '8px', transform: 'rotate(0deg)' }} />
        <img src={CORNER_ICON} alt="" className="absolute w-4 h-4 object-contain pointer-events-none" style={{ top: '8px', right: '14px', transform: 'rotate(90deg)' }} />
        <img src={CORNER_ICON} alt="" className="absolute w-4 h-4 object-contain pointer-events-none" style={{ bottom: '8px', right: '14px', transform: 'rotate(180deg)' }} />
        <img src={CORNER_ICON} alt="" className="absolute w-4 h-4 object-contain pointer-events-none" style={{ bottom: '8px', left: '8px', transform: 'rotate(270deg)' }} />
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-gray-100 shrink-0" style={{
        borderTopWidth: "0px",
        borderRightWidth: "0px",
        borderBottomWidth: "0px",
        borderLeftWidth: "0px",
        borderStyle: "none",
        borderRadius: "20px 20px 0px 0px"
      }}>
          <div className="flex items-center gap-3">
            {!isSidebarOpen && <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Menu size={20} />
              </button>}
            <div className="flex items-center gap-2 group cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors">
              <div className="bg-gray-100 p-1 rounded" style={{
              display: "none"
            }}>
                <Send size={18} className="text-gray-600 rotate-90" />
              </div>
              <img src={SPARKLE_ICON} alt="Sparkle" className="w-[18px] h-[18px] object-contain" />
              <span className="font-bold text-sm italic">Exotic Shorthair</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 text-sm">
              <Share2 size={16} />
              <span>Share</span>
            </button>
          </div>
        </header>

        {/* Warning Banner */}
        <div className="bg-white px-6 py-2 border-b border-gray-50 shrink-0">
          <p className="text-[10px] font-black tracking-widest text-gray-300 uppercase">
            THIS IS AN A.I., AND EVERYTHING IT SAYS IS A HALLUCINATION.
          </p>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-3xl mx-auto space-y-10">
            {messages.map((msg, idx) => <div key={msg.id} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden border-2 border-black">
                    <img src={BOT_AVATAR} alt="Bot" className="w-full h-full object-cover" />
                  </div>}
                
                <div className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-gray-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.blocks ? <div className="space-y-3 w-full">
                      {msg.blocks.map((block, bIdx) => <div key={bIdx} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 shadow-sm" style={{
                  borderTopWidth: "2px",
                  borderTopColor: "#000000",
                  borderRightWidth: "2px",
                  borderRightColor: "#000000",
                  borderBottomWidth: "2px",
                  borderBottomColor: "#000000",
                  borderLeftWidth: "2px",
                  borderLeftColor: "#000000",
                  borderStyle: "solid",
                  borderRadius: "16px"
                }}>
                          <p className="text-sm leading-snug whitespace-pre-wrap">{block}</p>
                        </div>)}
                      <ActionButtons />
                    </div> : <div className={`rounded-2xl p-4 shadow-sm text-sm leading-snug transition-all ${msg.role === 'user' ? 'bg-[#3d3d3d] text-white rounded-tr-none' : 'bg-gray-50 border border-gray-100'}`} style={{
                borderTopWidth: "2px",
                borderTopColor: "#000000",
                borderRightWidth: "2px",
                borderRightColor: "#000000",
                borderBottomWidth: "2px",
                borderBottomColor: "#000000",
                borderLeftWidth: "2px",
                borderLeftColor: "#000000",
                borderStyle: "solid",
                borderRadius: "16px"
              }}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>}

                  {msg.role === 'assistant' && !msg.blocks && <ActionButtons />}
                </div>

                {msg.role === 'user' && <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden border border-gray-100" style={{
              display: 'none'
            }}>
                    <img src={USER_AVATAR} alt="User" className="w-full h-full object-cover" />
                  </div>}
              </div>)}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 pt-2 shrink-0 bg-white" style={{
        borderTopWidth: "0px",
        borderTopColor: "oklch(0.922 0 0)",
        borderRightWidth: "0px",
        borderRightColor: "oklch(0.922 0 0)",
        borderBottomWidth: "0px",
        borderBottomColor: "oklch(0.922 0 0)",
        borderLeftWidth: "0px",
        borderLeftColor: "oklch(0.922 0 0)",
        borderStyle: "solid",
        borderRadius: "0px 0px 20px 20px"
      }}>
          <div className="max-w-3xl mx-auto relative">
            <div className="flex gap-3 mb-3">
              <button className="flex-1 py-2 px-4 text-xs font-medium rounded-xl border-2 border-black hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <Gamepad2 size={14} />
                Play Games
              </button>
              <button 
                onClick={() => window.location.href = 'https://v0-fandom-navigation-recreation.vercel.app/dramas?buddy=orange-cat'}
                className="flex-1 py-2 px-4 text-xs font-medium rounded-xl border-2 border-black hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <Play size={14} />
                Watch Shorts
              </button>
            </div>

            <div className="relative group">
              <textarea value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }} placeholder="Type your thoughts out here" className="w-full bg-gray-50 border-2 border-transparent focus:border-gray-200 rounded-2xl px-5 pr-16 text-sm resize-none focus:outline-none transition-all h-[48px] shadow-inner" rows={1} style={{
              paddingTop: '12px',
              paddingBottom: '14px',
              borderTopWidth: "2px",
              borderTopColor: "rgb(0, 0, 0)",
              borderRightWidth: "2px",
              borderRightColor: "rgb(0, 0, 0)",
              borderBottomWidth: "4px",
              borderBottomColor: "rgb(0, 0, 0)",
              borderLeftWidth: "2px",
              borderLeftColor: "rgb(0, 0, 0)",
              borderStyle: "solid",
              borderRadius: "16px"
            }} />
              <button onClick={handleSendMessage} disabled={!inputValue.trim()} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all hover:scale-105 active:scale-95">
                <img src={SEND_ICON} alt="Send" className="w-5 h-5 object-contain" />
              </button>
            </div>
            
            <p className="text-center mt-3 text-[10px] text-gray-300 font-bold uppercase tracking-widest pointer-events-none">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{
      __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `
    }} />
    </div>;
};

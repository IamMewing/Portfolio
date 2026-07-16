import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiX, FiMessageSquare, FiZap } from 'react-icons/fi';
import { neoResponses } from '../../data/neoResponses';

const quickQuestions = [
  'Tell me about Dharma Teja',
  'What projects has he built?',
  'What technologies does he know?',
  'How can I contact him?',
];

function getResponse(input) {
  const lower = input.toLowerCase();
  const categories = ['about', 'projects', 'skills', 'learning', 'contact', 'experience'];
  for (const cat of categories) {
    const { triggers, response } = neoResponses[cat];
    if (triggers.some((t) => lower.includes(t))) return response;
  }
  return neoResponses.default[Math.floor(Math.random() * neoResponses.default.length)];
}

function formatMessage(text) {
  // Simple markdown-like formatting
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

const TypingIndicator = () => (
  <div className="flex items-center gap-1.5 px-4 py-3">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full bg-primary"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

const NeoAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: 'neo',
      text: neoResponses.greetings[0],
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), role: 'user', text: text.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

    const response = getResponse(text);
    setTyping(false);
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + 1, role: 'neo', text: response, timestamp: new Date() },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 left-8 z-50 w-14 h-14 rounded-full flex items-center justify-center
                   shadow-[0_0_30px_rgba(139,6,245,0.5)] transition-all duration-300"
        style={{ background: 'linear-gradient(135deg, #8B06F5, #00E5FF)' }}
        id="neo-toggle"
        aria-label="Open Neo AI Assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <FiX size={22} className="text-white" />
            </motion.span>
          ) : (
            <motion.span key="msg" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <FiZap size={22} className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>
        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ background: 'linear-gradient(135deg, #8B06F5, #00E5FF)' }} />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-28 left-4 sm:left-8 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[560px]
                       flex flex-col glass rounded-2xl border border-white/10 overflow-hidden
                       shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(139,6,245,0.15)]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/5"
              style={{ background: 'linear-gradient(135deg, rgba(139,6,245,0.15), rgba(0,229,255,0.05))' }}>
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-display font-black text-white text-sm shadow-[0_0_15px_rgba(139,6,245,0.5)]">
                  N
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-background" />
              </div>
              <div>
                <h3 className="font-display font-bold text-text-primary text-sm">Neo</h3>
                <p className="text-text-secondary text-xs">Dharma's AI Assistant · Online</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center
                           text-text-secondary hover:text-text-primary transition-all"
              >
                <FiX size={15} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0, maxHeight: 320 }}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'neo' && (
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-[10px] font-bold mr-2 flex-shrink-0 mt-0.5">
                      N
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] px-3 py-2.5 rounded-xl text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary/20 border border-primary/30 text-text-primary'
                        : 'bg-white/5 border border-white/8 text-text-secondary'
                    }`}
                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                  />
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-[10px] font-bold mr-2 flex-shrink-0">
                    N
                  </div>
                  <div className="bg-white/5 border border-white/8 rounded-xl">
                    <TypingIndicator />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick questions */}
            <div className="px-4 py-2 border-t border-white/5">
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="flex-shrink-0 px-3 py-1.5 rounded-full bg-white/5 border border-white/10
                               text-text-secondary hover:text-primary hover:border-primary/30 text-xs
                               transition-all whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-2 p-3 border-t border-white/5">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about Dharma..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-text-primary
                           text-xs placeholder:text-text-secondary/50 focus:outline-none focus:border-primary/40 transition-all"
                id="neo-input"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #8B06F5, #00E5FF)' }}
              >
                <FiSend size={14} className="text-white" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NeoAssistant;

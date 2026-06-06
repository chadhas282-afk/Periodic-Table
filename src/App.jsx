import { useState, useCallback } from 'react';
import { Search, Atom, X, Sparkles } from 'lucide-react';
import PeriodicTable from './components/PeriodicTable';
import ElementModal from './components/ElementModal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState(null);

    const handleElementClick = useCallback((element) => {
    setSelectedElement(element);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedElement(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #6366f1 0%, transparent 60%)',
            animation: 'floatA 20s ease-in-out infinite',
          }}
                  />
        <div
          className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #ec4899 0%, transparent 60%)',
            animation: 'floatB 25s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 60%)',
            animation: 'floatC 18s ease-in-out infinite',
          }}
        />
        {Array.from({ length: 60 }, (_, i) => (
          <div
          key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
              animation: `twinkle ${Math.random() * 4 + 2}s ease-in-out ${Math.random() * 4}s infinite`,
            }}
          />
        ))}
      </div>
      <div className="relative z-10">
        <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-slate-800/50" style={{ background: 'rgba(2,6,23,0.8)' }}>
          <div className="max-w-screen-2xl mx-auto px-6 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(79,70,229,0.1))', border: '1px solid rgba(99,102,241,0.3)', boxShadow: '0 0 20px rgba(99,102,241,0.2)' }}>
                  <Atom size={26} className="text-indigo-400 drop-shadow-md" />
                  <div className="absolute inset-0 rounded-2xl animate-ping opacity-20" style={{ background: '#6366f1' }} />
                </div>
                 <div>
                  <h1 className="text-2xl font-black tracking-tight bg-clip-text text-transparent drop-shadow-sm" style={{ backgroundImage: 'linear-gradient(90deg, #fff, #a5b4fc, #fbcfe8)' }}>
                    Periodic Table
                  </h1>
                  <p className="text-[13px] text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
                    <Sparkles size={11} className="text-indigo-400" />
                    Interactive 3D Element Explorer
                  </p>
                </div>
              </div>

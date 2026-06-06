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
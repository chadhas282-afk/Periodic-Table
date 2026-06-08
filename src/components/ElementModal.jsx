import { Suspense, lazy, useEffect, useCallback } from 'react';
import { X, Atom, Thermometer, Zap, BarChart3, FlaskConical } from 'lucide-react';
import { CATEGORIES } from '../data/elements';

const AtomViewer = lazy(() => import('./AtomViewer'));

const PROPERTY_RANGES = {
  atomicMass: { min: 1.008, max: 294, label: 'Atomic Mass', unit: 'u' },
  atomicRadius: { min: 25, max: 348, label: 'Atomic Radius', unit: 'pm' },
  electronegativity: { min: 0.79, max: 3.98, label: 'Electronegativity', unit: 'Pauling' },
  meltingPoint: { min: -272.20, max: 3422, label: 'Melting Point', unit: '°C' },
  boilingPoint: { min: -268.93, max: 5596, label: 'Boiling Point', unit: '°C' },
  density: { min: 0.00008988, max: 40.7, label: 'Density', unit: 'g/cm³' },
};

function PropertyBar({ label, value, unit, min, max, color }) {
  const pct = value == null ? 0 : Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  const display = value == null ? 'N/A'
    : typeof value === 'number' && !Number.isInteger(value) ? value.toFixed(3)
      : value;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-400 font-medium">{label}</span>
        <span className="text-xs text-slate-200 font-mono">
          {display} <span className="text-slate-500">{unit}</span>
        </span>
      </div>
      <div className="h-2 bg-slate-700/60 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: value == null ? '#374151' : `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: value != null ? `0 0 10px ${color}55` : 'none',
          }}
        />
      </div>
    </div>
  );
}

function InfoChip({ label, value }) {
  return (
    <div className="bg-slate-800/70 rounded-xl p-3.5 border border-slate-700/40 backdrop-blur-sm">
      <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1.5 font-medium">{label}</div>
      <div className="text-sm text-slate-100 font-semibold break-all leading-snug">{value ?? 'N/A'}</div>
    </div>
  );
}

export default function ElementModal({ element, onClose }) {
  const category = element ? CATEGORIES[element.category] : null;

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (!element) return null;

  const accentColor = category?.color || '#6366f1';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: 'blur(20px)', background: 'rgba(2,6,23,0.88)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-7xl rounded-3xl overflow-hidden flex flex-col"
        style={{
          height: 'clamp(600px, 88vh, 900px)',
          background: 'linear-gradient(135deg, rgba(15,23,42,0.97) 0%, rgba(2,6,23,0.99) 100%)',
          border: `1px solid ${accentColor}33`,
          boxShadow: `0 0 100px ${accentColor}22, 0 30px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)`,
        }}
      >
        <div
          className="relative flex items-center justify-between px-8 py-5 border-b flex-shrink-0"
          style={{ borderColor: `${accentColor}22` }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl"
            style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
          />
          <div className="flex items-center gap-5">
            <div
              className="flex items-center justify-center w-16 h-16 rounded-2xl text-3xl font-black flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}11)`,
                border: `2px solid ${accentColor}55`,
                color: accentColor,
                textShadow: `0 0 24px ${accentColor}`,
                boxShadow: `0 0 30px ${accentColor}22`,
              }}
            >
              {element.symbol}
            </div>
            <div>
              <div className="text-3xl font-bold text-white leading-tight">{element.name}</div>
              <div className="flex items-center gap-2.5 mt-1">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: `${accentColor}22`, color: accentColor, border: `1px solid ${accentColor}44` }}
                >
                  {category?.label}
                </span>
                <span className="text-slate-500 text-sm">Z = {element.atomicNumber}</span>
                <span className="text-slate-600 text-sm">•</span>
                <span className="text-slate-500 text-sm font-mono">Period {element.period}{element.group ? ` · Group ${element.group}` : ''}</span>
              </div>
            </div>
          </div>
          <button
          onClick={onClose}
            className="flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 hover:scale-110 flex-shrink-0"
            style={{ background: 'rgba(100,116,139,0.2)', border: '1px solid rgba(100,116,139,0.3)', color: '#94a3b8' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.2)';
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)';
              e.currentTarget.style.color = '#ef4444';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(100,116,139,0.2)';
              e.currentTarget.style.borderColor = 'rgba(100,116,139,0.3)';
              e.currentTarget.style.color = '#94a3b8';
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-1 min-h-0 overflow-hidden">
          <div
            className="relative flex flex-col"
            style={{
              width: '55%',
              borderRight: `1px solid ${accentColor}18`,
              flexShrink: 0,
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 50% 40%, ${accentColor}18 0%, transparent 65%)` }}
            />
            <div className="flex-1 relative z-10 min-h-0">
              <Suspense
                fallback={
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full border-2 animate-spin"
                      style={{ borderColor: `${accentColor}44`, borderTopColor: accentColor }}
                    />
                    <span className="text-slate-500 text-sm">Loading 3D model…</span>
                  </div>
                }
              >
                <AtomViewer element={element} />
              </Suspense>
            </div>

            <div
              className="relative z-10 flex-shrink-0 px-6 py-5 space-y-3"
              style={{ borderTop: `1px solid ${accentColor}15`, background: 'rgba(2,6,23,0.5)' }}
            >
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-widest">
                <Atom size={13} style={{ color: accentColor }} />
                <span>Electron Configuration</span>
              </div>
              <div
                className="px-4 py-3 rounded-xl font-mono text-sm leading-relaxed"
                style={{
                  background: `${accentColor}10`,
                  border: `1px solid ${accentColor}25`,
                  color: accentColor,
                }}
              >
                {element.electronConfig}
              </div>
              <div className="flex flex-wrap gap-2">
                {element.electronsPerShell.map((n, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center px-3 py-2 rounded-lg text-xs"
                    style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}28` }}
                  >
                    <span className="text-slate-500 text-[9px] uppercase tracking-wider">Shell {i + 1}</span>
                    <span className="font-bold text-sm mt-0.5" style={{ color: accentColor }}>{n}e⁻</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-7 space-y-6 custom-scrollbar">
            <div>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">
                <FlaskConical size={13} />
                <span>Key Facts</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <InfoChip label="Atomic Number"  value={element.atomicNumber} />
                <InfoChip label="Atomic Mass"    value={`${element.atomicMass} u`} />
                <InfoChip label="Phase"          value={element.phase} />
                <InfoChip label="Density"        value={element.density != null ? `${element.density} g/cm³` : null} />
                <InfoChip label="Discovered"     value={element.discovered > 0 ? element.discovered : `~${Math.abs(element.discovered)} BC`} />
                <InfoChip label="Discovered By"  value={element.discoveredBy} />
              </div>
            </div>
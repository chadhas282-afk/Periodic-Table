import { Suspense, lazy, useEffect, useCallback } from 'react';
import { X, Atom, Thermometer, Zap, BarChart3, FlaskConical } from 'lucide-react';
import { CATEGORIES } from '../data/elements';

const AtomViewer = lazy(() => import('./AtomViewer'));

const PROPERTY_RANGES = {
      atomicMass:        { min: 1.008,       max: 294,   label: 'Atomic Mass',       unit: 'u' },
  atomicRadius:      { min: 25,          max: 348,   label: 'Atomic Radius',     unit: 'pm' },
  electronegativity: { min: 0.79,        max: 3.98,  label: 'Electronegativity', unit: 'Pauling' },
  meltingPoint:      { min: -272.20,     max: 3422,  label: 'Melting Point',     unit: '°C' },
  boilingPoint:      { min: -268.93,     max: 5596,  label: 'Boiling Point',     unit: '°C' },
  density:           { min: 0.00008988,  max: 40.7,  label: 'Density',           unit: 'g/cm³' },
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

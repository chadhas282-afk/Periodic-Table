import { useState, useMemo } from 'react';
import { elements, CATEGORIES, getElementPosition } from '../data/elements';

function EmptyCell() {
  return <div className="element-cell element-cell-empty" />;
}

function ElementCard({ element, isHighlighted, isDimmed, onClick }) {
  const category = CATEGORIES[element.category];
  const accentColor = category?.color || '#6366f1';

  return (
    <div
      className={`element-card group relative cursor-pointer rounded-xl transition-all duration-300 select-none overflow-hidden ${
        isDimmed ? 'opacity-10 scale-95 grayscale' : 'opacity-100'
      } ${isHighlighted ? 'scale-110 z-20' : 'scale-100 z-0'}`}
      style={{
        background: isHighlighted
          ? `linear-gradient(135deg, ${accentColor}44, ${accentColor}15)`
          : `linear-gradient(145deg, rgba(30,41,59,0.9) 0%, rgba(2,6,23,0.95) 100%)`,
        border: `1px solid ${isHighlighted ? accentColor : 'rgba(255,255,255,0.08)'}`,
        boxShadow: isHighlighted
        ? `0 0 20px ${accentColor}66, inset 0 1px 0 rgba(255,255,255,0.2)`
          : `0 2px 4px rgba(0,0,0,0.5)`,
        animation: 'staggerFadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        animationDelay: `${element.atomicNumber * 10}ms`,
      }}
      onClick={() => onClick(element)}
      onMouseEnter={(e) => {
        if (!isDimmed) {
          e.currentTarget.style.background = `linear-gradient(135deg, ${accentColor}40, ${accentColor}10)`;
          e.currentTarget.style.borderColor = accentColor;
          e.currentTarget.style.boxShadow = `0 10px 30px -10px ${accentColor}, 0 0 15px ${accentColor}55, inset 0 1px 0 rgba(255,255,255,0.3)`;
          e.currentTarget.style.transform = 'scale(1.15)';
          e.currentTarget.style.zIndex = '30';
        }
      }}
      onMouseLeave={(e) => {
        if (!isDimmed) {
          e.currentTarget.style.background = isHighlighted
            ? `linear-gradient(135deg, ${accentColor}44, ${accentColor}15)`
            : `linear-gradient(145deg, rgba(30,41,59,0.9) 0%, rgba(2,6,23,0.95) 100%)`;
          e.currentTarget.style.borderColor = isHighlighted ? accentColor : 'rgba(255,255,255,0.08)';
          e.currentTarget.style.boxShadow = isHighlighted
            ? `0 0 20px ${accentColor}66, inset 0 1px 0 rgba(255,255,255,0.2)`
            : `0 2px 4px rgba(0,0,0,0.5)`;
            e.currentTarget.style.transform = isHighlighted ? 'scale(1.1)' : 'scale(1)';
          e.currentTarget.style.zIndex = isHighlighted ? '20' : '0';
        }
      }}
    >
      <div
        className="absolute -top-4 -left-4 w-12 h-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none"
        style={{ background: accentColor }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-300"
        style={{
          background: isHighlighted
            ? `linear-gradient(90deg, transparent, ${accentColor}, transparent)`
            : `linear-gradient(90deg, transparent, ${accentColor}55, transparent)`
        }}
      />

      <div className="relative z-10 flex flex-col h-full p-1.5">
        <div className="text-[10px] font-bold leading-normal pl-0.5" style={{ color: isHighlighted ? '#fff' : `${accentColor}aa` }}>
          {element.atomicNumber}
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center -mt-2">
          <div
          className="text-[22px] font-black leading-none tracking-tight transition-all duration-300"
            style={{
              color: 'white',
              textShadow: isHighlighted ? `0 0 15px ${accentColor}` : `0 2px 4px rgba(0,0,0,0.5)`,
            }}
          >
            {element.symbol}
          </div>
        </div>
                
        <div className="flex flex-col items-center w-full mt-auto mb-0.5">
          <div className="text-[8px] text-slate-200 font-semibold leading-tight truncate w-full text-center">
            {element.name}
          </div>
          <div className="text-[7px] text-slate-400 leading-none font-mono opacity-80 group-hover:opacity-100 transition-opacity mt-px">
            {element.atomicMass.toFixed?.(element.atomicMass < 10 ? 3 : element.atomicMass < 100 ? 2 : 1) ?? element.atomicMass}
          </div>
        </div>
        </div>
    </div>
  );
}
function GroupHeader({ group }) {
  return (
    <div className="flex items-center justify-center text-[10px] text-slate-600 font-semibold h-6">
      {group}
    </div>
  );
}
function PeriodLabel({ period }) {
  return (
    <div className="flex items-center justify-end pr-2 text-[10px] text-slate-600 font-semibold h-full">
      {period}
    </div>
  );
}
function CategoryLegend({ onCategoryFilter, activeCategoryFilter }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {Object.entries(CATEGORIES).map(([key, cat]) => (
        <button
          key={key}
          onClick={() => onCategoryFilter(activeCategoryFilter === key ? null : key)}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full text-[11px] font-bold tracking-wide uppercase transition-all duration-300 hover:scale-105"
          style={{
            background: activeCategoryFilter === key ? `${cat.color}33` : 'rgba(255,255,255,0.03)',
            border: `1px solid ${activeCategoryFilter === key ? cat.color : 'rgba(255,255,255,0.1)'}`,
            color: activeCategoryFilter === key ? '#fff' : '#94a3b8',
            boxShadow: activeCategoryFilter === key ? `0 0 15px ${cat.color}44, inset 0 0 10px ${cat.color}22` : '0 2px 4px rgba(0,0,0,0.2)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span
            className="w-2.5 h-2.5 rounded-full shadow-sm transition-all duration-300 group-hover:scale-125"
            style={{
                background: cat.color,
              boxShadow: `0 0 8px ${cat.color}`,
            }}
          />
          {cat.label}
        </button>
      ))}
    </div>
  );
}
const GRID_COLS = 19; 
const GRID_ROWS = 12; 
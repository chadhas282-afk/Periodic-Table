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
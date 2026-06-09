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
import { useState, useMemo } from 'react';
import { elements, CATEGORIES, getElementPosition } from '../data/elements';

function EmptyCell() {
  return <div className="element-cell element-cell-empty" />;
}

function ElementCard({ element, isHighlighted, isDimmed, onClick }) {
  const category = CATEGORIES[element.category];
  const accentColor = category?.color || '#6366f1';

  return (
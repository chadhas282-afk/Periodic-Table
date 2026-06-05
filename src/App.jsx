import { useState, useCallback } from 'react';
import { Search, Atom, X, Sparkles } from 'lucide-react';
import PeriodicTable from './components/PeriodicTable';
import ElementModal from './components/ElementModal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState(null);

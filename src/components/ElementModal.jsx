import { Suspense, lazy, useEffect, useCallback } from 'react';
import { X, Atom, Thermometer, Zap, BarChart3, FlaskConical } from 'lucide-react';
import { CATEGORIES } from '../data/elements';

const AtomViewer = lazy(() => import('./AtomViewer'));

const PROPERTY_RANGES = {
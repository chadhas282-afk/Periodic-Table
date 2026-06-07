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

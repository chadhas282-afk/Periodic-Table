export const CATEGORIES = {
  'alkali-metal':         { label: 'Alkali Metal',          color: '#ef4444' },
  'alkaline-earth-metal': { label: 'Alkaline Earth Metal',  color: '#f97316' },
  'transition-metal':     { label: 'Transition Metal',      color: '#eab308' },
  'post-transition-metal':{ label: 'Post-Transition Metal', color: '#22c55e' },
  'metalloid':            { label: 'Metalloid',             color: '#14b8a6' },
  'nonmetal':             { label: 'Nonmetal',              color: '#3b82f6' },
  'halogen':              { label: 'Halogen',               color: '#8b5cf6' },
  'noble-gas':            { label: 'Noble Gas',             color: '#ec4899' },
  'lanthanide':           { label: 'Lanthanide',            color: '#06b6d4' },
    'actinide':             { label: 'Actinide',              color: '#a855f7' },
};

export const elements = [
  {
    atomicNumber:1, symbol:'H',  name:'Hydrogen',  atomicMass:1.008,   group:1,  period:1,
    category:'nonmetal', electronegativity:2.20, atomicRadius:53,  meltingPoint:-259.16, boilingPoint:-252.88,
    electronConfig:'1s¹', electronsPerShell:[1], molarMass:1.008, density:0.00008988,
    uses:'Hydrogen is the most abundant element in the universe, used as rocket fuel and in fuel cells for clean energy. It drives the Haber process for ammonia synthesis essential to global fertilizer production.',
    discovered:1766, discoveredBy:'Henry Cavendish', phase:'Gas',
  },
    {
    atomicNumber:2, symbol:'He', name:'Helium',    atomicMass:4.0026,  group:18, period:1,
    category:'noble-gas', electronegativity:null, atomicRadius:31, meltingPoint:-272.20, boilingPoint:-268.93,
    electronConfig:'1s²', electronsPerShell:[2], molarMass:4.0026, density:0.0001645,
    uses:'Helium fills balloons and blimps due to its low density and non-flammability. It cools superconducting magnets in MRI machines and particle accelerators.',
    discovered:1868, discoveredBy:'Pierre Janssen', phase:'Gas',
  },
  {
        atomicNumber:3, symbol:'Li', name:'Lithium',   atomicMass:6.941,   group:1,  period:2,
    category:'alkali-metal', electronegativity:0.98, atomicRadius:167, meltingPoint:180.50, boilingPoint:1342,
    electronConfig:'[He] 2s¹', electronsPerShell:[2,1], molarMass:6.941, density:0.534,
    uses:'Lithium is the cornerstone of modern rechargeable battery technology powering smartphones and EVs. It is also prescribed as a mood-stabilizing medication for bipolar disorder.',
    discovered:1817, discoveredBy:'Johan August Arfwedson', phase:'Solid',
  },
  {
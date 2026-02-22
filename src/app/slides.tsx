// src/app/slides.tsx
import type { ReactNode } from 'react';
import Home from '../slides/Home';
import Info from '../slides/Info';
import FAQ from '../slides/FAQ';
import Contact from '../slides/Contact';

export type SlideDef = {
  id: string;
  label: string;
  element: ReactNode;
};

export const SLIDES: SlideDef[] = [
  { id: 'home', label: 'Home', element: <Home /> },
  { id: 'info', label: 'Info', element: <Info /> },
  { id: 'faq', label: 'FAQ', element: <FAQ /> },
  { id: 'contact', label: 'Contact', element: <Contact /> },
];

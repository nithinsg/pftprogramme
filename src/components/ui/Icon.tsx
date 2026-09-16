import {
  Activity,
  GraduationCap,
  HeartPulse,
  Gauge,
  Layers,
  Microscope,
  Monitor,
  Moon,
  ScanLine,
  Shield,
  Stethoscope,
  Syringe,
  Waves,
  Wind,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { IconKey } from '@/data/types';

/**
 * Icon registry. Data files reference icons by key so `src/data/*` stays free
 * of presentation imports.
 *
 * Style rule: line icons only, 1.5px stroke, never filled, never illustrative.
 */
const registry: Record<IconKey, LucideIcon> = {
  stethoscope: Stethoscope,
  activity: Activity,
  scan: ScanLine,
  'heart-pulse': HeartPulse,
  wind: Wind,
  microscope: Microscope,
  moon: Moon,
  graduation: GraduationCap,
  shield: Shield,
  monitor: Monitor,
  layers: Layers,
  gauge: Gauge,
  waves: Waves,
  syringe: Syringe,
};

export function Icon({ name, className = 'h-5 w-5' }: { name: IconKey; className?: string }) {
  const Component = registry[name];
  return <Component className={className} strokeWidth={1.5} aria-hidden="true" />;
}

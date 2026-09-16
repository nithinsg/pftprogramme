import {
  Activity,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  Layers,
  Microscope,
  Monitor,
  ScanLine,
  Shield,
  Stethoscope,
  Users,
  Wind,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { IconKey } from '@/data/types';

/**
 * Icon registry. Data files reference icons by key so that `src/data/*` stays
 * free of presentation imports.
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
  flask: FlaskConical,
  graduation: GraduationCap,
  users: Users,
  shield: Shield,
  monitor: Monitor,
  layers: Layers,
};

export function Icon({
  name,
  className = 'h-5 w-5',
}: {
  name: IconKey;
  className?: string;
}) {
  const Component = registry[name];
  return <Component className={className} strokeWidth={1.5} aria-hidden="true" />;
}

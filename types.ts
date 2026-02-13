
export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: 'purple' | 'teal' | 'red';
}

export interface RoadmapItem {
  phase: string;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
  items: string[];
}

export interface TokenAllocation {
  name: string;
  value: number;
  color: string;
}

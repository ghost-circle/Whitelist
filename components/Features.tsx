
import React from 'react';
import { motion } from 'framer-motion';
import { EyeOff, UserX, ShieldAlert, Binary, Layers, Lock, LucideIcon } from 'lucide-react';
import { Feature } from '../types';

const IconMap: Record<string, LucideIcon> = {
  EyeOff, UserX, ShieldAlert, Binary, Layers, Lock
};

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const Icon = IconMap[feature.icon] || Lock;
  const isRed = feature.color === 'red';
  const isTeal = feature.color === 'teal';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`glass p-8 rounded-2xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 ${
        isRed ? 'border-red-500/10' : isTeal ? 'border-teal-500/10' : 'border-purple-500/10'
      }`}
    >
      <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-5 blur-3xl ${
        isRed ? 'bg-red-500' : isTeal ? 'bg-teal-500' : 'bg-purple-500'
      } group-hover:opacity-20 transition-opacity`} />
      
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
        isRed ? 'bg-red-500/10 text-red-400' : isTeal ? 'bg-teal-500/10 text-teal-400' : 'bg-purple-500/10 text-purple-400'
      }`}>
        <Icon size={24} />
      </div>

      <h3 className="text-xl font-bold mb-3 font-heading">{feature.title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">{feature.description}</p>
    </motion.div>
  );
};

interface FeaturesGridProps {
  title: string;
  subtitle: string;
  features: Feature[];
  id?: string;
}

const FeaturesGrid: React.FC<FeaturesGridProps> = ({ title, subtitle, features, id }) => {
  return (
    <section id={id} className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold font-heading mb-4"
        >
          {title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-slate-400 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <FeatureCard key={f.id} feature={f} index={i} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;

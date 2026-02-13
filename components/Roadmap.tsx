
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { ROADMAP_DATA } from '../constants';

const Roadmap: React.FC = () => {
  return (
    <section id="roadmap" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">Strategic <span className="text-teal-400">Roadmap</span></h2>
        <p className="text-slate-400">Our journey to bring institutional-grade privacy to the Sui ecosystem.</p>
      </div>

      <div className="relative">
        {/* Central Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500/50 via-teal-500/50 to-transparent -translate-x-1/2 hidden md:block" />

        {ROADMAP_DATA.map((item, i) => {
          const isLeft = i % 2 === 0;
          const isCompleted = item.status === 'completed';
          const isCurrent = item.status === 'current';

          return (
            <div key={item.phase} className={`relative mb-12 md:mb-24 flex flex-col md:flex-row items-center ${isLeft ? 'md:flex-row-reverse' : ''}`}>
              {/* Dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-purple-500 -translate-x-1/2 z-10 hidden md:block shadow-[0_0_15px_rgba(139,92,246,0.5)]" />

              {/* Content */}
              <div className={`w-full md:w-[45%] pl-20 md:pl-0 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`glass p-8 rounded-2xl relative ${isCurrent ? 'ring-2 ring-purple-500/30 glow-purple' : ''}`}
                >
                  <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${isCompleted ? 'text-teal-400' : isCurrent ? 'text-purple-400' : 'text-slate-500'}`}>
                    {item.phase} {isCompleted && '• Completed'} {isCurrent && '• Active'}
                  </div>
                  <h3 className="text-2xl font-bold font-heading mb-4">{item.title}</h3>
                  <ul className={`space-y-3 ${isLeft ? 'md:items-end' : 'md:items-start'} flex flex-col`}>
                    {item.items.map((milestone) => (
                      <li key={milestone} className="flex items-center gap-3 text-slate-300 text-sm">
                        {isCompleted && milestone !== 'Public Testnet Launch' ? (
                          <CheckCircle2 size={16} className="text-teal-400 flex-shrink-0" />
                        ) : (
                          <Circle size={16} className={`${milestone === 'Public Testnet Launch' ? 'text-purple-400 animate-pulse' : 'text-slate-600'} flex-shrink-0`} />
                        )}
                        {milestone}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Roadmap;

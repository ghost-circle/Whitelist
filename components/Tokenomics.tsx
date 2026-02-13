
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { TOKENOMICS_DATA } from '../constants';

const Tokenomics: React.FC = () => {
  return (
    <section id="tokenomics" className="py-24 px-6 bg-[#07070c]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-heading mb-6"
          >
            Sustainable <span className="text-purple-500">Tokenomics</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 mb-8 text-lg"
          >
            The $GHOST token powers the Ghost Circle ecosystem, incentivizing proof generation, securing the network, and enabling decentralized governance.
          </motion.p>
          
          <div className="space-y-4">
            {TOKENOMICS_DATA.map((item, i) => (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-4 glass rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-200">{item.value}%</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="h-[400px] md:h-[500px] relative">
          <div className="absolute inset-0 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={TOKENOMICS_DATA}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={160}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {TOKENOMICS_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#12121a', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '12px'
                }}
                itemStyle={{ color: '#ffffff' }}
              />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;

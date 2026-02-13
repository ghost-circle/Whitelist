
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, ShieldCheck, Mail, Twitter, Github, Cpu } from 'lucide-react';
import { FaDiscord } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { supabase } from './lib/supabase';
import Header from './components/Header';
import Hero3D from './components/Hero3D';
import Shield3D from './components/Shield3D';
import Logo3D from './components/Logo3D';
import FeaturesGrid from './components/Features';
import Roadmap from './components/Roadmap';
import Tokenomics from './components/Tokenomics';
import { PROBLEM_FEATURES, SOLUTION_FEATURES } from './constants';

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    twitter: '',
    suiWallet: '',
    deviceFingerprint: '',
    pcToken: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate device fingerprint
  const generateDeviceFingerprint = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Device fingerprint', 2, 2);
    }
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      !!window.sessionStorage,
      !!window.localStorage,
      canvas.toDataURL()
    ].join('|');
    
    return btoa(fingerprint).substring(0, 32);
  };

  // Generate PC token
  const generatePCToken = () => {
    const randomBytes = new Uint8Array(16);
    crypto.getRandomValues(randomBytes);
    return Array.from(randomBytes, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  // Initialize device fingerprint and PC token on component mount
  React.useEffect(() => {
    setFormData(prev => ({
      ...prev,
      deviceFingerprint: generateDeviceFingerprint(),
      pcToken: generatePCToken()
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('whitelist')
        .insert([
          {
            email: formData.email,
            twitter: formData.twitter,
            wallet: formData.suiWallet,
            device_fingerprint: formData.deviceFingerprint,
            pc_token: formData.pcToken,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ 
        email: '', 
        twitter: '', 
        suiWallet: '',
        deviceFingerprint: generateDeviceFingerprint(),
        pcToken: generatePCToken()
      });
    } catch (error) {
      console.error('Error submitting to Supabase:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-teal-900/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Cpu size={14} /> Built on Sui Network
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight mb-6">
              Private Transactions. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-teal-400">Zero Traces.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Ghost Circle brings institutional-grade privacy to blockchain with advanced Zero-Knowledge Proofs. Fully anonymous, lightning fast, and natively built for the Sui ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#whitelist" className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/30 group active:scale-95">
                Join Whitelist <FileText size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="mt-12 flex items-center gap-8 border-t border-white/5 pt-8">
              <div>
                <p className="text-2xl font-bold font-heading">128-bit</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider">ZK Security</p>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div>
                <p className="text-2xl font-bold font-heading">&lt; 5ms</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Verification</p>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div>
                <p className="text-2xl font-bold font-heading">100%</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Privacy Rate</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[500px] lg:h-[600px] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
            <Hero3D />
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <FeaturesGrid
        id="vision"
        title="The Public Ledger Dilemma"
        subtitle="Current blockchains are public by default. For mass adoption, privacy is not a feature—it is a requirement."
        features={PROBLEM_FEATURES}
      />

      {/* Solution Section */}
      <FeaturesGrid
        id="solution"
        title="Privacy by Architecture"
        subtitle="Ghost Circle creates a private execution environment that settles on Sui, giving you the security of L1 with the confidentiality of a ghost."
        features={SOLUTION_FEATURES}
      />

      {/* How it Works / 2D Animation Illustrative Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="glass p-12 rounded-[40px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-500/5 to-transparent pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold font-heading mb-6">How the Circle Operates</h2>
              <div className="space-y-8">
                {[
                  { step: '01', title: 'Shield Assets', desc: 'Deposit funds into the Ghost Vault. Pedersen commitments mask the amounts immediately.' },
                  { step: '02', title: 'Private Transact', desc: 'Send assets within the L2 network. Only sender and receiver know the transaction details.' },
                  { step: '03', title: 'Prove & Batch', desc: 'ZK-Rollup technology batches multiple transactions into a single validity proof.' },
                  { step: '04', title: 'Zero Trace Exit', desc: 'Withdraw back to Sui Mainnet without linking your L1 history to your L2 activity.' }
                ].map((item) => (
                  <div key={item.step} className="flex gap-6">
                    <span className="text-3xl font-black text-purple-500/40 font-heading">{item.step}</span>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square glass rounded-3xl border-purple-500/20 flex items-center justify-center p-8 overflow-hidden">
                <DotLottieReact
                  src="https://lottie.host/a46d6e16-bbd9-45a4-826c-08293de59911/A3XVt5qfss.lottie"
                  loop
                  autoplay
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Roadmap />

      {/* CTA Section */}
      <section id="whitelist" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center glass p-16 rounded-[48px] relative overflow-hidden">
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

          <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6">Ready to Step into the <span className="text-purple-400">Circle</span>?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Join the whitelist for the Shadow Testnet and be among the first to experience institutional privacy on Sui.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                required
                className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white outline-none focus:border-purple-500 transition-colors w-full"
              />
              <input
                type="text"
                name="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                placeholder="Twitter Handle (@username)"
                required
                className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white outline-none focus:border-purple-500 transition-colors w-full"
              />
            </div>
            <input
              type="text"
              name="suiWallet"
              value={formData.suiWallet}
              onChange={handleInputChange}
              placeholder="Sui Wallet Address (0x...)"
              required
              className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white outline-none focus:border-purple-500 transition-colors"
            />
            
            {submitStatus === 'success' && (
              <div className="text-green-400 text-sm">
                Successfully joined the whitelist! You're now on the list for the Ghost Circle Testnet.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="text-red-400 text-sm">
                This PC or account is already registered in the whitelist.
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Joining...' : 'Join Whitelist'} <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo and Description */}
          <div className="mb-12">
            <a href="#" className="flex items-center justify-center gap-2 mb-6">
              <Logo3D />
              <span className="text-xl font-bold font-heading">GHOST CIRCLE</span>
            </a>
            <p className="text-slate-500 max-w-2xl mx-auto mb-8">
              Empowering individuals and institutions with the right to financial privacy. Built on the next generation of high-speed blockchain architecture.
            </p>
            <div className="flex justify-center gap-4">
              <a href="https://twitter.com/ghost_onsui" className="p-3 glass rounded-lg text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="https://github.com/ghost-circle" className="p-3 glass rounded-lg text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
              <a href="https://t.me/ghostcircleonsui" className="p-3 glass rounded-lg text-slate-400 hover:text-white transition-colors"><FaTelegram size={20} /></a>
              <a href="https://discord.gg/tUQSzaqSqb" className="p-3 glass rounded-lg text-slate-400 hover:text-white transition-colors"><FaDiscord size={20} /></a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mb-12">
            <ul className="flex justify-center gap-8 text-sm text-slate-500">
              <li><a href="#vision" className="hover:text-purple-400 transition-colors">Solution</a></li>
              <li><a href="#roadmap" className="hover:text-purple-400 transition-colors">Roadmap</a></li>
              <li><a href="#whitelist" className="hover:text-purple-400 transition-colors">Whitelist</a></li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 gap-4">
            <p>© 2026 Ghost Circle Protocol. All rights reserved.</p>
            <p>Powered by Sui Network & Zero-Knowledge Cryptography.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Help for Lucide icons mapping in the Features component
import { Ghost } from 'lucide-react';

export default App;

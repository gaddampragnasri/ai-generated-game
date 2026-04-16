/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Terminal, Cpu, Database, Wifi, AlertTriangle } from 'lucide-react';

export default function App() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden bg-black">
      {/* CRT & Glitch Effects */}
      <div className="crt-overlay" />
      <div className="crt-scanline" />
      <div className="noise-bg" />
      <div className="screen-tear" />
      <div className="screen-tear" style={{ animationDelay: '1.5s', opacity: 0.3 }} />

      {/* Background Grid */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(var(--color-neon-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--color-neon-cyan) 1px, transparent 1px)', 
             backgroundSize: '50px 50px' 
           }} 
      />

      {/* Header */}
      <header className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between mb-12 border-b-4 border-[var(--color-neon-cyan)] pb-6">
        <div className="flex items-center space-x-6">
          <div className="p-3 bg-[var(--color-neon-cyan)] text-black shadow-[0_0_20px_var(--color-neon-cyan)]">
            <Cpu size={32} />
          </div>
          <div>
            <h1 className="text-4xl md:text-7xl font-pixel text-[var(--color-neon-cyan)] glitch-text tracking-tighter uppercase">
              NEON_GLITCH_SNAKE
            </h1>
            <div className="flex items-center space-x-2 text-[12px] font-mono text-[var(--color-neon-magenta)] uppercase tracking-[0.4em]">
              <AlertTriangle size={12} className="animate-pulse" />
              <span>KERNEL_PANIC: 0xDEADBEEF // MEMORY_LEAK: DETECTED</span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex flex-col items-end space-y-1 text-[12px] font-mono text-[var(--color-neon-cyan)]/60">
          <div className="flex items-center space-x-3">
            <span className="text-[var(--color-neon-magenta)]">UPLINK_STATUS:</span>
            <Wifi size={14} className="text-[var(--color-neon-cyan)] animate-pulse" />
            <span className="glitch-text">ENCRYPTED</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[var(--color-neon-magenta)]">CORE_TEMP:</span>
            <span className="text-[var(--color-neon-yellow)]">98.6°C</span>
            <Database size={14} />
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[var(--color-neon-magenta)]">USER_AUTH:</span>
            <span className="bg-[var(--color-neon-cyan)] text-black px-1">ROOT_ACCESS</span>
            <Terminal size={14} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Sidebar - Cryptic Logs */}
        <div className="hidden lg:flex lg:col-span-3 flex-col space-y-6">
          <div className="p-6 bg-black/80 glitch-border">
            <h4 className="text-sm font-bold text-[var(--color-neon-magenta)] mb-4 uppercase tracking-[0.2em] border-b border-[var(--color-neon-magenta)]/30 pb-2">
              SYS_LOG_DUMP
            </h4>
            <div className="text-[10px] font-mono space-y-2 text-[var(--color-neon-cyan)]/70 leading-relaxed">
              <p className="text-[var(--color-neon-yellow)] animate-pulse">{'>'} INJECTING_MALWARE...</p>
              <p>{'>'} BYPASSING_FIREWALL_01</p>
              <p>{'>'} DECRYPTING_SECTOR_7G</p>
              <p className="text-[var(--color-neon-magenta)]">{'>'} ERROR: BUFFER_OVERFLOW</p>
              <p>{'>'} RE-ROUTING_PACKETS</p>
              <p>{'>'} HANDSHAKE_COMPLETE</p>
              <p className="text-[var(--color-neon-cyan)]">{'>'} SYSTEM_READY_FOR_EXECUTION</p>
            </div>
          </div>
          
          <div className="p-6 bg-black/80 glitch-border">
            <h4 className="text-sm font-bold text-[var(--color-neon-cyan)] mb-4 uppercase tracking-[0.2em] border-b border-[var(--color-neon-cyan)]/30 pb-2">
              NEURAL_LOAD
            </h4>
            <div className="grid grid-cols-8 gap-2">
              {[...Array(32)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    backgroundColor: [
                      'rgba(0, 243, 255, 0.1)', 
                      i % 5 === 0 ? '#ff00ff' : '#00f3ff', 
                      'rgba(0, 243, 255, 0.1)'
                    ] 
                  }}
                  transition={{ repeat: Infinity, duration: Math.random() * 1 + 0.5, delay: Math.random() }}
                  className="h-3 w-full"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Center - Game Stage */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full mb-2 flex justify-between items-end px-2">
            <span className="text-[10px] font-mono text-[var(--color-neon-magenta)]">STAGE_01 // GRID_SYNC: OK</span>
            <span className="text-[10px] font-mono text-[var(--color-neon-cyan)]">LATENCY: 14ms</span>
          </div>
          <SnakeGame />
        </div>

        {/* Right Sidebar - Audio & Visuals */}
        <div className="lg:col-span-3 w-full flex flex-col space-y-6">
          <MusicPlayer />
          
          <div className="p-6 bg-black/80 glitch-border overflow-hidden">
            <h4 className="text-sm font-bold text-[var(--color-neon-yellow)] mb-4 uppercase tracking-[0.2em] border-b border-[var(--color-neon-yellow)]/30 pb-2">
              WAVEFORM_ANALYSIS
            </h4>
            <div className="flex items-end justify-between h-24 space-x-1">
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    height: [
                      Math.random() * 20 + 10, 
                      Math.random() * 80 + 20, 
                      Math.random() * 20 + 10
                    ],
                    backgroundColor: i % 2 === 0 ? '#00f3ff' : '#ff00ff'
                  }}
                  transition={{ repeat: Infinity, duration: 0.3, delay: i * 0.02 }}
                  className="w-full opacity-60"
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mt-16 pt-6 border-t-2 border-[var(--color-neon-cyan)]/20 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-[var(--color-neon-cyan)]/30 uppercase tracking-[0.6em]">
        <div className="mb-4 md:mb-0">© 2026 NEON_GLITCH_OS // [UNAUTHORIZED_DISTRIBUTION_PROHIBITED]</div>
        <div className="flex space-x-8">
          <span className="hover:text-[var(--color-neon-magenta)] cursor-pointer transition-all hover:glitch-text">TERMINATE_SESSION</span>
          <span className="hover:text-[var(--color-neon-cyan)] cursor-pointer transition-all hover:glitch-text">WIPE_MEMORY</span>
        </div>
      </footer>
    </div>
  );
}



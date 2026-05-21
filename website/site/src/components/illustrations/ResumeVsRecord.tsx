"use client";

import { motion } from "motion/react";

export function ResumeVsRecord() {
  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-8 md:flex-row md:items-stretch">
      
      {/* LEFT SIDE: The Old Way (Resume) */}
      <motion.div 
        className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-3xl border border-ink-100 bg-paper-warm/50 p-8 opacity-60 grayscale filter transition-all hover:opacity-80 hover:grayscale-0"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 0.6, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-ink-400">The Past</span>
          <span className="rounded-full bg-ink-100 px-3 py-1 text-xs text-ink-500">Unverified</span>
        </div>
        
        <div className="mt-8 flex flex-col gap-4">
          <div className="h-6 w-3/4 rounded bg-ink-200/50"></div>
          <div className="h-4 w-1/2 rounded bg-ink-200/50"></div>
          
          <div className="mt-6 flex flex-col gap-3">
            <div className="h-2 w-full rounded bg-ink-200/30"></div>
            <div className="h-2 w-[90%] rounded bg-ink-200/30"></div>
            <div className="h-2 w-[85%] rounded bg-ink-200/30"></div>
          </div>
          
          <div className="mt-4 flex gap-2">
            <div className="h-8 w-8 rounded-full bg-ink-200/50"></div>
            <div className="h-8 w-8 rounded-full bg-ink-200/50"></div>
            <div className="h-8 w-8 rounded-full bg-ink-200/50"></div>
          </div>
        </div>

        <div className="mt-12 text-sm text-ink-400">
          "I definitely did all of this work."
        </div>
      </motion.div>

      {/* CENTER: VS Badge */}
      <div className="absolute left-1/2 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink-100 bg-paper shadow-premium-hover md:h-16 md:w-16">
        <span className="font-display text-sm font-medium text-ink-900 md:text-lg">VS</span>
      </div>

      {/* RIGHT SIDE: The New Way (Vero Record) */}
      <motion.div 
        className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-3xl border border-trust/30 bg-ink-950 p-8 shadow-premium-hover"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-trust/10 blur-[80px]"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-trust">The Future</span>
          <span className="flex items-center gap-1.5 rounded-full border border-trust/50 bg-trust/10 px-3 py-1 text-xs text-trust">
            <div className="h-1.5 w-1.5 rounded-full bg-trust shadow-[0_0_8px_rgba(0,255,100,0.8)]"></div>
            Cryptographic Record
          </span>
        </div>
        
        <div className="relative z-10 mt-8 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl border border-ink-800 bg-ink-900"></div>
            <div className="flex flex-col gap-2">
              <div className="h-5 w-32 rounded bg-ink-100"></div>
              <div className="h-3 w-20 rounded bg-ink-700"></div>
            </div>
          </div>
          
          <div className="mt-4 rounded-2xl border border-ink-800 bg-ink-900/50 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-ink-800 pb-3">
              <span className="text-xs text-ink-400">Escrow Value</span>
              <span className="font-mono text-sm font-medium text-ink-100">₹45,000</span>
            </div>
            <div className="flex items-center justify-between pt-3">
              <span className="text-xs text-ink-400">Signatures</span>
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-trust/20 text-[10px] text-trust">✓</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-trust/20 text-[10px] text-trust">✓</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-8 font-mono text-[10px] text-ink-500 break-all">
          hash: 0x8f2d...c9a1
        </div>
      </motion.div>

    </div>
  );
}

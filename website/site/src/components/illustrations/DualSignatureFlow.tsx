"use client";

import { motion } from "motion/react";

export function DualSignatureFlow() {
  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-12 sm:flex-row sm:gap-24">
      
      {/* PHONE 1: The Client */}
      <div className="relative flex h-80 w-48 flex-col items-center rounded-[2rem] border-[6px] border-ink-800 bg-ink-950 p-2 shadow-2xl">
        <div className="h-4 w-16 rounded-full bg-ink-800"></div>
        <div className="mt-4 flex w-full flex-col items-center px-2">
          <span className="text-[10px] font-medium text-ink-400">Client Approval</span>
          <div className="mt-8 flex h-16 w-16 items-center justify-center rounded-full border border-ink-700 bg-ink-900">
            <span className="text-xl">🤝</span>
          </div>
          <p className="mt-4 text-center text-[8px] text-ink-500">
            Work completed as scoped. Releasing funds now.
          </p>
          <motion.div 
            className="mt-8 flex h-10 w-full cursor-default items-center justify-center rounded-full bg-trust/20 text-[10px] font-bold text-trust"
            initial={{ scale: 1 }}
            whileInView={{ scale: [1, 0.95, 1], backgroundColor: ["rgba(0,255,100,0.2)", "rgba(0,255,100,0.5)", "rgba(0,255,100,0.2)"] }}
            transition={{ duration: 0.5, delay: 0.5, repeat: Infinity, repeatDelay: 4 }}
          >
            Sign & Release
          </motion.div>
        </div>
      </div>

      {/* THE CONNECTING BEAM */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[2px] w-32 -translate-x-1/2 -translate-y-1/2 bg-ink-200 sm:w-48">
        <motion.div 
          className="h-full w-full bg-trust shadow-[0_0_12px_rgba(0,255,100,0.8)]"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatDelay: 3.7 }}
        />
      </div>

      {/* PHONE 2: The Professional */}
      <div className="relative flex h-80 w-48 flex-col items-center rounded-[2rem] border-[6px] border-ink-100 bg-paper p-2 shadow-2xl">
        <div className="h-4 w-16 rounded-full bg-ink-100"></div>
        <div className="mt-4 flex w-full flex-col items-center px-2">
          <span className="text-[10px] font-medium text-ink-500">Professional Dashboard</span>
          
          <motion.div 
            className="mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-ink-50"
            initial={{ backgroundColor: "rgb(249 250 251)", borderColor: "rgb(229 231 235)" }}
            whileInView={{ backgroundColor: "rgba(0,255,100,0.1)", borderColor: "rgba(0,255,100,0.5)" }}
            transition={{ duration: 0.3, delay: 1.5, repeat: Infinity, repeatDelay: 4.2 }}
          >
            <motion.span 
              className="text-2xl text-ink-300"
              initial={{ color: "rgb(209 213 219)" }}
              whileInView={{ color: "rgb(0 200 80)" }}
              transition={{ duration: 0.3, delay: 1.5, repeat: Infinity, repeatDelay: 4.2 }}
            >
              ✓
            </motion.span>
          </motion.div>
          
          <p className="mt-4 text-center text-[8px] text-ink-500">
            Awaiting client signature...
          </p>
          
          <motion.div 
            className="mt-8 flex h-10 w-full items-center justify-between rounded-full border border-ink-100 bg-paper-warm px-3 shadow-sm"
            initial={{ y: 0 }}
            whileInView={{ y: -2 }}
            transition={{ duration: 0.3, delay: 1.8, repeat: Infinity, repeatDelay: 4.2 }}
          >
            <span className="text-[10px] font-bold text-ink-900">+ ₹45,000</span>
            <span className="text-[8px] font-medium uppercase text-trust">Verified</span>
          </motion.div>
        </div>
      </div>

    </div>
  );
}

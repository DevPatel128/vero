"use client";

import { motion } from "motion/react";

export function GlassEscrowVault() {
  return (
    <div className="relative mx-auto flex w-full max-w-lg flex-col items-center justify-center py-12">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute left-1/2 top-1/2 -z-20 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-trust/20 blur-[100px]"></div>

      {/* THE VAULT CONTAINER */}
      <div className="relative flex h-64 w-64 flex-col items-center justify-center">
        
        {/* THE COIN (FUNDS) */}
        <motion.div 
          className="absolute z-0 flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#FFD700] bg-gradient-to-br from-[#FFF8D6] to-[#F1C40F] shadow-[0_0_30px_rgba(241,196,15,0.6)]"
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 1 }}
        >
          <span className="font-display text-3xl font-bold text-[#B7950B]">₹</span>
        </motion.div>

        {/* THE GLASS BOX (FRONT) */}
        <motion.div 
          className="absolute z-10 flex h-full w-full flex-col items-center justify-end overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.2)] backdrop-blur-md"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* THE LOCK MECHANISM */}
          <motion.div 
            className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/30 bg-ink-950 shadow-2xl"
            initial={{ borderColor: "rgba(255,255,255,0.3)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
            whileInView={{ borderColor: "rgba(0,255,100,0.8)", boxShadow: "0 0 20px rgba(0,255,100,0.6)" }}
            transition={{ duration: 0.4, delay: 1.5 }}
          >
            <motion.div 
              className="h-6 w-6 rounded border-2 border-ink-400 relative"
              initial={{ borderColor: "rgb(156 163 175)" }} // gray-400
              whileInView={{ borderColor: "rgb(0 255 100)" }} // trust
              transition={{ duration: 0.4, delay: 1.5 }}
            >
              {/* Lock Shackle */}
              <motion.div 
                className="absolute -top-3 left-1/2 h-4 w-4 -translate-x-1/2 rounded-t-full border-2 border-b-0 border-ink-400"
                initial={{ y: 0, borderColor: "rgb(156 163 175)" }}
                whileInView={{ y: -4, borderColor: "rgb(0 255 100)" }}
                transition={{ duration: 0.4, delay: 1.5, type: "spring" }}
              ></motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* TOP LID OF VAULT */}
        <motion.div 
          className="absolute -top-4 z-20 h-8 w-[90%] rounded-full bg-white/20 blur-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>

      {/* STATUS TEXT */}
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <span className="rounded-full border border-trust/30 bg-trust/10 px-4 py-2 text-sm font-semibold tracking-wide text-trust shadow-[0_0_15px_rgba(0,255,100,0.2)]">
          FUNDS SECURED
        </span>
      </motion.div>

    </div>
  );
}

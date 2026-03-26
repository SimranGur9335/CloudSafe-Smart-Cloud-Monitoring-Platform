import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { AlertCircle, Activity, ShieldCheck, Database, X } from "lucide-react";

export default function Card({ title, value, change, isCritical, isWarning, isSuccess }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Simulate data fetching for skeleton effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500 + Math.random() * 1000); // Random offset for organic feel
    return () => clearTimeout(timer);
  }, []);

  // Animated glow colors based on status
  const glowColor = isCritical 
    ? 'rgba(255, 0, 60, 0.4)' 
    : isWarning 
    ? 'rgba(255, 204, 0, 0.4)' 
    : isSuccess 
    ? 'rgba(0, 255, 204, 0.4)'
    : 'rgba(0, 191, 255, 0.4)';

  const borderColor = isCritical 
    ? 'border-neon-red/50' 
    : isWarning 
    ? 'border-neon-yellow/50' 
    : isSuccess 
    ? 'border-neon-cyan/50'
    : 'border-neon-blue/50';

  let Icon = Database;
  if (isCritical) Icon = AlertCircle;
  else if (isWarning) Icon = Activity;
  else if (isSuccess) Icon = ShieldCheck;

  if (isLoading) {
    return (
      <div className={`bg-[#141b2d] rounded-2xl p-5 border border-gray-800/50 overflow-hidden relative`}>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg]"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <div className="flex items-center gap-3 mb-4">
          <div className="w-5 h-5 rounded bg-gray-800"></div>
          <div className="h-4 w-24 rounded bg-gray-800"></div>
        </div>
        <div className="h-8 w-16 rounded bg-gray-700/50 mb-4 mt-2"></div>
        <div className="flex gap-2">
          <div className="h-5 w-12 rounded-full bg-gray-800"></div>
          <div className="h-4 w-20 rounded bg-gray-800/50 self-center"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div 
        className={`relative bg-[#141b2d] rounded-2xl p-5 border ${borderColor} overflow-hidden cursor-pointer group`}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(true)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        animate={isHovered ? { boxShadow: `0 0 20px ${glowColor}, inset 0 0 10px ${glowColor}` } : { boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}
      >
        {/* Ripple/Glow background effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 mix-blend-overlay"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Alert pulsing dot */}
        {isCritical && (
          <span className="absolute top-4 right-4 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-red"></span>
          </span>
        )}
        {isWarning && (
          <span className="absolute top-4 right-4 flex h-3 w-3">
            <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-neon-yellow opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-yellow"></span>
          </span>
        )}
        {isSuccess && (
          <span className="absolute top-4 right-4 h-3 w-3 rounded-full bg-neon-cyan shadow-[0_0_8px_rgba(0,255,204,0.8)]"></span>
        )}
        {!isCritical && !isWarning && !isSuccess && (
          <span className="absolute top-4 right-4 h-3 w-3 rounded-full bg-neon-blue shadow-[0_0_8px_rgba(0,191,255,0.8)]"></span>
        )}

        <div className="flex items-center gap-3 mb-2">
          <Icon className={`w-5 h-5 ${isCritical ? 'text-neon-red' : isWarning ? 'text-neon-yellow' : isSuccess ? 'text-neon-cyan' : 'text-neon-blue'}`} />
          <h3 className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">{title}</h3>
        </div>
        
        <p className="text-3xl font-bold mt-2 text-white tracking-tight">{value}</p>
        
        <div className="mt-3 flex items-center">
          <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${change > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
            {change > 0 ? `+${change}%` : `${change}%`}
          </span>
          <span className="text-xs text-gray-500 ml-2">vs last week</span>
        </div>
      </motion.div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style={{ perspective: "1000px" }}>
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
            />
            
            {/* Modal Content */}
            <motion.div
              className={`relative w-full max-w-lg bg-[#0f1629] border ${borderColor} rounded-2xl shadow-2xl overflow-hidden`}
              initial={{ opacity: 0, rotateX: 20, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{ boxShadow: `0 0 50px ${glowColor}` }}
            >
              <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Icon className={`w-6 h-6 ${isCritical ? 'text-neon-red' : isWarning ? 'text-neon-yellow' : isSuccess ? 'text-neon-cyan' : 'text-neon-blue'}`} />
                  <h2 className="text-xl font-bold text-white tracking-wide">{title} Details</h2>
                </div>
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-full transition-colors group"
                >
                  <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <span className="text-sm font-medium text-gray-400 block mb-1">Current Metric</span>
                    <span className="text-5xl font-bold text-white tracking-tight">{value}</span>
                  </div>
                  <div className={`flex flex-col items-end`}>
                    <span className="text-sm font-medium text-gray-400 block mb-1">Trend</span>
                    <span className={`text-lg font-bold px-3 py-1 rounded-full ${change > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {change > 0 ? `+${change}%` : `${change}%`}
                    </span>
                  </div>
                </div>

                <div className="w-full h-1 bg-gray-800 rounded-full mb-6 overflow-hidden">
                  <motion.div 
                    className={`h-full ${isCritical ? 'bg-neon-red' : isWarning ? 'bg-neon-yellow' : isSuccess ? 'bg-neon-cyan' : 'bg-neon-blue'}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>

                <div className="bg-[#141b2d] rounded-xl p-4 border border-gray-800">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3 border-b border-gray-800 pb-2">Recent Logs</h4>
                  <ul className="space-y-3">
                    {[1, 2, 3].map((item) => (
                      <li key={item} className="flex gap-3 text-sm">
                        <span className="text-gray-500 font-mono text-xs mt-0.5">10:4{item}:00</span>
                        <span className="text-gray-300 flex-1">
                          {isCritical ? "Suspicious activity detected in cluster-0" + item : isWarning ? "CPU usage spiked above 80% on node-" + item : isSuccess ? "Health check passed for region eu-west-" + item : "Log stream batch processed successfully."}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

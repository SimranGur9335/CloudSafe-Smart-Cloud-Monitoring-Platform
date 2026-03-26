import { Home, Settings, BarChart3, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar({ activeTab, setActiveTab }) {
  const menu = [
    { name: "Dashboard", id: "dashboard", icon: <Home /> },
    { name: "Analytics", id: "analytics", icon: <BarChart3 /> },
    { name: "Alerts", id: "alerts", icon: <ShieldAlert /> },
    { name: "Settings", id: "settings", icon: <Settings /> },
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 h-screen bg-[#0b0f19]/90 backdrop-blur-xl p-6 flex flex-col gap-8 border-r border-gray-800/60 shadow-[4px_0_24px_rgba(0,0,0,0.5)] z-50 relative"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-cyan flex items-center justify-center shadow-[0_0_15px_rgba(0,191,255,0.5)]">
          <ShieldAlert className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-cyan drop-shadow-[0_0_8px_rgba(0,191,255,0.4)]">
          CloudSafe
        </h1>
      </div>

      <nav className="flex flex-col gap-2">
        {menu.map((item) => {
          const isActive = activeTab === item.id;
          return (
          <motion.button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            whileHover={{ x: 5, backgroundColor: 'rgba(0, 191, 255, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all border border-transparent hover:border-neon-blue/30 hover:shadow-[0_0_15px_rgba(0,191,255,0.15)] group relative overflow-hidden text-left ${
              isActive ? 'bg-neon-blue/10 border-neon-blue/30 shadow-[0_0_15px_rgba(0,191,255,0.15)]' : 'text-gray-400'
            }`}
          >
            {isActive && (
              <motion.div 
                layoutId="activeTabIndicator"
                className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-neon-blue rounded-r-full shadow-[0_0_10px_rgba(0,191,255,0.8)]"
              />
            )}
            <span className={`relative z-10 ${isActive ? 'text-neon-blue' : 'group-hover:text-neon-blue transition-colors'}`}>
              {item.icon}
            </span>
            <span className={`relative z-10 font-medium ${isActive ? 'text-white' : 'group-hover:text-white transition-colors'}`}>
              {item.name}
            </span>
            
            {/* Ripple effect overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-neon-blue/5 to-neon-blue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
          </motion.button>
        )})}
      </nav>
      
      {/* Dynamic storage/status widget */}
      <div className="mt-auto">
        <div className="bg-[#141b2d] rounded-xl p-4 border border-gray-800">
          <h4 className="text-sm font-medium text-gray-300 mb-2">System Status</h4>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_5px_rgba(0,255,204,0.8)]"></span>
            <span className="text-xs text-gray-400">All services operational</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1.5 mt-3">
            <div className="bg-gradient-to-r from-neon-blue to-neon-cyan h-1.5 rounded-full w-[85%] relative">
               <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_5px_#fff]"></span>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

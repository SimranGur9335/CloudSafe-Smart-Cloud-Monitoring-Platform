import { Bell, UserCircle, Search, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Navbar({ activeTab = "dashboard" }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Unusual login attempt detected", type: "critical", time: "2 min ago", isRead: false },
    { id: 2, message: "Database backup completed", type: "success", time: "1 hour ago", isRead: false },
    { id: 3, message: "New admin user added", type: "info", time: "3 hours ago", isRead: false },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getTitle = () => {
    switch(activeTab) {
      case "analytics": return "Advanced Analytics Engine";
      case "alerts": return "Security Alerts Management";
      case "settings": return "Configuration Panel";
      case "dashboard":
      default: return "Dashboard Overview";
    }
  };

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full flex items-center justify-between bg-[#0f1629]/80 backdrop-blur-md px-6 py-4 border-b border-gray-800 sticky top-0 z-50 rounded-bl-3xl"
    >
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 capitalize">
          {getTitle()}
        </h2>
        <div className="hidden md:flex items-center ml-8 bg-[#141b2d] rounded-full px-4 py-1.5 border border-gray-800 focus-within:border-neon-blue/50 focus-within:shadow-[0_0_10px_rgba(0,191,255,0.2)] transition-all">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search logs..." 
            className="bg-transparent border-none outline-none text-sm text-gray-200 placeholder-gray-500 w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <motion.button
            onClick={() => setShowNotifications(!showNotifications)}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            className="relative cursor-pointer group p-2 rounded-full hover:bg-gray-800/50 transition-colors border-none outline-none"
          >
            <Bell className="w-6 h-6 text-gray-400 group-hover:text-neon-cyan transition-colors" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-cyan"></span>
              </span>
            )}
          </motion.button>
          
          {/* Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-12 w-80 bg-[#141b2d] border border-gray-700 rounded-2xl shadow-2xl overflow-hidden origin-top-right z-50"
              >
                <div className="p-4 border-b border-gray-800 bg-[#0f1629] flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs text-neon-cyan font-medium bg-neon-cyan/10 px-2 py-0.5 rounded-full">{unreadCount} New</span>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <AnimatePresence>
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <motion.div 
                          key={notif.id}
                          initial={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          onClick={() => setNotifications(notifications.map(n => n.id === notif.id ? { ...n, isRead: true } : n))}
                          className={`p-4 border-b border-gray-800/50 hover:bg-white/5 transition-all cursor-pointer group ${notif.isRead ? 'opacity-50 bg-[#0b0f19]/30' : ''}`}
                        >
                          <div className="flex gap-3 items-start">
                            <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${notif.type === 'critical' ? 'bg-neon-red shadow-[0_0_5px_rgba(255,0,60,0.8)]' : notif.type === 'success' ? 'bg-neon-cyan shadow-[0_0_5px_rgba(0,255,204,0.8)]' : 'bg-neon-blue shadow-[0_0_5px_rgba(0,191,255,0.8)]'}`}></div>
                            <div>
                              <p className="text-sm text-gray-200 group-hover:text-white transition-colors">{notif.message}</p>
                              <span className="text-xs text-gray-500 mt-1 block">{notif.time}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="p-8 text-center"
                      >
                        <ShieldAlert className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                        <p className="text-sm text-gray-400">No new notifications</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {notifications.length > 0 && (
                  <div className="flex border-t border-gray-800">
                    <div 
                      onClick={handleMarkAllRead}
                      className="flex-1 p-3 text-center border-r border-gray-800 hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-semibold text-neon-blue">Mark all as read</span>
                    </div>
                    <div 
                      onClick={handleClearAll}
                      className="flex-1 p-3 text-center hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-semibold text-gray-500 hover:text-red-400 transition-colors">Clear All</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer group flex items-center gap-2 bg-[#141b2d] py-1.5 px-3 rounded-full border border-gray-800 hover:border-neon-blue/40 hover:shadow-[0_0_10px_rgba(0,191,255,0.1)] transition-all"
        >
          <UserCircle className="w-6 h-6 text-gray-400 group-hover:text-neon-blue transition-colors" />
          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Admin</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

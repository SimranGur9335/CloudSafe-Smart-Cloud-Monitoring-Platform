import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import ChartCard from "../components/ChartCard";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ActivitySquare, Settings2, ShieldAlert } from "lucide-react";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [expandedAlert, setExpandedAlert] = useState(null);
  const [expandedKey, setExpandedKey] = useState(null);
  const [expandedWebhook, setExpandedWebhook] = useState(null);
  const [settingsView, setSettingsView] = useState(null);
  
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "Production SIEM API", key: "pk_live_8f92bd3a...", type: "Active" },
    { id: 2, name: "Staging Log Ingest", key: "pk_test_1c24fa90...", type: "Dev" }
  ]);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [webhooks, setWebhooks] = useState([
    { id: 1, name: "Slack Alerting Webhook", url: "https://api.cloudsafe.internal/webhooks/slack-integration", status: "200 OK", events: ["critical_alerts", "system_down"] }
  ]);
  const [isAddingWebhook, setIsAddingWebhook] = useState(false);

  const handleGenerateKey = () => {
    setIsGeneratingKey(true);
    setTimeout(() => {
      const newKeyString = "pk_live_" + Math.random().toString(36).substring(2, 10) + "...";
      setApiKeys([{ id: Date.now(), name: "Custom Integration Key", key: newKeyString, type: "Active" }, ...apiKeys]);
      setIsGeneratingKey(false);
    }, 1500);
  };

  const handleAddWebhook = () => {
    setIsAddingWebhook(true);
    setTimeout(() => {
      setWebhooks([{ 
        id: Date.now(), 
        name: "Custom Integration Webhook", 
        url: "https://api.cloudsafe.internal/webhooks/custom-" + Math.floor(Math.random() * 1000), 
        status: "Pending", 
        events: ["all_events"] 
      }, ...webhooks]);
      setIsAddingWebhook(false);
    }, 1500);
  };

  useEffect(() => {
    // Simulate initial scan and loading sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex bg-[#0b0f19] relative min-h-screen">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0b0f19] pointer-events-none z-0"></div>
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-neon-blue rounded-full pointer-events-none"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            opacity: Math.random() * 0.5 + 0.1,
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loader"
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0f19]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Cyber Radar/Progress Loader */}
            <div className="relative w-32 h-32 flex items-center justify-center mb-6">
              <motion.div 
                className="absolute inset-0 rounded-full border-t-2 border-neon-blue shadow-[0_0_20px_rgba(0,191,255,0.6)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-2 rounded-full border-b-2 border-neon-cyan/80 shadow-[0_0_15px_rgba(0,255,204,0.5)]"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-4 rounded-full border-l-2 border-neon-red/60 shadow-[0_0_10px_rgba(255,0,60,0.4)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 rounded-full flex items-center justify-center">
                <span className="text-neon-cyan font-bold tracking-widest text-sm animate-pulse">SCAN</span>
              </div>
            </div>
            <motion.h2 
              className="text-white text-xl font-medium tracking-wide"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              INITIALIZING CLOUDSAFE
            </motion.h2>
            <div className="w-64 h-1 bg-gray-800 rounded-full mt-6 overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-neon-blue to-neon-cyan"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard"
            className="flex w-full z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.2 }}
          >
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 h-screen overflow-y-auto relative"
            >
              <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
              
              <AnimatePresence mode="wait">
                {activeTab === "dashboard" && (
                  <motion.div
                    key="view-dashboard"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <Card title="Critical Alerts" value="12" change={15} isCritical />
                      <Card title="Active Threats" value="3" change={-5} isWarning />
                      <Card title="System Health" value="99.9%" change={0.1} isSuccess />
                      <Card title="Logs Processed" value="1.2M" change={12} />
                    </div>
                    <div className="px-6 pb-6">
                      <ChartCard />
                    </div>
                  </motion.div>
                )}

                {activeTab === "analytics" && (
                  <motion.div
                    key="view-analytics"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 h-[80vh] flex flex-col"
                  >
                    <div className="bg-[#141b2d] rounded-2xl p-8 border border-gray-800 flex-1 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-tr from-neon-blue/5 to-neon-cyan/5 opacity-50"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      />
                      <ActivitySquare className="w-16 h-16 text-neon-blue mb-4 opacity-80" />
                      <h2 className="text-2xl font-bold text-white mb-2 z-10">Advanced Analytics Engine</h2>
                      <p className="text-gray-400 max-w-md z-10">Deep-dive metrics and historical log analysis platform. Connects directly to the SIEM data lake.</p>
                      
                      <motion.button 
                        onClick={() => {
                          const btn = document.getElementById("gen-btn-text");
                          const spinner = document.getElementById("gen-btn-spinner");
                          if(btn && spinner) {
                            btn.innerText = "Processing Data...";
                            spinner.classList.remove("hidden");
                            setTimeout(() => {
                              btn.innerText = "Report Downloaded!";
                              spinner.classList.add("hidden");
                              btn.parentElement.classList.replace("text-neon-blue", "text-neon-cyan");
                              btn.parentElement.classList.replace("border-neon-blue/30", "border-neon-cyan/50");
                              // Simulate a download action
                              const a = document.createElement("a");
                              const file = new Blob(["Simulated Analytics Report Data\n\nTotal Logs: 1.2M\nCritical: 12"], {type: 'text/plain'});
                              a.href = URL.createObjectURL(file);
                              a.download = "CloudSafe_Analytics_Report.txt";
                              a.click();
                              setTimeout(() => {
                                btn.innerText = "Generate Report";
                                btn.parentElement.classList.replace("text-neon-cyan", "text-neon-blue");
                                btn.parentElement.classList.replace("border-neon-cyan/50", "border-neon-blue/30");
                              }, 3000);
                            }, 2000);
                          }
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-8 px-6 py-2 bg-neon-blue/10 text-neon-blue border border-neon-blue/30 rounded-full hover:bg-neon-blue/30 transition-colors z-10 flex items-center justify-center gap-2 cursor-pointer relative"
                      >
                        <motion.div 
                          id="gen-btn-spinner"
                          animate={{ rotate: 360 }} 
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-4 h-4 border-2 border-t-transparent border-current rounded-full hidden"
                        />
                        <span id="gen-btn-text" className="font-medium">Generate Report</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {activeTab === "alerts" && (
                  <motion.div
                    key="view-alerts"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 space-y-4"
                  >
                    {[1, 2, 3, 4].map(i => (
                      <motion.div 
                        layout
                        key={`alert-${i}`} 
                        onClick={() => setExpandedAlert(expandedAlert === i ? null : i)}
                        className={`bg-[#141b2d] p-5 rounded-2xl border transition-all cursor-pointer ${
                          expandedAlert === i 
                            ? 'border-neon-red/50 shadow-[0_0_20px_rgba(255,0,60,0.15)]' 
                            : 'border-gray-800 hover:border-red-500/30 hover:bg-[#1a233a]'
                        }`}
                      >
                        <motion.div layout className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">
                              <ShieldAlert className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className={`font-medium transition-colors ${expandedAlert === i ? 'text-neon-red' : 'text-white'}`}>Unauthorized Access Attempt Blocked</h3>
                              <span className="text-sm text-gray-500 font-mono">IP: 192.168.1.{i * 10} • Port: 22</span>
                            </div>
                          </div>
                          <span className="text-xs text-red-400 font-medium px-3 py-1 bg-red-400/10 rounded-full">High Priority</span>
                        </motion.div>

                        <AnimatePresence>
                          {expandedAlert === i && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 mt-4 border-t border-gray-800 flex flex-col cursor-auto" onClick={(e) => e.stopPropagation()}>
                                <div className="flex gap-6 text-sm text-gray-400 mb-4">
                                  <div><span className="text-gray-500 mr-1">Timestamp:</span> 2026-03-26T18:5{i}:22Z</div>
                                  <div><span className="text-gray-500 mr-1">Method:</span> SSH Brute Force</div>
                                  <div><span className="text-gray-500 mr-1">Target Account:</span> Root</div>
                                </div>
                                
                                <div className="bg-[#0b0f19] p-4 rounded-xl border border-gray-800/80 font-mono text-[13px] leading-relaxed relative overflow-hidden group">
                                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-red/40" />
                                  <p className="text-gray-300">&gt; Incoming connection request from <span className="text-neon-cyan">192.168.1.{i * 10}</span></p>
                                  <p className="text-gray-300">&gt; Auth failure for user 'root' via ssh_protocol_2</p>
                                  <p className="text-gray-300">&gt; <span className="text-neon-red font-semibold">[CRITICAL]</span> IP matched in Global Threat Intelligence DB</p>
                                  <p className="text-neon-cyan mt-2">&gt; Action taken: Connection forcefully dropped & IP temporarily blacklisted for 24h.</p>
                                </div>
                                
                                <div className="mt-5 flex gap-3">
                                  <button onClick={() => {
                                    alert('Alert status updated to Resolved. Syncing with backend SIEM...');
                                    setExpandedAlert(null);
                                  }} className="px-4 py-1.5 text-sm bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/40 hover:bg-neon-cyan hover:text-[#0b0f19] hover:shadow-[0_0_10px_rgba(0,255,204,0.4)] rounded-lg transition-all font-medium">
                                    Acknowledge & Resolve
                                  </button>
                                  <button onClick={() => alert('Firewall rule successfully pushed. IP Permanently Blocked.')} className="px-4 py-1.5 text-sm bg-[#0b0f19] text-gray-400 border border-gray-700 hover:text-white hover:border-gray-500 rounded-lg transition-all font-medium">
                                    Block IP Permanently
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "settings" && (
                  <motion.div
                    key="view-settings"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 h-[80vh] flex flex-col"
                  >
                    <div className="bg-[#141b2d] rounded-2xl p-8 border border-gray-800 flex-1 flex flex-col items-center justify-start text-center overflow-y-auto custom-scrollbar pr-2">
                      <Settings2 className="w-16 h-16 text-gray-400 mb-4 opacity-80 mt-10 shrink-0" />
                      <h2 className="text-2xl font-bold text-white mb-2 relative z-10 shrink-0">Configuration Panel</h2>
                      <p className="text-gray-400 max-w-md relative z-10 shrink-0">Access control routing, webhook integrations, and monitoring thresholds.</p>
                      
                      <div className="mt-8 flex gap-4 w-full justify-center">
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSettingsView(settingsView === 'api' ? null : 'api')}
                          className={`w-36 h-12 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-colors ${
                            settingsView === 'api' ? 'bg-neon-blue/10 border-neon-blue text-neon-blue shadow-[0_0_10px_rgba(0,191,255,0.2)]' : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:border-neon-blue/50 hover:text-neon-blue/80'
                          }`}
                        >
                          <span className="font-medium">API Keys</span>
                        </motion.div>
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSettingsView(settingsView === 'webhooks' ? null : 'webhooks')}
                          className={`w-36 h-12 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-colors ${
                            settingsView === 'webhooks' ? 'bg-neon-cyan/10 border-neon-cyan text-neon-cyan shadow-[0_0_10px_rgba(0,255,204,0.2)]' : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:border-neon-cyan/50 hover:text-neon-cyan/80'
                          }`}
                        >
                          <span className="font-medium">Webhooks</span>
                        </motion.div>
                      </div>

                      <AnimatePresence mode="wait">
                        {settingsView === 'api' && (
                          <motion.div
                            key="api-keys"
                            initial={{ opacity: 0, height: 0, y: -20 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -20 }}
                            className="w-full max-w-2xl mt-8 text-left bg-[#0b0f19] p-6 rounded-xl border border-gray-800/50 shadow-xl shrink-0 mb-10 overflow-visible"
                          >
                            <div className="flex justify-between items-center mb-6">
                              <h3 className="text-white font-medium text-lg">Active API Keys</h3>
                              <motion.button 
                                onClick={handleGenerateKey}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isGeneratingKey}
                                className="px-4 py-1.5 bg-neon-blue/10 text-neon-blue border border-neon-blue/30 rounded-lg text-sm hover:bg-neon-blue hover:text-white transition-colors flex items-center gap-2"
                              >
                                {isGeneratingKey ? (
                                  <>
                                    <motion.div 
                                      animate={{ rotate: 360 }} 
                                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                      className="w-3 h-3 border-2 border-t-transparent border-current rounded-full"
                                    />
                                    Generating...
                                  </>
                                ) : (
                                  "Generate New Key"
                                )}
                              </motion.button>
                            </div>
                            <div className="space-y-4 w-full pb-4">
                              <AnimatePresence>
                                {apiKeys.map(keyData => (
                                  <motion.div 
                                    layout
                                    key={`key-${keyData.id}`}
                                    onClick={() => setExpandedKey(expandedKey === keyData.id ? null : keyData.id)}
                                    className={`bg-gray-800/30 border rounded-lg overflow-hidden cursor-pointer transition-colors ${
                                      expandedKey === keyData.id ? 'border-neon-blue shadow-[0_0_15px_rgba(0,191,255,0.1)] mb-4' : 'border-gray-800 hover:border-gray-600'
                                    }`}
                                  >
                                    <motion.div layout className="flex justify-between items-center p-4">
                                      <div>
                                        <div className="text-gray-300 font-medium">{keyData.name}</div>
                                        <div className="text-gray-500 font-mono text-xs mt-1 transition-all">
                                          {expandedKey === keyData.id ? keyData.key.replace("...", "A9f8XQ12vZnKw0") : keyData.key}
                                        </div>
                                      </div>
                                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                                        keyData.type === 'Active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20'
                                      }`}>
                                        {keyData.type}
                                      </span>
                                    </motion.div>
                                    
                                    <AnimatePresence>
                                      {expandedKey === keyData.id && (
                                        <motion.div 
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          exit={{ opacity: 0, height: 0 }}
                                          className="px-4 pb-4 border-t border-gray-800/50 pt-4 flex flex-col items-start text-left cursor-auto"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <div className="grid grid-cols-2 gap-4 w-full mb-4">
                                            <div>
                                              <span className="text-xs text-gray-500 block">Created</span>
                                              <span className="text-sm text-gray-300">Mar 26, 2026</span>
                                            </div>
                                            <div>
                                              <span className="text-xs text-gray-500 block">Last Used</span>
                                              <span className="text-sm text-green-400">2 mins ago</span>
                                            </div>
                                            <div className="col-span-2">
                                              <span className="text-xs text-gray-500 block mb-1">Permissions</span>
                                              <span className="text-sm flex gap-2">
                                                <span className="px-3 py-1 border border-neon-blue/20 text-neon-blue bg-neon-blue/5 rounded-md text-[11px] font-mono shadow-[0_0_8px_rgba(0,191,255,0.1)]">READ_LOGS</span>
                                                <span className="px-3 py-1 border border-neon-blue/20 text-neon-blue bg-neon-blue/5 rounded-md text-[11px] font-mono shadow-[0_0_8px_rgba(0,191,255,0.1)]">WRITE_EVENTS</span>
                                              </span>
                                            </div>
                                          </div>
                                          
                                          <div className="flex gap-3 mt-4">
                                            <button 
                                              onClick={() => alert("API Key Copied to Clipboard!")}
                                              className="px-4 py-2 bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/40 rounded-lg hover:bg-neon-cyan hover:text-[#0b0f19] text-xs font-medium transition-all shadow-sm"
                                            >
                                              Copy Full Key
                                            </button>
                                            <button 
                                              onClick={() => {
                                                setApiKeys(apiKeys.filter(k => k.id !== keyData.id));
                                                setExpandedKey(null);
                                              }}
                                              className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/40 rounded-lg hover:bg-red-500 hover:text-white text-xs font-medium transition-all shadow-sm"
                                            >
                                              Revoke Key
                                            </button>
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </motion.div>
                                ))}
                              </AnimatePresence>
                            </div>
                          </motion.div>
                        )}
                        {settingsView === 'webhooks' && (
                          <motion.div
                            key="webhooks"
                            initial={{ opacity: 0, height: 0, y: -20 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -20 }}
                            className="w-full max-w-2xl mt-8 text-left bg-[#0b0f19] p-6 rounded-xl border border-gray-800/50 shadow-xl shrink-0 mb-10 overflow-visible"
                          >
                            <div className="flex justify-between items-center mb-6">
                              <h3 className="text-white font-medium text-lg">Webhook Endpoints</h3>
                              <motion.button 
                                onClick={handleAddWebhook}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isAddingWebhook}
                                className="px-4 py-1.5 bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 rounded-lg text-sm hover:bg-neon-cyan hover:text-[#0b0f19] transition-colors flex items-center gap-2 font-medium shadow-[0_0_10px_rgba(0,255,204,0.1)]"
                              >
                                {isAddingWebhook ? (
                                  <>
                                    <motion.div 
                                      animate={{ rotate: 360 }} 
                                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                      className="w-3 h-3 border-2 border-t-transparent border-current rounded-full"
                                    />
                                    Adding...
                                  </>
                                ) : (
                                  "Add Endpoint"
                                )}
                              </motion.button>
                            </div>
                            <div className="space-y-4 w-full pb-4">
                              <AnimatePresence>
                                {webhooks.map(wh => (
                                  <motion.div 
                                    layout
                                    key={`wh-${wh.id}`}
                                    onClick={() => setExpandedWebhook(expandedWebhook === wh.id ? null : wh.id)}
                                    className={`bg-gray-800/30 border rounded-lg overflow-hidden cursor-pointer transition-colors ${
                                      expandedWebhook === wh.id ? 'border-neon-cyan shadow-[0_0_15px_rgba(0,255,204,0.1)] mb-4' : 'border-gray-800 hover:border-gray-600'
                                    }`}
                                  >
                                    <motion.div layout className="flex justify-between items-center p-4">
                                      <div>
                                        <div className="text-gray-300 font-medium">{wh.name}</div>
                                        <div className="text-gray-500 font-mono text-xs mt-1 transition-all">
                                          {expandedWebhook === wh.id ? wh.url : wh.url.substring(0, 40) + '...'}
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2 bg-[#0b0f19] px-3 py-1.5 rounded border border-gray-800">
                                        <span className={`w-2 h-2 rounded-full ${wh.status === '200 OK' ? 'bg-green-500 animate-[pulse_2s_ease-in-out_Infinity]' : 'bg-yellow-500'}`}></span>
                                        <span className={`text-xs font-mono font-medium ${wh.status === '200 OK' ? 'text-green-500' : 'text-yellow-500'}`}>{wh.status}</span>
                                      </div>
                                    </motion.div>
                                    
                                    <AnimatePresence>
                                      {expandedWebhook === wh.id && (
                                        <motion.div 
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          exit={{ opacity: 0, height: 0 }}
                                          className="px-4 pb-4 border-t border-gray-800/50 pt-4 flex flex-col items-start text-left cursor-auto"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <div className="grid grid-cols-2 gap-4 w-full mb-4">
                                            <div>
                                              <span className="text-xs text-gray-500 block mb-1">Failure Rate</span>
                                              <span className="text-sm text-gray-300 font-mono">0.05%</span>
                                            </div>
                                            <div>
                                              <span className="text-xs text-gray-500 block mb-1">Total Invocations</span>
                                              <span className="text-sm text-gray-300 font-mono">4,281</span>
                                            </div>
                                            <div className="col-span-2">
                                              <span className="text-xs text-gray-500 block mb-2">Subscribed Events</span>
                                              <span className="text-sm flex gap-2">
                                                {wh.events.map(ev => (
                                                  <span key={ev} className="px-2 py-0.5 border border-neon-cyan/20 text-neon-cyan bg-neon-cyan/5 rounded text-[10px] uppercase font-mono shadow-[0_0_8px_rgba(0,255,204,0.1)]">{ev}</span>
                                                ))}
                                              </span>
                                            </div>
                                          </div>
                                          
                                          <div className="flex gap-3 mt-4">
                                            <button 
                                              onClick={() => alert("Test payload dispatched successfully. Status 200 Received.")}
                                              className="px-4 py-2 bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/40 rounded-lg hover:bg-neon-cyan hover:text-[#0b0f19] text-xs font-medium transition-all shadow-sm"
                                            >
                                              Test Ping
                                            </button>
                                            <button 
                                              onClick={() => {
                                                setWebhooks(webhooks.filter(w => w.id !== wh.id));
                                                setExpandedWebhook(null);
                                              }}
                                              className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/40 rounded-lg hover:bg-red-500 hover:text-white text-xs font-medium transition-all shadow-sm"
                                            >
                                              Remove Endpoint
                                            </button>
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </motion.div>
                                ))}
                              </AnimatePresence>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

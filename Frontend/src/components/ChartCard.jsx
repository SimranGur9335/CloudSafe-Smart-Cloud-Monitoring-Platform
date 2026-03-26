import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Mon', value: 120 },
  { name: 'Tue', value: 210 },
  { name: 'Wed', value: 160 },
  { name: 'Thu', value: 290 },
  { name: 'Fri', value: 340 },
];

export default function ChartCard() {
  return (
    <motion.div 
      className="bg-[#141b2d] rounded-2xl p-6 border border-gray-800 relative overflow-hidden group"
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="absolute inset-0 bg-transparent pointer-events-none border border-transparent group-hover:border-neon-blue/50 group-hover:shadow-[0_0_15px_rgba(0,191,255,0.2)] rounded-2xl transition-all duration-300"></div>
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-400 group-hover:text-neon-blue transition-colors">Weekly Activity Scan</h3>
        <span className="flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-neon-blue opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-blue"></span>
        </span>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#6b7280" tickLine={false} axisLine={false} />
            <YAxis stroke="#6b7280" tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f1629', borderColor: '#1f2937', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#00bfff' }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#00bfff" 
              strokeWidth={3} 
              dot={{ fill: '#0b0f19', stroke: '#00bfff', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#00bfff', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

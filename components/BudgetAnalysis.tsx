
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const BAR_DATA = [
  { name: '市场营销', total: 500000, used: 325000 },
  { name: '研发', total: 1000000, used: 450000 },
  { name: '行政', total: 200000, used: 185000 },
  { name: '人力', total: 400000, used: 120000 },
];

const PIE_DATA = [
  { name: '已使用', value: 1080000 },
  { name: '剩余额度', value: 1020000 },
];

const COLORS = ['#000000', '#22C55E', '#3B82F6', '#EF4444'];

const BudgetAnalysis: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">预算分析</h3>
          <p className="text-gray-500 mt-1">可视化费用分布与支出趋势，辅助管理决策</p>
        </div>
        <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none">
          <option>全部时期</option>
          <option>Q1 2026</option>
          <option>Q2 2026</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {[
          { label: '总预算', value: '¥2,100,000', color: 'gray-900' },
          { label: '已使用', value: '¥1,080,000', color: 'red-500' },
          { label: '剩余预算', value: '¥1,020,000', color: 'green-600' },
          { label: '平均使用率', value: '51.4%', color: 'gray-900' },
        ].map((item) => (
          <div key={item.label} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <span className={`text-2xl font-black text-${item.color}`}>{item.value}</span>
            <p className="text-sm font-medium text-gray-400 mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
          <h4 className="text-lg font-bold text-gray-900 mb-8">各类别预算分布</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BAR_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="total" fill="#818CF8" name="总预算" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="used" fill="#34D399" name="已使用" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
          <h4 className="text-lg font-bold text-gray-900 mb-8">各类别支出占比</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetAnalysis;

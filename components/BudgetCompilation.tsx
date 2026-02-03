
import React, { useState } from 'react';
import { Plus, Upload, Edit2, Trash2, MoreVertical, X, Download } from 'lucide-react';
import { Budget } from '../types';

const INITIAL_BUDGETS: Budget[] = [
  {
    id: '1',
    name: 'Q1市场推广预算',
    category: '市场营销',
    totalAmount: 500000,
    usedAmount: 325000,
    startDate: '2026-01-01',
    endDate: '2026-03-31',
    status: 'active'
  },
  {
    id: '2',
    name: '研发项目预算',
    category: '研发',
    totalAmount: 1000000,
    usedAmount: 450000,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'active'
  },
  {
    id: '3',
    name: '行政办公费用',
    category: '行政',
    totalAmount: 200000,
    usedAmount: 185000,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'active'
  }
];

const BudgetCompilation: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>(INITIAL_BUDGETS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">2026年度预算</h3>
          <p className="text-gray-500 mt-1">管理并监控全年的部门与项目支出额度</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <Upload size={16} />
            导入预算
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg"
          >
            <Plus size={16} />
            新建预算
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((budget) => {
          const usagePercent = (budget.usedAmount / budget.totalAmount) * 100;
          const isWarning = usagePercent > 80;
          const isDanger = usagePercent >= 95;

          return (
            <div key={budget.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg group-hover:text-black transition-colors">{budget.name}</h4>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{budget.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full uppercase tracking-tighter">活跃</span>
                  <button className="text-gray-300 hover:text-gray-600">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">预算使用情况</span>
                    <span className={`font-bold ${isDanger ? 'text-red-500' : isWarning ? 'text-orange-500' : 'text-gray-900'}`}>
                      {usagePercent.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        isDanger ? 'bg-red-500' : isWarning ? 'bg-orange-500' : 'bg-black'
                      }`}
                      style={{ width: `${usagePercent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 border-t border-gray-50 pt-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">已用</span>
                    <span className="font-bold text-gray-900">¥{budget.usedAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">总额</span>
                    <span className="font-bold text-gray-900">¥{budget.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">剩余</span>
                    <span className="font-bold text-green-600">¥{(budget.totalAmount - budget.usedAmount).toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-mono">{budget.startDate} 至 {budget.endDate}</span>
                  <div className="flex gap-1">
                    <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit2 size={14} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <button 
          onClick={() => setShowCreateModal(true)}
          className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 text-gray-400 hover:border-black hover:text-black transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-gray-100">
            <Plus size={24} />
          </div>
          <span className="font-medium">新建预算项目</span>
        </button>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h4 className="text-xl font-bold text-gray-900">导入Excel预算数据</h4>
              <button onClick={() => setShowImportModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">选择年份</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5">
                  <option>2026年</option>
                  <option>2027年</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">上传Excel文件</label>
                <div className="relative">
                   <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                   <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                     <Upload className="mx-auto text-gray-300 mb-3" size={32} />
                     <p className="text-sm text-gray-500">点击或拖拽文件到此处</p>
                     <p className="text-xs text-gray-400 mt-1">支持 .xlsx 和 .xls 格式</p>
                   </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <h5 className="text-sm font-bold text-gray-900 mb-2">Excel格式要求：</h5>
                <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
                  <li>预算名称：文本</li>
                  <li>预算类别：市场营销/研发/运营/人力资源/行政/其他</li>
                  <li>预算总额：数字</li>
                  <li>开始日期：日期格式 (YYYY-MM-DD)</li>
                  <li>结束日期：日期格式 (YYYY-MM-DD)</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-3 p-6 pt-0">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                <Download size={16} /> 下载模板
              </button>
              <button onClick={() => setShowImportModal(false)} className="flex-1 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg">
                立即导入
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h4 className="text-xl font-bold text-gray-900">新建预算</h4>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">预算名称</label>
                <input type="text" placeholder="输入预算项目名称" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">预算类别</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5">
                  <option>选择类别</option>
                  <option>市场营销</option>
                  <option>研发</option>
                  <option>行政</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">预算总额 (元)</label>
                <input type="number" placeholder="0.00" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">开始日期</label>
                  <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">结束日期</label>
                  <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 pt-0">
              <button onClick={() => setShowCreateModal(false)} className="px-6 py-2.5 border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50">
                取消
              </button>
              <button onClick={() => setShowCreateModal(false)} className="px-8 py-2.5 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 shadow-lg">
                创建
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetCompilation;


import React, { useState } from 'react';
import { Plus, Check, X, Clock, FileText, User, CreditCard } from 'lucide-react';
import { ExpenseApplication as ExpenseType } from '../types';

const INITIAL_APPS: ExpenseType[] = [
  {
    id: 'APP001',
    date: '2026-02-01',
    budgetName: 'Q1市场推广预算',
    applicant: '张三',
    amount: 50000,
    description: '线上广告投放费用',
    status: 'pending'
  },
  {
    id: 'APP002',
    date: '2026-02-05',
    budgetName: '行政办公费用',
    applicant: '李四',
    amount: 12000,
    description: '季度办公用品采购',
    status: 'approved'
  }
];

const ExpenseApplication: React.FC = () => {
  const [apps, setApps] = useState<ExpenseType[]>(INITIAL_APPS);

  const stats = [
    { label: '总申请数', value: apps.length, color: 'blue' },
    { label: '待审批', value: apps.filter(a => a.status === 'pending').length, color: 'orange' },
    { label: '已批准', value: apps.filter(a => a.status === 'approved').length, color: 'green' },
    { label: '已拒绝', value: apps.filter(a => a.status === 'rejected').length, color: 'red' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">预算申请</h3>
          <p className="text-gray-500 mt-1">提交并审核费用支出申请，确保资金合规使用</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-lg">
          <Plus size={20} />
          新建申请
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-black text-gray-900">{stat.value}</span>
            </div>
            <p className="text-sm font-medium text-gray-400">{stat.label}</p>
            <div className={`mt-4 h-1 w-12 rounded-full bg-${stat.color}-500`}></div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h4 className="font-bold text-gray-900">申请列表</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                <th className="px-6 py-4">申请日期</th>
                <th className="px-6 py-4">预算项目</th>
                <th className="px-6 py-4">申请人</th>
                <th className="px-6 py-4 text-right">申请金额</th>
                <th className="px-6 py-4">说明</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {apps.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-600">{app.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-900">{app.budgetName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <User size={12} className="text-gray-400" />
                      </div>
                      <span className="text-sm text-gray-600">{app.applicant}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-black text-gray-900">¥{app.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500 line-clamp-1">{app.description}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {app.status === 'pending' && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold rounded-full">
                          <Clock size={10} /> 待审批
                        </span>
                      )}
                      {app.status === 'approved' && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full">
                          <Check size={10} /> 已批准
                        </span>
                      )}
                      {app.status === 'rejected' && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded-full">
                          <X size={10} /> 已拒绝
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {app.status === 'pending' && (
                        <>
                          <button className="px-3 py-1.5 bg-white border border-gray-200 text-xs font-bold text-gray-900 rounded-lg hover:bg-gray-50">批准</button>
                          <button className="px-3 py-1.5 bg-white border border-gray-200 text-xs font-bold text-gray-900 rounded-lg hover:bg-gray-50">拒绝</button>
                        </>
                      )}
                      <button className="p-1.5 text-gray-400 hover:text-black">
                        <FileText size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseApplication;


import React, { useState } from 'react';
import { Settings, CheckCircle, AlertCircle, ShieldAlert, Plus, Edit3, Trash2, X, Save } from 'lucide-react';
import { Strategy } from '../types';

const INITIAL_STRATEGIES: Strategy[] = [
  {
    id: 'S001',
    title: '不管控的指标',
    isActive: false,
    controlMethod: 'absdata - 绝对额',
    controlIntensity: 'forbid - 禁止',
    scope: 'pdc - 当月',
    businessDocs: ['报账-费用申请', '报账-费... +2'],
    indicators: ['工资', '奖金', '津贴及补贴', '社.'],
    organization: '集团总部'
  },
  {
    id: 'S002',
    title: '资本化支出控制策略',
    isActive: true,
    controlMethod: 'absdata - 绝对额',
    controlIntensity: 'forbid - 禁止',
    scope: 'ytd - 年累计',
    businessDocs: ['报账-费用申请'],
    indicators: ['资本支出'],
    organization: '研发中心'
  },
  {
    id: 'S003',
    title: '联调测试策略',
    isActive: true,
    controlMethod: 'absdata - 绝对额',
    controlIntensity: 'forbid - 禁止',
    scope: 'pdc - 当月',
    businessDocs: ['报账-费用申请', '报账-费... +2'],
    indicators: ['软件服务费'],
    organization: '各事业部'
  }
];

const ControlStrategy: React.FC = () => {
  const [strategies, setStrategies] = useState<Strategy[]>(INITIAL_STRATEGIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStrategy, setEditingStrategy] = useState<Strategy | null>(null);

  // Form states
  const [formData, setFormData] = useState<Partial<Strategy>>({});

  const handleToggle = (id: string) => {
    setStrategies(prev => prev.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除此控制策略吗？')) {
      setStrategies(prev => prev.filter(s => s.id !== id));
    }
  };

  const openModal = (strategy: Strategy | null = null) => {
    if (strategy) {
      setEditingStrategy(strategy);
      setFormData(strategy);
    } else {
      setEditingStrategy(null);
      setFormData({
        isActive: true,
        controlMethod: 'absdata - 绝对额',
        controlIntensity: 'forbid - 禁止',
        scope: 'pdc - 当月',
        businessDocs: [],
        indicators: []
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.title) return alert('请输入策略标题');

    if (editingStrategy) {
      setStrategies(prev => prev.map(s => 
        s.id === editingStrategy.id ? { ...s, ...formData } as Strategy : s
      ));
    } else {
      const newStrategy: Strategy = {
        ...formData,
        id: `S00${strategies.length + 1}`,
        isActive: formData.isActive ?? true,
        businessDocs: formData.businessDocs ?? [],
        indicators: formData.indicators ?? [],
        organization: formData.organization ?? '全部',
      } as Strategy;
      setStrategies(prev => [...prev, newStrategy]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-4 border-l-4 border-indigo-500 pl-6 py-2">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">控制策略 - Control Strategy</h3>
            <p className="text-gray-500 mt-1">灵活配置不同维度的费用控制规则，支持刚性拦截或柔性预警。</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
        <h4 className="font-bold text-gray-700 ml-4">控制策略清单 ({strategies.length})</h4>
        <div className="flex gap-2">
           <button 
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
           >
             <Plus size={18} />
             <span className="text-sm font-semibold">新增策略</span>
           </button>
           <button className="px-4 py-2 bg-white border border-gray-200 text-sm font-semibold text-gray-600 rounded-lg hover:bg-gray-50">
             发布全部
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {strategies.map((s) => (
          <div key={s.id} className={`bg-white border rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative group flex flex-col ${!s.isActive ? 'border-gray-100 opacity-75' : 'border-indigo-100'}`}>
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h5 className="font-bold text-gray-900 pr-8 line-clamp-2">{s.title}</h5>
                <span className="text-[10px] text-gray-400 font-mono mt-1 block">{s.id} · {s.organization}</span>
              </div>
              <div className="flex gap-1 absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => openModal(s)}
                  className="p-1.5 bg-gray-50 text-gray-400 hover:text-indigo-600 rounded-lg transition-colors"
                >
                  <Edit3 size={14} />
                </button>
                <button 
                  onClick={() => handleDelete(s.id)}
                  className="p-1.5 bg-gray-50 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 font-medium">策略启用状态</span>
                <button 
                  onClick={() => handleToggle(s.id)}
                  className={`w-10 h-5 rounded-full relative transition-all duration-300 ${s.isActive ? 'bg-indigo-500 shadow-inner' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 ${s.isActive ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50/50 p-2 rounded-xl">
                  <p className="text-[9px] text-gray-400 mb-1 uppercase tracking-wider">控制方法</p>
                  <span className="text-[10px] font-bold text-gray-700 truncate block">{s.controlMethod.split(' - ')[1]}</span>
                </div>
                <div className="bg-gray-50/50 p-2 rounded-xl">
                  <p className="text-[9px] text-gray-400 mb-1 uppercase tracking-wider">控制强度</p>
                  <span className={`text-[10px] font-bold block ${s.controlIntensity.includes('禁止') ? 'text-red-500' : 'text-orange-500'}`}>
                    {s.controlIntensity.split(' - ')[1]}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-gray-50">
                 <div className="flex flex-wrap gap-1">
                    <p className="w-full text-[10px] text-gray-400 font-medium">控制范围</p>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full">{s.scope}</span>
                 </div>
                 
                 <div className="flex flex-wrap gap-1">
                    <p className="w-full text-[10px] text-gray-400 font-medium">业务单据</p>
                    {s.businessDocs.slice(0, 2).map((doc, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded truncate max-w-[100px]">{doc}</span>
                    ))}
                    {s.businessDocs.length > 2 && <span className="text-[10px] text-gray-400">+{s.businessDocs.length - 2}</span>}
                 </div>

                 <div className="flex flex-wrap gap-1">
                    <p className="w-full text-[10px] text-gray-400 font-medium">管控指标</p>
                    {s.indicators.slice(0, 3).map((ind, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded truncate max-w-[80px]">{ind}</span>
                    ))}
                    {s.indicators.length > 3 && <span className="text-[10px] text-gray-400">...</span>}
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Configuration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-2xl shadow-2xl animate-in zoom-in duration-200 overflow-hidden">
            <div className="flex justify-between items-center p-8 border-b border-gray-100 bg-gray-50/50">
              <div>
                <h4 className="text-xl font-bold text-gray-900">{editingStrategy ? '维护控制策略' : '配置新策略'}</h4>
                <p className="text-sm text-gray-500">定义费用预算的管控逻辑与强度</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-gray-900">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 grid grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">策略标题</label>
                <input 
                  type="text" 
                  value={formData.title || ''}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="如：Q1差旅费刚性管控策略" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">管控组织</label>
                <select 
                  value={formData.organization || ''}
                  onChange={e => setFormData({...formData, organization: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                >
                  <option value="集团总部">集团总部</option>
                  <option value="研发中心">研发中心</option>
                  <option value="各事业部">各事业部</option>
                  <option value="销售大区">销售大区</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">控制强度</label>
                <select 
                   value={formData.controlIntensity || ''}
                   onChange={e => setFormData({...formData, controlIntensity: e.target.value})}
                   className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                >
                  <option value="forbid - 禁止">forbid - 禁止 (刚性)</option>
                  <option value="warn - 预警">warn - 预警 (柔性)</option>
                  <option value="ignore - 提示">ignore - 提示 (仅记录)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">管控方法</label>
                <select 
                  value={formData.controlMethod || ''}
                  onChange={e => setFormData({...formData, controlMethod: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                >
                  <option value="absdata - 绝对额">absdata - 绝对额</option>
                  <option value="percent - 百分比">percent - 超额百分比</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">管控范围</label>
                <select 
                  value={formData.scope || ''}
                  onChange={e => setFormData({...formData, scope: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                >
                  <option value="pdc - 当月">pdc - 当月</option>
                  <option value="ytd - 年累计">ytd - 年累计</option>
                  <option value="qtd - 季累计">qtd - 季累计</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">业务单据关联</label>
                <div className="flex flex-wrap gap-2 p-4 bg-gray-50 border border-gray-200 rounded-2xl min-h-[60px]">
                  {['费用报销单', '差旅申请单', '借款单', '采购申请单'].map(doc => (
                    <button 
                      key={doc}
                      onClick={() => {
                        const current = formData.businessDocs || [];
                        const next = current.includes(doc) ? current.filter(d => d !== doc) : [...current, doc];
                        setFormData({...formData, businessDocs: next});
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        (formData.businessDocs || []).includes(doc) 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-300'
                      }`}
                    >
                      {doc}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="col-span-2 flex items-center gap-3">
                <button 
                  onClick={() => setFormData({...formData, isActive: !formData.isActive})}
                  className={`w-12 h-6 rounded-full relative transition-all ${formData.isActive ? 'bg-indigo-600' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.isActive ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </button>
                <span className="text-sm font-bold text-gray-700">立即激活该策略</span>
              </div>
            </div>

            <div className="flex gap-3 p-8 bg-gray-50/50 border-t border-gray-100">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 border border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-white transition-all"
              >
                取消
              </button>
              <button 
                onClick={handleSave}
                className="flex-1 py-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <Save size={18} />
                保存配置
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlStrategy;

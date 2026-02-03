
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Send, 
  TrendingUp, 
  BarChart3, 
  Settings, 
  Plus, 
  Upload, 
  Search,
  ChevronRight,
  User,
  Bell,
  Sparkles
} from 'lucide-react';
import { NavItem } from './types';
import BudgetCompilation from './components/BudgetCompilation';
import ExpenseApplication from './components/ExpenseApplication';
import BudgetAnalysis from './components/BudgetAnalysis';
import ControlStrategy from './components/ControlStrategy';
import GeminiAssistant from './components/GeminiAssistant';

const App: React.FC = () => {
  const [activeNav, setActiveNav] = useState<NavItem>(NavItem.BUDGET_COMPILATION);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const navItems = [
    { id: NavItem.BUDGET_COMPILATION, label: '预算编制', icon: LayoutDashboard },
    { id: NavItem.EXPENSE_APPLICATION, label: '预算申请', icon: Send },
    { id: NavItem.BUDGET_OCCUPANCY, label: '预算占用', icon: TrendingUp },
    { id: NavItem.BUDGET_ANALYSIS, label: '预算分析', icon: BarChart3 },
    { id: NavItem.CONTROL_STRATEGY, label: '控制策略', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeNav) {
      case NavItem.BUDGET_COMPILATION:
        return <BudgetCompilation />;
      case NavItem.EXPENSE_APPLICATION:
        return <ExpenseApplication />;
      case NavItem.BUDGET_ANALYSIS:
        return <BudgetAnalysis />;
      case NavItem.CONTROL_STRATEGY:
        return <ControlStrategy />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <LayoutDashboard size={48} className="mb-4 opacity-20" />
            <p>模块正在开发中...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F8F9FA]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
            <LayoutDashboard className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">预算控制系统</h1>
            <p className="text-xs text-gray-400">费用管理平台</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                activeNav === item.id 
                  ? 'bg-black text-white shadow-lg' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <item.icon size={18} className={activeNav === item.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'} />
              <span className="font-medium text-sm">{item.label}</span>
              {activeNav === item.id && <ChevronRight size={14} className="ml-auto opacity-50" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => setIsAssistantOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
          >
            <Sparkles size={18} />
            <span className="text-sm font-semibold">AI 助手</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
          <h2 className="text-xl font-bold text-gray-800">
            {navItems.find(i => i.id === activeNav)?.label}
          </h2>
          
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="搜索资源、申请或策略..." 
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black/5 w-64 transition-all"
              />
            </div>
            
            <button className="relative text-gray-500 hover:text-gray-800">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">张三</p>
                <p className="text-xs text-gray-400">财务总监</p>
              </div>
              <div className="w-9 h-9 bg-gray-200 rounded-full overflow-hidden">
                <img src="https://picsum.photos/seed/finance/100/100" alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Section */}
        <div className="flex-1 overflow-y-auto p-8">
          {renderContent()}
        </div>
      </main>

      {/* Gemini AI Floating Assistant */}
      <GeminiAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </div>
  );
};

export default App;

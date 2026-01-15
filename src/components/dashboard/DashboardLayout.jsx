import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { LayoutDashboard, Bot, BarChart3, Settings, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function DashboardLayout({ children, currentTab, setCurrentTab, user, isKA }) {
    const merchantMenuItems = [
        { icon: ShoppingBag, label: 'AI员工市场', tab: 'marketplace' },
        {
            label: '我的',
            items: [
                { icon: LayoutDashboard, label: '总览', tab: 'overview' },
                { icon: Bot, label: '我的AI员工', tab: 'agents' },
                { icon: Settings, label: '设置', tab: 'settings' }
            ]
        },
        { icon: BarChart3, label: '数据报表', tab: 'analytics' }
    ];

    const kaMenuItems = [
        { icon: LayoutDashboard, label: '总览', tab: 'overview' },
        { icon: Bot, label: '我的智能体', tab: 'agents' },
        { icon: BarChart3, label: '数据报表', tab: 'analytics' },
        { icon: Settings, label: '设置', tab: 'settings' }
    ];

    const menuItems = isKA ? kaMenuItems : merchantMenuItems;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Left Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-gray-100">
                    <Link to={createPageUrl('Home')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold">AI</span>
                        </div>
                        <span className="font-semibold text-gray-900">智能体市场</span>
                    </Link>
                </div>

                {/* User Info */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-indigo-100 text-indigo-600">
                                {user?.full_name?.[0] || 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">
                                {user?.company_name || user?.full_name || '用户'}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                                {user?.email}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item, idx) => (
                        item.items ? (
                            <div key={idx} className="space-y-2">
                                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-4 pt-4 pb-2">{item.label}</h3>
                                {item.items.map((subItem) => (
                                    <button
                                        key={subItem.tab}
                                        onClick={() => setCurrentTab(subItem.tab)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                            currentTab === subItem.tab
                                                ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
                                                : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        <subItem.icon className="w-5 h-5" />
                                        <span className="font-medium">{subItem.label}</span>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <button
                                key={item.tab}
                                onClick={() => setCurrentTab(item.tab)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                    currentTab === item.tab
                                        ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        )
                    ))}
                </nav>

                {/* Back Button */}
                <div className="p-4 border-t border-gray-100">
                    <Link
                        to={createPageUrl('Home')}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="font-medium">返回首页</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-100 h-20 flex items-center px-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {currentTab === 'marketplace' ? 'AI员工市场' : 
                             currentTab === 'overview' ? '总览' : 
                             currentTab === 'agents' ? '我的AI员工' :
                             currentTab === 'analytics' ? '数据报表' :
                             currentTab === 'settings' ? '设置' :
                             isKA ? '运营看板' : '我的工作台'}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {currentTab === 'marketplace' ? '探索并雇佣最适合您业务的AI员工' : 
                             currentTab === 'overview' ? '查看所有关键指标和工作台数据' : 
                             currentTab === 'agents' ? '管理您已雇佣的AI员工' :
                             currentTab === 'analytics' ? '深度数据分析和洞察' :
                             currentTab === 'settings' ? '账户和偏好设置' :
                             isKA ? '查看所有工作台的运营数据和AI工作成果' : '管理您的智能体和市场'}
                        </p>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
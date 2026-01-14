import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { 
    LayoutDashboard, Bot, Users, BarChart3, 
    Settings, HelpCircle, LogOut, ChevronLeft, Menu, ShoppingBag
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
    { icon: LayoutDashboard, label: '总览', page: 'Dashboard' },
    { icon: ShoppingBag, label: 'AI人才市场', page: 'Dashboard', tab: 'marketplace' },
    { icon: Bot, label: '我的智能体', page: 'Dashboard', tab: 'agents' },
    { icon: BarChart3, label: '数据报表', page: 'Dashboard', tab: 'analytics' },
    { icon: Settings, label: '设置', page: 'Dashboard', tab: 'settings' }
];

export default function DashboardSidebar({ 
    collapsed, 
    setCollapsed, 
    currentTab,
    setCurrentTab,
    clientInfo 
}) {
    return (
        <>
            {/* Desktop Sidebar */}
            <div className={cn(
                "hidden lg:flex flex-col bg-[#0A1628] text-white transition-all duration-300",
                collapsed ? "w-20" : "w-64"
            )}>
                {/* Header */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        {!collapsed && (
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                    <span className="font-bold">AI</span>
                                </div>
                                <span className="font-semibold">控制台</span>
                            </div>
                        )}
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <ChevronLeft className={cn(
                                "w-5 h-5 transition-transform",
                                collapsed && "rotate-180"
                            )} />
                        </button>
                    </div>
                </div>

                {/* Client Info */}
                {clientInfo && !collapsed && (
                    <div className="p-4 mx-4 mt-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-xs text-gray-400 mb-1">当前客户</div>
                        <div className="font-medium truncate">{clientInfo.name}</div>
                        <div className="text-xs text-gray-400 mt-1">
                            {clientInfo.type === 'ka' ? 'KA客户' : '商家'}
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <nav className="flex-grow p-4 space-y-2">
                    {navItems.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentTab(item.tab || 'overview')}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                                currentTab === (item.tab || 'overview')
                                    ? "bg-indigo-500/20 text-indigo-400"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            {!collapsed && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-white/10 space-y-2">
                    <Link
                        to={createPageUrl('Home')}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        {!collapsed && <span>返回首页</span>}
                    </Link>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0A1628] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <span className="font-bold text-sm">AI</span>
                    </div>
                    <span className="font-semibold">控制台</span>
                </div>
                <Button variant="ghost" size="icon" className="text-white">
                    <Menu className="w-5 h-5" />
                </Button>
            </div>
        </>
    );
}
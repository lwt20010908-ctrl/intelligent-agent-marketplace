import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Bell, Search, User, Calendar, ArrowLeft, Lock, LayoutDashboard, Bot, BarChart3, Settings, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import StatsOverview from '../components/dashboard/StatsOverview';
import WorkspaceList from '../components/dashboard/WorkspaceList';
import MarketplaceContent from '../components/marketplace/MarketplaceContent';

export default function Dashboard() {
    const [currentTab, setCurrentTab] = useState('overview');
    const [user, setUser] = useState(null);
    const [kaPassword, setKaPassword] = useState('');
    const [isKaAuthenticated, setIsKaAuthenticated] = useState(false);

    useEffect(() => {
        base44.auth.me().then(setUser).catch(() => {});
    }, []);

    const isKA = user?.client_type === 'ka';

    const { data: workspaces = [], isLoading: workspacesLoading } = useQuery({
        queryKey: ['workspaces'],
        queryFn: () => base44.entities.Workspace.list(),
        enabled: !!user
    });

    const { data: hires = [] } = useQuery({
        queryKey: ['hires'],
        queryFn: () => base44.entities.Hire.list(),
        enabled: !!user && !isKA
    });

    const clientInfo = { name: user?.company_name || user?.full_name, type: user?.client_type };

    const getMenuItems = () => {
        const baseItems = [
            { icon: LayoutDashboard, label: '总览', tab: 'overview' },
            { icon: Bot, label: '我的智能体', tab: 'agents' },
            { icon: BarChart3, label: '数据报表', tab: 'analytics' },
            { icon: Settings, label: '设置', tab: 'settings' }
        ];
        if (!isKA) {
            return [
                { icon: LayoutDashboard, label: '总览', tab: 'overview' },
                { icon: ShoppingBag, label: 'AI人才市场', tab: 'marketplace' },
                ...baseItems.slice(1)
            ];
        }
        return baseItems;
    };
    const menuItems = getMenuItems();

    // KA authentication check
    if (isKA && !isKaAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                        KA客户验证
                    </h2>
                    <p className="text-gray-500 text-center mb-8">
                        请输入访问密码以继续
                    </p>
                    <div className="space-y-4">
                        <Input
                            type="password"
                            placeholder="请输入密码"
                            value={kaPassword}
                            onChange={(e) => setKaPassword(e.target.value)}
                            className="h-12"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && kaPassword === 'KAdemo') {
                                    setIsKaAuthenticated(true);
                                }
                            }}
                        />
                        <Button
                            onClick={() => {
                                if (kaPassword === 'KAdemo') {
                                    setIsKaAuthenticated(true);
                                } else {
                                    alert('密码错误，请重试 (提示: KAdemo)');
                                }
                            }}
                            className="w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-600"
                        >
                            验证并进入
                        </Button>
                        <p className="text-xs text-gray-400 text-center mt-4">
                            Demo密码: KAdemo
                        </p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <Link
                            to={createPageUrl('Home')}
                            className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            返回首页
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <div className="flex-grow">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-100 p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                to={createPageUrl('Home')}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {isKA ? '运营看板' : '控制台'}
                                </h1>
                                <p className="text-gray-500 text-sm mt-1">
                                    {isKA 
                                        ? '查看所有工作台的运营数据和AI工作成果' 
                                        : '管理您的智能体和工作台'
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:block relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="搜索..."
                                    className="pl-10 w-64 bg-gray-50 border-0"
                                />
                            </div>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="w-5 h-5 text-gray-500" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="focus:outline-none">
                                        <Avatar className="cursor-pointer">
                                            <AvatarFallback className="bg-indigo-100 text-indigo-600">
                                                {user?.full_name?.[0] || 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <div className="px-2 py-2 text-sm">
                                        <div className="font-medium text-gray-900">{user?.full_name || '用户'}</div>
                                        <div className="text-xs text-gray-500">{user?.email}</div>
                                    </div>
                                    <DropdownMenuSeparator />
                                    {menuItems.map((item) => (
                                        <DropdownMenuItem
                                            key={item.tab}
                                            onClick={() => setCurrentTab(item.tab)}
                                            className={currentTab === item.tab ? 'bg-indigo-50 text-indigo-600' : ''}
                                        >
                                            <item.icon className="w-4 h-4 mr-2" />
                                            {item.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-4 lg:p-8">
                    {currentTab === 'marketplace' && !isKA && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <MarketplaceContent />
                                </motion.div>
                            )}

                    {currentTab === 'overview' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-8"
                        >
                            {/* Stats */}
                            <StatsOverview workspaces={workspaces} />

                            {/* Workspaces */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {isKA ? '工作台总览' : '我的工作台'}
                                    </h2>
                                    {isKA && (
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="w-4 h-4" />
                                            最近30天数据
                                        </div>
                                    )}
                                </div>
                                <WorkspaceList 
                                    workspaces={workspaces} 
                                    isLoading={workspacesLoading}
                                />
                            </div>

                            {/* Recently Hired Agents */}
                            {!isKA && hires.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">最近雇佣的智能体</h2>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {hires.slice(0, 3).map((hire, i) => (
                                            <motion.div
                                                key={hire.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100"
                                            >
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">{hire.agent_name}</h3>
                                                        <p className="text-sm text-gray-500 mt-1">{hire.merchant_name}</p>
                                                    </div>
                                                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                        hire.status === 'active' ? 'bg-green-100 text-green-700' :
                                                        hire.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-gray-100 text-gray-700'
                                                    }`}>
                                                        {hire.status === 'active' ? '运行中' : 
                                                         hire.status === 'pending' ? '待审核' : hire.status}
                                                    </div>
                                                </div>
                                                <div className="space-y-3 pt-4 border-t border-gray-100">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-500">套餐</span>
                                                        <span className="font-medium text-gray-900">
                                                            {hire.plan_type === 'monthly' ? '月度' : '年度'}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-500">费用</span>
                                                        <span className="font-medium text-indigo-600">¥{hire.amount}</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* KA-specific: Activity Log */}
                            {isKA && (
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                                        最近动态
                                    </h2>
                                    <div className="bg-white rounded-2xl p-6 shadow-md">
                                        <div className="space-y-4">
                                            {[
                                                { time: '10分钟前', action: '华为客服智能体处理了一次复杂投诉', type: 'success' },
                                                { time: '1小时前', action: '销售助手成功转化3个潜在客户', type: 'success' },
                                                { time: '2小时前', action: '系统自动更新了知识库', type: 'info' },
                                                { time: '今天 09:00', action: '日报已生成并发送给运营团队', type: 'info' }
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                                                    <div className={`w-2 h-2 rounded-full ${
                                                        item.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                                                    }`} />
                                                    <span className="text-sm text-gray-500 w-24">{item.time}</span>
                                                    <span className="text-sm text-gray-700">{item.action}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {currentTab === 'agents' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-6">我的智能体</h2>
                            {hires.length === 0 ? (
                                <div className="bg-white rounded-2xl p-12 text-center shadow-md">
                                    <p className="text-gray-500 mb-4">您还没有雇佣任何智能体</p>
                                    <Button className="bg-gradient-to-r from-indigo-500 to-purple-600">
                                        前往市场
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {hires.map((hire, i) => (
                                        <div key={hire.id} className="bg-white rounded-2xl p-6 shadow-md">
                                            <h3 className="font-semibold text-gray-900 mb-2">{hire.agent_name}</h3>
                                            <p className="text-sm text-gray-500">状态: {hire.status}</p>
                                            <p className="text-sm text-gray-500">套餐: {hire.plan_type === 'monthly' ? '月度' : '年度'}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {currentTab === 'analytics' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white rounded-2xl p-12 text-center shadow-md"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-4">数据报表</h2>
                            <p className="text-gray-500">详细的数据分析报表即将上线</p>
                        </motion.div>
                    )}

                    {currentTab === 'settings' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white rounded-2xl p-12 text-center shadow-md"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-4">设置</h2>
                            <p className="text-gray-500">账户和偏好设置即将上线</p>
                        </motion.div>
                    )}
                </main>
            </div>
        </div>
    );
}
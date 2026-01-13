import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Bell, Search, User, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import StatsOverview from '../components/dashboard/StatsOverview';
import WorkspaceList from '../components/dashboard/WorkspaceList';

export default function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const [currentTab, setCurrentTab] = useState('overview');
    const [user, setUser] = useState(null);

    useEffect(() => {
        base44.auth.me().then(setUser).catch(() => {});
    }, []);

    const { data: workspaces = [], isLoading: workspacesLoading } = useQuery({
        queryKey: ['workspaces'],
        queryFn: () => base44.entities.Workspace.list()
    });

    const { data: hires = [] } = useQuery({
        queryKey: ['hires'],
        queryFn: () => base44.entities.Hire.list()
    });

    // Determine client type from workspaces
    const clientInfo = workspaces.length > 0 
        ? { name: workspaces[0].client_name, type: workspaces[0].client_type }
        : null;

    const isKA = clientInfo?.type === 'ka';

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <DashboardSidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                clientInfo={clientInfo}
            />

            {/* Main Content */}
            <div className="flex-grow lg:ml-0 pt-16 lg:pt-0">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-100 p-4 lg:p-6">
                    <div className="flex items-center justify-between">
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
                            <Avatar>
                                <AvatarFallback className="bg-indigo-100 text-indigo-600">
                                    {user?.full_name?.[0] || 'U'}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-4 lg:p-8">
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
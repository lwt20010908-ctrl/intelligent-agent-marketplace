import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { 
    ArrowLeft, Bot, MessageSquare, BarChart3, Clock, 
    TrendingUp, Users, Zap, Activity, CheckCircle2,
    PlayCircle, PauseCircle, Settings
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

// Mock data for charts
const conversationData = [
    { date: '周一', count: 120 },
    { date: '周二', count: 180 },
    { date: '周三', count: 150 },
    { date: '周四', count: 220 },
    { date: '周五', count: 280 },
    { date: '周六', count: 190 },
    { date: '周日', count: 160 }
];

const categoryData = [
    { name: '售前咨询', value: 35, color: '#6366F1' },
    { name: '售后服务', value: 28, color: '#8B5CF6' },
    { name: '订单查询', value: 22, color: '#EC4899' },
    { name: '投诉建议', value: 15, color: '#F59E0B' }
];

export default function MerchantWorkspace() {
    const urlParams = new URLSearchParams(window.location.search);
    const workspaceId = urlParams.get('id');

    const { data: workspace, isLoading } = useQuery({
        queryKey: ['workspace', workspaceId],
        queryFn: async () => {
            const workspaces = await base44.entities.Workspace.filter({ id: workspaceId });
            return workspaces[0];
        },
        enabled: !!workspaceId
    });

    const { data: agents = [] } = useQuery({
        queryKey: ['agents'],
        queryFn: () => base44.entities.Agent.list()
    });

    // Get deployed agents
    const deployedAgents = agents.filter(a => 
        workspace?.agents_deployed?.includes(a.id)
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!workspace) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">工作台不存在</h2>
                    <Link to={createPageUrl('Dashboard')}>
                        <Button>返回控制台</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const isKA = workspace.client_type === 'ka';

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to={createPageUrl('Dashboard')}>
                                <Button variant="ghost" size="icon">
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>
                            </Link>
                            <div>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-xl font-bold text-gray-900">{workspace.name}</h1>
                                    <Badge className={workspace.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                                        {workspace.status === 'active' ? '运行中' : '已暂停'}
                                    </Badge>
                                </div>
                                <p className="text-sm text-gray-500">{workspace.client_name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="sm">
                                <Settings className="w-4 h-4 mr-2" />
                                设置
                            </Button>
                            {workspace.status === 'active' ? (
                                <Button variant="outline" size="sm">
                                    <PauseCircle className="w-4 h-4 mr-2" />
                                    暂停
                                </Button>
                            ) : (
                                <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                    <PlayCircle className="w-4 h-4 mr-2" />
                                    启动
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Quick Stats */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { icon: MessageSquare, label: '今日对话', value: workspace.metrics?.total_conversations || 0, gradient: 'from-blue-500 to-cyan-500' },
                        { icon: CheckCircle2, label: '任务完成', value: workspace.metrics?.tasks_completed || 0, gradient: 'from-green-500 to-emerald-500' },
                        { icon: TrendingUp, label: '满意度', value: `${workspace.metrics?.satisfaction_rate || 0}%`, gradient: 'from-indigo-500 to-purple-500' },
                        { icon: Zap, label: '节省成本', value: `¥${(workspace.metrics?.cost_saved || 0).toLocaleString()}`, gradient: 'from-amber-500 to-orange-500' }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-6">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-sm text-gray-500">{stat.label}</div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="bg-white border shadow-sm">
                        <TabsTrigger value="overview">概览</TabsTrigger>
                        <TabsTrigger value="agents">智能体</TabsTrigger>
                        <TabsTrigger value="analytics">数据分析</TabsTrigger>
                        {isKA && <TabsTrigger value="report">汇报视图</TabsTrigger>}
                    </TabsList>

                    <TabsContent value="overview">
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Conversation Trend */}
                            <Card className="lg:col-span-2 border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle>对话趋势</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={conversationData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                            <XAxis dataKey="date" stroke="#9ca3af" />
                                            <YAxis stroke="#9ca3af" />
                                            <Tooltip />
                                            <Line 
                                                type="monotone" 
                                                dataKey="count" 
                                                stroke="#6366F1" 
                                                strokeWidth={3}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Category Distribution */}
                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle>问题分类</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <PieChart>
                                            <Pie
                                                data={categoryData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={50}
                                                outerRadius={80}
                                                dataKey="value"
                                            >
                                                {categoryData.map((entry, index) => (
                                                    <Cell key={index} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="space-y-2 mt-4">
                                        {categoryData.map((item, i) => (
                                            <div key={i} className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                                    <span className="text-gray-600">{item.name}</span>
                                                </div>
                                                <span className="font-medium">{item.value}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="agents">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {deployedAgents.length > 0 ? deployedAgents.map((agent, i) => (
                                <Card key={agent.id} className="border-0 shadow-lg">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-2xl">
                                                {agent.avatar ? (
                                                    <img src={agent.avatar} alt={agent.name} className="w-full h-full rounded-2xl object-cover" />
                                                ) : '🤖'}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                                                <Badge variant="secondary" className="bg-green-100 text-green-700">
                                                    运行中
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">响应率</span>
                                                <span className="font-medium">{agent.performance_metrics?.response_rate || 99}%</span>
                                            </div>
                                            <Progress value={agent.performance_metrics?.response_rate || 99} className="h-2" />
                                        </div>
                                    </CardContent>
                                </Card>
                            )) : (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-gray-500">暂无部署的智能体</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="analytics">
                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-12 text-center">
                                <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">详细数据分析</h3>
                                <p className="text-gray-500">更多维度的数据分析功能即将上线</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {isKA && (
                        <TabsContent value="report">
                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle>运营汇报视图</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="p-6 bg-indigo-50 rounded-xl">
                                        <h4 className="font-semibold text-indigo-900 mb-4">本周AI工作成果</h4>
                                        <div className="grid sm:grid-cols-3 gap-4">
                                            <div className="bg-white p-4 rounded-lg">
                                                <div className="text-2xl font-bold text-indigo-600">1,234</div>
                                                <div className="text-sm text-gray-500">处理咨询</div>
                                            </div>
                                            <div className="bg-white p-4 rounded-lg">
                                                <div className="text-2xl font-bold text-green-600">98.5%</div>
                                                <div className="text-sm text-gray-500">客户满意度</div>
                                            </div>
                                            <div className="bg-white p-4 rounded-lg">
                                                <div className="text-2xl font-bold text-amber-600">¥15,000</div>
                                                <div className="text-sm text-gray-500">节省成本</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-4">关键事件</h4>
                                        <div className="space-y-3">
                                            {[
                                                { event: '成功处理一起重大投诉，客户满意度达5星', time: '2天前' },
                                                { event: '识别并转化3个高价值潜在客户', time: '3天前' },
                                                { event: '知识库自动更新，新增50条FAQ', time: '5天前' }
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                    <div className="flex-grow">
                                                        <p className="text-gray-700">{item.event}</p>
                                                    </div>
                                                    <span className="text-sm text-gray-400">{item.time}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    )}
                </Tabs>
            </main>
        </div>
    );
}
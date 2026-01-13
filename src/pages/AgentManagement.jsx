import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MoreVertical, Pause, Play, Settings, RotateCcw, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import PerformanceCharts from '../components/workspace/PerformanceCharts';
import InteractionLog from '../components/workspace/InteractionLog';

export default function AgentManagement() {
    const [searchParams] = useSearchParams();
    const hireId = searchParams.get('hire_id');
    const [hire, setHire] = useState(null);
    const [agent, setAgent] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    // Fetch hire and agent data
    useEffect(() => {
        if (hireId) {
            Promise.all([
                base44.entities.Hire.list(),
                base44.entities.Agent.list()
            ]).then(([hires, agents]) => {
                const foundHire = hires.find(h => h.id === hireId);
                const foundAgent = agents.find(a => a.id === foundHire?.agent_id);
                setHire(foundHire);
                setAgent(foundAgent);
            });
        }
    }, [hireId]);

    if (!hire || !agent) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">加载中...</div>;
    }

    const getStatusColor = (status) => {
        return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
    };

    const getStatusLabel = (status) => {
        return status === 'active' ? '运行中' : '暂停';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                to={createPageUrl('Dashboard')}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </Link>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                    {agent?.avatar ? (
                                        <img src={agent.avatar} alt={agent.name} className="w-full h-full rounded-lg object-cover" />
                                    ) : (
                                        <span className="text-white font-bold">{agent?.name?.[0]}</span>
                                    )}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{agent?.name}</h1>
                                    <Badge className={getStatusColor(hire?.status || 'active')}>
                                        {getStatusLabel(hire?.status || 'active')}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Settings className="w-4 h-4" />
                                配置
                            </Button>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                {/* Top Overview Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid md:grid-cols-4 gap-4 mb-8"
                >
                    <Card className="p-6">
                        <p className="text-sm text-gray-600 mb-2">工作台</p>
                        <p className="text-xl font-bold text-gray-900">小米智能家居服务台</p>
                    </Card>
                    <Card className="p-6">
                        <p className="text-sm text-gray-600 mb-2">套餐类型</p>
                        <p className="text-xl font-bold text-gray-900">{hire?.plan_type === 'monthly' ? '月度套餐' : '年度套餐'}</p>
                    </Card>
                    <Card className="p-6">
                        <p className="text-sm text-gray-600 mb-2">到期日期</p>
                        <p className="text-xl font-bold text-gray-900">{hire?.end_date || '2026-12-31'}</p>
                    </Card>
                    <Card className="p-6">
                        <p className="text-sm text-gray-600 mb-2">月度成本</p>
                        <p className="text-xl font-bold text-gray-900">¥{hire?.amount || 0}</p>
                    </Card>
                </motion.div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-8">
                        <TabsTrigger value="overview">概览</TabsTrigger>
                        <TabsTrigger value="performance">性能监控</TabsTrigger>
                        <TabsTrigger value="logs">交互日志</TabsTrigger>
                        <TabsTrigger value="settings">配置</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {/* Agent Info */}
                            <Card className="p-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">智能体信息</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">描述</p>
                                        <p className="text-gray-900">{agent?.description}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">分类</p>
                                        <Badge>{agent?.category}</Badge>
                                    </div>
                                </div>
                                <div className="mt-8 pt-8 border-t border-gray-100">
                                    <p className="text-sm text-gray-600 mb-4">核心能力</p>
                                    <div className="flex flex-wrap gap-2">
                                        {agent?.capabilities?.map((cap, i) => (
                                            <Badge key={i} variant="outline">{cap}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </Card>

                            {/* Quick Stats */}
                            <div className="grid md:grid-cols-3 gap-6">
                                <Card className="p-6">
                                    <p className="text-sm text-gray-600 mb-2">累计处理请求</p>
                                    <p className="text-3xl font-bold text-gray-900">2,840</p>
                                    <p className="text-xs text-green-600 mt-2">↑ 12% vs 上周</p>
                                </Card>
                                <Card className="p-6">
                                    <p className="text-sm text-gray-600 mb-2">平均满意度</p>
                                    <p className="text-3xl font-bold text-gray-900">92%</p>
                                    <p className="text-xs text-green-600 mt-2">↑ 2% vs 上周</p>
                                </Card>
                                <Card className="p-6">
                                    <p className="text-sm text-gray-600 mb-2">节约成本</p>
                                    <p className="text-3xl font-bold text-gray-900">¥8.4k</p>
                                    <p className="text-xs text-green-600 mt-2">本月累计</p>
                                </Card>
                            </div>

                            {/* Recent Activity */}
                            <Card className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-6">最近动态</h3>
                                <div className="space-y-4">
                                    {[
                                        { time: '今天 14:32', action: '处理了一个智能家居设备控制请求', type: 'success' },
                                        { time: '今天 14:28', action: '知识库已更新 (小米智能家居新产品线)', type: 'info' },
                                        { time: '昨天 18:00', action: '日报已生成并发送', type: 'info' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                            <div className={`w-2 h-2 rounded-full mt-2 ${item.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`} />
                                            <div>
                                                <p className="text-sm text-gray-500">{item.time}</p>
                                                <p className="text-gray-900">{item.action}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    {/* Performance Tab */}
                    <TabsContent value="performance">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <PerformanceCharts />
                        </motion.div>
                    </TabsContent>

                    {/* Logs Tab */}
                    <TabsContent value="logs">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <InteractionLog />
                        </motion.div>
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="space-y-6">
                                {/* Knowledge Base */}
                                <Card className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">知识库管理</h3>
                                    <p className="text-gray-600 mb-4">
                                        上传、编辑和管理关于小米智能家居的常见问题和故障排除指南。
                                    </p>
                                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                                        管理知识库
                                    </Button>
                                </Card>

                                {/* Device Settings */}
                                <Card className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">设备联动设置</h3>
                                    <p className="text-gray-600 mb-4">
                                        配置智能体与具体智能家居设备的联动规则。
                                    </p>
                                    <Button variant="outline">
                                        配置设备
                                    </Button>
                                </Card>

                                {/* Notification Settings */}
                                <Card className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">通知设置</h3>
                                    <p className="text-gray-600 mb-4">
                                        设置智能体在特定事件发生时如何通知您。
                                    </p>
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-3">
                                            <input type="checkbox" defaultChecked className="w-4 h-4" />
                                            <span className="text-gray-700">关键告警通知</span>
                                        </label>
                                        <label className="flex items-center gap-3">
                                            <input type="checkbox" defaultChecked className="w-4 h-4" />
                                            <span className="text-gray-700">性能异常通知</span>
                                        </label>
                                        <label className="flex items-center gap-3">
                                            <input type="checkbox" className="w-4 h-4" />
                                            <span className="text-gray-700">日报通知</span>
                                        </label>
                                    </div>
                                </Card>

                                {/* Danger Zone */}
                                <Card className="p-6 border-red-200 bg-red-50">
                                    <div className="flex items-start gap-4">
                                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-bold text-red-900 mb-2">危险区域</h3>
                                            <p className="text-red-800 mb-4">
                                                以下操作不可恢复，请谨慎操作。
                                            </p>
                                            <div className="space-y-2">
                                                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
                                                    取消雇佣
                                                </Button>
                                                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
                                                    临时暂停
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
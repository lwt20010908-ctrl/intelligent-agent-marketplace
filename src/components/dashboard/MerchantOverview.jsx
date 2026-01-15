import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Zap, Bot, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MerchantOverview({ hires = [] }) {
    const [currentBriefing, setCurrentBriefing] = useState(0);

    // 核心指标数据
    const metrics = [
        {
            label: '营收贡献',
            value: '¥128,500',
            change: '+23.5%',
            trend: 'up',
            icon: DollarSign,
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            label: '节约成本',
            value: '¥45,200',
            change: '+18.2%',
            trend: 'up',
            icon: TrendingUp,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            label: 'ROI',
            value: '284%',
            change: '+15.8%',
            trend: 'up',
            icon: Zap,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
        },
        {
            label: '活跃智能体',
            value: hires.filter(h => h.status === 'active').length,
            change: `${hires.length}个总计`,
            trend: 'stable',
            icon: Bot,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50'
        }
    ];

    // 增长趋势数据
    const trendData = [
        { month: '1月', revenue: 42000, cost: 15000 },
        { month: '2月', revenue: 58000, cost: 18000 },
        { month: '3月', revenue: 71000, cost: 21000 },
        { month: '4月', revenue: 89000, cost: 24000 },
        { month: '5月', revenue: 105000, cost: 27000 },
        { month: '6月', revenue: 128500, cost: 30000 }
    ];

    // 员工状态数据
    const agentStatus = [
        { name: '智能客服', status: 'active', performance: 95, tasks: 1247 },
        { name: '销售助手', status: 'active', performance: 88, tasks: 856 },
        { name: '数据分析师', status: 'active', performance: 92, tasks: 423 },
        { name: '内容创作者', status: 'maintenance', performance: 0, tasks: 0 }
    ];

    // 智能情报简报
    const briefings = [
        {
            type: 'success',
            color: 'border-yellow-400 bg-yellow-50',
            iconColor: 'text-yellow-600',
            title: '战报：智能客服成功转化大单',
            content: '今日15:30，智能客服成功引导客户完成¥12,800订单，转化时长仅8分钟',
            time: '10分钟前'
        },
        {
            type: 'warning',
            color: 'border-red-400 bg-red-50',
            iconColor: 'text-red-600',
            title: '预警：热销商品库存不足',
            content: '检测到"夏季连衣裙"库存仅剩15件，建议及时补货以避免断货',
            time: '25分钟前'
        },
        {
            type: 'info',
            color: 'border-blue-400 bg-blue-50',
            iconColor: 'text-blue-600',
            title: '建议：优化商品描述提升转化',
            content: '分析发现"运动鞋"页面跳出率较高，建议优化商品图片和详情描述',
            time: '1小时前'
        },
        {
            type: 'success',
            color: 'border-yellow-400 bg-yellow-50',
            iconColor: 'text-yellow-600',
            title: '成交：销售助手促成批量订单',
            content: '销售助手今日协助完成3笔批发订单，总金额¥28,600',
            time: '2小时前'
        },
        {
            type: 'info',
            color: 'border-blue-400 bg-blue-50',
            iconColor: 'text-blue-600',
            title: '机会：竞品降价，建议调整策略',
            content: '监测到竞品"XX旗舰店"主打商品降价15%，建议评估价格策略',
            time: '3小时前'
        }
    ];

    // 自动轮播
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBriefing((prev) => (prev + 1) % briefings.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [briefings.length]);

    return (
        <div className="h-full flex flex-col gap-6">
            {/* 顶部核心指标 - 30% 高度 */}
            <div className="grid grid-cols-4 gap-4">
                {metrics.map((metric, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl ${metric.bgColor} flex items-center justify-center`}>
                                <metric.icon className={`w-6 h-6 ${metric.color}`} />
                            </div>
                            {metric.trend !== 'stable' && (
                                <div className={`flex items-center gap-1 text-sm font-medium ${
                                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {metric.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                                    {metric.change}
                                </div>
                            )}
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                            {metric.value}
                        </div>
                        <div className="text-sm text-gray-500">
                            {metric.label}
                        </div>
                        {metric.trend === 'stable' && (
                            <div className="text-xs text-gray-400 mt-1">
                                {metric.change}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* 中部区域 */}
            <div className="grid grid-cols-2 gap-6 flex-1">
                {/* 左侧：增长趋势图 */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                >
                    <h3 className="text-lg font-bold text-gray-900 mb-6">增长趋势</h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis 
                                dataKey="month" 
                                stroke="#9ca3af"
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis 
                                stroke="#9ca3af"
                                style={{ fontSize: '12px' }}
                            />
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                            <Legend />
                            <Line 
                                type="monotone" 
                                dataKey="revenue" 
                                stroke="#6366f1" 
                                strokeWidth={3}
                                name="AI贡献收入"
                                dot={{ fill: '#6366f1', r: 4 }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="cost" 
                                stroke="#10b981" 
                                strokeWidth={3}
                                name="节约成本"
                                dot={{ fill: '#10b981', r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* 右侧：员工状态 */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm overflow-auto"
                >
                    <h3 className="text-lg font-bold text-gray-900 mb-6">员工状态</h3>
                    <div className="space-y-4">
                        {agentStatus.map((agent, i) => (
                            <div
                                key={i}
                                className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-indigo-200 transition-colors"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                                            <Bot className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">{agent.name}</div>
                                            <div className="text-xs text-gray-500">
                                                {agent.status === 'active' ? '运行中' : '维护中'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        agent.status === 'active' 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-gray-100 text-gray-700'
                                    }`}>
                                        {agent.status === 'active' ? '正常' : '维护'}
                                    </div>
                                </div>
                                {agent.status === 'active' && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">性能</span>
                                            <span className="font-semibold text-gray-900">{agent.performance}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-indigo-600 h-2 rounded-full transition-all"
                                                style={{ width: `${agent.performance}%` }}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">今日任务</span>
                                            <span className="font-semibold text-indigo-600">{agent.tasks}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* 底部：智能情报简报 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
                <h3 className="text-lg font-bold text-gray-900 mb-4">智能情报简报</h3>
                <div className="relative h-40 overflow-hidden">
                    {briefings.map((briefing, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{
                                opacity: i === currentBriefing ? 1 : 0,
                                y: i === currentBriefing ? 0 : i < currentBriefing ? -100 : 100
                            }}
                            transition={{ duration: 0.5 }}
                            className={`absolute inset-0 p-4 rounded-xl border-l-4 ${briefing.color}`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-lg ${briefing.bgColor} flex items-center justify-center flex-shrink-0`}>
                                    <div className={`w-2 h-2 rounded-full ${briefing.iconColor} bg-current`} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className={`font-semibold ${briefing.iconColor}`}>
                                            {briefing.title}
                                        </h4>
                                        <span className="text-xs text-gray-400">{briefing.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {briefing.content}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {/* 指示器 */}
                <div className="flex items-center justify-center gap-2 mt-4">
                    {briefings.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentBriefing(i)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                i === currentBriefing ? 'bg-indigo-600 w-6' : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertCircle, TrendingUp } from 'lucide-react';

export default function AgentStatusSummary({ hires = [] }) {
    const activeCount = hires.filter(h => h.status === 'active').length;
    const pendingCount = hires.filter(h => h.status === 'pending').length;
    const expiredCount = hires.filter(h => h.status === 'expired').length;

    const statusItems = [
        {
            icon: CheckCircle2,
            label: '运行中',
            count: activeCount,
            color: 'text-green-600',
            bg: 'bg-green-50',
            border: 'border-green-200'
        },
        {
            icon: Clock,
            label: '待激活',
            count: pendingCount,
            color: 'text-yellow-600',
            bg: 'bg-yellow-50',
            border: 'border-yellow-200'
        },
        {
            icon: AlertCircle,
            label: '已过期',
            count: expiredCount,
            color: 'text-red-600',
            bg: 'bg-red-50',
            border: 'border-red-200'
        }
    ];

    // 获取最近的活跃智能体
    const recentActive = hires.filter(h => h.status === 'active').slice(0, 5);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 h-full flex flex-col"
        >
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">员工状态</h3>
                <p className="text-sm text-gray-500">实时运营状态概览</p>
            </div>

            {/* 状态统计 */}
            <div className="space-y-3 mb-6">
                {statusItems.map((item, i) => (
                    <div 
                        key={i}
                        className={`flex items-center justify-between p-4 rounded-xl border ${item.bg} ${item.border}`}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon className={`w-5 h-5 ${item.color}`} />
                            <span className="font-medium text-gray-700">{item.label}</span>
                        </div>
                        <span className={`text-2xl font-bold ${item.color}`}>{item.count}</span>
                    </div>
                ))}
            </div>

            {/* 最近活跃列表 */}
            <div className="flex-1 overflow-hidden">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">最近活跃</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                    {recentActive.length > 0 ? recentActive.map((hire, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                                {hire.agent_name?.[0] || 'A'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900 truncate">{hire.agent_name}</div>
                                <div className="text-xs text-gray-500">工作台: {hire.workspace_id}</div>
                            </div>
                            <TrendingUp className="w-4 h-4 text-green-500" />
                        </div>
                    )) : (
                        <div className="text-center py-8 text-gray-400 text-sm">
                            暂无活跃员工
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
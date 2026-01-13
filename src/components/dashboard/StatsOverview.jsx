import React from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, TrendingUp, Clock, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsOverview({ workspaces = [] }) {
    // Calculate aggregate stats
    const totalConversations = workspaces.reduce((sum, w) => sum + (w.metrics?.total_conversations || 0), 0);
    const totalTasks = workspaces.reduce((sum, w) => sum + (w.metrics?.tasks_completed || 0), 0);
    const avgSatisfaction = workspaces.length > 0
        ? (workspaces.reduce((sum, w) => sum + (w.metrics?.satisfaction_rate || 0), 0) / workspaces.length).toFixed(1)
        : 0;
    const totalSaved = workspaces.reduce((sum, w) => sum + (w.metrics?.cost_saved || 0), 0);

    const stats = [
        {
            icon: Bot,
            label: '活跃智能体',
            value: workspaces.reduce((sum, w) => sum + (w.agents_deployed?.length || 0), 0),
            change: '+2',
            positive: true,
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            icon: MessageSquare,
            label: '总对话量',
            value: totalConversations.toLocaleString(),
            change: '+12%',
            positive: true,
            gradient: 'from-indigo-500 to-purple-500'
        },
        {
            icon: TrendingUp,
            label: '满意度',
            value: `${avgSatisfaction}%`,
            change: '+3.2%',
            positive: true,
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            icon: Clock,
            label: '节省成本',
            value: `¥${totalSaved.toLocaleString()}`,
            change: '+25%',
            positive: true,
            gradient: 'from-amber-500 to-orange-500'
        }
    ];

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                >
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-medium ${
                                    stat.positive ? 'text-green-500' : 'text-red-500'
                                }`}>
                                    {stat.positive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                                    {stat.change}
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-500">{stat.label}</div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
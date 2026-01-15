import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Wallet, Target, Bot } from 'lucide-react';

export default function MerchantStatsCards({ hires = [] }) {
    // 计算指标
    const totalRevenue = hires.reduce((sum, hire) => sum + (hire.revenue_contribution || 0), 0);
    const totalCostSaved = hires.reduce((sum, hire) => sum + (hire.cost_saved || 0), 0);
    const activeAgents = hires.filter(h => h.status === 'active').length;
    const roi = totalCostSaved > 0 ? ((totalRevenue / totalCostSaved) * 100).toFixed(1) : 0;

    const stats = [
        {
            icon: TrendingUp,
            label: '营收贡献',
            value: `¥${totalRevenue.toLocaleString()}`,
            change: '+12.5%',
            color: 'from-green-500 to-emerald-600'
        },
        {
            icon: Wallet,
            label: '节约成本',
            value: `¥${totalCostSaved.toLocaleString()}`,
            change: '+8.3%',
            color: 'from-blue-500 to-cyan-600'
        },
        {
            icon: Target,
            label: 'ROI',
            value: `${roi}%`,
            change: '+15.2%',
            color: 'from-purple-500 to-pink-600'
        },
        {
            icon: Bot,
            label: '活跃智能体',
            value: activeAgents,
            change: `${hires.length}个总计`,
            color: 'from-indigo-500 to-purple-600'
        }
    ];

    return (
        <div className="grid grid-cols-4 gap-6">
            {stats.map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                            <stat.icon className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-500 mb-2">{stat.label}</div>
                    <div className="text-xs text-green-600 font-medium">{stat.change}</div>
                </motion.div>
            ))}
        </div>
    );
}
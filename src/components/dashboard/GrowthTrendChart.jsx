import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export default function GrowthTrendChart() {
    // 模拟数据 - 未来可以从实际数据源获取
    const data = [
        { month: '1月', revenue: 12000, cost: 8000 },
        { month: '2月', revenue: 15000, cost: 8500 },
        { month: '3月', revenue: 18000, cost: 9000 },
        { month: '4月', revenue: 22000, cost: 9200 },
        { month: '5月', revenue: 25000, cost: 9500 },
        { month: '6月', revenue: 30000, cost: 10000 },
        { month: '7月', revenue: 35000, cost: 10200 }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 h-full"
        >
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">增长趋势</h3>
                <p className="text-sm text-gray-500">AI员工带来的收入与成本对比</p>
            </div>
            <ResponsiveContainer width="100%" height="85%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                    />
                    <Legend />
                    <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        name="营收贡献"
                        dot={{ fill: '#10b981', r: 4 }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="cost" 
                        stroke="#6366f1" 
                        strokeWidth={3}
                        name="运营成本"
                        dot={{ fill: '#6366f1', r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </motion.div>
    );
}
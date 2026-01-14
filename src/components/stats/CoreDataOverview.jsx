import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, CheckCircle2, PiggyBank, TrendingUp } from 'lucide-react';

const AnimatedCounter = ({ value, format }) => {
    const [displayValue, setDisplayValue] = useState('0');

    useEffect(() => {
        let start = 0;
        const target = value;
        const increment = target / 50;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setDisplayValue(format(target));
            } else {
                setDisplayValue(format(Math.floor(current)));
            }
        }, 30);

        return () => clearInterval(timer);
    }, [value, format]);

    return displayValue;
};

const GrowthChart = ({ color }) => (
    <svg className="w-full h-20" viewBox="0 0 120 80" preserveAspectRatio="none">
        {/* Grid lines */}
        <line x1="0" y1="60" x2="120" y2="60" stroke="#f0f0f0" strokeWidth="1" />
        <line x1="0" y1="40" x2="120" y2="40" stroke="#f0f0f0" strokeWidth="1" />
        <line x1="0" y1="20" x2="120" y2="20" stroke="#f0f0f0" strokeWidth="1" />
        
        {/* Growth line */}
        <polyline
            points="0,65 15,55 30,42 45,30 60,18 75,12 90,8 105,5 120,2"
            fill="none"
            stroke={`url(#grad-${color})`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        
        {/* Gradient definition */}
        <defs>
            <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={color} stopOpacity="0.5" />
                <stop offset="100%" stopColor={color} stopOpacity="1" />
            </linearGradient>
        </defs>
    </svg>
);

const SavingsChart = () => (
    <svg className="w-full h-20" viewBox="0 0 120 80" preserveAspectRatio="none">
        {/* Before bar */}
        <g>
            <rect x="15" y="35" width="25" height="45" fill="#ef4444" opacity="0.3" rx="2" />
            <text x="27.5" y="75" textAnchor="middle" fontSize="10" fill="#666">优化前</text>
        </g>
        
        {/* After bar */}
        <g>
            <rect x="55" y="15" width="25" height="65" fill="#10b981" opacity="0.8" rx="2" />
            <text x="67.5" y="75" textAnchor="middle" fontSize="10" fill="#666">优化后</text>
        </g>
        
        {/* Arrow and percentage */}
        <g>
            <path d="M 45 30 L 55 30" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#arrowGreen)" />
            <text x="50" y="25" textAnchor="middle" fontSize="11" fill="#10b981" fontWeight="bold">节省50%</text>
        </g>
        
        <defs>
            <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
            </marker>
        </defs>
    </svg>
);

export default function CoreDataOverview() {
    const stats = [
        {
            id: 'companies',
            icon: Building2,
            label: '服务企业',
            value: 500,
            formatFn: (n) => n + '+',
            description: '已覆盖全球头部企业',
            color: '#3b82f6',
            chart: 'growth',
            highlight: '市场领导地位的证明'
        },
        {
            id: 'tasks',
            icon: CheckCircle2,
            label: '累计完成任务量',
            value: 5000000,
            formatFn: (n) => (n / 1000000).toFixed(1) + 'M+',
            description: '每日处理海量工作',
            color: '#a855f7',
            chart: 'growth',
            highlight: '真实的效率和价值输出'
        },
        {
            id: 'savings',
            icon: PiggyBank,
            label: '成本节约',
            value: 100000000,
            formatFn: (n) => '¥' + (n / 100000000).toFixed(0) + '亿+',
            description: '帮助客户节约真实成本',
            color: '#6366f1',
            chart: 'savings',
            highlight: '可量化的经济效益'
        }
    ];

    return (
        <div className="py-12 bg-gradient-to-b from-gray-50 via-white to-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Stats Grid */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;

                        return (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="relative h-full">
                                    {/* Gradient border effect */}
                                    <div 
                                        className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{ background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)` }}
                                    />

                                    {/* Main Card */}
                                    <div className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-gray-200 h-full flex flex-col">
                                        {/* Icon badge */}
                                        <div 
                                            className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-md"
                                            style={{ backgroundColor: `${stat.color}20` }}
                                        >
                                            <Icon className="w-7 h-7" style={{ color: stat.color }} />
                                        </div>

                                        {/* Label */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{stat.label}</h3>

                                        {/* Big Number */}
                                        <div className="mb-6 pt-2">
                                            <div 
                                                className="text-5xl font-bold"
                                                style={{ color: stat.color }}
                                            >
                                                <AnimatedCounter value={stat.value} format={stat.formatFn} />
                                            </div>
                                        </div>

                                        {/* Chart */}
                                        <div className="mb-6 -mx-2 flex-grow flex items-center">
                                            {stat.chart === 'growth' && <GrowthChart color={stat.color} />}
                                            {stat.chart === 'savings' && <SavingsChart />}
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm text-gray-600 mb-4">
                                            {stat.description}
                                        </p>

                                        {/* Highlight Badge */}
                                        <div 
                                            className="px-3 py-2 rounded-lg border"
                                            style={{ 
                                                backgroundColor: `${stat.color}10`,
                                                borderColor: `${stat.color}30`
                                            }}
                                        >
                                            <p className="text-xs font-medium" style={{ color: stat.color }}>
                                                ✨ {stat.highlight}
                                            </p>
                                        </div>

                                        {/* Footer */}
                                        <div className="mt-5 pt-5 border-t border-gray-100 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: stat.color }} />
                                            <span className="text-xs text-gray-500">持续增长中</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA Insight */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-10 text-center"
                >
                    <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
                        <span className="font-semibold text-gray-900">每个数字都有故事。</span>这些数据背后是我们与客户一起创造的真实价值——从小企业到行业龙头，都在体验AI赋能的变革。
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
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
        <div className="py-20 bg-gradient-to-b from-transparent to-indigo-50/30">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Zap className="w-5 h-5 text-indigo-500" />
                        <span className="text-indigo-600 font-semibold text-sm tracking-wide uppercase">核心数据</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        用数据说话的力量
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        真实的规模、可量化的成果，这就是AI智能体市场的承诺
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        const counterValue = <AnimatedCounter target={stat.target} duration={2.5} />;

                        return (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="relative group"
                            >
                                {/* Glow effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />

                                {/* Card */}
                                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                                    {/* Top section with icon */}
                                    <div className="mb-6">
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">{stat.label}</h3>
                                    </div>

                                    {/* Big number */}
                                    <div className="mb-6">
                                        <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                            {formatNumber(counterValue, stat.id)}
                                            <span className="text-3xl ml-1">{stat.suffix}</span>
                                        </div>
                                    </div>

                                    {/* Mini chart */}
                                    <div className={`mb-6 text-gradient-to-r ${stat.color} text-transparent bg-clip-text opacity-80`}>
                                        <MiniChart type={stat.chartType} />
                                    </div>

                                    {/* Description and highlight */}
                                    <div className="flex-grow">
                                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                            {stat.description}
                                        </p>
                                        <div className={`px-3 py-2 bg-gradient-to-br ${stat.color} bg-opacity-10 rounded-lg border border-opacity-20`}>
                                            <p className={`text-sm font-medium bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                                ✨ {stat.highlight}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Trending indicator */}
                                    <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-2">
                                        <TrendingUp className={`w-4 h-4 text-green-500`} />
                                        <span className="text-xs text-gray-500">持续增长中</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom insight */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        <span className="font-semibold text-gray-900">为什么选择我们？</span> 这些数据不仅代表我们的规模，更代表着我们为客户创造的实实在在的价值。每一个数字背后，都是一个成功的合作故事。
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, CheckCircle2, PiggyBank, TrendingUp, Globe, Zap } from 'lucide-react';

const AnimatedCounter = ({ target, duration = 2 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = target / (duration * 60);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 1000 / 60);

        return () => clearInterval(timer);
    }, [target, duration]);

    return count;
};

const MiniChart = ({ type }) => {
    if (type === 'growth') {
        return (
            <svg className="w-full h-16" viewBox="0 0 100 60" preserveAspectRatio="none">
                <polyline
                    points="0,50 20,35 40,20 60,10 80,5 100,0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        );
    }

    if (type === 'comparison') {
        return (
            <div className="flex items-end gap-2 h-16">
                <div className="flex-1 bg-gradient-to-t from-red-400 to-red-300 rounded-t opacity-40 h-3/4" />
                <div className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t h-full" />
            </div>
        );
    }

    return null;
};

export default function CoreDataOverview() {
    const stats = [
        {
            id: 'companies',
            icon: Building2,
            label: '服务企业',
            target: 500,
            suffix: '+',
            description: '已覆盖全球头部企业',
            color: 'from-blue-500 to-cyan-500',
            chartType: 'growth',
            highlight: '市场领导地位的证明'
        },
        {
            id: 'tasks',
            icon: CheckCircle2,
            label: '累计完成任务量',
            target: 5000000,
            suffix: '+',
            description: '每日处理海量工作',
            color: 'from-purple-500 to-pink-500',
            chartType: 'growth',
            highlight: '真实的效率和价值输出'
        },
        {
            id: 'savings',
            icon: PiggyBank,
            label: '成本节约',
            target: 100000000,
            suffix: '+',
            description: '帮助客户节约真实成本',
            color: 'from-indigo-500 to-purple-600',
            chartType: 'comparison',
            highlight: '可量化的经济效益'
        }
    ];

    const formatNumber = (num, id) => {
        if (id === 'tasks') {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (id === 'savings') {
            return '¥' + (num / 100000000).toFixed(0) + '亿';
        }
        return num;
    };

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
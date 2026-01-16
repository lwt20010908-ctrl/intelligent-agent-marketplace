import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';

const showcaseAgents = [
    {
        name: '华为Push智能分发',
        partner: '华为消费者业务',
        position: '智能推送优化官 · 华为专享',
        daysActive: 482,
        revenueIncrease: '2,800 万',
        metrics: {
            workHoursSaved: '12,400 h',
            costSaved: '450k',
            efficiencyGrowth: '+300%'
        },
        skills: ['商品属性分析', '用户触达', '投放人群计算']
    },
    {
        name: '淘宝流量智能分发',
        partner: '淘宝平台',
        position: 'GMV归因分析师 · 淘宝专享',
        daysActive: 628,
        revenueIncrease: '4,200 万',
        metrics: {
            workHoursSaved: '18,900 h',
            costSaved: '680k',
            efficiencyGrowth: '+420%'
        },
        skills: ['实时流量调度', 'GMV归因', 'A/B策略优化']
    },
    {
        name: '小米IoT场景助手',
        partner: '小米集团',
        position: '智能场景设计师 · 小米专享',
        daysActive: 365,
        revenueIncrease: '1,850 万',
        metrics: {
            workHoursSaved: '9,200 h',
            costSaved: '320k',
            efficiencyGrowth: '+180%'
        },
        skills: ['场景自动生成', '设备联动', '销售转化']
    }
];

export default function ShowcaseSection() {
    return (
        <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 mb-6"
                    >
                        <span className="text-sm font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">成功案例 · 最佳实践</span>
                    </motion.div>
                    <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                            Multiverse 名人堂
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        顶尖员工精锐。真实数据验证，可立即复制的增长引擎
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {showcaseAgents.map((agent, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                            className="relative group"
                        >
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
                            
                            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700 hover:border-emerald-500/50 transition-all duration-500 h-full overflow-hidden">
                                {/* A. 身份栏 */}
                                <div className="flex items-start justify-between mb-8">
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1">
                                            {agent.position}
                                        </h3>
                                    </div>
                                    {/* 状态：呼吸动画绿点 + 运行时长 */}
                                    <div className="flex items-center gap-2 text-sm">
                                        <motion.div
                                            animate={{ 
                                                opacity: [0.4, 1, 0.4],
                                                scale: [1, 1.2, 1]
                                            }}
                                            transition={{ 
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"
                                        />
                                        <span className="text-emerald-400 font-medium">
                                            运行时长: {agent.daysActive}天
                                        </span>
                                    </div>
                                </div>

                                {/* B. 核心数据区 - 左右分栏 */}
                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    {/* 左侧：大数字 */}
                                    <div className="flex flex-col justify-center">
                                        <div className="text-sm text-gray-400 mb-2">累计GMV增长</div>
                                        <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                                            + ¥{agent.revenueIncrease}
                                        </div>
                                    </div>
                                    
                                    {/* 右侧：纯绿色发光折线图 */}
                                    <div className="flex items-center">
                                        <svg className="w-full h-24" viewBox="0 0 120 80" preserveAspectRatio="none">
                                            {/* 面积填充 */}
                                            <defs>
                                                <linearGradient id={`gradient-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                                                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                                                </linearGradient>
                                                <filter id={`glow-${i}`}>
                                                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                                                    <feMerge>
                                                        <feMergeNode in="coloredBlur"/>
                                                        <feMergeNode in="SourceGraphic"/>
                                                    </feMerge>
                                                </filter>
                                            </defs>
                                            
                                            {/* 填充区域 */}
                                            <motion.path
                                                initial={{ pathLength: 0 }}
                                                whileInView={{ pathLength: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, delay: i * 0.15 + 0.3 }}
                                                d="M 0 70 Q 20 50, 40 45 T 80 25 T 120 15 L 120 80 L 0 80 Z"
                                                fill={`url(#gradient-${i})`}
                                            />
                                            
                                            {/* 发光线条 */}
                                            <motion.path
                                                initial={{ pathLength: 0 }}
                                                whileInView={{ pathLength: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, delay: i * 0.15 + 0.3 }}
                                                d="M 0 70 Q 20 50, 40 45 T 80 25 T 120 15"
                                                stroke="#10b981"
                                                strokeWidth="3"
                                                fill="none"
                                                filter={`url(#glow-${i})`}
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* C. 对比数据网格 - 3列 */}
                                <div className="grid grid-cols-3 gap-4 mb-6 p-5 bg-black/20 rounded-2xl border border-gray-700/50">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-white mb-1">
                                            {agent.metrics.workHoursSaved}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            节省人工工时
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-white mb-1">
                                            ¥ {agent.metrics.costSaved}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            节省运营成本
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-emerald-400 mb-1">
                                            {agent.metrics.efficiencyGrowth}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            人效提升
                                        </div>
                                    </div>
                                </div>

                                {/* D. 底部技能芯片 */}
                                <div className="flex flex-wrap gap-2">
                                    {agent.skills.map((skill, j) => (
                                        <span 
                                            key={j} 
                                            className="px-3 py-1.5 bg-gray-800/60 backdrop-blur-sm border border-gray-600/30 text-xs text-gray-300 rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* 装饰性背景纹理 */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        to={createPageUrl('CaseStudies')}
                        className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-semibold rounded-full hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 group"
                    >
                        查看更多企业案例 <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';

const showcaseAgents = [
    {
        name: '华为Push智能分发',
        partner: '华为消费者业务',
        logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100&h=100&fit=crop',
        story: '如何帮助华为提升300%的Push转化率',
        achievement: '通过AI智能削峰填谷策略，在竞品大促期间自动调整推送时机，避开流量高峰，实现收入增量¥2800万/月',
        metrics: {
            conversations: '100万+',
            satisfaction: '98.5%',
            responseTime: '<1秒',
            revenue: '+¥2800万/月'
        },
        features: ['智能削峰填谷', '竞品监测', '动态时机优化', '收入归因分析']
    },
    {
        name: '淘宝流量智能分发',
        partner: '淘宝平台',
        logo: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=100&h=100&fit=crop',
        story: '淘宝大促期间的AI流量调度实战',
        achievement: 'AI实时监控100万+商家流量，自动分配最优曝光位，大促GMV提升45%，商家满意度创新高',
        metrics: {
            merchants: '100万+',
            gmvGrowth: '+45%',
            satisfaction: '97.8%',
            revenue: '归因收入可量化'
        },
        features: ['实时流量调度', 'GMV归因', '商家画像', 'A/B策略优化']
    },
    {
        name: '小米IoT场景助手',
        partner: '小米集团',
        logo: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=100&h=100&fit=crop',
        story: '小米智能家居的AI中枢大脑',
        achievement: '串联200+IoT设备，自动生成个性化场景，用户设备使用率提升180%，智能家居套装销量增长220%',
        metrics: {
            devices: '200+',
            usage: '+180%',
            sales: '+220%',
            satisfaction: '96.5%'
        },
        features: ['场景自动生成', '设备联动', '故障预测', '销售转化']
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
                    <span className="text-indigo-500 font-medium mb-4 block">成功案例 · 最佳实践</span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        我们帮助头部企业创造的价值
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        真实案例，可量化的收入增长，可复制的成功经验
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {showcaseAgents.map((agent, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                            <div className="relative bg-white rounded-3xl p-8 border border-gray-100 hover:border-indigo-200 transition-colors h-full">
                                {/* Header */}
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={agent.logo}
                                        alt={agent.partner}
                                        className="w-14 h-14 rounded-2xl object-cover"
                                    />
                                    <div>
                                        <p className="text-xs text-indigo-500 font-medium mb-1">成功案例</p>
                                        <h3 className="font-semibold text-gray-900">{agent.partner}</h3>
                                    </div>
                                </div>

                                {/* Story Title */}
                                <div className="mb-4">
                                    <h4 className="text-lg font-bold text-gray-900 leading-snug">
                                        {agent.story}
                                    </h4>
                                </div>

                                {/* Achievement */}
                                <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl mb-6">
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {agent.achievement}
                                    </p>
                                </div>

                                {/* Key Metrics */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {Object.entries(agent.metrics).slice(0, 4).map(([key, value], j) => (
                                        <div key={j} className="text-center p-3 bg-gray-50 rounded-lg">
                                            <div className="text-lg font-bold text-indigo-600">{value}</div>
                                            <div className="text-xs text-gray-500 capitalize">
                                                {key === 'revenue' ? '收入增长' :
                                                 key === 'merchants' ? '服务商家' :
                                                 key === 'gmvGrowth' ? 'GMV增长' :
                                                 key === 'devices' ? '设备接入' :
                                                 key === 'usage' ? '使用率提升' :
                                                 key === 'sales' ? '销量增长' :
                                                 key === 'conversations' ? '对话量' :
                                                 key === 'satisfaction' ? '满意度' :
                                                 key === 'responseTime' ? '响应时间' : key}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Core Capabilities */}
                                <div className="flex flex-wrap gap-2">
                                    {agent.features.slice(0, 4).map((feature, j) => (
                                        <span key={j} className="px-2 py-1 bg-white border border-gray-200 text-xs text-gray-600 rounded-lg">
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                {/* Badge */}
                                <div className="absolute top-6 right-6">
                                    <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-medium rounded-full">
                                        最佳实践
                                    </span>
                                </div>
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
                    <p className="text-gray-500 text-sm">
                        更多AI智能体等你探索，立即登录查看完整市场
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
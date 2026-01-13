import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';

const showcaseAgents = [
    {
        name: '华为手机客服',
        partner: '华为消费者业务',
        logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100&h=100&fit=crop',
        metrics: {
            conversations: '100万+',
            satisfaction: '98.5%',
            responseTime: '<1秒'
        },
        features: ['全渠道接入', '多语言支持', '情感识别', '智能转人工']
    },
    {
        name: '小米智能助理',
        partner: '小米集团',
        logo: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=100&h=100&fit=crop',
        metrics: {
            conversations: '50万+',
            satisfaction: '97.2%',
            responseTime: '<0.5秒'
        },
        features: ['IoT设备联动', '场景化推荐', '售后服务', '故障诊断']
    },
    {
        name: 'OPPO商城顾问',
        partner: 'OPPO',
        logo: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=100&h=100&fit=crop',
        metrics: {
            conversations: '80万+',
            satisfaction: '96.8%',
            responseTime: '<1秒'
        },
        features: ['产品推荐', '比价服务', '订单追踪', '个性化营销']
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
                    <span className="text-indigo-500 font-medium mb-4 block">技术实力展示</span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        头部企业的选择
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        为头部手机厂商、大型平台提供定制化智能体解决方案
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
                                <div className="flex items-center gap-4 mb-6">
                                    <img
                                        src={agent.logo}
                                        alt={agent.partner}
                                        className="w-14 h-14 rounded-2xl object-cover"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                                        <p className="text-sm text-gray-500">{agent.partner}</p>
                                    </div>
                                </div>

                                {/* Metrics */}
                                <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-100 mb-6">
                                    <div>
                                        <div className="text-lg font-bold text-gray-900">{agent.metrics.conversations}</div>
                                        <div className="text-xs text-gray-500">对话量</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-indigo-500">{agent.metrics.satisfaction}</div>
                                        <div className="text-xs text-gray-500">满意度</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-gray-900">{agent.metrics.responseTime}</div>
                                        <div className="text-xs text-gray-500">响应时间</div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-3">
                                    {agent.features.map((feature, j) => (
                                        <div key={j} className="flex items-center gap-2 text-sm text-gray-600">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                {/* Badge */}
                                <div className="absolute top-6 right-6">
                                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-full">
                                        展示案例
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
                    <Link
                        to={createPageUrl('Marketplace')}
                        className="inline-flex items-center gap-2 text-indigo-500 font-medium hover:text-indigo-600 transition-colors"
                    >
                        查看更多案例
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
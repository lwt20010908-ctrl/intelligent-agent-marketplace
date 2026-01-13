import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Zap, Shield, BarChart3, Clock, Users } from 'lucide-react';

const features = [
    {
        icon: Bot,
        title: '智能对话',
        description: '基于大语言模型，理解用户意图，自然流畅地完成多轮对话',
        gradient: 'from-blue-500 to-cyan-500'
    },
    {
        icon: Zap,
        title: '极速响应',
        description: '毫秒级响应，7×24小时在线，永不疲倦的智能员工',
        gradient: 'from-amber-500 to-orange-500'
    },
    {
        icon: Shield,
        title: '安全可靠',
        description: '企业级数据安全保障，符合等保三级要求',
        gradient: 'from-green-500 to-emerald-500'
    },
    {
        icon: BarChart3,
        title: '数据洞察',
        description: '实时数据分析，深度业务洞察，助力决策优化',
        gradient: 'from-purple-500 to-pink-500'
    },
    {
        icon: Clock,
        title: '快速部署',
        description: '开箱即用，无需开发，一键雇佣立即上岗',
        gradient: 'from-indigo-500 to-blue-500'
    },
    {
        icon: Users,
        title: '无缝协作',
        description: '人机协同，智能分流，提升团队整体效率',
        gradient: 'from-rose-500 to-red-500'
    }
];

export default function FeaturesSection() {
    return (
        <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-indigo-500 font-medium mb-4 block">核心能力</span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        为什么选择我们
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        领先的AI技术，企业级的服务保障，助力商家实现智能化转型
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
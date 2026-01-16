import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Shield, BarChart3, Rocket, Users } from 'lucide-react';

const features = [
    {
        icon: Brain,
        title: 'L4级业务自主',
        description: '超越简单的问答，具备复杂逻辑推理与主动营销能力',
        gradient: 'from-blue-500 to-cyan-500'
    },
    {
        icon: Zap,
        title: '无限并发算力',
        description: '7×24小时无休，支持百万级用户同时接待，零等待',
        gradient: 'from-amber-500 to-orange-500'
    },
    {
        icon: Shield,
        title: '企业级风控',
        description: '内置敏感词拦截与情绪熔断机制，确保品牌安全零风险',
        gradient: 'from-green-500 to-emerald-500'
    },
    {
        icon: BarChart3,
        title: 'GMV 归因分析',
        description: '全链路数据追踪，清晰计算每一位数字员工的投入产出比(ROI)',
        gradient: 'from-purple-500 to-pink-500'
    },
    {
        icon: Rocket,
        title: '分钟级入职',
        description: '开箱即用，无需漫长的私有化部署',
        gradient: 'from-indigo-500 to-blue-500'
    },
    {
        icon: Users,
        title: '人机协同增强',
        description: 'AI 处理标准流程，无缝流转至人工专家，效率最大化',
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
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Brain, Shield, Users, TrendingUp, Award, Cpu, Network, Target, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Resources() {
    const coreCapabilities = [
        {
            icon: Brain,
            title: '深度学习技术',
            description: '拥有10年+AI研发经验，掌握最前沿的深度学习算法和自然语言处理技术',
            color: 'from-blue-500 to-cyan-500',
            highlights: ['自研NLP引擎', '多模态理解', '持续学习能力']
        },
        {
            icon: Network,
            title: '企业级架构',
            description: '基于云原生架构，支持百万级并发，99.99%可用性保障',
            color: 'from-purple-500 to-pink-500',
            highlights: ['微服务架构', '弹性扩展', '容灾备份']
        },
        {
            icon: Shield,
            title: '安全合规',
            description: '通过ISO27001、等保三级认证，企业数据安全有保障',
            color: 'from-indigo-500 to-purple-600',
            highlights: ['数据加密', '隐私保护', '合规认证']
        },
        {
            icon: Users,
            title: '顶尖团队',
            description: '核心团队来自华为、阿里、腾讯，平均10年+行业经验',
            color: 'from-green-500 to-emerald-500',
            highlights: ['AI专家团队', '行业资深', '7×24支持']
        }
    ];

    const advantages = [
        {
            icon: Target,
            title: '行业定制化',
            description: '针对不同行业深度优化，开箱即用'
        },
        {
            icon: Zap,
            title: '快速部署',
            description: '7天内完成部署，立即产生价值'
        },
        {
            icon: TrendingUp,
            title: '持续优化',
            description: '基于真实数据不断学习，效果持续提升'
        },
        {
            icon: Award,
            title: '验证成功',
            description: '服务500+企业，平均ROI提升300%'
        }
    ];

    const technicalStack = [
        { category: 'AI引擎', items: ['GPT-4级大模型', '多轮对话系统', '情感分析引擎', '知识图谱'] },
        { category: '技术架构', items: ['Kubernetes集群', 'Redis缓存', 'PostgreSQL', '消息队列'] },
        { category: '数据安全', items: ['端到端加密', '权限管控', '审计日志', '备份恢复'] },
        { category: '集成能力', items: ['RESTful API', 'Webhook', '第三方对接', 'SDK支持'] }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Cpu className="w-6 h-6 text-indigo-500" />
                        <span className="text-indigo-600 font-semibold text-sm tracking-wide uppercase">核心能力</span>
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        为什么选择我们
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        深耕AI领域十年，为华为、淘宝、小米等顶级企业提供智能化解决方案
                    </p>
                </motion.div>

                {/* Core Capabilities */}
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl font-bold text-gray-900 mb-8 text-center"
                    >
                        核心能力
                    </motion.h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {coreCapabilities.map((capability, index) => {
                            const Icon = capability.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                >
                                    <Card className="h-full hover:shadow-xl transition-all">
                                        <CardHeader>
                                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${capability.color} flex items-center justify-center mb-4`}>
                                                <Icon className="w-7 h-7 text-white" />
                                            </div>
                                            <CardTitle className="text-2xl">{capability.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-600 mb-4 leading-relaxed">
                                                {capability.description}
                                            </p>
                                            <div className="space-y-2">
                                                {capability.highlights.map((highlight, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                        <span>{highlight}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Competitive Advantages */}
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-3xl font-bold text-gray-900 mb-8 text-center"
                    >
                        竞争优势
                    </motion.h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {advantages.map((advantage, index) => {
                            const Icon = advantage.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all"
                                >
                                    <Icon className="w-10 h-10 text-indigo-500 mx-auto mb-4" />
                                    <h3 className="font-semibold text-gray-900 mb-2">{advantage.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{advantage.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Technical Stack */}
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-3xl font-bold text-gray-900 mb-8 text-center"
                    >
                        技术栈
                    </motion.h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {technicalStack.map((stack, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 + index * 0.1 }}
                                className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all"
                            >
                                <h3 className="font-semibold text-gray-900 mb-4 text-lg">{stack.category}</h3>
                                <ul className="space-y-2">
                                    {stack.items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-12 text-white"
                >
                    <h2 className="text-3xl font-bold mb-8 text-center">用数据说话</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { value: '10+', label: 'AI研发经验（年）' },
                            { value: '500+', label: '服务企业' },
                            { value: '99.99%', label: '系统可用性' },
                            { value: '300%', label: '平均ROI提升' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                                <div className="text-indigo-100 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mt-16 text-center"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">准备开始了吗？</h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        让我们的专业团队为您提供定制化的AI智能体解决方案
                    </p>
                    <a
                        href="/Marketplace"
                        className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                        立即开始
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
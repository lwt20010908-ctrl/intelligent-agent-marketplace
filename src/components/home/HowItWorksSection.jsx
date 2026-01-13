import React from 'react';
import { motion } from 'framer-motion';
import { Store, Zap, TrendingUp, ArrowRight } from 'lucide-react';

export default function HowItWorksSection() {
    const steps = [
        {
            icon: Store,
            title: '浏览并选择',
            description: '从AI人才市场挑选经过验证的智能体',
            animation: 'browse'
        },
        {
            icon: Zap,
            title: '快速部署',
            description: '一键雇佣，5分钟内完成配置上线',
            animation: 'deploy'
        },
        {
            icon: TrendingUp,
            title: '持续优化',
            description: 'AI自动学习优化，实时监控效果数据',
            animation: 'optimize'
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-indigo-500 font-medium mb-4 block">简单三步</span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        产品如何工作
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        从选择到上线，只需几分钟，让AI立即为你创造价值
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative">
                    {/* Connection Lines */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-200 -translate-y-1/2" />

                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative"
                            >
                                {/* Card */}
                                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                    {/* Step Number */}
                                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                        <span className="text-white font-bold text-lg">{index + 1}</span>
                                    </div>

                                    {/* Animation Area */}
                                    <div className="mb-6 h-32 flex items-center justify-center">
                                        {step.animation === 'browse' && <BrowseAnimation />}
                                        {step.animation === 'deploy' && <DeployAnimation />}
                                        {step.animation === 'optimize' && <OptimizeAnimation />}
                                    </div>

                                    {/* Content */}
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Arrow for desktop */}
                                {index < steps.length - 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.2 + 0.3 }}
                                        className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 z-20"
                                    >
                                        <ArrowRight className="w-8 h-8 text-indigo-400" />
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// Simple animation components
function BrowseAnimation() {
    return (
        <div className="relative w-24 h-24">
            {/* Cards */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8, x: 0 }}
                    whileInView={{ opacity: 1, scale: 1, x: i * 8 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, repeat: Infinity, duration: 2, repeatDelay: 1 }}
                    className="absolute inset-0 w-16 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl border-2 border-indigo-200"
                    style={{ left: `${i * 4}px` }}
                />
            ))}
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
                <Store className="w-8 h-8 text-indigo-500" />
            </motion.div>
        </div>
    );
}

function DeployAnimation() {
    return (
        <div className="relative w-24 h-24">
            {/* Lightning bolt with pulse */}
            <motion.div
                animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <Zap className="w-12 h-12 text-indigo-500 fill-indigo-500" />
            </motion.div>
            
            {/* Expanding circles */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0.5, opacity: 0.8 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4
                    }}
                    className="absolute inset-0 rounded-full border-2 border-indigo-300"
                />
            ))}
        </div>
    );
}

function OptimizeAnimation() {
    return (
        <div className="relative w-24 h-24">
            {/* Rising bars */}
            <div className="flex items-end justify-center gap-2 h-full">
                {[0.4, 0.6, 0.8, 1].map((height, i) => (
                    <motion.div
                        key={i}
                        initial={{ scaleY: 0.3 }}
                        animate={{ scaleY: [0.3, height, 0.3] }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2
                        }}
                        className="w-4 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg origin-bottom"
                        style={{ height: `${height * 100}%` }}
                    />
                ))}
            </div>
            
            {/* Trend arrow */}
            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: -10, opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 right-0"
            >
                <TrendingUp className="w-6 h-6 text-green-500" />
            </motion.div>
        </div>
    );
}
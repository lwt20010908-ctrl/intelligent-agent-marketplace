import React from 'react';
import { motion } from 'framer-motion';
import { Search, Handshake, TrendingUp, ArrowRight } from 'lucide-react';

export default function HowItWorksSection() {
    const steps = [
        {
            icon: Search,
            title: '参观AI员工市场',
            description: '浏览AI员工简历，查看实战数据与员工历史战绩',
            animation: 'browse'
        },
        {
            icon: Handshake,
            title: '签约与入职',
            description: '一键签署雇佣协议，分配工作渠道（微信/淘宝）',
            animation: 'deploy'
        },
        {
            icon: TrendingUp,
            title: '绩效与进化',
            description: '实时监控 GMV 产出，根据业务反馈自动迭代策略，越用越聪明',
            animation: 'optimize'
        }
    ];

    return (
        <section className="py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.05),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.05),transparent_50%)]" />
            
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 mb-6"
                    >
                        <span className="text-sm font-medium text-indigo-600">简单三步</span>
                    </motion.div>
                    <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                        雇佣AI员工三步
                        <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            重构您的业务
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        像招聘真人一样简单，但更高效、更可控
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative">
                    {/* Connection Lines */}
                    <div className="hidden lg:block absolute top-[140px] left-[15%] right-[15%] h-1">
                        <div className="h-full bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 origin-left"
                        />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 lg:gap-16 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                className="relative group"
                            >
                                {/* Card */}
                                <div className="relative bg-white rounded-3xl p-10 shadow-xl border border-gray-100 hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 hover:-translate-y-2">
                                    {/* Step Number Badge */}
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        whileInView={{ scale: 1, rotate: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                                        className="absolute -top-5 -left-5 w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30"
                                    >
                                        <span className="text-white font-bold text-2xl">{index + 1}</span>
                                    </motion.div>

                                    {/* 3D Animation Area */}
                                    <div className="mb-8 h-40 flex items-center justify-center">
                                        {step.animation === 'browse' && <BrowseAnimation />}
                                        {step.animation === 'deploy' && <DeployAnimation />}
                                        {step.animation === 'optimize' && <OptimizeAnimation />}
                                    </div>

                                    {/* Content */}
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed text-base">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Hover gradient border effect */}
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none" />
                                </div>

                                {/* Arrow for desktop */}
                                {index < steps.length - 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.2 + 0.5 }}
                                        className="hidden lg:flex absolute top-[140px] -right-8 z-20 items-center justify-center"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center">
                                            <ArrowRight className="w-4 h-4 text-white" />
                                        </div>
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
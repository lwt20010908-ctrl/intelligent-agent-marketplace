import React from 'react';
import { motion } from 'framer-motion';
import { Search, Handshake, TrendingUp, ArrowRight } from 'lucide-react';

export default function HowItWorksSection() {
    const steps = [
        {
            icon: Search,
            title: '参观AI员工市场',
            description: '浏览AI员工简历，查看简历详情、实战数据与员工历史战绩',
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
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-indigo-500 font-semibold mb-4 block text-sm uppercase tracking-wider">简单三步</span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        雇佣AI员工三步重构您的业务
                    </h2>
                    <p className="text-xl text-gray-500 max-w-3xl mx-auto">
                        像招聘真人一样简单，但更高效、更可控。
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative">
                    {/* Connection Lines */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-200 to-transparent -translate-y-1/2" />

                    <div className="grid md:grid-cols-3 gap-8 lg:gap-16 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="relative group"
                            >
                                {/* Card */}
                                <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 hover:shadow-2xl hover:border-indigo-200 transition-all duration-500 h-full">
                                    {/* Step Number */}
                                    <div className="absolute -top-5 -left-5 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                                        <span className="text-white font-bold text-xl">{index + 1}</span>
                                    </div>

                                    {/* Animation Area */}
                                    <div className="mb-8 h-36 flex items-center justify-center">
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
                                </div>

                                {/* Arrow for desktop */}
                                {index < steps.length - 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15 + 0.3 }}
                                        className="hidden lg:block absolute top-1/2 -right-8 -translate-y-1/2 z-20"
                                    >
                                        <div className="bg-white rounded-full p-2 shadow-lg">
                                            <ArrowRight className="w-6 h-6 text-indigo-500" />
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

// 3D-style animation components
function BrowseAnimation() {
    return (
        <div className="relative w-32 h-32">
            {/* 3D Magnifying Glass with Resume */}
            <motion.div
                animate={{ 
                    rotateY: [0, 15, -15, 0],
                    y: [0, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full"
            >
                {/* Resume Card */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-24 bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-2xl border-2 border-indigo-200 transform perspective-1000 rotate-y-12">
                        {/* Resume Lines */}
                        <div className="p-3 space-y-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 mx-auto mb-2" />
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-1 bg-indigo-200 rounded-full" style={{ width: `${80 - i * 10}%` }} />
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Magnifying Glass */}
                <motion.div
                    animate={{ 
                        x: [0, 10, 0],
                        y: [0, -10, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-0 right-0"
                >
                    <Search className="w-12 h-12 text-indigo-500 drop-shadow-lg" strokeWidth={2.5} />
                </motion.div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-indigo-400/10 rounded-full blur-2xl" />
            </motion.div>
        </div>
    );
}

function DeployAnimation() {
    return (
        <div className="relative w-32 h-32">
            {/* 3D Handshake / Connection */}
            <motion.div
                animate={{ 
                    scale: [1, 1.05, 1],
                    rotateZ: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full flex items-center justify-center"
            >
                {/* Left Hand */}
                <motion.div
                    animate={{ x: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute left-0"
                >
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg shadow-xl transform -rotate-12" />
                </motion.div>
                
                {/* Right Hand */}
                <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute right-0"
                >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-xl transform rotate-12" />
                </motion.div>
                
                {/* Center Handshake Icon */}
                <div className="relative z-10">
                    <Handshake className="w-16 h-16 text-white drop-shadow-2xl" strokeWidth={1.5} />
                </div>
                
                {/* Connection Particles */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ 
                            scale: [0, 1.5, 0],
                            opacity: [0, 0.6, 0]
                        }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.6
                        }}
                        className="absolute inset-0 rounded-full border-2 border-indigo-300"
                    />
                ))}
                
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl" />
            </motion.div>
        </div>
    );
}

function OptimizeAnimation() {
    return (
        <div className="relative w-32 h-32">
            {/* 3D Growth Curve Chart */}
            <div className="relative w-full h-full">
                {/* Chart Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-inner" />
                
                {/* Grid Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                    <line x1="20" y1="20" x2="20" y2="80" stroke="#6366f1" strokeWidth="0.5" />
                    <line x1="20" y1="80" x2="80" y2="80" stroke="#6366f1" strokeWidth="0.5" />
                </svg>
                
                {/* Rising Curve */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <motion.path
                        d="M 20 80 Q 30 70, 40 60 T 60 40 T 80 20"
                        stroke="url(#growthGradient)"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 0.5,
                            ease: "easeInOut"
                        }}
                    />
                    <defs>
                        <linearGradient id="growthGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="50%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                    </defs>
                </svg>
                
                {/* Data Points */}
                {[30, 50, 70].map((x, i) => (
                    <motion.div
                        key={i}
                        animate={{ 
                            scale: [0, 1.2, 1],
                            opacity: [0, 1, 1]
                        }}
                        transition={{ 
                            duration: 0.5,
                            delay: i * 0.4,
                            repeat: Infinity,
                            repeatDelay: 2
                        }}
                        className="absolute w-3 h-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg"
                        style={{ 
                            left: `${x}%`, 
                            top: `${80 - (i + 1) * 20}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                ))}
                
                {/* Trending Up Arrow */}
                <motion.div
                    animate={{ 
                        y: [0, -3, 0],
                        opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-2 right-2"
                >
                    <TrendingUp className="w-8 h-8 text-green-500 drop-shadow-lg" strokeWidth={2.5} />
                </motion.div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-green-400/20 via-indigo-400/20 to-purple-400/20 rounded-2xl blur-xl" />
            </div>
        </div>
    );
}
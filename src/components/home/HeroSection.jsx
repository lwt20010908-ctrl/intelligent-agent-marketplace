import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Bot, TrendingUp, Zap, Sparkle } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen bg-[#0A1628] overflow-hidden flex items-center">
            {/* Background Effects */}
            <div className="absolute inset-0">
                {/* Gradient Orbs */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                
                {/* Grid Pattern */}
                <div 
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`,
                        backgroundSize: '80px 80px'
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 pt-40">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-indigo-400" />
                            <span className="text-sm text-gray-300">新一代企业智能化解决方案</span>
                        </motion.div>

                        <div className="space-y-6 mb-12">
                            <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
                                <span className="block text-white mb-3">构建智能体</span>
                                <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    经济新生态
                                </span>
                            </h1>
                            
                            <p className="text-xl lg:text-2xl text-indigo-200/80 leading-relaxed max-w-2xl">
                                让数字员工交付确定的商业增长
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                to={createPageUrl('Marketplace')}
                                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-lg font-semibold rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105"
                            >
                                <span className="relative z-10">立即体验</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <button className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-lg font-semibold rounded-2xl hover:bg-white/15 transition-all duration-300">
                                <Play className="w-5 h-5" />
                                观看演示
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="relative aspect-square max-w-lg mx-auto">
                            {/* Main Circle */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 animate-pulse" />
                            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-600/30" />
                            <div className="absolute inset-16 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-600/40 flex items-center justify-center">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/50">
                                    <span className="text-4xl font-bold text-white">AI</span>
                                </div>
                            </div>

                            {/* Floating Cards */}
                            {[
                                { Icon: Bot, title: '智能客服', pos: 'top-0 left-0', gradient: 'from-blue-400 to-cyan-400' },
                                { Icon: TrendingUp, title: '数据分析', pos: 'top-0 right-0', gradient: 'from-indigo-400 to-purple-400' },
                                { Icon: Zap, title: '销售助手', pos: 'bottom-0 left-0', gradient: 'from-purple-400 to-pink-400' },
                                { Icon: Sparkle, title: '内容创作', pos: 'bottom-0 right-0', gradient: 'from-pink-400 to-rose-400' },
                            ].map((card, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + i * 0.1 }}
                                    className={`absolute ${card.pos} p-5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer`}
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                        <card.Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-sm text-white/90 font-medium">{card.title}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
}
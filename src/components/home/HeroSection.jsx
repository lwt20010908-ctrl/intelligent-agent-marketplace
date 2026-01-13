import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen bg-[#0A1628] overflow-hidden flex items-center">
            {/* Background Effects */}
            <div className="absolute inset-0">
                {/* Gradient Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
                
                {/* Grid Pattern */}
                <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
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

                        <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-8">
                            构建智能体经济新生态，
                            <br />
                            <span className="gradient-text">让数字员工交付确定的商业增长</span>
                        </h1>

                        <p className="text-xl text-gray-400 leading-relaxed mb-10 max-w-lg">
                            服务华为、淘宝、小米等头部平台，通过AI智能体实现可量化的收入增长。
                            真实案例：华为Push月增收¥2800万，淘宝大促GMV提升45%
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                to={createPageUrl('Marketplace')}
                                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-full hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300"
                            >
                                立即体验
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all duration-300">
                                <Play className="w-5 h-5" />
                                观看演示
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="mt-16 grid grid-cols-3 gap-8">
                            {[
                                { value: '¥2800万', label: '华为月增收' },
                                { value: '+45%', label: '淘宝GMV增长' },
                                { value: '+220%', label: '小米销量增长' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                >
                                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className="text-sm text-gray-500">{stat.label}</div>
                                </motion.div>
                            ))}
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
                                { icon: '🤖', title: '智能客服', pos: 'top-0 left-0' },
                                { icon: '📊', title: '数据分析', pos: 'top-0 right-0' },
                                { icon: '💬', title: '销售助手', pos: 'bottom-0 left-0' },
                                { icon: '📝', title: '内容创作', pos: 'bottom-0 right-0' },
                            ].map((card, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + i * 0.1 }}
                                    className={`absolute ${card.pos} p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10`}
                                >
                                    <div className="text-2xl mb-1">{card.icon}</div>
                                    <div className="text-sm text-white font-medium">{card.title}</div>
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
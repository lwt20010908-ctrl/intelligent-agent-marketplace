import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
    return (
        <section className="py-32 bg-[#0A1628] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                
                {/* Flowing particles effect */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-indigo-400/30 rounded-full"
                        initial={{ 
                            x: Math.random() * 100 + '%',
                            y: Math.random() * 100 + '%',
                            opacity: 0
                        }}
                        animate={{
                            x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                            y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <motion.div 
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-400/30 mb-8 backdrop-blur-sm"
                        animate={{ 
                            boxShadow: [
                                '0 0 20px rgba(168, 85, 247, 0.3)',
                                '0 0 40px rgba(99, 102, 241, 0.4)',
                                '0 0 20px rgba(168, 85, 247, 0.3)'
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="text-base font-semibold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                            🚀 生产力革命
                        </span>
                    </motion.div>

                    <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 leading-tight">
                        您的第一位「金牌AI员工」
                        <br />
                        已准备就绪
                    </h2>

                    <p className="text-2xl text-gray-300 mb-14 max-w-3xl mx-auto font-medium leading-relaxed">
                        AI 员工正在重构商业底座。不要让您的企业输在智能化的起跑线上。
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            to={createPageUrl('Marketplace')}
                            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-bold rounded-full transition-all duration-300 relative overflow-hidden"
                            style={{
                                boxShadow: '0 0 60px rgba(99, 102, 241, 0.6), 0 0 100px rgba(168, 85, 247, 0.4), 0 10px 40px rgba(99, 102, 241, 0.3)'
                            }}
                        >
                            <span className="relative z-10">⚡ 立即雇佣第一位员工</span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative z-10" />
                            
                            {/* Animated shimmer effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                animate={{
                                    x: ['-100%', '200%']
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                        </Link>
                    </motion.div>

                    {/* Trust Badges */}
                    <div className="mt-20 flex flex-wrap justify-center items-center gap-8 opacity-50">
                        {['华为', '小米', 'OPPO', 'vivo', '荣耀'].map((brand, i) => (
                            <span key={i} className="text-white/50 text-lg font-medium">
                                {brand}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
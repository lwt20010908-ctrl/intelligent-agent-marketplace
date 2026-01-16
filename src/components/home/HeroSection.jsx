import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Bot, TrendingUp, Zap, Sparkle } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function HeroSection() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        base44.auth.me().then(setUser).catch(() => {});
    }, []);

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
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 backdrop-blur-xl mb-8 shadow-lg shadow-indigo-500/10"
                        >
                            <Sparkles className="w-4 h-4 text-indigo-300" />
                            <span className="text-sm font-medium bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">全球首个硅基劳动力交易所</span>
                        </motion.div>

                        <div className="space-y-8 mb-12">
                            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                                <span className="block bg-gradient-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent mb-4">
                                    瞬知 Multiverse
                                </span>
                                <span className="block text-3xl lg:text-5xl bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent font-semibold">
                                    让AI员工交付确定的商业增长
                                </span>
                            </h1>
                            
                            <p className="text-lg lg:text-xl text-indigo-100/70 leading-relaxed max-w-2xl font-light">
                                您可以像管理资产一样管理 AI，每一分算力投入都有清晰的回报
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                to={createPageUrl('Marketplace')}
                                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-lg font-semibold rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105"
                            >
                                <span className="relative z-10">浏览AI员工市场</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            {user ? (
                                <Link
                                    to={createPageUrl('Dashboard')}
                                    className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-lg font-semibold rounded-2xl hover:bg-white/15 transition-all duration-300"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    进入控制台
                                </Link>
                            ) : (
                                <Link
                                    to={createPageUrl('Dashboard')}
                                    className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-lg font-semibold rounded-2xl hover:bg-white/15 transition-all duration-300"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    登录 / 注册
                                </Link>
                            )}
                        </div>
                    </motion.div>

                    {/* Right Visual - 3D AI Assistant */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="relative aspect-square max-w-lg mx-auto">
                            {/* Background - Stock Market Curves */}
                            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 400">
                                <motion.path
                                    d="M 50 300 Q 100 250, 150 280 T 250 200 T 350 150"
                                    stroke="url(#gradient1)"
                                    strokeWidth="2"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                                />
                                <motion.path
                                    d="M 50 320 Q 120 270, 180 300 T 280 220 T 370 180"
                                    stroke="url(#gradient2)"
                                    strokeWidth="1.5"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2.5, delay: 0.3, repeat: Infinity, repeatType: "loop" }}
                                />
                                <defs>
                                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
                                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
                                    </linearGradient>
                                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
                                        <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Glass Humanoid Figure */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="relative"
                                >
                                    {/* Head */}
                                    <div className="relative mx-auto w-24 h-28 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-purple-500/30">
                                        <div className="absolute inset-2 rounded-full bg-purple-500/20 animate-pulse" />
                                        
                                        {/* Brain Neural Network */}
                                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                                            {[...Array(8)].map((_, i) => (
                                                <motion.circle
                                                    key={i}
                                                    cx={30 + (i % 3) * 20}
                                                    cy={35 + Math.floor(i / 3) * 15}
                                                    r="3"
                                                    fill="#a78bfa"
                                                    initial={{ opacity: 0.3 }}
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        delay: i * 0.2
                                                    }}
                                                />
                                            ))}
                                            {[...Array(6)].map((_, i) => (
                                                <motion.line
                                                    key={`line-${i}`}
                                                    x1={30 + (i % 3) * 20}
                                                    y1={35 + Math.floor(i / 3) * 15}
                                                    x2={30 + ((i + 1) % 3) * 20}
                                                    y2={35 + Math.floor((i + 1) / 3) * 15}
                                                    stroke="#a78bfa"
                                                    strokeWidth="0.5"
                                                    initial={{ opacity: 0.2 }}
                                                    animate={{ opacity: [0.2, 0.6, 0.2] }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        delay: i * 0.3
                                                    }}
                                                />
                                            ))}
                                        </svg>
                                    </div>

                                    {/* Body */}
                                    <div className="relative mt-2 w-32 h-40 mx-auto rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-purple-500/20">
                                        {/* Inner Glow */}
                                        <div className="absolute inset-3 rounded-2xl bg-gradient-to-br from-purple-500/30 via-indigo-500/20 to-transparent" />
                                        
                                        {/* Neural Network Nodes */}
                                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 130 160">
                                            {/* Central Core */}
                                            <motion.circle
                                                cx="65"
                                                cy="80"
                                                r="15"
                                                fill="url(#coreGradient)"
                                                initial={{ scale: 0.8 }}
                                                animate={{ scale: [0.8, 1.1, 0.8] }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            />
                                            
                                            {/* Surrounding Nodes */}
                                            {[...Array(12)].map((_, i) => {
                                                const angle = (i * 30) * (Math.PI / 180);
                                                const radius = 35;
                                                const cx = 65 + radius * Math.cos(angle);
                                                const cy = 80 + radius * Math.sin(angle);
                                                
                                                return (
                                                    <g key={i}>
                                                        <motion.line
                                                            x1="65"
                                                            y1="80"
                                                            x2={cx}
                                                            y2={cy}
                                                            stroke="#a78bfa"
                                                            strokeWidth="1"
                                                            initial={{ opacity: 0.2 }}
                                                            animate={{ opacity: [0.2, 0.8, 0.2] }}
                                                            transition={{
                                                                duration: 2,
                                                                repeat: Infinity,
                                                                delay: i * 0.15
                                                            }}
                                                        />
                                                        <motion.circle
                                                            cx={cx}
                                                            cy={cy}
                                                            r="4"
                                                            fill="#c084fc"
                                                            initial={{ scale: 0.5 }}
                                                            animate={{ scale: [0.5, 1.2, 0.5] }}
                                                            transition={{
                                                                duration: 2,
                                                                repeat: Infinity,
                                                                delay: i * 0.15
                                                            }}
                                                        />
                                                    </g>
                                                );
                                            })}
                                            
                                            <defs>
                                                <radialGradient id="coreGradient">
                                                    <stop offset="0%" stopColor="#c084fc" />
                                                    <stop offset="100%" stopColor="#a855f7" />
                                                </radialGradient>
                                            </defs>
                                        </svg>
                                    </div>

                                    {/* Glow Effect */}
                                    <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/20 via-indigo-500/20 to-transparent blur-2xl -z-10 rounded-full" />
                                </motion.div>
                            </div>

                            {/* Floating Metric Cards */}
                            {[
                                { label: 'ROI', value: '1:12.5', pos: 'top-0 left-0', color: 'from-emerald-400 to-teal-400' },
                                { label: '响应时间', value: '<0.5s', pos: 'top-0 right-0', color: 'from-blue-400 to-cyan-400' },
                                { label: '成本节省', value: '73%', pos: 'bottom-0 left-0', color: 'from-violet-400 to-purple-400' },
                                { label: '满意度', value: '98%', pos: 'bottom-0 right-0', color: 'from-pink-400 to-rose-400' },
                            ].map((metric, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1 + i * 0.1 }}
                                    className={`absolute ${metric.pos} px-4 py-3 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer`}
                                >
                                    <div className="text-xs text-white/60 mb-1">{metric.label}</div>
                                    <div className={`text-lg font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                                        {metric.value}
                                    </div>
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
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
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-8">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm text-gray-300">限时优惠</span>
                    </div>

                    <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                        复制头部企业的成功
                        <br />
                        <span className="gradient-text">从雇佣AI开始</span>
                    </h2>

                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                        华为、淘宝都在用的AI智能体，现在你也可以拥有。7天免费试用，亲眼见证可量化的增长
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to={createPageUrl('Marketplace')}
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-medium rounded-full hover:shadow-xl hover:shadow-white/20 transition-all duration-300"
                        >
                            免费开始
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all duration-300">
                            预约演示
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-50">
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
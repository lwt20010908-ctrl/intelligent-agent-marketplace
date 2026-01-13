import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Code2, Users } from 'lucide-react';

const audiences = [
    {
        icon: Building2,
        title: '企业',
        subtitle: 'THE VISIONARIES',
        description: '驾驭AI创新，即刻雇佣智能体，驱动业务转型，实现效率与增长的双重飞跃。',
        gradient: 'from-blue-500 to-cyan-500'
    },
    {
        icon: Code2,
        title: '开发者',
        subtitle: 'THE CREATORS',
        description: '您的智能体，世界的机遇。构建、部署并商业化AI，让创新直接变现，成就持续收益。',
        gradient: 'from-indigo-500 to-purple-500'
    },
    {
        icon: Users,
        title: '消费者',
        subtitle: 'THE EXPLORERS',
        description: '轻松解锁AI潜力，发现并连接专属智能体。享受便捷、高效、个性化的数字生活新体验。',
        gradient: 'from-purple-500 to-pink-500'
    }
];

export default function TargetAudienceSection() {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(99, 102, 241) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        为每个角色赋能
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        无论您是企业决策者、技术创新者还是终端用户，这里都是您的舞台
                    </p>
                </motion.div>

                {/* Audience Cards */}
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {audiences.map((audience, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative"
                        >
                            {/* Card */}
                            <div className="relative bg-white rounded-3xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-100">
                                {/* Icon Container */}
                                <div className="mb-8">
                                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${audience.gradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                        <audience.icon className="w-10 h-10 text-white" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {audience.title}
                                    </h3>
                                    <p className="text-sm font-medium text-gray-400 tracking-wider mb-6">
                                        {audience.subtitle}
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        {audience.description}
                                    </p>
                                </div>

                                {/* Hover Gradient Border Effect */}
                                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${audience.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
                            </div>

                            {/* Background Glow on Hover */}
                            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${audience.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-10`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
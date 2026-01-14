import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import AgentCard from '../components/marketplace/AgentCard';
import CoreDataOverview from '../components/stats/CoreDataOverview';
import { Skeleton } from "@/components/ui/skeleton";

export default function TalentShowcase() {
    const { data: agents = [], isLoading } = useQuery({
        queryKey: ['showcase-agents'],
        queryFn: () => base44.entities.Agent.filter({ featured: true })
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Sparkles className="w-6 h-6 text-indigo-500" />
                        <span className="text-indigo-600 font-semibold text-sm tracking-wide uppercase">优秀AI员工</span>
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        发现您的专属AI员工
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        告别繁琐重复，让智慧涌动。在AI人才市场，找到与您业务完美契合的智能解决方案
                    </p>
                </motion.div>

                {/* Core Data Overview */}
                <CoreDataOverview />

                {/* Featured Agents */}
                <div className="mt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">精选AI员工</h2>
                        <p className="text-gray-600">经过严格筛选，表现优异的智能体团队</p>
                    </motion.div>

                    {isLoading ? (
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100">
                                    <Skeleton className="w-14 h-14 rounded-2xl mb-4" />
                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                    <Skeleton className="h-4 w-1/2 mb-4" />
                                    <Skeleton className="h-16 w-full mb-4" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            ))}
                        </div>
                    ) : agents.length > 0 ? (
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {agents.map((agent, i) => (
                                <motion.div
                                    key={agent.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + i * 0.05 }}
                                >
                                    <AgentCard agent={agent} index={i} hidePrice={true} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl">
                            <p className="text-gray-500">暂无精选AI员工</p>
                        </div>
                    )}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-12 text-white"
                >
                    <h2 className="text-3xl font-bold mb-4">准备好雇佣您的AI员工了吗？</h2>
                    <p className="text-indigo-100 mb-8 text-lg">
                        立即开始，让AI智能体为您的业务赋能
                    </p>
                    <a
                        href="/Marketplace"
                        className="inline-block px-8 py-4 bg-white text-indigo-600 font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                        浏览全部AI人才
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
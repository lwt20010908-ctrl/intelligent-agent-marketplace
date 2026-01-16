import React, { useState } from 'react';
      import { useQuery } from '@tanstack/react-query';
      import { base44 } from '@/api/base44Client';
      import { motion } from 'framer-motion';
      import { Sparkles, X, Search } from 'lucide-react';
      import AgentCard from '../components/marketplace/AgentCard';
      import { Skeleton } from "@/components/ui/skeleton";
      import { Dialog, DialogContent } from "@/components/ui/dialog";
      import { Input } from "@/components/ui/input";

export default function TalentShowcase() {
          const [selectedAgent, setSelectedAgent] = useState(null);
          const [searchQuery, setSearchQuery] = useState('');

          const { data: agents = [], isLoading } = useQuery({
              queryKey: ['showcase-agents'],
              queryFn: () => base44.entities.Agent.filter({ featured: true })
          });

    return (
        <div className="min-h-screen bg-white pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Sparkles className="w-5 h-5 text-indigo-500" />
                        <span className="text-indigo-600 font-medium text-sm">你需要AI员工</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                        发现您的专属AI员工
                    </h1>
                    <p className="text-base text-gray-500 max-w-3xl mx-auto mb-8">
                        云端即训即用，让每场景动、忧AI人才用形，找到与您业务完美契合的智能体大方案
                    </p>

                    {/* Search Box */}
                    <div className="max-w-xl mx-auto mb-12">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="市场行情索"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-14 text-base border-2 border-gray-200 rounded-xl focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Featured Agents */}
                <div className="mt-8">

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="border border-gray-200 rounded-2xl p-6 bg-white">
                                    <Skeleton className="w-16 h-16 rounded-full mb-4" />
                                    <Skeleton className="h-5 w-2/3 mb-2" />
                                    <Skeleton className="h-4 w-1/2 mb-3" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-20 w-full" />
                                </div>
                            ))}
                        </div>
                    ) : agents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {agents.map((agent, i) => (
                                <motion.div
                                    key={agent.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="border border-gray-200 rounded-2xl p-6 bg-white hover:border-indigo-300 hover:shadow-lg transition-all duration-300"
                                >
                                    {/* Avatar */}
                                    <div className="w-16 h-16 rounded-full bg-black mb-4 overflow-hidden flex items-center justify-center">
                                        {agent.avatar ? (
                                            <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-white text-2xl">👤</span>
                                        )}
                                    </div>

                                    {/* Name and Category */}
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">姓名：{agent.name}</h3>
                                    <p className="text-sm text-gray-600 mb-2">
                                        职能：{agent.function || agent.category}
                                    </p>
                                    <p className="text-sm text-gray-600 mb-3">
                                        岗位：年薪 ¥{agent.price_monthly || 25}Mpgu/ai每月
                                    </p>

                                    {/* Description */}
                                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                                        简介：防范DP ¥{agent.price_monthly || 25}Mpgu/ai每月提供最佳工作任务
                                    </p>

                                    {/* Core Abilities */}
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-500 mb-2">核心能力：</p>
                                        {(agent.skills || agent.capabilities || ['客户沟通', '数据分析', '方案优化', '智能推荐', '实时监控', '自动化流程']).slice(0, 6).map((skill, idx) => (
                                            <div key={idx} className="flex items-center text-xs text-gray-700">
                                                <span className="mr-2">•</span>
                                                <span>{skill}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-500">暂无精选AI员工</p>
                        </div>
                    )}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                        <span className="text-xl">🔥</span>
                        <span>登录，浏览全部 500+ 位AI员工</span>
                    </div>
                </motion.div>
                </div>

                {/* Video Demo Modal */}
                <Dialog open={!!selectedAgent} onOpenChange={() => setSelectedAgent(null)}>
                <DialogContent className="max-w-4xl w-full p-0 border-0 bg-black">
                    <div className="relative w-full bg-black rounded-lg overflow-hidden">
                        <button
                            onClick={() => setSelectedAgent(null)}
                            className="absolute top-4 right-4 z-50 p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        {selectedAgent?.demo_video_url && (
                            <div className="aspect-video w-full">
                                <video
                                    src={selectedAgent.demo_video_url}
                                    controls
                                    autoPlay
                                    className="w-full h-full"
                                />
                            </div>
                        )}

                        <div className="p-6 bg-gray-900">
                            <h2 className="text-2xl font-bold text-white mb-2">
                                {selectedAgent?.name} - 演示视频
                            </h2>
                            <p className="text-gray-300">
                                {selectedAgent?.description}
                            </p>
                        </div>
                    </div>
                </DialogContent>
                </Dialog>
                </div>
                );
                }
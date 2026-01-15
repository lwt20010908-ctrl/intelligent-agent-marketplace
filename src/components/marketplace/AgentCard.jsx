import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Star, Zap, MessageSquare, TrendingUp } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const categoryLabels = {
    customer_service: '智能客服',
    sales: '销售助手',
    marketing: '营销专家',
    operations: '运营管理',
    analytics: '数据分析',
    content: '内容创作'
};

const categoryColors = {
    customer_service: 'bg-blue-50 text-blue-600',
    sales: 'bg-green-50 text-green-600',
    marketing: 'bg-purple-50 text-purple-600',
    operations: 'bg-orange-50 text-orange-600',
    analytics: 'bg-cyan-50 text-cyan-600',
    content: 'bg-pink-50 text-pink-600'
};

export default function AgentCard({ agent, index = 0, hidePrice = false, onWatchDemo, onClick }) {
                const isShowcase = agent.type === 'showcase';

          return (
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative cursor-pointer"
                  onClick={onClick}
              >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
            
            <div className="relative bg-white rounded-3xl p-6 border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-2xl overflow-hidden">
                                {agent.avatar ? (
                                    <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
                                ) : (
                                    '🤖'
                                )}
                            </div>
                            {agent.status === 'active' && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                            )}
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                {agent.name}
                            </h3>
                            <Badge variant="secondary" className={`mt-1 ${categoryColors[agent.category]}`}>
                                {categoryLabels[agent.category]}
                            </Badge>
                        </div>
                    </div>
                    
                    <div className="flex gap-2">
                        {agent.demo_video_url && (
                            <Badge 
                                className="bg-red-500 text-white border-0 cursor-pointer hover:bg-red-600 transition-colors"
                                onClick={() => onWatchDemo?.(agent)}
                            >
                                🎬 视频
                            </Badge>
                        )}
                        {isShowcase && (
                            <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0">
                                <Star className="w-3 h-3 mr-1" />
                                展示
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Function & Position */}
                <div className="flex items-center gap-2 mb-3">
                    {agent.function && (
                        <Badge variant="outline" className="text-xs">
                            职能: {agent.function}
                        </Badge>
                    )}
                    {agent.position && (
                        <Badge variant="outline" className="text-xs">
                            岗位: {agent.position}
                        </Badge>
                    )}
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow line-clamp-2">
                    {agent.description}
                </p>

                {/* Skills */}
                {agent.skills?.length > 0 && (
                    <div className="mb-4">
                        <div className="text-xs text-gray-500 mb-2">核心技能:</div>
                        <div className="flex flex-wrap gap-2">
                            {agent.skills.slice(0, 4).map((skill, i) => (
                                <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-lg">
                                    {skill}
                                </span>
                            ))}
                            {agent.skills.length > 4 && (
                                <span className="px-2 py-1 text-gray-400 text-xs">
                                    +{agent.skills.length - 4}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Metrics */}
                {agent.performance_metrics && (
                    <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-100 mb-4">
                        {agent.performance_metrics.response_rate && (
                            <div className="text-center">
                                <div className="text-sm font-semibold text-gray-900">
                                    {agent.performance_metrics.response_rate}%
                                </div>
                                <div className="text-xs text-gray-400">响应率</div>
                            </div>
                        )}
                        {agent.performance_metrics.satisfaction_score && (
                            <div className="text-center">
                                <div className="text-sm font-semibold text-indigo-500">
                                    {agent.performance_metrics.satisfaction_score}%
                                </div>
                                <div className="text-xs text-gray-400">满意度</div>
                            </div>
                        )}
                        {agent.performance_metrics.tasks_completed && (
                            <div className="text-center">
                                <div className="text-sm font-semibold text-gray-900">
                                    {agent.performance_metrics.tasks_completed.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-400">完成任务</div>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    {!hidePrice && !isShowcase && agent.price_monthly ? (
                        <div>
                            <span className="text-2xl font-bold text-gray-900">¥{agent.price_monthly}</span>
                            <span className="text-gray-400 text-sm">/月</span>
                        </div>
                    ) : (
                        <span className="text-gray-400 text-sm">定制方案</span>
                    )}
                    
                    <div className="flex gap-2">
                        <Link to={createPageUrl(`AgentDetail?id=${agent.id}`)} onClick={(e) => e.stopPropagation()}>
                            <Button 
                                variant="outline"
                                className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                            >
                                查看详情
                            </Button>
                        </Link>
                        {!isShowcase && (
                            <Button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClick?.();
                                }}
                                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/30"
                            >
                                立即雇佣
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
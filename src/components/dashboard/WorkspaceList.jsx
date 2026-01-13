import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Bot, MessageSquare, TrendingUp, ChevronRight, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const statusColors = {
    active: 'bg-green-100 text-green-700',
    paused: 'bg-yellow-100 text-yellow-700',
    archived: 'bg-gray-100 text-gray-700'
};

const statusLabels = {
    active: '运行中',
    paused: '已暂停',
    archived: '已归档'
};

export default function WorkspaceList({ workspaces = [], isLoading }) {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
                ))}
            </div>
        );
    }

    if (workspaces.length === 0) {
        return (
            <Card className="border-dashed border-2">
                <CardContent className="py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                        <Bot className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        暂无工作台
                    </h3>
                    <p className="text-gray-500 mb-6">
                        前往AI人才市场雇佣智能体，开始您的智能化运营
                    </p>
                    <Link to={createPageUrl('Marketplace')}>
                        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600">
                            <Plus className="w-4 h-4 mr-2" />
                            雇佣智能体
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {workspaces.map((workspace, i) => (
                <motion.div
                    key={workspace.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                >
                    <Link to={createPageUrl(`MerchantWorkspace?id=${workspace.id}`)}>
                        <Card className="border-0 shadow-md hover:shadow-xl transition-all cursor-pointer group">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                                            <Bot className="w-7 h-7 text-indigo-500" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                    {workspace.name}
                                                </h3>
                                                <Badge variant="secondary" className={statusColors[workspace.status]}>
                                                    {statusLabels[workspace.status]}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {workspace.agents_deployed?.length || 0} 个智能体运行中
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        {/* Quick Stats */}
                                        <div className="hidden sm:flex items-center gap-6">
                                            <div className="text-center">
                                                <div className="flex items-center gap-1 text-gray-900 font-semibold">
                                                    <MessageSquare className="w-4 h-4 text-gray-400" />
                                                    {(workspace.metrics?.total_conversations || 0).toLocaleString()}
                                                </div>
                                                <div className="text-xs text-gray-500">对话</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="flex items-center gap-1 text-gray-900 font-semibold">
                                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                                    {workspace.metrics?.satisfaction_rate || 0}%
                                                </div>
                                                <div className="text-xs text-gray-500">满意度</div>
                                            </div>
                                        </div>

                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
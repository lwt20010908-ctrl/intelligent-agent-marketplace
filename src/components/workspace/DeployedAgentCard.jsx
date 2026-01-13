import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, TrendingUp } from 'lucide-react';

export default function DeployedAgentCard({ agent, hire, index }) {
    const getStatusColor = (status) => {
        return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        {agent?.avatar ? (
                            <img src={agent.avatar} alt={agent.name} className="w-full h-full rounded-xl object-cover" />
                        ) : (
                            <span className="text-white font-bold text-xl">{agent?.name?.[0]}</span>
                        )}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{agent?.name}</h3>
                        <p className="text-sm text-gray-500">{agent?.category}</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                </Button>
            </div>

            {/* Status Badge */}
            <div className="mb-4">
                <Badge className={getStatusColor(hire?.status || 'active')}>
                    {hire?.status === 'active' ? '运行中' : '暂停'}
                </Badge>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-100">
                <div>
                    <p className="text-xs text-gray-500 mb-1">今日请求数</p>
                    <p className="text-xl font-bold text-gray-900">580</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">满意度</p>
                    <div className="flex items-center gap-1">
                        <p className="text-xl font-bold text-gray-900">92%</p>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">节约成本</p>
                    <p className="text-xl font-bold text-gray-900">¥1.2k</p>
                </div>
            </div>

            {/* Plan Info */}
            <div className="mb-6">
                <p className="text-xs text-gray-500 mb-2">套餐信息</p>
                <p className="text-sm text-gray-700">
                    {hire?.plan_type === 'monthly' ? '月度套餐' : '年度套餐'} · 
                    <span className="ml-2 font-semibold">¥{hire?.amount || 0}/月</span>
                </p>
            </div>

            {/* Actions */}
            <Link
                to={createPageUrl(`AgentManagement?hire_id=${hire?.id}`)}
                className="block w-full px-4 py-3 text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
            >
                查看管理
            </Link>
        </motion.div>
    );
}
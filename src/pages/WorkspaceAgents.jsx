import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import DeployedAgentCard from '../components/workspace/DeployedAgentCard';

export default function WorkspaceAgents() {
    const [searchParams] = useSearchParams();
    const workspaceId = searchParams.get('workspace_id');
    const [workspace, setWorkspace] = useState(null);

    // Fetch workspace details
    useEffect(() => {
        if (workspaceId) {
            base44.entities.Workspace.list().then(workspaces => {
                const found = workspaces.find(w => w.id === workspaceId);
                setWorkspace(found);
            });
        }
    }, [workspaceId]);

    // Fetch all hires for this workspace
    const { data: hires = [], isLoading: hiresLoading } = useQuery({
        queryKey: ['workspace-hires', workspaceId],
        queryFn: async () => {
            if (!workspaceId) return [];
            const allHires = await base44.entities.Hire.list();
            return allHires.filter(hire => hire.workspace_id === workspaceId);
        },
        enabled: !!workspaceId
    });

    // Fetch agents data
    const { data: agents = {} } = useQuery({
        queryKey: ['workspace-agents'],
        queryFn: async () => {
            const allAgents = await base44.entities.Agent.list();
            return Object.fromEntries(allAgents.map(a => [a.id, a]));
        }
    });

    // Get agent for each hire
    const deployedAgents = hires.map(hire => ({
        agent: agents[hire.agent_id],
        hire
    })).filter(item => item.agent);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between mb-6">
                        <Link
                            to={createPageUrl('Dashboard')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Link>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="mb-2">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {workspace?.name || '工作台'}
                            </h1>
                        </div>
                        <p className="text-gray-600">
                            已部署 <span className="font-semibold text-gray-900">{deployedAgents.length}</span> 个智能体
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                {hiresLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-80 rounded-2xl" />
                        ))}
                    </div>
                ) : deployedAgents.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                            <Plus className="w-8 h-8 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">还未部署智能体</h2>
                        <p className="text-gray-600 mb-8">
                            在AI人才市场中雇佣智能体，然后将其关联到此工作台
                        </p>
                        <Link
                            to={createPageUrl('Marketplace')}
                            className="inline-flex px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
                        >
                            去市场雇佣
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deployedAgents.map((item, index) => (
                            <DeployedAgentCard
                                key={item.hire.id}
                                agent={item.agent}
                                hire={item.hire}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
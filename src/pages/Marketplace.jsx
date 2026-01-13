import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid, List, Sparkles } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgentCard from '../components/marketplace/AgentCard';
import HorizontalFilter from '../components/marketplace/HorizontalFilter';

export default function Marketplace() {
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        type: 'all',
        categories: [],
        maxPrice: 10000
    });
    const [viewMode, setViewMode] = useState('grid');

    const { data: agents = [], isLoading } = useQuery({
        queryKey: ['agents'],
        queryFn: () => base44.entities.Agent.list()
    });

    // Filter agents
    const filteredAgents = agents.filter(agent => {
        // Search
        if (search && !agent.name.toLowerCase().includes(search.toLowerCase()) &&
            !agent.description?.toLowerCase().includes(search.toLowerCase())) {
            return false;
        }
        // Type
        if (filters.type !== 'all' && agent.type !== filters.type) {
            return false;
        }
        // Categories
        if (filters.categories.length > 0 && !filters.categories.includes(agent.category)) {
            return false;
        }
        // Price
        if (agent.price_monthly && agent.price_monthly > filters.maxPrice) {
            return false;
        }
        return true;
    });

    // Separate showcase and tradeable
    const showcaseAgents = filteredAgents.filter(a => a.type === 'showcase');
    const tradeableAgents = filteredAgents.filter(a => a.type === 'tradeable');

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-indigo-500" />
                        <span className="text-indigo-500 font-medium">AI人才市场</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        雇佣经过头部企业验证的AI员工
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl">
                        华为、淘宝、小米都在用的智能体，现在商家也可以直接雇佣。真实案例，可量化效果
                    </p>
                </motion.div>

                {/* Search & View Mode */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            placeholder="搜索智能体..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-12 h-12 bg-white border-gray-200 rounded-xl"
                        />
                    </div>
                    <Tabs value={viewMode} onValueChange={setViewMode} className="hidden sm:block">
                        <TabsList className="h-12 bg-white border">
                            <TabsTrigger value="grid" className="px-4">
                                <Grid className="w-4 h-4" />
                            </TabsTrigger>
                            <TabsTrigger value="list" className="px-4">
                                <List className="w-4 h-4" />
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Horizontal Filters */}
                <HorizontalFilter
                    filters={filters}
                    setFilters={setFilters}
                />

                {/* Main Content */}
                <div>
                        {isLoading ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        ) : (
                            <>
                                {/* All Agents */}
                                {filteredAgents.length > 0 && (
                                    <div className="mb-12">
                                        <div className={viewMode === 'grid' 
                                            ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                                            : "space-y-4"
                                        }>
                                            <AnimatePresence>
                                                {filteredAgents.map((agent, i) => (
                                                    <AgentCard key={agent.id} agent={agent} index={i} />
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                )}



                                {/* Empty State */}
                                {filteredAgents.length === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-20"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                                            <Search className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">未找到智能体</h3>
                                        <p className="text-gray-500">请尝试调整筛选条件或搜索关键词</p>
                                    </motion.div>
                                )}
                            </>
                        )}
                </div>
            </div>
        </div>
    );
}
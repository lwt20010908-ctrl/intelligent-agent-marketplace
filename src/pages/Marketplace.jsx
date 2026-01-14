import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid, List, Sparkles, ArrowLeft, User, LogOut, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import AgentCard from '../components/marketplace/AgentCard';
import HorizontalFilter from '../components/marketplace/HorizontalFilter';

export default function Marketplace() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        type: 'all',
        categories: [],
        maxPrice: 10000
    });
    const [viewMode, setViewMode] = useState('grid');
    const [showHireModal, setShowHireModal] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [hireForm, setHireForm] = useState({
        merchant_name: '',
        merchant_contact: '',
        plan_type: 'monthly',
        workspace_id: ''
    });
    const queryClient = useQueryClient();

    const { data: agents = [], isLoading } = useQuery({
        queryKey: ['agents'],
        queryFn: () => base44.entities.Agent.list()
    });

    const { data: currentUser } = useQuery({
        queryKey: ['currentUser'],
        queryFn: () => base44.auth.me().catch(() => null)
    });

    const { data: workspaces = [] } = useQuery({
        queryKey: ['userWorkspaces'],
        queryFn: () => base44.entities.Workspace.list(),
        enabled: !!currentUser
    });

    React.useEffect(() => {
        if (currentUser && !hireForm.merchant_name) {
            setHireForm(prev => ({
                ...prev,
                merchant_name: currentUser.company_name || currentUser.full_name || '',
                merchant_contact: currentUser.email || ''
            }));
        }
    }, [currentUser]);

    const hireMutation = useMutation({
        mutationFn: async (data) => {
            const hire = await base44.entities.Hire.create(data);
            
            // Update workspace to include deployed agent
            const workspace = workspaces.find(w => w.id === data.workspace_id);
            if (workspace) {
                const updatedAgents = workspace.agents_deployed || [];
                if (!updatedAgents.includes(data.agent_id)) {
                    updatedAgents.push(data.agent_id);
                    await base44.entities.Workspace.update(data.workspace_id, {
                        agents_deployed: updatedAgents
                    });
                }
            }
            
            return hire;
        },
        onSuccess: () => {
            toast.success('✨ 智能体已成功添加到您的工作台！');
            setShowHireModal(false);
            setSelectedAgent(null);
            setHireForm({ merchant_name: '', merchant_contact: '', plan_type: 'monthly', workspace_id: '' });
            queryClient.invalidateQueries({ queryKey: ['hires'] });
            queryClient.invalidateQueries({ queryKey: ['workspaces'] });
        }
    });

    const handleHire = () => {
        if (!hireForm.merchant_name || !hireForm.merchant_contact) {
            toast.error('请填写完整信息');
            return;
        }
        if (!hireForm.workspace_id) {
            toast.error('请选择部署的工作台');
            return;
        }
        hireMutation.mutate({
            agent_id: selectedAgent.id,
            agent_name: selectedAgent.name,
            merchant_name: hireForm.merchant_name,
            merchant_contact: hireForm.merchant_contact,
            plan_type: hireForm.plan_type,
            amount: hireForm.plan_type === 'monthly' ? selectedAgent.price_monthly : selectedAgent.price_yearly,
            status: 'pending',
            workspace_id: hireForm.workspace_id,
            start_date: new Date().toISOString().split('T')[0]
        });
    };

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
        <div className="min-h-screen bg-gray-50">
            {/* Custom Navigation Bar */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left - Logo & Back */}
                        <div className="flex items-center gap-4">
                            <Link to={createPageUrl('Home')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">AI</span>
                                </div>
                                <span className="text-lg font-semibold text-gray-900">智能体市场</span>
                            </Link>
                        </div>

                        {/* Right - User Menu */}
                        <div className="flex items-center gap-3">
                            {currentUser ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none">
                                            <Avatar className="w-8 h-8">
                                                <AvatarFallback className="bg-indigo-100 text-indigo-600 text-sm">
                                                    {currentUser?.company_name?.[0] || currentUser?.full_name?.[0] || 'M'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="hidden sm:block text-left">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {currentUser?.company_name || currentUser?.full_name || '商家'}
                                                </div>
                                                <div className="text-xs text-gray-500">{currentUser?.email}</div>
                                            </div>
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <div className="px-2 py-2">
                                            <div className="text-sm font-medium text-gray-900">
                                                {currentUser?.company_name || currentUser?.full_name}
                                            </div>
                                            <div className="text-xs text-gray-500">{currentUser?.email}</div>
                                        </div>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => navigate(createPageUrl('Dashboard'))}>
                                            <User className="w-4 h-4 mr-2" />
                                            我的工作台
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Settings className="w-4 h-4 mr-2" />
                                            设置
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => navigate(createPageUrl('Home'))}>
                                            <LogOut className="w-4 h-4 mr-2" />
                                            退出登录
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" onClick={() => navigate(createPageUrl('Home'))}>
                                        登录
                                    </Button>
                                    <Button className="bg-gradient-to-r from-indigo-500 to-purple-600">
                                        注册
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 pb-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                        发现您的AI专业员工
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
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
                                                    <div key={agent.id} onClick={() => {
                                                        if (agent.type === 'tradeable') {
                                                            setSelectedAgent(agent);
                                                            setShowHireModal(true);
                                                        }
                                                    }}>
                                                        <AgentCard agent={agent} index={i} />
                                                    </div>
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

                    {/* Hire Modal */}
                    <Dialog open={showHireModal} onOpenChange={setShowHireModal}>
                        <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>雇佣 {selectedAgent?.name}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label>商家名称</Label>
                                        <input
                                            type="text"
                                            placeholder="请输入您的公司/店铺名称"
                                            value={hireForm.merchant_name}
                                            onChange={(e) => setHireForm({ ...hireForm, merchant_name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>联系方式</Label>
                                        <input
                                            type="text"
                                            placeholder="请输入手机号或邮箱"
                                            value={hireForm.merchant_contact}
                                            onChange={(e) => setHireForm({ ...hireForm, merchant_contact: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>选择套餐</Label>
                                        <RadioGroup 
                                            value={hireForm.plan_type}
                                            onValueChange={(value) => setHireForm({ ...hireForm, plan_type: value })}
                                        >
                                            <div className="flex items-center space-x-2 p-3 border rounded-lg">
                                                <RadioGroupItem value="monthly" id="monthly" />
                                                <Label htmlFor="monthly" className="flex-grow cursor-pointer">
                                                    月度套餐 - ¥{selectedAgent?.price_monthly}/月
                                                </Label>
                                            </div>
                                            {selectedAgent?.price_yearly && (
                                                <div className="flex items-center space-x-2 p-3 border rounded-lg border-indigo-200 bg-indigo-50/50">
                                                    <RadioGroupItem value="yearly" id="yearly" />
                                                    <Label htmlFor="yearly" className="flex-grow cursor-pointer">
                                                        年度套餐 - ¥{selectedAgent?.price_yearly}/年
                                                    </Label>
                                                </div>
                                            )}
                                        </RadioGroup>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>部署到工作台</Label>
                                        {workspaces.length > 0 ? (
                                            <RadioGroup 
                                                value={hireForm.workspace_id}
                                                onValueChange={(value) => setHireForm({ ...hireForm, workspace_id: value })}
                                            >
                                                {workspaces.map((workspace) => (
                                                    <div key={workspace.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:border-indigo-300 transition-colors">
                                                        <RadioGroupItem value={workspace.id} id={workspace.id} />
                                                        <Label htmlFor={workspace.id} className="flex-grow cursor-pointer">
                                                            <div>
                                                                <div className="font-medium text-gray-900">{workspace.name}</div>
                                                                <div className="text-xs text-gray-500">{workspace.client_name}</div>
                                                            </div>
                                                        </Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        ) : (
                                            <div className="p-3 border border-dashed border-gray-300 rounded-lg text-center">
                                                <p className="text-sm text-gray-500">您还没有工作台，请先创建</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setShowHireModal(false)}>
                                        取消
                                    </Button>
                                    <Button 
                                        onClick={handleHire}
                                        disabled={hireMutation.isPending}
                                        className="bg-gradient-to-r from-indigo-500 to-purple-600"
                                    >
                                        {hireMutation.isPending ? '提交中...' : '确认雇佣'}
                                    </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
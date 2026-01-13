import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { 
    ArrowLeft, Star, CheckCircle2, Zap, MessageSquare, 
    BarChart3, Clock, Shield, Users, Play, ChevronRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

const categoryLabels = {
    customer_service: '智能客服',
    sales: '销售助手',
    marketing: '营销专家',
    operations: '运营管理',
    analytics: '数据分析',
    content: '内容创作'
};

export default function AgentDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const agentId = urlParams.get('id');
    const queryClient = useQueryClient();

    const [showHireModal, setShowHireModal] = useState(false);
    const [hireForm, setHireForm] = useState({
        merchant_name: '',
        merchant_contact: '',
        plan_type: 'monthly',
        workspace_id: ''
    });
    const [user, setUser] = useState(null);

    // Fetch current user
    const { data: currentUser } = useQuery({
        queryKey: ['currentUser'],
        queryFn: () => base44.auth.me().catch(() => null)
    });

    // Fetch workspaces
    const { data: workspaces = [] } = useQuery({
        queryKey: ['userWorkspaces'],
        queryFn: () => base44.entities.Workspace.list(),
        enabled: !!currentUser
    });

    const { data: agent, isLoading } = useQuery({
        queryKey: ['agent', agentId],
        queryFn: async () => {
            const agents = await base44.entities.Agent.filter({ id: agentId });
            return agents[0];
        },
        enabled: !!agentId
    });

    // Auto-fill form with user info
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
        mutationFn: (data) => base44.entities.Hire.create(data),
        onSuccess: () => {
            toast.success('雇佣申请已提交，我们会尽快与您联系！');
            setShowHireModal(false);
            queryClient.invalidateQueries(['hires']);
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
            agent_id: agentId,
            agent_name: agent.name,
            merchant_name: hireForm.merchant_name,
            merchant_contact: hireForm.merchant_contact,
            plan_type: hireForm.plan_type,
            amount: hireForm.plan_type === 'monthly' ? agent.price_monthly : agent.price_yearly,
            status: 'pending',
            workspace_id: hireForm.workspace_id,
            start_date: new Date().toISOString().split('T')[0]
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-28 pb-20">
                <div className="max-w-6xl mx-auto px-6">
                    <Skeleton className="h-8 w-32 mb-8" />
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <Skeleton className="h-64 rounded-3xl" />
                            <Skeleton className="h-48 rounded-3xl" />
                        </div>
                        <Skeleton className="h-96 rounded-3xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!agent) {
        return (
            <div className="min-h-screen bg-gray-50 pt-28 pb-20 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">智能体不存在</h2>
                    <Link to={createPageUrl('Marketplace')}>
                        <Button>返回市场</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const isShowcase = agent.type === 'showcase';

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                {/* Breadcrumb */}
                <Link 
                    to={createPageUrl('Marketplace')}
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    返回市场
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Header Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl p-8 border border-gray-100"
                        >
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-4xl flex-shrink-0 overflow-hidden">
                                    {agent.avatar ? (
                                        <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
                                    ) : '🤖'}
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-start justify-between mb-2">
                                        <h1 className="text-3xl font-bold text-gray-900">{agent.name}</h1>
                                        {isShowcase && (
                                            <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0">
                                                <Star className="w-3 h-3 mr-1" />
                                                展示案例
                                            </Badge>
                                        )}
                                    </div>
                                    <Badge variant="secondary" className="mb-4">
                                        {categoryLabels[agent.category]}
                                    </Badge>
                                    <p className="text-gray-500 leading-relaxed">{agent.description}</p>
                                </div>
                            </div>

                            {/* Metrics */}
                            {agent.performance_metrics && (
                                <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-100">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-gray-900">
                                            {agent.performance_metrics.response_rate}%
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">响应率</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-indigo-500">
                                            {agent.performance_metrics.satisfaction_score}%
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">客户满意度</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-gray-900">
                                            {agent.performance_metrics.tasks_completed?.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">已完成任务</div>
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* Tabs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Tabs defaultValue="capabilities" className="bg-white rounded-3xl border border-gray-100">
                                <TabsList className="w-full justify-start rounded-t-3xl border-b bg-gray-50 p-0 h-auto">
                                    <TabsTrigger value="capabilities" className="rounded-none rounded-tl-3xl py-4 px-6">
                                        核心能力
                                    </TabsTrigger>
                                    <TabsTrigger value="features" className="rounded-none py-4 px-6">
                                        功能特性
                                    </TabsTrigger>
                                    <TabsTrigger value="cases" className="rounded-none py-4 px-6">
                                        使用场景
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="capabilities" className="p-6">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {agent.capabilities?.map((cap, i) => (
                                            <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                <span className="text-gray-700">{cap}</span>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="features" className="p-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        {[
                                            { icon: Zap, title: '毫秒级响应', desc: '极速处理用户请求' },
                                            { icon: MessageSquare, title: '多轮对话', desc: '上下文理解能力' },
                                            { icon: BarChart3, title: '数据分析', desc: '实时业务洞察' },
                                            { icon: Shield, title: '安全保障', desc: '企业级数据安全' }
                                        ].map((feature, i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                                                    <feature.icon className="w-6 h-6 text-indigo-500" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{feature.title}</h4>
                                                    <p className="text-sm text-gray-500">{feature.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="cases" className="p-6">
                                    <div className="space-y-4">
                                        {[
                                            '电商平台售前咨询与售后服务',
                                            '品牌官网在线客服',
                                            '社交媒体互动管理',
                                            '内部员工服务台'
                                        ].map((useCase, i) => (
                                            <div key={i} className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:border-indigo-200 transition-colors">
                                                <ChevronRight className="w-5 h-5 text-indigo-500" />
                                                <span className="text-gray-700">{useCase}</span>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </motion.div>
                    </div>

                    {/* Sidebar - Pricing */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="sticky top-28"
                        >
                            <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
                                <CardHeader className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6">
                                    <CardTitle className="text-lg font-medium">
                                        {isShowcase ? '定制方案' : '选择套餐'}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    {isShowcase ? (
                                        <div className="text-center py-8">
                                            <p className="text-gray-500 mb-6">
                                                此为展示案例，如需了解定制化解决方案，请联系我们的商务团队
                                            </p>
                                            <Button className="w-full" variant="outline">
                                                联系商务
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {/* Monthly */}
                                            <div className="p-4 border border-gray-200 rounded-xl hover:border-indigo-500 transition-colors cursor-pointer">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-medium text-gray-900">月度套餐</span>
                                                    <Badge variant="secondary">灵活</Badge>
                                                </div>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-3xl font-bold text-gray-900">
                                                        ¥{agent.price_monthly?.toLocaleString()}
                                                    </span>
                                                    <span className="text-gray-500">/月</span>
                                                </div>
                                            </div>

                                            {/* Yearly */}
                                            {agent.price_yearly && (
                                                <div className="p-4 border-2 border-indigo-500 rounded-xl bg-indigo-50/50 relative">
                                                    <Badge className="absolute -top-2 right-4 bg-indigo-500">
                                                        省 {Math.round((1 - agent.price_yearly / (agent.price_monthly * 12)) * 100)}%
                                                    </Badge>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-medium text-gray-900">年度套餐</span>
                                                        <Badge className="bg-indigo-500">推荐</Badge>
                                                    </div>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-3xl font-bold text-indigo-600">
                                                            ¥{agent.price_yearly?.toLocaleString()}
                                                        </span>
                                                        <span className="text-gray-500">/年</span>
                                                    </div>
                                                </div>
                                            )}

                                            <Button 
                                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 h-12 text-base"
                                                onClick={() => setShowHireModal(true)}
                                            >
                                                立即雇佣
                                            </Button>

                                            <p className="text-xs text-gray-400 text-center">
                                                支持7天免费试用，无需信用卡
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Hire Modal */}
            <Dialog open={showHireModal} onOpenChange={setShowHireModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>雇佣 {agent?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>商家名称</Label>
                            <Input
                                placeholder="请输入您的公司/店铺名称"
                                value={hireForm.merchant_name}
                                onChange={(e) => setHireForm({ ...hireForm, merchant_name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>联系方式</Label>
                            <Input
                                placeholder="请输入手机号或邮箱"
                                value={hireForm.merchant_contact}
                                onChange={(e) => setHireForm({ ...hireForm, merchant_contact: e.target.value })}
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
                                        月度套餐 - ¥{agent?.price_monthly}/月
                                    </Label>
                                </div>
                                {agent?.price_yearly && (
                                    <div className="flex items-center space-x-2 p-3 border rounded-lg border-indigo-200 bg-indigo-50/50">
                                        <RadioGroupItem value="yearly" id="yearly" />
                                        <Label htmlFor="yearly" className="flex-grow cursor-pointer">
                                            年度套餐 - ¥{agent?.price_yearly}/年
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
                                    <p className="text-sm text-gray-500">您还没有工作台，<Link to={createPageUrl('Dashboard')} className="text-indigo-500 hover:underline">立即创建</Link></p>
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
    );
}
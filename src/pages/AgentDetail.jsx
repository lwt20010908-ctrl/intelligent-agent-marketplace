import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, TrendingUp, Calendar, Award, Briefcase, Users, BarChart3, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AgentDetail() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const searchParams = new URLSearchParams(window.location.search);
    const agentId = searchParams.get('id');
    
    const [showHireModal, setShowHireModal] = useState(false);
    const [hireForm, setHireForm] = useState({
        merchant_name: '',
        merchant_contact: '',
        plan_type: 'monthly',
        workspace_id: ''
    });
    const [timeRange, setTimeRange] = useState('30d');

    const { data: agent, isLoading: agentLoading } = useQuery({
        queryKey: ['agent', agentId],
        queryFn: async () => {
            const agents = await base44.entities.Agent.list();
            return agents.find(a => a.id === agentId);
        },
        enabled: !!agentId
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
            toast.success('✨ AI员工已成功添加到您的工作台！');
            setShowHireModal(false);
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
            agent_id: agent.id,
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

    if (agentLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-6xl mx-auto space-y-6">
                    <Skeleton className="h-12 w-64" />
                    <Skeleton className="h-96 w-full" />
                </div>
            </div>
        );
    }

    if (!agent) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">AI员工未找到</h2>
                    <Button onClick={() => navigate(-1)}>返回市场</Button>
                </div>
            </div>
        );
    }

    const avgRating = agent.employer_reviews?.length > 0
        ? (agent.employer_reviews.reduce((sum, r) => sum + r.rating, 0) / agent.employer_reviews.length).toFixed(1)
        : 0;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-8 py-6">
                    <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        返回市场
                    </Button>

                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-6">
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-4xl overflow-hidden">
                                {agent.avatar ? (
                                    <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
                                ) : (
                                    '🤖'
                                )}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{agent.name}</h1>
                                <div className="flex items-center gap-3 mb-4">
                                    {agent.function && (
                                        <Badge variant="outline" className="text-sm">
                                            职能: {agent.function}
                                        </Badge>
                                    )}
                                    {agent.position && (
                                        <Badge variant="outline" className="text-sm">
                                            岗位: {agent.position}
                                        </Badge>
                                    )}
                                    {agent.employer_reviews?.length > 0 && (
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <span className="font-semibold text-gray-900">{avgRating}</span>
                                            <span className="text-gray-500">({agent.employer_reviews.length} 评价)</span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-gray-600 max-w-2xl">{agent.description}</p>
                            </div>
                        </div>

                        <div className="text-right">
                            {agent.price_monthly && (
                                <div className="mb-4">
                                    <span className="text-3xl font-bold text-gray-900">¥{agent.price_monthly}</span>
                                    <span className="text-gray-500">/月</span>
                                </div>
                            )}
                            {agent.type === 'tradeable' && (
                                <Button 
                                    onClick={() => setShowHireModal(true)}
                                    className="bg-gradient-to-r from-indigo-500 to-purple-600"
                                >
                                    立即雇佣
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-8 py-8">
                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="bg-white border border-gray-200">
                        <TabsTrigger value="overview">总览</TabsTrigger>
                        <TabsTrigger value="achievements">过往战绩</TabsTrigger>
                        <TabsTrigger value="cases">实操案例</TabsTrigger>
                        <TabsTrigger value="reviews">雇主评价</TabsTrigger>
                        <TabsTrigger value="performance">历史数据</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        {/* Skills */}
                        {agent.skills?.length > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl p-6 border border-gray-200"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-indigo-500" />
                                    核心技能
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {agent.skills.map((skill, i) => (
                                        <Badge key={i} className="bg-indigo-50 text-indigo-600 border-0 px-4 py-2 text-sm">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Industries */}
                        {agent.industries?.length > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-2xl p-6 border border-gray-200"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">适用行业</h3>
                                <div className="flex flex-wrap gap-2">
                                    {agent.industries.map((industry, i) => (
                                        <Badge key={i} variant="outline">
                                            {industry}
                                        </Badge>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Performance Metrics */}
                        {agent.performance_metrics && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl p-6 border border-gray-200"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">关键指标</h3>
                                <div className="grid grid-cols-3 gap-6">
                                    {agent.performance_metrics.response_rate && (
                                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                                            <div className="text-3xl font-bold text-gray-900 mb-1">
                                                {agent.performance_metrics.response_rate}%
                                            </div>
                                            <div className="text-sm text-gray-500">响应率</div>
                                        </div>
                                    )}
                                    {agent.performance_metrics.satisfaction_score && (
                                        <div className="text-center p-4 bg-indigo-50 rounded-xl">
                                            <div className="text-3xl font-bold text-indigo-600 mb-1">
                                                {agent.performance_metrics.satisfaction_score}%
                                            </div>
                                            <div className="text-sm text-gray-500">满意度</div>
                                        </div>
                                    )}
                                    {agent.performance_metrics.tasks_completed && (
                                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                                            <div className="text-3xl font-bold text-gray-900 mb-1">
                                                {agent.performance_metrics.tasks_completed.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-gray-500">完成任务</div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </TabsContent>

                    {/* Achievements Tab */}
                    <TabsContent value="achievements">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl p-6 border border-gray-200"
                        >
                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <Award className="w-5 h-5 text-yellow-500" />
                                过往战绩
                            </h3>
                            {agent.achievements?.length > 0 ? (
                                <div className="space-y-4">
                                    {agent.achievements.map((achievement, i) => (
                                        <div key={i} className="border-l-4 border-indigo-500 pl-4 py-2">
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                                                <span className="text-sm text-gray-500">{achievement.date}</span>
                                            </div>
                                            <p className="text-gray-600 mb-2">{achievement.description}</p>
                                            {achievement.metrics && (
                                                <div className="flex gap-4 text-sm">
                                                    {Object.entries(achievement.metrics).map(([key, value]) => (
                                                        <div key={key} className="bg-gray-50 px-3 py-1 rounded">
                                                            <span className="text-gray-500">{key}: </span>
                                                            <span className="font-semibold text-gray-900">{value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    暂无战绩记录
                                </div>
                            )}
                        </motion.div>
                    </TabsContent>

                    {/* Case Studies Tab */}
                    <TabsContent value="cases">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {agent.case_studies?.length > 0 ? (
                                agent.case_studies.map((caseStudy, i) => (
                                    <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200">
                                        <div className="flex items-start justify-between mb-4">
                                            <h4 className="text-xl font-semibold text-gray-900">{caseStudy.title}</h4>
                                            {caseStudy.industry && (
                                                <Badge variant="outline">{caseStudy.industry}</Badge>
                                            )}
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <h5 className="text-sm font-semibold text-gray-700 mb-2">挑战</h5>
                                                <p className="text-gray-600">{caseStudy.challenge}</p>
                                            </div>
                                            <div>
                                                <h5 className="text-sm font-semibold text-gray-700 mb-2">解决方案</h5>
                                                <p className="text-gray-600">{caseStudy.solution}</p>
                                            </div>
                                            <div>
                                                <h5 className="text-sm font-semibold text-gray-700 mb-2">成果</h5>
                                                <p className="text-gray-600">{caseStudy.results}</p>
                                            </div>
                                            {caseStudy.images?.length > 0 && (
                                                <div className="grid grid-cols-3 gap-4 mt-4">
                                                    {caseStudy.images.map((img, idx) => (
                                                        <img key={idx} src={img} alt={`案例图片 ${idx + 1}`} className="rounded-lg w-full h-40 object-cover" />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white rounded-2xl p-12 text-center text-gray-500 border border-gray-200">
                                    暂无实操案例
                                </div>
                            )}
                        </motion.div>
                    </TabsContent>

                    {/* Reviews Tab */}
                    <TabsContent value="reviews">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl p-6 border border-gray-200"
                        >
                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <Users className="w-5 h-5 text-indigo-500" />
                                雇主评价
                            </h3>
                            {agent.employer_reviews?.length > 0 ? (
                                <div className="space-y-6">
                                    {/* Rating Summary */}
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <div className="flex items-center gap-6">
                                            <div className="text-center">
                                                <div className="text-4xl font-bold text-gray-900 mb-1">{avgRating}</div>
                                                <div className="flex items-center gap-1 mb-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-4 h-4 ${i < Math.round(avgRating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                                                    ))}
                                                </div>
                                                <div className="text-sm text-gray-500">{agent.employer_reviews.length} 评价</div>
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                {agent.employer_reviews[0]?.dimensions && Object.entries(agent.employer_reviews[0].dimensions).map(([key, value]) => (
                                                    <div key={key} className="flex items-center gap-3">
                                                        <span className="text-sm text-gray-600 w-20">{key === 'efficiency' ? '效率' : key === 'accuracy' ? '准确性' : '易用性'}</span>
                                                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                            <div className="h-full bg-indigo-500" style={{ width: `${value * 20}%` }} />
                                                        </div>
                                                        <span className="text-sm font-semibold text-gray-900">{value}/5</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Reviews List */}
                                    <div className="space-y-4">
                                        {agent.employer_reviews.map((review, i) => (
                                            <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <div className="font-semibold text-gray-900">{review.employer_name}</div>
                                                        <div className="flex items-center gap-1 mt-1">
                                                            {[...Array(5)].map((_, idx) => (
                                                                <Star key={idx} className={`w-3 h-3 ${idx < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <span className="text-sm text-gray-500">{review.date}</span>
                                                </div>
                                                <p className="text-gray-600">{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    暂无雇主评价
                                </div>
                            )}
                        </motion.div>
                    </TabsContent>

                    {/* Performance Tab */}
                    <TabsContent value="performance">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl p-6 border border-gray-200"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-indigo-500" />
                                    历史性能数据
                                </h3>
                                <div className="flex gap-2">
                                    {['7d', '30d', '90d'].map(range => (
                                        <Button
                                            key={range}
                                            variant={timeRange === range ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setTimeRange(range)}
                                        >
                                            {range === '7d' ? '近7天' : range === '30d' ? '近30天' : '近90天'}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            {agent.performance_history ? (
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={agent.performance_history.response_time || []}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <RechartsTooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="value" stroke="#6366F1" name="响应时间(ms)" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    暂无历史数据
                                </div>
                            )}
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Hire Modal */}
            <Dialog open={showHireModal} onOpenChange={setShowHireModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>雇佣 {agent.name}</DialogTitle>
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
                                        月度套餐 - ¥{agent.price_monthly}/月
                                    </Label>
                                </div>
                                {agent.price_yearly && (
                                    <div className="flex items-center space-x-2 p-3 border rounded-lg border-indigo-200 bg-indigo-50/50">
                                        <RadioGroupItem value="yearly" id="yearly" />
                                        <Label htmlFor="yearly" className="flex-grow cursor-pointer">
                                            年度套餐 - ¥{agent.price_yearly}/年
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
    );
}
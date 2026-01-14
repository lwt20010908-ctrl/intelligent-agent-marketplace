import React from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Users, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CaseStudies() {
    const cases = [
        {
            company: '华为推送服务',
            logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop',
            industry: '科技',
            challenge: '每日需处理数千万级推送请求，人工运营成本高昂，用户流失率居高不下',
            solution: '部署AI智能推送助手，实现个性化推送策略和自动化用户运营',
            results: [
                { metric: '推送打开率', value: '+156%', icon: TrendingUp },
                { metric: '用户留存', value: '+87%', icon: Users },
                { metric: '运营成本', value: '-65%', icon: Zap }
            ],
            testimonial: '"AI智能体完全改变了我们的推送运营模式，效果超出预期。"',
            author: '华为推送产品经理',
            color: 'from-red-500 to-orange-500'
        },
        {
            company: '淘宝流量运营',
            logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop',
            industry: '电商',
            challenge: '大促期间流量分配不均，转化率低，需要7×24小时人工监控',
            solution: '引入AI流量智能调度系统，自动优化流量分配和商品推荐策略',
            results: [
                { metric: '转化率', value: '+203%', icon: TrendingUp },
                { metric: '流量利用效率', value: '+124%', icon: Zap },
                { metric: '人工成本', value: '-78%', icon: Users }
            ],
            testimonial: '"大促期间的流量运营完全实现自动化，ROI提升显著。"',
            author: '淘宝运营总监',
            color: 'from-orange-500 to-amber-500'
        },
        {
            company: '小米IoT平台',
            logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
            industry: '物联网',
            challenge: '智能设备激活率低，用户咨询量大，客服压力巨大',
            solution: '部署AI客服智能体和设备激活助手，提供24小时智能化服务',
            results: [
                { metric: '设备激活率', value: '+267%', icon: TrendingUp },
                { metric: '客服响应速度', value: '+340%', icon: Zap },
                { metric: '用户满意度', value: '98.5%', icon: Users }
            ],
            testimonial: '"AI客服不仅降低了成本，更提升了用户体验，是双赢的解决方案。"',
            author: '小米IoT负责人',
            color: 'from-amber-500 to-yellow-500'
        }
    ];

    const benefits = [
        { icon: TrendingUp, title: '效率提升', description: '平均提升300%工作效率' },
        { icon: Zap, title: '成本降低', description: '运营成本平均降低70%' },
        { icon: Users, title: '体验优化', description: '用户满意度超过95%' },
        { icon: Award, title: '快速部署', description: '7天内即可上线运行' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Award className="w-6 h-6 text-indigo-500" />
                        <span className="text-indigo-600 font-semibold text-sm tracking-wide uppercase">成功案例</span>
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        客户成功故事
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        看看顶级企业如何通过AI智能体实现业务突破
                    </p>
                </motion.div>

                {/* Benefits Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid md:grid-cols-4 gap-6 mb-16"
                >
                    {benefits.map((benefit, i) => {
                        const Icon = benefit.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all"
                            >
                                <Icon className="w-10 h-10 text-indigo-500 mx-auto mb-4" />
                                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                                <p className="text-sm text-gray-600">{benefit.description}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Case Studies */}
                <div className="space-y-12">
                    {cases.map((caseStudy, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                        >
                            <Card className="overflow-hidden hover:shadow-2xl transition-all">
                                <div className={`h-2 bg-gradient-to-r ${caseStudy.color}`} />
                                <CardHeader className="bg-white">
                                    <div className="flex items-start gap-6">
                                        <img
                                            src={caseStudy.logo}
                                            alt={caseStudy.company}
                                            className="w-20 h-20 rounded-xl object-cover"
                                        />
                                        <div className="flex-grow">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h2 className="text-2xl font-bold text-gray-900">{caseStudy.company}</h2>
                                                <Badge variant="secondary">{caseStudy.industry}</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="bg-white pt-6">
                                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                                                    <span className="text-red-600 text-xs">!</span>
                                                </div>
                                                面临挑战
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">{caseStudy.challenge}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                <CheckCircle className="w-5 h-5 text-green-600" />
                                                解决方案
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">{caseStudy.solution}</p>
                                        </div>
                                    </div>

                                    {/* Results */}
                                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                                        {caseStudy.results.map((result, i) => {
                                            const ResultIcon = result.icon;
                                            return (
                                                <div key={i} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 text-center">
                                                    <ResultIcon className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                                                    <div className="text-3xl font-bold text-indigo-600 mb-1">{result.value}</div>
                                                    <div className="text-sm text-gray-600">{result.metric}</div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Testimonial */}
                                    <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-indigo-500">
                                        <p className="text-gray-700 italic mb-3 text-lg">{caseStudy.testimonial}</p>
                                        <p className="text-gray-600 font-medium">— {caseStudy.author}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-12 text-white text-center"
                >
                    <h2 className="text-3xl font-bold mb-4">准备开启您的成功故事？</h2>
                    <p className="text-indigo-100 mb-8 text-lg">
                        立即开始使用AI智能体，让您的业务也能实现突破性增长
                    </p>
                    <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                        开始免费试用 <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
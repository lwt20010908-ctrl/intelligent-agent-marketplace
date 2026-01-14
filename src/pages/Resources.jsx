import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, FileText, Download, ExternalLink, Lightbulb, Users, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Resources() {
    const resourceCategories = [
        {
            title: '入门指南',
            icon: BookOpen,
            color: 'from-blue-500 to-cyan-500',
            resources: [
                { name: 'AI智能体快速入门', type: '文档', icon: FileText },
                { name: '如何选择合适的智能体', type: '视频', icon: Video },
                { name: '部署最佳实践', type: '文档', icon: FileText }
            ]
        },
        {
            title: '行业案例',
            icon: Lightbulb,
            color: 'from-purple-500 to-pink-500',
            resources: [
                { name: '电商行业应用白皮书', type: 'PDF', icon: Download },
                { name: '客服智能体成功案例', type: '文档', icon: FileText },
                { name: '营销自动化实践指南', type: '视频', icon: Video }
            ]
        },
        {
            title: '开发者文档',
            icon: Zap,
            color: 'from-indigo-500 to-purple-600',
            resources: [
                { name: 'API接口文档', type: '文档', icon: FileText },
                { name: '自定义智能体开发', type: '文档', icon: FileText },
                { name: 'SDK使用说明', type: '文档', icon: FileText }
            ]
        },
        {
            title: '社区资源',
            icon: Users,
            color: 'from-green-500 to-emerald-500',
            resources: [
                { name: '开发者论坛', type: '外部链接', icon: ExternalLink },
                { name: '技术博客', type: '外部链接', icon: ExternalLink },
                { name: '常见问题解答', type: '文档', icon: FileText }
            ]
        }
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
                        <BookOpen className="w-6 h-6 text-indigo-500" />
                        <span className="text-indigo-600 font-semibold text-sm tracking-wide uppercase">学习中心</span>
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        资源中心
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        获取文档、教程和最佳实践，充分发挥AI智能体的潜力
                    </p>
                </motion.div>

                {/* Resource Categories */}
                <div className="space-y-12">
                    {resourceCategories.map((category, catIndex) => {
                        const CategoryIcon = category.icon;
                        return (
                            <motion.div
                                key={catIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + catIndex * 0.1 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                                        <CategoryIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900">{category.title}</h2>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {category.resources.map((resource, resIndex) => {
                                        const ResourceIcon = resource.icon;
                                        return (
                                            <motion.div
                                                key={resIndex}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 + catIndex * 0.1 + resIndex * 0.05 }}
                                            >
                                                <Card className="hover:shadow-lg transition-all cursor-pointer group">
                                                    <CardHeader>
                                                        <div className="flex items-start justify-between">
                                                            <ResourceIcon className="w-8 h-8 text-indigo-500 mb-3" />
                                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                                {resource.type}
                                                            </span>
                                                        </div>
                                                        <CardTitle className="text-lg group-hover:text-indigo-600 transition-colors">
                                                            {resource.name}
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <Button variant="ghost" className="w-full group-hover:bg-indigo-50 group-hover:text-indigo-600">
                                                            查看详情
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-12 text-white text-center"
                >
                    <h2 className="text-3xl font-bold mb-4">需要更多帮助？</h2>
                    <p className="text-indigo-100 mb-8 text-lg">
                        联系我们的技术支持团队，获取专业指导
                    </p>
                    <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                        联系支持
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
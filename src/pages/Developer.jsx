import React from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, Book, Users, Lock, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Developer() {
    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <Badge variant="secondary" className="mb-4">
                        <Lock className="w-3 h-3 mr-1" />
                        即将开放
                    </Badge>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        开发者社区
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        构建、分享和部署您的智能体，与全球开发者一起探索AI的无限可能
                    </p>
                </motion.div>

                {/* Coming Soon Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-16"
                >
                    <Card className="border-2 border-dashed border-gray-300 bg-white/50">
                        <CardContent className="py-20 text-center">
                            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-6">
                                <Terminal className="w-10 h-10 text-indigo-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                开发者平台正在建设中
                            </h2>
                            <p className="text-gray-500 max-w-md mx-auto mb-8">
                                我们正在打造一个强大的开发者生态系统，让您能够创建、定制和分享智能体。
                                敬请期待！
                            </p>
                            <Button variant="outline" disabled>
                                敬请期待
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Features Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        即将推出的功能
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Code,
                                title: 'SDK & API',
                                description: '完整的开发工具包，支持多种编程语言',
                                status: '开发中'
                            },
                            {
                                icon: Book,
                                title: '开发文档',
                                description: '详尽的API文档和最佳实践指南',
                                status: '规划中'
                            },
                            {
                                icon: Users,
                                title: '社区论坛',
                                description: '与其他开发者交流、分享经验',
                                status: '规划中'
                            }
                        ].map((feature, i) => (
                            <Card key={i} className="bg-white border-gray-100 hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                                            <feature.icon className="w-6 h-6 text-gray-400" />
                                        </div>
                                        <Badge variant="secondary" className="text-xs">
                                            {feature.status}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-lg text-gray-400">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-400 text-sm">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </motion.div>

                {/* Newsletter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-16"
                >
                    <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 border-0 text-white">
                        <CardContent className="py-12 text-center">
                            <h3 className="text-2xl font-bold mb-4">
                                获取开发者平台最新动态
                            </h3>
                            <p className="text-white/80 mb-8 max-w-md mx-auto">
                                订阅我们的开发者通讯，第一时间获取API开放、功能更新等消息
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="输入您的邮箱"
                                    className="flex-grow px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                                />
                                <Button className="bg-white text-indigo-600 hover:bg-gray-100">
                                    订阅
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
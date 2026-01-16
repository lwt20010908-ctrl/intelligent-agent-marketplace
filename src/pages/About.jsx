import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { 
    Target, Users, Lightbulb, Award, 
    ArrowRight, MapPin, Mail, Phone 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MarketTicker from '../components/home/MarketTicker';

const team = [
    {
        name: '张明',
        role: 'CEO & 创始人',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
        bio: '前阿里巴巴AI实验室负责人，15年AI行业经验'
    },
    {
        name: '李婷',
        role: 'CTO',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
        bio: '前字节跳动技术专家，自然语言处理领域专家'
    },
    {
        name: '王浩',
        role: '产品VP',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
        bio: '前腾讯产品总监，10年ToB产品经验'
    }
];

const milestones = [
    { year: '2021', title: '公司成立', desc: '获得天使轮融资' },
    { year: '2022', title: '产品发布', desc: '智能客服1.0上线' },
    { year: '2023', title: '战略合作', desc: '与头部手机厂商达成合作' },
    { year: '2024', title: '规模化', desc: '服务商家突破500家' }
];

export default function About() {
    return (
        <div className="min-h-screen bg-white pt-28 pb-20">
            {/* Hero */}
            <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                        让AI成为每个企业的
                        <br />
                        <span className="gradient-text">智能员工</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                        告别繁琐重复，让智慧涌动。在AI人才市场，找到与您业务完美契合的智能解决方案
                    </p>
                </motion.div>
            </section>

            {/* Market Ticker */}
            <MarketTicker />

            {/* Mission & Values */}
            <section className="bg-gray-50 py-24">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                icon: Target,
                                title: '使命',
                                desc: '让AI触手可及，赋能每一个企业'
                            },
                            {
                                icon: Lightbulb,
                                title: '愿景',
                                desc: '成为全球领先的企业AI智能体平台'
                            },
                            {
                                icon: Award,
                                title: '价值观',
                                desc: '客户第一、技术驱动、开放协作'
                            }
                        ].map((item, i) => (
                            <Card key={i} className="border-0 shadow-lg">
                                <CardContent className="p-8 text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
                                        <item.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-500">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            发展历程
                        </h2>
                        <p className="text-gray-500">从0到1，我们一直在前进</p>
                    </motion.div>

                    <div className="relative">
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 hidden md:block" />
                        <div className="space-y-12">
                            {milestones.map((milestone, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`flex flex-col md:flex-row items-center gap-8 ${
                                        i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                                >
                                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <div className="bg-white p-6 rounded-2xl shadow-lg inline-block">
                                            <div className="text-indigo-500 font-bold text-lg mb-1">
                                                {milestone.year}
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                {milestone.title}
                                            </h3>
                                            <p className="text-gray-500">{milestone.desc}</p>
                                        </div>
                                    </div>
                                    <div className="w-4 h-4 rounded-full bg-indigo-500 z-10 hidden md:block" />
                                    <div className="flex-1" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="bg-gray-50 py-24">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            核心团队
                        </h2>
                        <p className="text-gray-500">来自顶级科技公司的精英团队</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="border-0 shadow-lg overflow-hidden group">
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={member.avatar}
                                            alt={member.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <CardContent className="p-6 text-center">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                                            {member.name}
                                        </h3>
                                        <div className="text-indigo-500 text-sm font-medium mb-3">
                                            {member.role}
                                        </div>
                                        <p className="text-gray-500 text-sm">{member.bio}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="py-24">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                                联系我们
                            </h2>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                如果您对我们的产品有任何问题，或者想要了解更多关于智能体解决方案的信息，
                                欢迎随时与我们联系。
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-indigo-500" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">地址</div>
                                        <div className="text-gray-900">北京市海淀区中关村科技园</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-indigo-500" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">邮箱</div>
                                        <div className="text-gray-900">contact@aimarket.com</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-indigo-500" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">电话</div>
                                        <div className="text-gray-900">400-888-8888</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="border-0 shadow-2xl">
                                <CardContent className="p-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                                        发送消息
                                    </h3>
                                    <form className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="您的姓名"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                        />
                                        <input
                                            type="email"
                                            placeholder="邮箱地址"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                        />
                                        <textarea
                                            placeholder="您的留言..."
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                                        />
                                        <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 h-12">
                                            发送消息
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
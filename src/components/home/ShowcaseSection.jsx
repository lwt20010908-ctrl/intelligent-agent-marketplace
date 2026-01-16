import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';

const showcaseAgents = [
    {
        name: '华为Push智能分发',
        partner: '华为消费者业务',
        position: '智能推送优化官 · 华为专享',
        daysActive: 482,
        revenueIncrease: '2,800 万',
        metrics: {
            workHoursSaved: '12,400 h',
            costSaved: '450k',
            efficiencyGrowth: '+300%'
        },
        skills: ['商品属性分析', '用户触达', '投放人群计算']
    },
    {
        name: '淘宝流量智能分发',
        partner: '淘宝平台',
        position: 'GMV归因分析师 · 淘宝专享',
        daysActive: 628,
        revenueIncrease: '4,200 万',
        metrics: {
            workHoursSaved: '18,900 h',
            costSaved: '680k',
            efficiencyGrowth: '+420%'
        },
        skills: ['实时流量调度', 'GMV归因', 'A/B策略优化']
    },
    {
        name: '小米IoT场景助手',
        partner: '小米集团',
        position: '智能场景设计师 · 小米专享',
        daysActive: 365,
        revenueIncrease: '1,850 万',
        metrics: {
            workHoursSaved: '9,200 h',
            costSaved: '320k',
            efficiencyGrowth: '+180%'
        },
        skills: ['场景自动生成', '设备联动', '销售转化']
    },
    {
        name: '京东智能客服',
        partner: '京东零售',
        position: '7x24小时在线客服 · 京东专享',
        daysActive: 520,
        revenueIncrease: '3,600 万',
        metrics: {
            workHoursSaved: '16,200 h',
            costSaved: '580k',
            efficiencyGrowth: '+350%'
        },
        skills: ['自然语言理解', '订单处理', '情绪识别']
    },
    {
        name: '美团配送优化师',
        partner: '美团外卖',
        position: '智能调度专家 · 美团专享',
        daysActive: 445,
        revenueIncrease: '2,200 万',
        metrics: {
            workHoursSaved: '11,800 h',
            costSaved: '420k',
            efficiencyGrowth: '+280%'
        },
        skills: ['路径规划', '实时调度', '时效预测']
    },
    {
        name: '抖音内容推荐',
        partner: '字节跳动',
        position: '算法推荐官 · 抖音专享',
        daysActive: 580,
        revenueIncrease: '5,100 万',
        metrics: {
            workHoursSaved: '21,500 h',
            costSaved: '780k',
            efficiencyGrowth: '+480%'
        },
        skills: ['兴趣建模', '内容分发', 'CTR优化']
    },
    {
        name: '拼多多助力裂变',
        partner: '拼多多',
        position: '社交裂变专家 · 拼多多专享',
        daysActive: 398,
        revenueIncrease: '3,100 万',
        metrics: {
            workHoursSaved: '14,600 h',
            costSaved: '520k',
            efficiencyGrowth: '+320%'
        },
        skills: ['社交图谱', '裂变策略', '用户留存']
    },
    {
        name: '滴滴需求预测',
        partner: '滴滴出行',
        position: '智能调度官 · 滴滴专享',
        daysActive: 512,
        revenueIncrease: '2,900 万',
        metrics: {
            workHoursSaved: '13,400 h',
            costSaved: '480k',
            efficiencyGrowth: '+310%'
        },
        skills: ['需求预测', '供需平衡', '热力分析']
    },
    {
        name: '网易云音乐推荐',
        partner: '网易云音乐',
        position: '个性化推荐师 · 网易专享',
        daysActive: 432,
        revenueIncrease: '1,950 万',
        metrics: {
            workHoursSaved: '9,800 h',
            costSaved: '350k',
            efficiencyGrowth: '+220%'
        },
        skills: ['音乐标签', '协同过滤', '用户画像']
    },
    {
        name: 'B站UP主助手',
        partner: '哔哩哔哩',
        position: '内容运营官 · B站专享',
        daysActive: 376,
        revenueIncrease: '2,400 万',
        metrics: {
            workHoursSaved: '10,900 h',
            costSaved: '390k',
            efficiencyGrowth: '+260%'
        },
        skills: ['热点捕捉', '标题优化', '发布时机']
    },
    {
        name: '携程酒店定价',
        partner: '携程旅行',
        position: '动态定价专家 · 携程专享',
        daysActive: 468,
        revenueIncrease: '3,400 万',
        metrics: {
            workHoursSaved: '15,200 h',
            costSaved: '550k',
            efficiencyGrowth: '+340%'
        },
        skills: ['价格弹性', '竞品监控', '收益管理']
    },
    {
        name: '快手直播运营',
        partner: '快手科技',
        position: '直播增长官 · 快手专享',
        daysActive: 402,
        revenueIncrease: '2,650 万',
        metrics: {
            workHoursSaved: '12,100 h',
            costSaved: '440k',
            efficiencyGrowth: '+290%'
        },
        skills: ['直播推流', '互动优化', '转化提升']
    }
];

export default function ShowcaseSection() {
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);
            return () => {
                container.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            };
        }
    }, []);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 mb-6"
                    >
                        <span className="text-sm font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">成功案例 · 最佳实践</span>
                    </motion.div>
                    <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                            Multiverse 名人堂
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        顶尖员工精锐。真实数据验证，可立即复制的增长引擎
                    </p>
                </motion.div>

                {/* 轮播容器 */}
                <div className="relative">
                    {/* 左侧渐变遮罩 */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
                    
                    {/* 右侧渐变遮罩 */}
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

                    {/* 左箭头按钮 */}
                    {canScrollLeft && (
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>
                    )}

                    {/* 右箭头按钮 */}
                    {canScrollRight && (
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>
                    )}

                    {/* 滚动容器 */}
                    <div 
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            WebkitOverflowScrolling: 'touch'
                        }}
                    >
                        <style jsx>{`
                            .scrollbar-hide::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        {showcaseAgents.map((agent, i) => (
                            <div
                                key={i}
                                className="relative group flex-shrink-0 w-[380px] snap-center"
                            >
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
                            
                            <div className="relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-indigo-300 transition-all duration-500 h-full overflow-hidden shadow-lg hover:shadow-xl">
                                {/* A. 身份栏 */}
                                <div className="flex items-start justify-between mb-8">
                                    <div>
                                        <h3 className="text-gray-900 font-bold text-lg mb-1">
                                            {agent.position}
                                        </h3>
                                    </div>
                                    {/* 状态：呼吸动画绿点 + 运行时长 */}
                                    <div className="flex items-center gap-2 text-sm">
                                        <motion.div
                                            animate={{ 
                                                opacity: [0.4, 1, 0.4],
                                                scale: [1, 1.2, 1]
                                            }}
                                            transition={{ 
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"
                                        />
                                        <span className="text-emerald-600 font-medium">
                                            运行时长: {agent.daysActive}天
                                        </span>
                                    </div>
                                </div>

                                {/* B. 核心数据区 - 左右分栏 */}
                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    {/* 左侧：大数字 */}
                                    <div className="flex flex-col justify-center">
                                        <div className="text-sm text-gray-500 mb-2">累计GMV增长</div>
                                        <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                            + ¥{agent.revenueIncrease}
                                        </div>
                                    </div>
                                    
                                    {/* 右侧：纯绿色发光折线图 */}
                                    <div className="flex items-center">
                                        <svg className="w-full h-24" viewBox="0 0 120 80" preserveAspectRatio="none">
                                            {/* 面积填充 */}
                                            <defs>
                                                <linearGradient id={`gradient-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                                                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                                                </linearGradient>
                                                <filter id={`glow-${i}`}>
                                                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                                                    <feMerge>
                                                        <feMergeNode in="coloredBlur"/>
                                                        <feMergeNode in="SourceGraphic"/>
                                                    </feMerge>
                                                </filter>
                                            </defs>
                                            
                                            {/* 填充区域 */}
                                            <motion.path
                                                initial={{ pathLength: 0 }}
                                                whileInView={{ pathLength: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, delay: i * 0.15 + 0.3 }}
                                                d="M 0 70 Q 20 50, 40 45 T 80 25 T 120 15 L 120 80 L 0 80 Z"
                                                fill={`url(#gradient-${i})`}
                                            />
                                            
                                            {/* 发光线条 */}
                                            <motion.path
                                                initial={{ pathLength: 0 }}
                                                whileInView={{ pathLength: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, delay: i * 0.15 + 0.3 }}
                                                d="M 0 70 Q 20 50, 40 45 T 80 25 T 120 15"
                                                stroke="#10b981"
                                                strokeWidth="2.5"
                                                fill="none"
                                                filter={`url(#glow-${i})`}
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* C. 对比数据网格 - 3列 */}
                                <div className="grid grid-cols-3 gap-4 mb-6 p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900 mb-1">
                                            {agent.metrics.workHoursSaved}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            节省人工工时
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900 mb-1">
                                            ¥ {agent.metrics.costSaved}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            节省运营成本
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-emerald-600 mb-1">
                                            {agent.metrics.efficiencyGrowth}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            人效提升
                                        </div>
                                    </div>
                                </div>

                                {/* D. 底部技能芯片 */}
                                <div className="flex flex-wrap gap-2">
                                    {agent.skills.map((skill, j) => (
                                        <span 
                                            key={j} 
                                            className="px-3 py-1.5 bg-indigo-50 backdrop-blur-sm border border-indigo-200 text-xs text-indigo-700 rounded-full hover:bg-indigo-100 transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* 装饰性背景纹理 */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-100/50 to-transparent rounded-full blur-3xl pointer-events-none" />
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        to={createPageUrl('TalentShowcase')}
                        className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-semibold rounded-full hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 group"
                    >
                        查看更多AI员工 <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
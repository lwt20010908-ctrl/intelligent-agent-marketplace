import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, AlertTriangle, Lightbulb, Clock } from 'lucide-react';

export default function IntelligenceBriefing() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // 模拟智能简报数据
    const briefings = [
        {
            type: 'achievement',
            icon: TrendingUp,
            title: '战报：客服智能体完成100次咨询',
            content: '今日上午智能客服成功处理100次客户咨询，客户满意度达98%，转化率提升15%',
            time: '10分钟前',
            color: 'from-amber-400 to-yellow-500',
            bg: 'bg-amber-50',
            border: 'border-amber-200'
        },
        {
            type: 'alert',
            icon: AlertTriangle,
            title: '预警：库存即将不足',
            content: '检测到热销商品A的库存量已低于安全线，建议尽快补货以避免断货影响销售',
            time: '25分钟前',
            color: 'from-red-400 to-rose-500',
            bg: 'bg-red-50',
            border: 'border-red-200'
        },
        {
            type: 'suggestion',
            icon: Lightbulb,
            title: '建议：优化营销策略',
            content: '基于最近7天数据分析，建议在周末增加促销活动，预计可提升20%的转化率',
            time: '1小时前',
            color: 'from-blue-400 to-cyan-500',
            bg: 'bg-blue-50',
            border: 'border-blue-200'
        },
        {
            type: 'achievement',
            icon: TrendingUp,
            title: '战报：销售智能体成交订单',
            content: '销售助手今日成功促成12笔订单，累计成交金额达¥45,600，超出预期目标30%',
            time: '2小时前',
            color: 'from-amber-400 to-yellow-500',
            bg: 'bg-amber-50',
            border: 'border-amber-200'
        },
        {
            type: 'suggestion',
            icon: Lightbulb,
            title: '建议：客户分群运营机会',
            content: '发现高价值客户群体特征，建议针对性推送专属优惠，预计ROI可达3.5倍',
            time: '3小时前',
            color: 'from-blue-400 to-cyan-500',
            bg: 'bg-blue-50',
            border: 'border-blue-200'
        }
    ];

    // 自动轮播
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % briefings.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">智能情报简报</h3>
                    <p className="text-sm text-gray-500">实时业务洞察与建议</p>
                </div>
                <div className="flex gap-2">
                    {briefings.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                i === currentIndex ? 'bg-indigo-600 w-6' : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* 轮播内容 */}
            <div className="relative h-48 overflow-hidden">
                <AnimatePresence mode="wait">
                    {(() => {
                        const currentBriefing = briefings[currentIndex];
                        const IconComponent = currentBriefing.icon;
                        return (
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className={`absolute inset-0 p-6 rounded-xl border-2 ${currentBriefing.bg} ${currentBriefing.border}`}
                            >
                                <div className="flex items-start gap-4 h-full">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentBriefing.color} flex items-center justify-center flex-shrink-0`}>
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 mb-2 text-lg">
                                            {currentBriefing.title}
                                        </h4>
                                        <p className="text-gray-600 leading-relaxed mb-3">
                                            {currentBriefing.content}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Clock className="w-3 h-3" />
                                            {currentBriefing.time}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })()}
                </AnimatePresence>
            </div>

            {/* 历史简报列表 */}
            <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">历史简报</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                    {briefings.filter((_, i) => i !== currentIndex).map((item, i) => {
                        const ItemIcon = item.icon;
                        return (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(briefings.indexOf(item))}
                                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3 group"
                            >
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                                    <ItemIcon className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                                        {item.title}
                                    </div>
                                    <div className="text-xs text-gray-500">{item.time}</div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}
import React from 'react';
import { motion } from 'framer-motion';

const tickerData = [
    { type: 'trade', text: '🚀 刚刚：某美妆品牌 雇佣了 ', highlight: '华为Push AI运营', color: 'emerald' },
    { type: 'index', text: '📈 市场活跃 AI 员工数：', highlight: '12,400+', color: 'emerald' },
    { type: 'battle', text: '🏆 ', highlight: 'SEO 优化师', text2: ' 帮助客户流量提升 ', highlight2: '300%', color: 'emerald' },
    { type: 'trade', text: '🤝 2分钟前：深圳用户 (User_8921) 解锁了 ', highlight: 'AI店长', color: 'emerald' },
    { type: 'battle', text: '💎 ', highlight: 'AI Push 助手', text2: ' 昨日创造 GMV ', highlight2: '¥2,000,000', color: 'emerald' },
    { type: 'trade', text: '🔥 热销：', highlight: '短视频脚本专家', text2: ' 今日已成交 ', highlight2: '128 单', color: 'emerald' },
    { type: 'index', text: '💰 投放类员工平均薪资指数：', highlight: '+12.5% 🟢', color: 'emerald' },
    { type: 'trade', text: '🚀 5分钟前：杭州电商 雇佣了 ', highlight: '智能客服小助手', color: 'emerald' },
    { type: 'battle', text: '⚡ ', highlight: '数据分析师', text2: ' 为企业节省成本 ', highlight2: '¥800,000', color: 'emerald' },
    { type: 'index', text: '📊 今日平台交易量：', highlight: '+45.8% 🟢', color: 'emerald' },
    { type: 'trade', text: '🤝 刚刚：北京科技公司 签约 ', highlight: '智能运营官', color: 'emerald' },
    { type: 'battle', text: '🎯 ', highlight: '营销策略专家', text2: ' 帮助客户转化率提升 ', highlight2: '280%', color: 'emerald' },
    { type: 'trade', text: '🔥 热门：', highlight: '内容创作AI', text2: ' 本周成交 ', highlight2: '256 单', color: 'emerald' },
    { type: 'index', text: '📈 AI员工满意度指数：', highlight: '98.6% 🟢', color: 'emerald' },
    { type: 'battle', text: '💰 ', highlight: '智能投放官', text2: ' 为客户ROI提升 ', highlight2: '420%', color: 'emerald' },
    { type: 'trade', text: '🚀 10分钟前：上海零售 启用 ', highlight: '库存管理AI', color: 'emerald' },
    { type: 'index', text: '🔥 当前在线AI员工：', highlight: '8,932', color: 'emerald' },
    { type: 'battle', text: '🏆 ', highlight: '客服AI', text2: ' 处理咨询量突破 ', highlight2: '50万次', color: 'emerald' },
    { type: 'trade', text: '🤝 刚刚：成都餐饮 雇佣了 ', highlight: '外卖运营专家', color: 'emerald' },
    { type: 'index', text: '💎 平台累计服务企业：', highlight: '15,600+', color: 'emerald' }
];

export default function MarketTicker() {
    return (
        <div className="w-full bg-[#0A1628] border-t border-b border-gray-800/50 py-3 overflow-hidden">
            <div className="relative flex">
                {/* 创建两个相同的滚动条以实现无缝循环 */}
                {[0, 1].map((duplicateIndex) => (
                    <motion.div
                        key={duplicateIndex}
                        className="flex shrink-0 items-center gap-8"
                        animate={{
                            x: [0, -100 + '%']
                        }}
                        transition={{
                            duration: 60,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        whileHover={{ animationPlayState: 'paused' }}
                    >
                        {tickerData.map((item, i) => (
                            <div key={`${duplicateIndex}-${i}`} className="flex items-center gap-1.5 text-sm font-mono whitespace-nowrap">
                                <span className="text-gray-400">{item.text}</span>
                                <span className={`${
                                    item.color === 'emerald' ? 'text-emerald-400' : 
                                    item.color === 'red' ? 'text-red-400' : 
                                    'text-white'
                                } font-semibold`}>
                                    {item.highlight}
                                </span>
                                {item.text2 && (
                                    <>
                                        <span className="text-gray-400">{item.text2}</span>
                                        <span className={`${
                                            item.color === 'emerald' ? 'text-emerald-400' : 
                                            item.color === 'red' ? 'text-red-400' : 
                                            'text-white'
                                        } font-semibold`}>
                                            {item.highlight2}
                                        </span>
                                    </>
                                )}
                                <span className="text-gray-600 mx-2">|</span>
                            </div>
                        ))}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
import React from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

const categories = [
    { value: 'customer_service', label: '智能客服' },
    { value: 'sales', label: '销售助手' },
    { value: 'marketing', label: '营销专家' },
    { value: 'operations', label: '运营管理' },
    { value: 'analytics', label: '数据分析' },
    { value: 'content', label: '内容创作' }
];

export default function FilterSidebar({ 
    filters, 
    setFilters, 
    showMobile, 
    setShowMobile 
}) {
    const toggleCategory = (category) => {
        const newCategories = filters.categories.includes(category)
            ? filters.categories.filter(c => c !== category)
            : [...filters.categories, category];
        setFilters({ ...filters, categories: newCategories });
    };

    const content = (
        <div className="space-y-8">
            {/* Type Filter */}
            <div>
                <h4 className="font-medium text-gray-900 mb-4">智能体类型</h4>
                <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <Checkbox 
                            checked={filters.type === 'all'}
                            onCheckedChange={() => setFilters({ ...filters, type: 'all' })}
                        />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900">全部</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <Checkbox 
                            checked={filters.type === 'tradeable'}
                            onCheckedChange={() => setFilters({ ...filters, type: 'tradeable' })}
                        />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900">可雇佣</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <Checkbox 
                            checked={filters.type === 'showcase'}
                            onCheckedChange={() => setFilters({ ...filters, type: 'showcase' })}
                        />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900">展示案例</span>
                    </label>
                </div>
            </div>

            {/* Category Filter */}
            <div>
                <h4 className="font-medium text-gray-900 mb-4">能力分类</h4>
                <div className="space-y-3">
                    {categories.map(cat => (
                        <label key={cat.value} className="flex items-center gap-3 cursor-pointer group">
                            <Checkbox 
                                checked={filters.categories.includes(cat.value)}
                                onCheckedChange={() => toggleCategory(cat.value)}
                            />
                            <span className="text-sm text-gray-600 group-hover:text-gray-900">{cat.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Filter */}
            <div>
                <h4 className="font-medium text-gray-900 mb-4">价格范围</h4>
                <div className="px-2">
                    <Slider
                        value={[filters.maxPrice]}
                        onValueChange={([value]) => setFilters({ ...filters, maxPrice: value })}
                        max={10000}
                        step={100}
                        className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>¥0</span>
                        <span>¥{filters.maxPrice.toLocaleString()}/月</span>
                    </div>
                </div>
            </div>

            {/* Reset */}
            <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setFilters({ type: 'all', categories: [], maxPrice: 10000 })}
            >
                重置筛选
            </Button>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-28 bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                        <Filter className="w-5 h-5 text-gray-400" />
                        <h3 className="font-semibold text-gray-900">筛选</h3>
                    </div>
                    {content}
                </div>
            </div>

            {/* Mobile Sidebar */}
            {showMobile && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="lg:hidden fixed inset-0 z-50 bg-black/50"
                    onClick={() => setShowMobile(false)}
                >
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        className="absolute left-0 top-0 bottom-0 w-80 bg-white p-6 overflow-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Filter className="w-5 h-5 text-gray-400" />
                                <h3 className="font-semibold text-gray-900">筛选</h3>
                            </div>
                            <button onClick={() => setShowMobile(false)}>
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                        {content}
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}
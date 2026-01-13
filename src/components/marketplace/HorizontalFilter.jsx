import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function HorizontalFilter({ filters, setFilters }) {
    const categories = [
        { value: 'customer_service', label: '客户服务' },
        { value: 'sales', label: '销售营销' },
        { value: 'marketing', label: '市场推广' },
        { value: 'operations', label: '运营管理' },
        { value: 'analytics', label: '数据分析' },
        { value: 'content', label: '内容创作' },
    ];

    const types = [
        { value: 'all', label: '全部' },
        { value: 'showcase', label: '成功案例' },
        { value: 'tradeable', label: '可雇佣' },
    ];

    const toggleCategory = (category) => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category]
        }));
    };

    const clearFilters = () => {
        setFilters({
            type: 'all',
            categories: [],
            maxPrice: 10000
        });
    };

    const hasActiveFilters = filters.type !== 'all' || filters.categories.length > 0 || filters.maxPrice !== 10000;

    return (
        <div className="bg-white rounded-2xl border border-gray-200 mb-8">
            {/* Type Filter */}
            <div className="border-b border-gray-100 p-4">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 min-w-[80px]">类型:</span>
                    <div className="flex flex-wrap gap-2">
                        {types.map(type => (
                            <button
                                key={type.value}
                                onClick={() => setFilters(prev => ({ ...prev, type: type.value }))}
                                className={`px-4 py-1.5 text-sm rounded-lg transition-all ${
                                    filters.type === type.value
                                        ? 'bg-indigo-500 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {type.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="border-b border-gray-100 p-4">
                <div className="flex items-start gap-3">
                    <span className="text-sm font-medium text-gray-700 min-w-[80px] pt-1.5">分类:</span>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat.value}
                                onClick={() => toggleCategory(cat.value)}
                                className={`px-4 py-1.5 text-sm rounded-lg transition-all ${
                                    filters.categories.includes(cat.value)
                                        ? 'bg-indigo-500 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Price Filter */}
            <div className="p-4">
                <div className="flex items-start gap-3">
                    <span className="text-sm font-medium text-gray-700 min-w-[80px] pt-1">价格:</span>
                    <div className="flex-grow max-w-md">
                        <div className="flex items-center gap-4">
                            <Slider
                                value={[filters.maxPrice]}
                                onValueChange={(value) => setFilters(prev => ({ ...prev, maxPrice: value[0] }))}
                                max={10000}
                                min={0}
                                step={100}
                                className="flex-grow"
                            />
                            <span className="text-sm text-gray-600 min-w-[100px]">
                                ¥0 - ¥{filters.maxPrice}
                            </span>
                        </div>
                    </div>
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="text-gray-500 hover:text-gray-900"
                        >
                            <X className="w-4 h-4 mr-1" />
                            清空筛选
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
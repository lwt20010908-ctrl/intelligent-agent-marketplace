import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function HorizontalFilter({ filters, setFilters }) {
    const functions = [
        { value: '客服', label: '客服' },
        { value: '销售', label: '销售' },
        { value: '营销', label: '营销' },
        { value: '运营', label: '运营' },
        { value: '分析', label: '分析' },
        { value: '内容', label: '内容' },
    ];

    const positions = [
        { value: '初级', label: '初级' },
        { value: '中级', label: '中级' },
        { value: '高级', label: '高级' },
        { value: '专家', label: '专家' },
    ];

    const skillsList = [
        { value: '自然语言处理', label: 'NLP' },
        { value: '数据分析', label: '数据分析' },
        { value: '客户洞察', label: '客户洞察' },
        { value: '内容生成', label: '内容生成' },
        { value: '智能推荐', label: '智能推荐' },
        { value: '流程自动化', label: '流程自动化' },
    ];

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

    const toggleFunction = (func) => {
        setFilters(prev => ({
            ...prev,
            functions: prev.functions.includes(func)
                ? prev.functions.filter(f => f !== func)
                : [...prev.functions, func]
        }));
    };

    const togglePosition = (pos) => {
        setFilters(prev => ({
            ...prev,
            positions: prev.positions.includes(pos)
                ? prev.positions.filter(p => p !== pos)
                : [...prev.positions, pos]
        }));
    };

    const toggleSkill = (skill) => {
        setFilters(prev => ({
            ...prev,
            skills: prev.skills.includes(skill)
                ? prev.skills.filter(s => s !== skill)
                : [...prev.skills, skill]
        }));
    };

    const clearFilters = () => {
        setFilters({
            type: 'all',
            categories: [],
            functions: [],
            positions: [],
            skills: [],
            maxPrice: 10000
        });
    };

    const hasActiveFilters = filters.type !== 'all' || filters.categories.length > 0 || 
                             filters.functions?.length > 0 || filters.positions?.length > 0 || 
                             filters.skills?.length > 0 || filters.maxPrice !== 10000;

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

            {/* Function Filter */}
            <div className="border-b border-gray-100 p-4">
                <div className="flex items-start gap-3">
                    <span className="text-sm font-medium text-gray-700 min-w-[80px] pt-1.5">职能:</span>
                    <div className="flex flex-wrap gap-2">
                        {functions.map(func => (
                            <button
                                key={func.value}
                                onClick={() => toggleFunction(func.value)}
                                className={`px-4 py-1.5 text-sm rounded-lg transition-all ${
                                    filters.functions?.includes(func.value)
                                        ? 'bg-indigo-500 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {func.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Position Filter */}
            <div className="border-b border-gray-100 p-4">
                <div className="flex items-start gap-3">
                    <span className="text-sm font-medium text-gray-700 min-w-[80px] pt-1.5">岗位:</span>
                    <div className="flex flex-wrap gap-2">
                        {positions.map(pos => (
                            <button
                                key={pos.value}
                                onClick={() => togglePosition(pos.value)}
                                className={`px-4 py-1.5 text-sm rounded-lg transition-all ${
                                    filters.positions?.includes(pos.value)
                                        ? 'bg-indigo-500 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {pos.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Skills Filter */}
            <div className="border-b border-gray-100 p-4">
                <div className="flex items-start gap-3">
                    <span className="text-sm font-medium text-gray-700 min-w-[80px] pt-1.5">技能:</span>
                    <div className="flex flex-wrap gap-2">
                        {skillsList.map(skill => (
                            <button
                                key={skill.value}
                                onClick={() => toggleSkill(skill.value)}
                                className={`px-4 py-1.5 text-sm rounded-lg transition-all ${
                                    filters.skills?.includes(skill.value)
                                        ? 'bg-indigo-500 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {skill.label}
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
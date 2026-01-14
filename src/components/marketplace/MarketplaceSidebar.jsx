import React from 'react';
import { Search, Grid, List } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HorizontalFilter from './HorizontalFilter';

export default function MarketplaceSidebar({
    search,
    setSearch,
    viewMode,
    setViewMode,
    filters,
    setFilters
}) {
    return (
        <div className="w-72 bg-white border-r border-gray-100 p-6 overflow-y-auto">
            {/* 搜索框 */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        placeholder="搜索智能体..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 h-10 bg-gray-50 border-gray-200 rounded-lg"
                    />
                </div>
            </div>

            {/* 视图切换 */}
            <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">视图</h3>
                <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
                    <TabsList className="w-full grid grid-cols-2 h-9 bg-gray-100">
                        <TabsTrigger value="grid" className="text-xs">
                            <Grid className="w-4 h-4" />
                        </TabsTrigger>
                        <TabsTrigger value="list" className="text-xs">
                            <List className="w-4 h-4" />
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* 过滤器 */}
            <div className="space-y-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase">筛选</h3>
                <HorizontalFilter
                    filters={filters}
                    setFilters={setFilters}
                    vertical={true}
                />
            </div>
        </div>
    );
}
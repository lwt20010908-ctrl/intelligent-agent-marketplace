import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const logData = [
    { id: 1, time: '2026-01-13 14:32', user: '用户001', request: '请打开客厅的灯', response: '已成功打开客厅灯', duration: '0.8s', status: 'success' },
    { id: 2, time: '2026-01-13 14:28', user: '用户002', request: '当前温度是多少', response: '客厅温度26°C', duration: '0.3s', status: 'success' },
    { id: 3, time: '2026-01-13 14:20', user: '用户003', request: '空调故障报修', response: '已提交报修工单，预计2小时内回复', duration: '1.2s', status: 'success' },
    { id: 4, time: '2026-01-13 14:15', user: '用户004', request: '设置卧室温度28度', response: '已设置卧室温度为28°C', duration: '0.5s', status: 'success' },
    { id: 5, time: '2026-01-13 14:10', user: '用户005', request: '查看摄像头画面', response: '无权限访问此功能', duration: '0.4s', status: 'error' },
];

export default function InteractionLog() {
    const [search, setSearch] = useState('');
    const [filteredLogs, setFilteredLogs] = useState(logData);

    const handleSearch = (value) => {
        setSearch(value);
        setFilteredLogs(
            logData.filter(log =>
                log.request.toLowerCase().includes(value.toLowerCase()) ||
                log.user.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    const getStatusBadge = (status) => {
        return status === 'success' 
            ? <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">成功</span>
            : <span className="inline-block px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">失败</span>;
    };

    return (
        <div className="space-y-4">
            {/* Search & Filter */}
            <div className="flex gap-4 items-center">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="搜索请求或用户..."
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10 bg-white"
                    />
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="w-4 h-4" />
                    筛选
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    导出
                </Button>
            </div>

            {/* Logs Table */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50">
                                <th className="px-6 py-3 text-left font-semibold text-gray-700">时间</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-700">用户</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-700">用户请求</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-700">智能体响应</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-700">响应时长</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-700">状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {filteredLogs.map((log, index) => (
                                    <motion.tr
                                        key={log.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-gray-600">{log.time}</td>
                                        <td className="px-6 py-4 text-gray-900 font-medium">{log.user}</td>
                                        <td className="px-6 py-4 text-gray-700">{log.request}</td>
                                        <td className="px-6 py-4 text-gray-700">{log.response}</td>
                                        <td className="px-6 py-4 text-gray-600">{log.duration}</td>
                                        <td className="px-6 py-4">{getStatusBadge(log.status)}</td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {filteredLogs.length === 0 && (
                    <div className="p-12 text-center">
                        <p className="text-gray-500">未找到匹配的交互记录</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">显示 1-5 of 2,480</p>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>上一页</Button>
                    <Button variant="outline" size="sm">下一页</Button>
                </div>
            </div>
        </div>
    );
}
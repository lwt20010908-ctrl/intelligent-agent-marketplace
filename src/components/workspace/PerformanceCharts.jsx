import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from "@/components/ui/card";

const trendData = [
    { day: '周一', requests: 420, satisfaction: 88 },
    { day: '周二', requests: 450, satisfaction: 89 },
    { day: '周三', requests: 520, satisfaction: 91 },
    { day: '周四', requests: 580, satisfaction: 92 },
    { day: '周五', requests: 610, satisfaction: 93 },
    { day: '周六', requests: 480, satisfaction: 90 },
    { day: '周日', requests: 390, satisfaction: 87 },
];

const requestTypeData = [
    { name: '开关设备', value: 45, color: '#6366F1' },
    { name: '查询状态', value: 35, color: '#8B5CF6' },
    { name: '故障报修', value: 20, color: '#EC4899' },
];

const responseTimeData = [
    { hour: '00:00', time: 1.2 },
    { hour: '06:00', time: 0.8 },
    { hour: '12:00', time: 1.5 },
    { hour: '18:00', time: 2.0 },
    { hour: '23:00', time: 1.1 },
];

export default function PerformanceCharts() {
    return (
        <div className="grid lg:grid-cols-2 gap-6">
            {/* Request Trend */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">请求量趋势</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="requests" stroke="#6366F1" strokeWidth={2} name="请求数" />
                    </LineChart>
                </ResponsiveContainer>
            </Card>

            {/* Request Type Distribution */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">请求类型分布</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={requestTypeData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name} ${value}%`} outerRadius={100}>
                            {requestTypeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </Card>

            {/* Satisfaction Trend */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">满意度变化</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="day" />
                        <YAxis domain={[80, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="satisfaction" stroke="#10B981" strokeWidth={2} name="满意度 %" />
                    </LineChart>
                </ResponsiveContainer>
            </Card>

            {/* Response Time */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">响应时间分析</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={responseTimeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="time" fill="#F59E0B" name="平均响应时间(秒)" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
}
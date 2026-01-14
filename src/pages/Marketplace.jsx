import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { User, LogOut, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import MarketplaceContent from '../components/marketplace/MarketplaceContent';

export default function Marketplace() {
    const navigate = useNavigate();
    const { data: currentUser } = useQuery({
        queryKey: ['currentUser'],
        queryFn: () => base44.auth.me().catch(() => null)
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to={createPageUrl('Home')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">AI</span>
                            </div>
                            <span className="text-lg font-semibold text-gray-900">智能体市场</span>
                        </Link>

                        <div className="flex items-center gap-3">
                            {currentUser ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none">
                                            <Avatar className="w-8 h-8">
                                                <AvatarFallback className="bg-indigo-100 text-indigo-600 text-sm">
                                                    {currentUser?.company_name?.[0] || currentUser?.full_name?.[0] || 'M'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="hidden sm:block text-left">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {currentUser?.company_name || currentUser?.full_name || '商家'}
                                                </div>
                                                <div className="text-xs text-gray-500">{currentUser?.email}</div>
                                            </div>
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <div className="px-2 py-2">
                                            <div className="text-sm font-medium text-gray-900">
                                                {currentUser?.company_name || currentUser?.full_name}
                                            </div>
                                            <div className="text-xs text-gray-500">{currentUser?.email}</div>
                                        </div>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => navigate(createPageUrl('Dashboard'))}>
                                            <User className="w-4 h-4 mr-2" />
                                            我的工作台
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Settings className="w-4 h-4 mr-2" />
                                            设置
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => navigate(createPageUrl('Home'))}>
                                            <LogOut className="w-4 h-4 mr-2" />
                                            退出登录
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" onClick={() => navigate(createPageUrl('Home'))}>
                                        登录
                                    </Button>
                                    <Button className="bg-gradient-to-r from-indigo-500 to-purple-600">
                                        注册
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <MarketplaceContent />
            </div>
        </div>
    );
}
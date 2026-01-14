import React from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, Settings, LayoutDashboard, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

export default function UserNav({ user, isHomePage, scrolled }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await base44.auth.logout();
            toast.success('退出登录成功');
            navigate(createPageUrl('Home'));
        } catch (error) {
            console.error('Logout failed:', error);
            toast.error('退出登录失败');
        }
    };

    if (!user) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity">
                    <AvatarFallback className="bg-indigo-100 text-indigo-600">
                        {user.full_name?.[0] || 'U'}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.full_name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(createPageUrl('Dashboard'))}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>{user.client_type === 'ka' ? '运营看板' : '我的工作台'}</span>
                </DropdownMenuItem>
                {user.client_type === 'merchant' && (
                    <DropdownMenuItem onClick={() => navigate(createPageUrl('Dashboard') + '?tab=marketplace')}>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        <span>AI人才市场</span>
                    </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>退出登录</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
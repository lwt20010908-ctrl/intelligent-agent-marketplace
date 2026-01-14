import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import IdentitySelectorModal from './components/auth/IdentitySelectorModal';

export default function Layout({ children, currentPageName }) {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [simulatedUserType, setSimulatedUserType] = useState(null); // null, 'merchant', 'ka'
    const [showIdentitySelector, setShowIdentitySelector] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (simulatedUserType === 'merchant') {
            setUser({ client_type: 'merchant', full_name: '模拟商家用户', email: 'merchant@demo.com', company_name: '示例商家' });
        } else if (simulatedUserType === 'ka') {
            setUser({ client_type: 'ka', full_name: '模拟KA用户', email: 'ka@demo.com', company_name: '大B客户' });
        } else if (simulatedUserType === null) {
            base44.auth.me().then(setUser).catch(() => setUser(null));
        }
    }, [simulatedUserType]);

    const isHomePage = currentPageName === 'Home';
    const isDashboard = currentPageName === 'Dashboard' || currentPageName === 'MerchantWorkspace';
    const isKA = user?.client_type === 'ka';
    const isMerchant = user?.client_type === 'merchant';

    // Different nav items based on user type
    const getNavItems = () => {
        if (isKA) {
            return [
                { name: '运营看板', page: 'Dashboard' }
            ];
        }
        if (isMerchant) {
            return [
                { name: '我的工作台', page: 'Dashboard' },
                { name: '开发者社区', page: 'Developer' }
            ];
        }
        // Default for non-logged-in users
        return [
            { name: '首页', page: 'Home' },
            { name: '开发者社区', page: 'Developer' },
            { name: '关于我们', page: 'About' }
        ];
    };

    const navItems = getNavItems();

    if (isDashboard) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-white">
            <style>{`
                :root {
                    --primary: #6366F1;
                    --primary-dark: #4F46E5;
                    --bg-dark: #0A1628;
                    --bg-darker: #060D18;
                }
                .gradient-text {
                    background: linear-gradient(135deg, #6366F1 0%, #818CF8 50%, #A5B4FC 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .gradient-border {
                    background: linear-gradient(135deg, #6366F1, #818CF8);
                    padding: 1px;
                }
                .glow {
                    box-shadow: 0 0 40px rgba(99, 102, 241, 0.3);
                }
                .glass {
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(20px);
                }
                .glass-dark {
                    background: rgba(10, 22, 40, 0.9);
                    backdrop-filter: blur(20px);
                }
            `}</style>

            {/* Navigation */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled ? 'glass shadow-lg shadow-black/5' : 'bg-transparent'
                }`}
            >
                <nav className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to={createPageUrl('Home')} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">AI</span>
                            </div>
                            <span className={`text-xl font-semibold ${scrolled || !isHomePage ? 'text-gray-900' : 'text-white'}`}>
                                智能体市场
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.page}
                                    to={createPageUrl(item.page)}
                                    className={`text-sm font-medium transition-colors hover:text-indigo-500 ${
                                        currentPageName === item.page
                                            ? 'text-indigo-500'
                                            : scrolled || !isHomePage
                                            ? 'text-gray-600'
                                            : 'text-white/80'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                                    scrolled || !isHomePage ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
                                }`}>
                                    {simulatedUserType === 'merchant' ? '商家模式' : 
                                     simulatedUserType === 'ka' ? 'KA模式' : '未登录'}
                                    <ChevronDown className="w-4 h-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => setSimulatedUserType(null)}>
                                        未登录状态
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSimulatedUserType('merchant')}>
                                        商家登录
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSimulatedUserType('ka')}>
                                        大B端登录
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <button
                                onClick={() => setShowIdentitySelector(true)}
                                className={`text-sm font-medium transition-colors ${
                                    scrolled || !isHomePage ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
                                }`}
                            >
                                登录
                            </button>
                            <Link
                                to={createPageUrl('Marketplace')}
                                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-base font-semibold rounded-full hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
                            >
                                注册
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2"
                        >
                            {mobileMenuOpen ? (
                                <X className={scrolled || !isHomePage ? 'text-gray-900' : 'text-white'} />
                            ) : (
                                <Menu className={scrolled || !isHomePage ? 'text-gray-900' : 'text-white'} />
                            )}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden glass border-t border-gray-100"
                        >
                            <div className="px-6 py-4 space-y-3">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.page}
                                        to={createPageUrl(item.page)}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-2 text-gray-600 hover:text-indigo-500"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="pt-4 border-t border-gray-100">
                                    <Link
                                        to={createPageUrl('Marketplace')}
                                        className="block w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center rounded-full"
                                    >
                                        开始雇佣
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* Identity Selector Modal */}
            <IdentitySelectorModal
                open={showIdentitySelector}
                onClose={() => setShowIdentitySelector(false)}
                onSelectIdentity={(type) => {
                    if (type === 'merchant') {
                        setSimulatedUserType('merchant');
                        navigate(createPageUrl('Marketplace'));
                    } else if (type === 'ka') {
                        setSimulatedUserType('ka');
                        navigate(createPageUrl('Dashboard'));
                    } else {
                        setSimulatedUserType(null);
                    }
                }}
            />

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            {!isDashboard && (
                <footer className="bg-[#0A1628] text-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                            <div className="col-span-1 md:col-span-2">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">AI</span>
                                    </div>
                                    <span className="text-xl font-semibold">智能体市场</span>
                                </div>
                                <p className="text-gray-400 max-w-sm leading-relaxed">
                                    企业级AI智能体解决方案，让每个商家都能拥有专属的智能员工
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">产品</h4>
                                <ul className="space-y-3 text-gray-400">
                                    <li><Link to={createPageUrl('Marketplace')} className="hover:text-white transition-colors">AI人才市场</Link></li>
                                    <li><Link to={createPageUrl('About')} className="hover:text-white transition-colors">关于我们</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">联系我们</h4>
                                <ul className="space-y-3 text-gray-400">
                                    <li>contact@aimarket.com</li>
                                    <li>400-888-8888</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
                            © 2024 AI智能体市场. All rights reserved.
                        </div>
                    </div>
                </footer>
            )}
        </div>
    );
}
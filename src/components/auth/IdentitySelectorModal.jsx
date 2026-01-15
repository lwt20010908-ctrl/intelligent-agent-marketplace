import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building2, User, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IdentitySelectorModal({ open, onClose, onSelectIdentity }) {
    const identities = [
        {
            type: 'merchant',
            title: '商家',
            description: '浏览AI人才市场，雇佣智能体助理',
            icon: Building2,
            color: 'from-blue-500 to-cyan-500'
        },
        {
            type: 'individual',
            title: '个人',
            description: '探索AI智能体，提升工作效率',
            icon: User,
            color: 'from-purple-500 to-pink-500'
        },
        {
            type: 'ka',
            title: '服务商',
            description: '查看运营看板，掌控全局数据',
            icon: Users,
            color: 'from-indigo-500 to-purple-600'
        }
    ];

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center mb-2">
                        选择您的身份
                    </DialogTitle>
                    <p className="text-gray-500 text-center text-sm">
                        请选择您的身份类型以继续登录
                    </p>
                </DialogHeader>
                <div className="grid md:grid-cols-3 gap-4 py-6">
                    {identities.map((identity, index) => {
                        const Icon = identity.icon;
                        return (
                            <motion.div
                                key={identity.type}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <button
                                    onClick={() => {
                                        onSelectIdentity(identity.type);
                                        onClose();
                                    }}
                                    className="w-full p-6 rounded-2xl border-2 border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg group"
                                >
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${identity.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {identity.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {identity.description}
                                    </p>
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
}
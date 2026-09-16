"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Wallet, Settings, LogOut, Bell, Menu, X, TrendingUp } from 'lucide-react';
import { Locale } from '@/i18n-config';

export default function DashboardLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isArabic = lang === 'ar';

  const menuItems = [
    { name: isArabic ? 'نظرة عامة' : 'Overview', icon: <LayoutDashboard size={20} />, href: `/${lang}/dashboard` },
    { name: isArabic ? 'فواتيري' : 'My Invoices', icon: <FileText size={20} />, href: `/${lang}/dashboard/invoices` },
    { name: isArabic ? 'المحفظة' : 'Wallet', icon: <Wallet size={20} />, href: `/${lang}/dashboard/wallet` },
    { name: isArabic ? 'الإعدادات' : 'Settings', icon: <Settings size={20} />, href: `/${lang}/dashboard/settings` },
  ];

  return (
    <div className={`min-h-screen bg-slate-50 flex ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* خلفية معتمة للموبايل عند فتح القائمة */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* القائمة الجانبية (Sidebar) متجاوبة */}
      <aside className={`fixed top-0 ${isArabic ? 'right-0' : 'left-0'} h-full w-64 bg-white border-x border-slate-200 z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col ${
        isSidebarOpen ? 'translate-x-0' : (isArabic ? 'translate-x-full' : '-translate-x-full')
      }`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
          <Link href={`/${lang}`} className="flex items-center gap-2">
            <TrendingUp size={24} className="text-brand-green" />
            <div className="text-2xl font-black text-brand-blue">
              تدفق<span className="text-brand-green">.</span>
            </div>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-brand-blue">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={index} 
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  isActive ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20' : 'text-slate-500 hover:bg-slate-100 hover:text-brand-blue'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-red-500 font-medium hover:bg-red-50 rounded-xl transition-colors">
            <LogOut size={20} />
            {isArabic ? 'تسجيل الخروج' : 'Logout'}
          </button>
        </div>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className={`flex-1 flex flex-col w-full min-w-0 transition-all duration-300 ${isArabic ? 'md:mr-64' : 'md:ml-64'}`}>
        
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="md:hidden p-2 text-slate-500 hover:text-brand-blue hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu size5={24} />
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-slate-800 truncate">
              {isArabic ? 'لوحة تحكم الشركات' : 'SME Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="relative p-2 text-slate-400 hover:text-brand-blue transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-brand-green/20 border border-brand-green/30 flex items-center justify-center text-brand-green font-bold text-sm sm:text-base shrink-0">
              م
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 md:p-8 max-w-full overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
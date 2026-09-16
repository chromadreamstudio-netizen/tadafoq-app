"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { TrendingUp, Wallet, PieChart, Settings, LogOut, Bell } from 'lucide-react';
import { supabase } from '@/lib/supabase'; // استيراد Supabase

export default function InvestorLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isArabic = lang === 'ar';

  // دالة تسجيل الخروج الذكية
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push(`/${lang}`); // توجيه لصفحة الهبوط الرئيسية
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const menuItems = [
    { icon: <TrendingUp size={20} />, label: isArabic ? 'سوق الفواتير' : 'Marketplace', href: `/${lang}/investor/dashboard` },
    { icon: <Wallet size={20} />, label: isArabic ? 'محفظتي' : 'My Wallet', href: `/${lang}/investor/wallet` },
    { icon: <PieChart size={20} />, label: isArabic ? 'تحليل العوائد' : 'ROI Analytics', href: `/${lang}/investor/analytics` },
    { icon: <Settings size={20} />, label: isArabic ? 'الإعدادات' : 'Settings', href: `/${lang}/investor/settings` },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* القائمة الجانبية (Sidebar) الأنيقة للمستثمر */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed h-full z-20">
        <div className="h-20 flex items-center px-8 border-b border-slate-800">
          <Link href={`/${lang}`} className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            تدفق<span className="text-brand-green">.</span>
            <TrendingUp size={24} className="text-brand-green" />
          </Link>
        </div>

        <div className="px-6 py-8 flex-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
            {isArabic ? 'بوابة المستثمر' : 'Investor Portal'}
          </div>
          <nav className="space-y-2">
            {menuItems.map((item, index) => {
              const isActive = pathname.includes(item.href);
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-brand-green/10 text-brand-green font-bold' 
                      : 'hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-800">
          {/* زر تسجيل الخروج مربوط بالدالة */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">{isArabic ? 'تسجيل الخروج' : 'Logout'}</span>
          </button>
        </div>
      </aside>

      {/* المحتوى الرئيسي (Main Content) */}
      <main className={`flex-1 flex flex-col ${isArabic ? 'mr-64' : 'ml-64'}`}>
        {/* الشريط العلوي (Header) */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div className="font-bold text-slate-800 text-lg">
            {isArabic ? 'لوحة تحكم المستثمرين' : 'Investor Dashboard'}
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-brand-blue hover:bg-blue-50 rounded-full transition-all">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 bg-gradient-to-tr from-brand-blue to-brand-green rounded-full flex items-center justify-center text-white font-bold shadow-md">
              M
            </div>
          </div>
        </header>

        {/* محتوى صفحة المستثمر سيتم عرضه هنا */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
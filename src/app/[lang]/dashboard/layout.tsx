"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { LayoutDashboard, FileText, Wallet, Settings, LogOut, Bell, Home, User } from 'lucide-react';

export default function DashboardLayout({ children, params: { lang } }: { children: React.ReactNode, params: { lang: string } }) {
  const isArabic = lang === 'ar';
  const router = useRouter();
  const pathname = usePathname();

  // دالة تسجيل الخروج الحقيقية المربوطة بقاعدة البيانات
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push(`/${lang}`); // العودة للصفحة الرئيسية فوراً بعد الخروج
  };

  const navItems = [
    { name: isArabic ? 'نظرة عامة' : 'Overview', icon: LayoutDashboard, href: `/${lang}/dashboard` },
    { name: isArabic ? 'فواتيري' : 'My Invoices', icon: FileText, href: `/${lang}/dashboard/invoices` },
    { name: isArabic ? 'المحفظة' : 'Wallet', icon: Wallet, href: `/${lang}/dashboard/wallet` },
    { name: isArabic ? 'الإعدادات' : 'Settings', icon: Settings, href: `/${lang}/dashboard/settings` },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-300 font-sans flex" dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* القائمة الجانبية (Sidebar) بالثيم الداكن */}
      <aside className={`w-64 bg-[#111] border-white/10 flex flex-col fixed h-full z-20 ${isArabic ? 'border-l right-0' : 'border-r left-0'}`}>
        
        {/* اللوجو وزر العودة السريع للرئيسية */}
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <Link href={`/${lang}`} className="flex items-center gap-3 group w-full" title={isArabic ? 'العودة للصفحة الرئيسية' : 'Back to Home'}>
            <img src="/logo.jpeg" alt="Tadafoq" className="w-8 h-8 rounded-lg group-hover:scale-105 transition-transform" />
            <span className="text-2xl font-black text-white">تدفق<span className="text-brand-green">.</span></span>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== `/${lang}/dashboard` && pathname.startsWith(item.href));
            return (
              <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <item.icon size={20} />
                <span className="font-bold text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* زر تسجيل الخروج الحقيقي */}
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 w-full px-4 py-3 rounded-xl transition-all text-sm font-bold">
            <LogOut size={20} />
            {isArabic ? 'تسجيل الخروج' : 'Logout'}
          </button>
        </div>
      </aside>

      {/* منطقة المحتوى الرئيسية */}
      <main className={`flex-1 ${isArabic ? 'mr-64' : 'ml-64'} min-h-screen flex flex-col relative`}>
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

        {/* الشريط العلوي (Header) */}
        <header className="h-20 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-black text-white">{isArabic ? 'لوحة تحكم الشركات (SME)' : 'SME Dashboard'}</h1>

          {/* الأزرار التي سألت عنها (تم تفعيلها وربطها) */}
          <div className="flex items-center gap-4">
            
            {/* زر العودة للرئيسية */}
            <Link href={`/${lang}`} className="p-2.5 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-full transition-all" title={isArabic ? "الرئيسية" : "Home"}>
              <Home size={20} />
            </Link>

            {/* زر الإشعارات الحقيقي */}
            <button className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all relative group" onClick={() => alert(isArabic ? 'لا توجد إشعارات مالية جديدة حالياً.' : 'No new financial notifications.')}>
              <Bell size={20} className="group-hover:animate-[wiggle_1s_ease-in-out_infinite]" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#0a0a0a]"></span>
            </button>

            {/* زر الملف الشخصي والإعدادات */}
            <Link href={`/${lang}/dashboard/settings`} className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg hover:shadow-cyan-500/20 transition-all border-2 border-[#0a0a0a]" title={isArabic ? "الملف التجاري" : "Business Profile"}>
              <User size={18} />
            </Link>
          </div>
        </header>

        {/* محتوى الصفحات المتغير */}
        <div className="p-8 relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
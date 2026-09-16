"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { LineChart, Wallet, ShieldCheck, LogOut, Bell, Home, User, Scale } from 'lucide-react';

export default function InvestorLayout({ children, params: { lang } }: { children: React.ReactNode, params: { lang: string } }) {
  const isArabic = lang === 'ar';
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push(`/${lang}`);
  };

  const navItems = [
    { name: isArabic ? 'سوق الفواتير (السوق)' : 'Marketplace', icon: LineChart, href: `/${lang}/investor/dashboard` },
    { name: isArabic ? 'محفظة الضمان' : 'Escrow Wallet', icon: Wallet, href: `/${lang}/investor/wallet` },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-300 font-sans flex" dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* القائمة الجانبية للمستثمر */}
      <aside className={`w-64 bg-[#111] border-white/10 flex flex-col fixed h-full z-20 ${isArabic ? 'border-l right-0' : 'border-r left-0'}`}>
        
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <Link href={`/${lang}`} className="flex items-center gap-3 group w-full" title={isArabic ? 'العودة للصفحة الرئيسية' : 'Back to Home'}>
            <img src="/logo.jpeg" alt="Tadafoq" className="w-8 h-8 rounded-lg group-hover:scale-105 transition-transform" />
            <span className="text-2xl font-black text-white">تدفق<span className="text-emerald-500">.</span></span>
          </Link>
        </div>

        {/* شارة الثقة في القائمة */}
        <div className="px-4 mt-6 mb-2">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span className="text-xs font-bold text-emerald-400">{isArabic ? 'بوابة المستثمر المعتمد' : 'Verified Investor Portal'}</span>
            </div>
        </div>

        <nav className="flex-1 py-4 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <item.icon size={20} />
                <span className="font-bold text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 w-full px-4 py-3 rounded-xl transition-all text-sm font-bold">
            <LogOut size={20} />
            {isArabic ? 'تسجيل الخروج' : 'Logout'}
          </button>
        </div>
      </aside>

      {/* منطقة المحتوى الرئيسية */}
      <main className={`flex-1 ${isArabic ? 'mr-64' : 'ml-64'} min-h-screen flex flex-col relative`}>
        <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

        {/* الشريط العلوي للمستثمر */}
        <header className="h-20 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3">
             <Scale className="text-slate-500" size={24} />
             <h1 className="text-xl font-black text-white">{isArabic ? 'بوابة إدارة الثروات' : 'Wealth Management Portal'}</h1>
          </div>

          <div className="flex items-center gap-4">
            <Link href={`/${lang}`} className="p-2.5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-full transition-all" title={isArabic ? "الرئيسية" : "Home"}>
              <Home size={20} />
            </Link>

            <button className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all relative group" onClick={() => alert(isArabic ? 'تم تأكيد إيداعك البنكي الأخير بنجاح.' : 'Your recent bank deposit was confirmed.')}>
              <Bell size={20} className="group-hover:animate-[wiggle_1s_ease-in-out_infinite]" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border border-[#0a0a0a]"></span>
            </button>

            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-900 border-2 border-cyan-500/50 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer">
              <User size={18} className="text-cyan-400" />
            </div>
          </div>
        </header>

        {/* محتوى الصفحات */}
        <div className="p-8 relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
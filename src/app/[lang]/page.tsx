"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TrendingUp, ShieldCheck, Globe2, Building2, Fingerprint, Lock, CheckCircle2, Zap, ArrowRight, Server, CreditCard, Award } from 'lucide-react';

export default function LandingPage({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === 'ar';
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleLanguage = () => router.push(`/${isArabic ? 'en' : 'ar'}`);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans relative overflow-x-hidden text-slate-300" dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* خلفيات ضوئية ماسية (Diamond Glow Effects) */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-green/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

      {/* Navbar - Dark Glassmorphism */}
      <nav className="fixed w-full top-0 z-50 bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href={`/${lang}`} className="flex items-center gap-3 group">
            <img src="/logo.jpeg" alt="Tadafoq Logo" className="w-10 h-10 object-contain rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:scale-105 transition-transform" />
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white tracking-tight">تدفق</span>
              <span className="text-xl font-light text-slate-600">|</span>
              <span className="text-xl font-black text-white tracking-tight">Tadafoq<span className="text-brand-green animate-pulse">.</span></span>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <button onClick={toggleLanguage} className="text-slate-400 hover:text-white font-bold text-sm flex items-center gap-2 transition-colors">
              <Globe2 size={16} />{isArabic ? 'English' : 'العربية'}
            </button>
            <div className="w-px h-6 bg-white/10 hidden md:block"></div>
            <Link href={`/${lang}/login`} className="text-slate-400 hover:text-white font-bold text-sm transition-colors hidden sm:block">
              {isArabic ? 'تسجيل الدخول' : 'Login'}
            </Link>
            <Link href={`/${lang}/signup`} className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all backdrop-blur-md">
              {isArabic ? 'حساب جديد' : 'Sign Up'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Futuristic FinTech */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
        
        {/* شريط الثقة العلوي (Trust Microcopy) */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-8 animate-in slide-in-from-bottom-4">
          <ShieldCheck size={16} />
          <span className="text-xs font-bold tracking-wider uppercase">
            {isArabic ? 'مرخص ومراقب من الجهات المالية | حماية بنكية 256-bit' : 'Regulated Financial Platform | 256-bit Bank Grade Security'}
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
          {isArabic ? 'سيولة نقدية ' : 'Liquid Capital '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
            {isArabic ? 'لا تتوقف.' : 'Unleashed.'}
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          {isArabic 
            ? 'المنصة المؤسسية الأولى لتمويل الفواتير (Micro-Factoring). حوّل فواتير شركتك الآجلة إلى كاش فوري، أو استثمر فائض سيولتك بعوائد مضمونة ومطابقة ثلاثياً.' 
            : 'The premier institutional Micro-Factoring platform. Turn outstanding invoices into instant cash, or invest surplus capital with guaranteed 3-way matched returns.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href={`/${lang}/dashboard`} className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-4 rounded-xl font-black text-lg transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:-translate-y-1 flex items-center justify-center gap-3">
            <Building2 size={24} /> {isArabic ? 'تمويل شركتي (للموردين)' : 'Fund My Company'}
          </Link>
          <Link href={`/${lang}/investor/dashboard`} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all backdrop-blur-md hover:-translate-y-1 flex items-center justify-center gap-3">
            <TrendingUp size={24} /> {isArabic ? 'استثمار السيولة (للمستثمرين)' : 'Invest Capital'}
          </Link>
        </div>
      </div>

      {/* أختام الثقة والشراكات المخفية (Trust Badges Architecture) */}
      <div className="border-y border-white/10 bg-black/50 backdrop-blur-md py-8 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2 text-sm font-bold text-white"><Server size={20} /> Powered by AWS & Supabase</div>
          <div className="flex items-center gap-2 text-sm font-bold text-white"><CreditCard size={20} /> PCI-DSS Compliant</div>
          <div className="flex items-center gap-2 text-sm font-bold text-white"><Award size={20} /> BaaS Integrated Escrow</div>
        </div>
      </div>

      {/* قسم كيف نحمي أموالك (Glassmorphism Cards) */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{isArabic ? 'درع تدفق الماسي (أمان 100%)' : 'Tadafoq Diamond Shield'}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{isArabic ? 'رأس المال جبان، لذلك بنينا حصناً تقنياً لحماية كل معاملة.' : 'Capital is cautious, so we built a fortress for every transaction.'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl hover:bg-white/10 transition-all group">
            <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Fingerprint size={28} className="text-emerald-400" /></div>
            <h3 className="text-xl font-bold text-white mb-3">{isArabic ? 'الحجب الذكي (NDA Masking)' : 'Smart NDA Masking'}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{isArabic ? 'أسرار الموردين في أمان. نحجب بيانات الفاتورة الحساسة في السوق ونعرضها فقط للمستثمر الذي يودع الأموال فعلياً.' : 'Supplier secrets are safe. We mask sensitive data and only reveal it to fully funded investors.'}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl hover:bg-white/10 transition-all group">
            <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><CheckCircle2 size={28} className="text-blue-400" /></div>
            <h3 className="text-xl font-bold text-white mb-3">{isArabic ? 'المطابقة الثلاثية' : '3-Way Matching'}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{isArabic ? 'لا مجال للفواتير الوهمية. نتحقق من (الفاتورة، أمر التوريد، إذن التسليم) تقنياً قبل عرض أي فرصة استثمارية.' : 'No fake invoices. We verify the Invoice, PO, and Delivery Note before listing any opportunity.'}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl hover:bg-white/10 transition-all group">
            <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Lock size={28} className="text-purple-400" /></div>
            <h3 className="text-xl font-bold text-white mb-3">{isArabic ? 'حسابات ضمان (Escrow)' : 'Segregated Escrow'}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{isArabic ? 'أموال المستثمرين مفصولة تماماً عن حسابات المنصة التشغيلية عبر حسابات بنكية افتراضية مخصصة للضمان.' : 'Investor funds are strictly segregated from operational accounts via dedicated Virtual IBANs.'}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
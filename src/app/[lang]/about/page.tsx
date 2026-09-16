"use client";

import React from 'react';
import { ShieldCheck, Target, Zap, Building2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === 'ar';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-300 font-sans relative overflow-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* تأثيرات الإضاءة الخلفية */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0"></div>
      
      <div className="relative pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 mb-6">
            <Target size={16} />
            <span className="text-xs font-bold tracking-wider">{isArabic ? 'رؤيتنا ومهمتنا' : 'Our Vision & Mission'}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            {isArabic ? 'نحن نعيد هندسة' : 'We are Re-engineering'} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
              {isArabic ? 'شرايين الاقتصاد.' : 'the Economy\'s Arteries.'}
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            {isArabic 
              ? 'تأسست "تدفق" لحل مشكلة جذريّة: اختناق السيولة النقدية بين الشركات (B2B). نحن نبني البنية التحتية المالية التي تحول الفواتير الآجلة إلى سيولة فورية باستخدام أحدث تقنيات المطابقة الثلاثية وحسابات الضمان المعزولة.' 
              : 'Tadafoq was founded to solve a core issue: B2B cash flow bottlenecks. We build the financial infrastructure that turns outstanding invoices into instant liquidity using 3-way matching and isolated escrow.'}
          </p>
        </div>

        {/* القيادة والمؤسسون (مجهزة لك وللمهندس ياسر) */}
        <div className="mb-24">
          <h2 className="text-3xl font-black text-white mb-10 text-center border-b border-white/10 pb-4">{isArabic ? 'القيادة التنفيذية' : 'Executive Leadership'}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* بطاقة المهندس وليد طه (المؤسس و CTO) */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-all flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-start">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full border-2 border-emerald-500/50 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <span className="text-2xl font-black text-white">WT</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white mb-1">{isArabic ? 'م. وليد طه' : 'Eng. Waleed Taha'}</h3>
                <h4 className="text-emerald-400 font-bold text-sm mb-4">{isArabic ? 'المؤسس والمدير التقني (Founder & CTO)' : 'Founder & CTO'}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {isArabic 
                    ? 'يقود البنية التحتية لمنصة "تدفق" بخبرة تتجاوز 20 عاماً في هندسة البرمجيات، ونشر الأجهزة، والبنية التحتية لقطاعات الاتصالات. هندس المنصة لتتحمل عمليات مالية معقدة بأعلى معايير الأمان المالي والبنكي.' 
                    : 'Leads Tadafoq\'s infrastructure with over 20 years of experience in software engineering, hardware deployment, and telecom infrastructure. Engineered the platform for complex financial operations with top-tier security.'}
                </p>
              </div>
            </div>

            {/* بطاقة مستثمر القيادة (جاهزة للمهندس ياسر) */}
            <div className="bg-white/5 border border-dashed border-white/20 p-8 rounded-3xl backdrop-blur-md flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-start opacity-70 hover:opacity-100 transition-all cursor-pointer group">
              <div className="w-24 h-24 bg-slate-900/50 rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center flex-shrink-0 group-hover:border-cyan-500 transition-colors">
                <ShieldCheck className="text-slate-500 group-hover:text-cyan-500 transition-colors" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-300 mb-1 group-hover:text-white transition-colors">{isArabic ? 'مقعد استراتيجي' : 'Strategic Board Seat'}</h3>
                <h4 className="text-cyan-500/70 font-bold text-sm mb-4 group-hover:text-cyan-400">{isArabic ? 'رئيس مجلس الإدارة / شريك رئيسي' : 'Chairman / Lead Investor'}</h4>
                <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400">
                  {isArabic 
                    ? 'نبحث عن شريك استراتيجي يمتلك الرؤية المالية والخبرة المؤسسية لقيادة التوسع في السوق، وتوجيه المنصة نحو الاستحواذ على حصة قيادية في سوق التخصيم الرقمي.' 
                    : 'Seeking a strategic partner with financial vision and corporate experience to lead market expansion and guide the platform towards dominating the digital factoring market.'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
           <Link href={`/${lang}`} className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1 transition-colors">
             {isArabic ? 'العودة للصفحة الرئيسية' : 'Back to Home'} <ChevronRight size={16} className={isArabic ? 'rotate-180' : ''} />
           </Link>
        </div>
      </div>
    </div>
  );
}
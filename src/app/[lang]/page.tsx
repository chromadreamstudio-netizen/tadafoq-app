"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TrendingUp, ShieldCheck, Globe2, Building2, Fingerprint, Lock, ChevronDown, CheckCircle2, FileText, Zap, HelpCircle, MessageSquare, Phone, X, Send } from 'lucide-react';

// مكون الأنيميشن الشبكي للتدفق النقدي
const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    let particles: any[] = [];

    const initParticles = () => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? 30 : 60;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2 + 1
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(16, 185, 129, 0.6)' : 'rgba(59, 130, 246, 0.6)'; // أخضر وأزرق
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.2 - dist / 600})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    };

    initParticles();
    draw();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />;
};

export default function LandingPage({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === 'ar';
  const router = useRouter();
  const [country, setCountry] = useState('EG'); 
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const countries = [
    { code: 'EG', name: isArabic ? 'مصر' : 'Egypt', currency: isArabic ? 'ج.م' : 'EGP', flag: '🇪🇬' },
    { code: 'SA', name: isArabic ? 'السعودية' : 'Saudi Arabia', currency: isArabic ? 'ر.س' : 'SAR', flag: '🇸🇦' },
    { code: 'AE', name: isArabic ? 'الإمارات' : 'UAE', currency: isArabic ? 'د.إ' : 'AED', flag: '🇦🇪' },
  ];
  const activeCountry = countries.find(c => c.code === country) || countries[0];

  const toggleLanguage = () => router.push(`/${isArabic ? 'en' : 'ar'}`);

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative overflow-x-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* ستايل مخصص لأنيميشن الكلمات */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradient-flow 4s linear infinite;
        }
      `}} />

      {/* شريط التنقل (Navbar) */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href={`/${lang}`} className="flex items-center gap-2 md:gap-3 group">
            <img src="/logo.jpeg" alt="Tadafoq Logo" className="w-10 h-10 md:w-11 md:h-11 object-contain group-hover:scale-105 transition-transform" />
            <div className="flex items-baseline gap-1.5 md:gap-2">
              <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">تدفق</span>
              <span className="text-lg md:text-xl font-light text-slate-300">|</span>
              <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Tadafoq<span className="text-brand-green animate-pulse">.</span></span>
            </div>
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={toggleLanguage} className="text-slate-600 hover:text-brand-blue font-bold text-sm flex items-center gap-1 transition-colors">
              <Globe2 size={16} />{isArabic ? 'English' : 'العربية'}
            </button>
            <div className="w-px h-6 bg-slate-200 hidden md:block"></div>
            <div className="relative hidden md:block">
              <button onClick={() => setIsCountryMenuOpen(!isCountryMenuOpen)} className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors text-sm font-bold text-slate-700">
                <span>{activeCountry.flag}</span><span>{activeCountry.name}</span><ChevronDown size={16} />
              </button>
              {isCountryMenuOpen && (
                <div className="absolute top-full mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-lg py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  {countries.map((c) => (
                    <button key={c.code} onClick={() => { setCountry(c.code); setIsCountryMenuOpen(false); }} className="w-full text-right px-4 py-2 hover:bg-slate-50 text-sm font-bold text-slate-700 flex items-center gap-3">
                      <span>{c.flag}</span><span>{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link href={`/${lang}/login`} className="text-slate-600 hover:text-brand-blue font-bold text-sm transition-colors hidden sm:block">
              {isArabic ? 'تسجيل الدخول' : 'Login'}
            </Link>
            <Link href={`/${lang}/signup`} className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md hover:-translate-y-0.5">
              {isArabic ? 'إنشاء حساب' : 'Sign Up'}
            </Link>
          </div>
        </div>
      </nav>

      {/* قسم الترحيب (Hero Section) المذهل مع الـ Canvas */}
      <div className="relative bg-slate-50 overflow-hidden">
        
        {/* شبكة الأبعاد الثلاثية في الخلفية */}
        <ParticleNetwork />

        {/* خلفيات دائرية لإعطاء عمق */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-3xl animate-pulse z-0"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-3xl animate-pulse delay-700 z-0"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-16 lg:gap-12 z-10">
          
          <div className="flex-1 text-center lg:text-start z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-emerald-100 text-emerald-800 mb-8 shadow-sm animate-in slide-in-from-bottom-4 duration-700">
              <ShieldCheck size={18} className="text-brand-green" />
              <span className="text-sm font-bold tracking-wide">{isArabic ? 'أمان بنكي معتمد وموثق حكومياً' : '100% Bank Grade Security'}</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 leading-tight animate-in slide-in-from-bottom-6 duration-1000">
              {isArabic ? 'مرحباً بك في منصة' : 'Welcome to'} <br/>
              <span className="animate-gradient-text text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-green to-brand-blue pb-2 block drop-shadow-lg">
                {isArabic ? 'تــدفــق | Tadafoq' : 'Tadafoq | تــدفــق'}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-in fade-in duration-1000 delay-300">
              {isArabic 
                ? `المنصة الأولى لخصم الفواتير (Micro-Factoring). حوّل فواتيرك الآجلة إلى نقد خلال 24 ساعة، أو استثمر أموالك في فواتير معتمدة بعوائد مجزية وبأمان تام.` 
                : `The premier Micro-Factoring platform. Turn your outstanding invoices into cash within 24 hours, or invest in verified invoices securely.`}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-in fade-in duration-1000 delay-500">
              <Link href={`/${lang}/dashboard/invoices/new`} className="bg-brand-green hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg md:text-xl transition-all shadow-lg hover:shadow-brand-green/40 hover:-translate-y-1 flex items-center justify-center gap-3 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/20 w-full translate-x-[-100%] skew-x-[-15deg] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <Building2 size={24} />
                {isArabic ? 'سجل كشركة (بيع فاتورة)' : 'Register as SME (Sell Invoice)'}
              </Link>
              <Link href={`/${lang}/investor/wallet`} className="bg-white/80 backdrop-blur-md border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg md:text-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3">
                <TrendingUp size={24} />
                {isArabic ? 'سجل كمستثمر (تمويل)' : 'Register as Investor (Fund)'}
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full max-w-2xl mx-auto lg:mx-0 z-10 relative animate-in zoom-in duration-1000 delay-300">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-8 border-white/50 bg-white/50 backdrop-blur-sm transform hover:scale-[1.02] transition-transform duration-700 hover:shadow-[0_30px_60px_rgba(16,185,129,0.2)]">
              <img src="/banner.jpeg" alt="Tadafoq B2B Invoice Factoring" className="w-full h-auto object-cover aspect-[4/3] lg:aspect-auto lg:h-[550px]" />
            </div>
          </div>

        </div>
      </div>

      {/* قسم التثقيف الأمني (عاد مكانه) */}
      <div className="bg-white py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-in slide-in-from-bottom-4 duration-700">
            <ShieldCheck size={48} className="text-indigo-600 mx-auto mb-4" />
            <h2 className="text-3xl font-black text-slate-900 mb-4">{isArabic ? 'كيف نحمي أموالك؟ (درع تدفق الثلاثي)' : 'How We Protect Your Funds?'}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{isArabic ? 'نظامنا مبني على بنية تحتية بنكية وتقنيات ذكاء اصطناعي تغلق كافة الثغرات.' : 'Built on bank-grade infrastructure and AI to close all loopholes.'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all hover:-translate-y-2 shadow-sm hover:shadow-lg">
              <Fingerprint size={32} className="text-indigo-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">{isArabic ? 'فلتر الذكاء الاصطناعي' : 'AI Anti-Forgery Filter'}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{isArabic ? 'محرك ذكاء اصطناعي يكشف التزييف العميق وتعديلات البكسل لضمان أصالة المستندات.' : 'AI engine detects deepfakes and pixel manipulations.'}</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-blue transition-all hover:-translate-y-2 shadow-sm hover:shadow-lg">
              <CheckCircle2 size={32} className="text-brand-blue mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">{isArabic ? 'الربط الحكومي' : 'Government Integration'}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{isArabic ? `مطابقة الفواتير مع منظومة الضرائب لضمان تسجيل الدين رسمياً واستحالة فبركته.` : `Invoices matched with Tax Authority to ensure legitimacy.`}</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-green transition-all hover:-translate-y-2 shadow-sm hover:shadow-lg">
              <Lock size={32} className="text-brand-green mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">{isArabic ? 'حسابات بنكية منفصلة (IBAN)' : 'Virtual IBAN Escrow'}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{isArabic ? 'أموالك لا تدخل حسابات الشركة إطلاقاً. حساب بنكي افتراضي مستقل لكل مستثمر لضمان الشفافية المطلقة.' : 'Your funds never enter our accounts. A dedicated virtual bank account for every investor.'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* قسم كيف تعمل المنصة (تم استعادته بالكامل) */}
      <div className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">{isArabic ? 'كيف تعمل منصة تدفق؟' : 'How Tadafoq Works?'}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{isArabic ? 'ثلاث خطوات بسيطة تحول فواتيرك إلى سيولة، أو تمنحك عوائد مجزية.' : 'Three simple steps to turn invoices into cash, or earn rewarding returns.'}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"><FileText size={32} className="text-brand-blue" /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{isArabic ? '1. رفع الفاتورة المعتمدة' : '1. Upload Approved Invoice'}</h3>
              <p className="text-slate-600">{isArabic ? 'تقوم الشركة برفع الفاتورة المعتمدة من الجهة المدينة عبر لوحة التحكم الآمنة.' : 'SME uploads the approved invoice from the debtor via secure dashboard.'}</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"><ShieldCheck size={32} className="text-indigo-500" /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{isArabic ? '2. التحقق والتسعير الذكي' : '2. Smart Verification & Pricing'}</h3>
              <p className="text-slate-600">{isArabic ? 'نظامنا يتحقق من صحة الفاتورة ويحدد معدل الخصم المناسب بناءً على تقييم المخاطر.' : 'System verifies invoice authenticity and sets discount rate based on risk.'}</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"><Zap size={32} className="text-brand-green" /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{isArabic ? '3. التمويل الفوري' : '3. Instant Funding'}</h3>
              <p className="text-slate-600">{isArabic ? 'يقوم المستثمرون بتمويل الفاتورة، وتتحول السيولة فوراً لحساب الشركة البنكي.' : 'Investors fund the invoice, and liquidity is transferred instantly to SME.'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* قسم الأسئلة الشائعة (تم استعادته بالكامل) */}
      <div className="bg-white py-20 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 justify-center mb-12">
            <HelpCircle size={32} className="text-brand-blue" />
            <h2 className="text-3xl font-black text-slate-900">{isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-lg text-slate-900 mb-2">{isArabic ? 'ما هي مدة انتظار استلام التمويل؟' : 'How long does funding take?'}</h4>
              <p className="text-slate-600">{isArabic ? 'بمجرد طرح الفاتورة في السوق واكتمال تمويلها من المستثمرين، يتم تحويل الأموال خلال 24 ساعة عمل.' : 'Once listed and fully funded, money is transferred within 24 business hours.'}</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-lg text-slate-900 mb-2">{isArabic ? 'ما هو الضمان للمستثمر؟' : 'What is the guarantee for investors?'}</h4>
              <p className="text-slate-600">{isArabic ? 'نعمل بنظام التخصيم مع حق الرجوع (Recourse). الشركة البائعة للفاتورة تظل هي الضامن النهائي وتوقع سندات قانونية.' : 'We operate on Recourse Factoring. The SME remains the ultimate guarantor with legal promissory notes.'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* الفوتر مع اللوجو المزدوج (تم استعادته بالكامل) */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href={`/${lang}`} className="flex items-center gap-2 md:gap-3 mb-6 group">
              <img src="/logo.jpeg" alt="Tadafoq Logo" className="w-10 h-10 md:w-11 md:h-11 object-contain rounded-md group-hover:scale-105 transition-transform" />
              <div className="flex items-baseline gap-1.5 md:gap-2">
                <span className="text-2xl md:text-3xl font-black text-white tracking-tight">تدفق</span>
                <span className="text-lg md:text-xl font-light text-slate-600">|</span>
                <span className="text-xl md:text-2xl font-black text-white tracking-tight">Tadafoq<span className="text-brand-green animate-pulse">.</span></span>
              </div>
            </Link>
            <p className="text-sm max-w-sm mb-6">{isArabic ? 'نحن نعيد ابتكار تمويل الشركات وتسريع دوران عجلة الاقتصاد من خلال التكنولوجيا المالية الذكية.' : 'Reinventing corporate finance and accelerating the economy through smart FinTech.'}</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{isArabic ? 'روابط هامة' : 'Important Links'}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">{isArabic ? 'الشروط والأحكام' : 'Terms & Conditions'}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{isArabic ? 'اتصل بنا' : 'Contact Us'}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{isArabic ? 'اتصل بنا' : 'Contact'}</h4>
            <ul className="space-y-2 text-sm">
              <li>support@tadafoq.com</li>
              <li>+20 (100) 000-0000</li>
              <li className="mt-4 text-xs text-slate-500">© 2026 Tadafoq Inc. {isArabic ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.</li>
            </ul>
          </div>
        </div>
      </footer>

      {/* المساعد الذكي وزر الواتساب (Floating Widget) */}
      <div className={`fixed bottom-6 ${isArabic ? 'left-6' : 'right-6'} z-50 flex flex-col items-end gap-4`}>
        
        {isChatOpen && (
          <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300">
            <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-brand-green rounded-full animate-pulse"></div>
                <span className="font-bold text-sm">{isArabic ? 'مساعد تدفق الذكي (AI)' : 'Tadafoq AI Assistant'}</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-slate-300 hover:text-white transition-colors"><X size={18} /></button>
            </div>
            
            <div className="p-4 h-72 bg-slate-50 flex flex-col gap-3 overflow-y-auto text-sm">
              <div className="bg-white p-3.5 rounded-xl rounded-tl-none border border-slate-200 text-slate-700 shadow-sm w-5/6 relative">
                {isArabic ? 'أهلاً بك يا فندم! أنا مندوب مبيعات "تدفق" الافتراضي. هل تمتلك فواتير لشركتك وتريد سيولة فورية، أم تبحث عن استثمار آمن بعوائد مجزية؟' : 'Hello! I am Tadafoq AI sales rep. Are you looking for instant liquidity for your invoices, or secure investments?'}
              </div>
            </div>
            
            <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <input type="text" placeholder={isArabic ? 'اكتب رسالتك هنا...' : 'Type your message...'} className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" />
              <button className="bg-brand-blue text-white p-2.5 rounded-lg hover:bg-blue-600 transition-colors shadow-sm"><Send size={16} /></button>
            </div>
          </div>
        )}

        <div className="flex gap-4 flex-row-reverse items-center">
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:scale-110 transition-transform duration-300 relative group z-50"
            aria-label="Open Chat"
          >
            {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-green border-2 border-slate-900"></span>
            </span>
          </button>

          <a 
            href="https://wa.me/201000000000" 
            target="_blank" 
            rel="noreferrer"
            className={`w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 ${isChatOpen ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}
            title="تواصل عبر واتساب"
          >
            <Phone size={22} />
          </a>
        </div>
      </div>

    </div>
  );
}
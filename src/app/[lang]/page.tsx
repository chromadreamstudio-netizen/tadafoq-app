"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TrendingUp, ShieldCheck, Globe2, Building2, Fingerprint, Lock, ChevronDown, CheckCircle2, FileText, Zap, HelpCircle, MessageSquare, Phone, X, Send, Server, CreditCard, Award } from 'lucide-react';

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
      const particleCount = window.innerWidth < 768 ? 30 : 50;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 0.5
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
        ctx.fillStyle = i % 2 === 0 ? 'rgba(16, 185, 129, 0.4)' : 'rgba(59, 130, 246, 0.4)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 - dist / 1200})`;
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

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-50" />;
};

export default function LandingPage({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === 'ar';
  const router = useRouter();
  
  const [country, setCountry] = useState('EG'); 
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const countries = [
    { code: 'EG', name: isArabic ? 'مصر' : 'Egypt', currency: isArabic ? 'ج.م' : 'EGP', flag: '🇪🇬' },
    { code: 'SA', name: isArabic ? 'السعودية' : 'Saudi Arabia', currency: isArabic ? 'ر.س' : 'SAR', flag: '🇸🇦' },
    { code: 'AE', name: isArabic ? 'الإمارات' : 'UAE', currency: isArabic ? 'د.إ' : 'AED', flag: '🇦🇪' },
  ];
  const activeCountry = countries.find(c => c.code === country) || countries[0];

  const toggleLanguage = () => router.push(`/${isArabic ? 'en' : 'ar'}`);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans relative overflow-x-hidden text-slate-300" dir={isArabic ? 'rtl' : 'ltr'}>
      
      <ParticleNetwork />

      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-green/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0"></div>

      <nav className="fixed w-full top-0 z-50 bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href={`/${lang}`} className="flex items-center gap-2 md:gap-3 group">
            <img src="/logo.jpeg" alt="Tadafoq Logo" className="w-10 h-10 md:w-11 md:h-11 object-contain rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:scale-105 transition-transform" />
            <div className="flex items-baseline gap-1.5 md:gap-2">
              <span className="text-2xl md:text-3xl font-black text-white tracking-tight">تدفق</span>
              <span className="text-lg md:text-xl font-light text-slate-600">|</span>
              <span className="text-xl md:text-2xl font-black text-white tracking-tight">Tadafoq<span className="text-brand-green animate-pulse">.</span></span>
            </div>
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={toggleLanguage} className="text-slate-400 hover:text-white font-bold text-sm flex items-center gap-1 transition-colors">
              <Globe2 size={16} />{isArabic ? 'English' : 'العربية'}
            </button>
            <div className="w-px h-6 bg-white/10 hidden md:block"></div>
            
            <div className="relative hidden md:block">
              <button onClick={() => setIsCountryMenuOpen(!isCountryMenuOpen)} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors text-sm font-bold text-white border border-white/10">
                <span>{activeCountry.flag}</span><span>{activeCountry.name}</span><ChevronDown size={16} />
              </button>
              {isCountryMenuOpen && (
                <div className="absolute top-full mt-2 w-40 bg-[#111] border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  {countries.map((c) => (
                    <button key={c.code} onClick={() => { setCountry(c.code); setIsCountryMenuOpen(false); }} className="w-full text-right px-4 py-2 hover:bg-white/10 text-sm font-bold text-white flex items-center gap-3">
                      <span>{c.flag}</span><span>{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href={`/${lang}/login`} className="text-slate-400 hover:text-white font-bold text-sm transition-colors hidden sm:block">
              {isArabic ? 'تسجيل الدخول' : 'Login'}
            </Link>
            <Link href={`/${lang}/signup`} className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all backdrop-blur-md">
              {isArabic ? 'حساب جديد' : 'Sign Up'}
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 lg:gap-12 z-10">
        
        <div className="flex-1 text-center lg:text-start z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-8 animate-in slide-in-from-bottom-4">
            <ShieldCheck size={16} />
            <span className="text-xs font-bold tracking-wider uppercase">
              {isArabic ? 'مرخص ومراقب من الجهات المالية | حماية بنكية 256-bit' : 'Regulated Financial Platform | 256-bit Bank Grade Security'}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight animate-in slide-in-from-bottom-6 duration-1000">
            {isArabic ? 'سيولة نقدية ' : 'Liquid Capital '} <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 pb-2 block">
              {isArabic ? 'لا تتوقف.' : 'Unleashed.'}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-in fade-in duration-1000 delay-300">
            {isArabic 
              ? `المنصة المؤسسية الأولى لتمويل الفواتير (Micro-Factoring). حوّل فواتير شركتك الآجلة إلى كاش فوري، أو استثمر فائض سيولتك بعوائد مضمونة ومطابقة ثلاثياً.` 
              : `The premier institutional Micro-Factoring platform. Turn outstanding invoices into instant cash, or invest surplus capital with guaranteed 3-way matched returns.`}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-in fade-in duration-1000 delay-500">
            <Link href={`/${lang}/dashboard/invoices/new`} className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-4 rounded-xl font-black text-lg transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:-translate-y-1 flex items-center justify-center gap-3 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/20 w-full translate-x-[-100%] skew-x-[-15deg] group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <Building2 size={24} />
              {isArabic ? 'تمويل شركتي (للموردين)' : 'Fund My Company'}
            </Link>
            <Link href={`/${lang}/investor/wallet`} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all backdrop-blur-md hover:-translate-y-1 flex items-center justify-center gap-3">
              <TrendingUp size={24} />
              {isArabic ? 'استثمار السيولة (للمستثمرين)' : 'Invest Capital'}
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full max-w-2xl mx-auto lg:mx-0 z-10 relative animate-in zoom-in duration-1000 delay-300">
          <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-white/5 backdrop-blur-sm transform hover:scale-[1.02] transition-transform duration-700 hover:shadow-[0_30px_60px_rgba(16,185,129,0.2)]">
            <img src="/banner.jpeg" alt="Tadafoq B2B Invoice Factoring" className="w-full h-auto object-cover aspect-[4/3] lg:aspect-auto lg:h-[550px] opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
          </div>
        </div>

      </div>

      <div className="border-y border-white/10 bg-black/50 backdrop-blur-md py-8 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2 text-sm font-bold text-white"><Server size={20} /> Powered by AWS & Supabase</div>
          <div className="flex items-center gap-2 text-sm font-bold text-white"><CreditCard size={20} /> PCI-DSS Compliant</div>
          <div className="flex items-center gap-2 text-sm font-bold text-white"><Award size={20} /> BaaS Integrated Escrow</div>
        </div>
      </div>

      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-b border-white/10">
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

      <div className="py-24 bg-black/40 relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-white mb-4">{isArabic ? 'كيف تعمل منصة تدفق؟' : 'How Tadafoq Works?'}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{isArabic ? 'ثلاث خطوات بسيطة تحول فواتيرك إلى سيولة، أو تمنحك عوائد مجزية.' : 'Three simple steps to turn invoices into cash, or earn rewarding returns.'}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/5 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"><FileText size={32} className="text-blue-400" /></div>
              <h3 className="text-xl font-bold text-white mb-3">{isArabic ? '1. رفع الفاتورة المعتمدة' : '1. Upload Approved Invoice'}</h3>
              <p className="text-slate-400">{isArabic ? 'تقوم الشركة برفع الفاتورة المعتمدة من الجهة المدينة عبر لوحة التحكم الآمنة.' : 'SME uploads the approved invoice from the debtor via secure dashboard.'}</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/5 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"><ShieldCheck size={32} className="text-purple-400" /></div>
              <h3 className="text-xl font-bold text-white mb-3">{isArabic ? '2. التحقق والتسعير الذكي' : '2. Smart Verification & Pricing'}</h3>
              <p className="text-slate-400">{isArabic ? 'نظامنا يتحقق من صحة الفاتورة ويحدد معدل الخصم المناسب بناءً على تقييم المخاطر عبر الذكاء الاصطناعي.' : 'System verifies invoice authenticity and sets discount rate based on AI risk assessment.'}</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/5 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"><Zap size={32} className="text-brand-green" /></div>
              <h3 className="text-xl font-bold text-white mb-3">{isArabic ? '3. التمويل والتحصيل المؤسسي' : '3. Institutional Funding'}</h3>
              <p className="text-slate-400">{isArabic ? 'يمول المستثمر الفاتورة، وتتولى المنصة الإدارة القانونية والتحصيل لضمان عودة رأس المال بأمان.' : 'Investors fund the invoice, and the platform handles legal collection to ensure safe capital return.'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 bg-[#0a0a0a] relative z-10 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 justify-center mb-12">
            <HelpCircle size={32} className="text-brand-blue" />
            <h2 className="text-3xl font-black text-white">{isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-sm hover:bg-white/10 transition-colors">
              <h4 className="font-bold text-lg text-white mb-2">{isArabic ? 'ما هي مدة انتظار استلام التمويل؟' : 'How long does funding take?'}</h4>
              <p className="text-slate-400">{isArabic ? 'بمجرد طرح الفاتورة في السوق واكتمال تمويلها من المستثمرين، يتم تحويل الأموال خلال 24 ساعة عمل.' : 'Once listed and fully funded, money is transferred within 24 business hours.'}</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-sm hover:bg-white/10 transition-colors">
              <h4 className="font-bold text-lg text-white mb-2">{isArabic ? 'ما هو الضمان للمستثمر؟' : 'What is the guarantee for investors?'}</h4>
              <p className="text-slate-400">{isArabic ? 'نعمل بنظام التخصيم مع حق الرجوع (Recourse). الشركة البائعة للفاتورة تظل هي الضامن النهائي، وتتولى "تدفق" تحصيل الأموال بقوة القانون وسندات الأمر.' : 'We operate on Recourse Factoring. Tadafoq acts as the legal collector securing funds via promissory notes.'}</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-black text-slate-400 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href={`/${lang}`} className="flex items-center gap-2 md:gap-3 mb-6 group">
              <img src="/logo.jpeg" alt="Tadafoq Logo" className="w-10 h-10 md:w-11 md:h-11 object-contain rounded-lg group-hover:scale-105 transition-transform" />
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
              <li><Link href={`/${lang}/about`} className="hover:text-emerald-400 transition-colors">{isArabic ? 'من نحن' : 'About Us'}</Link></li>
              <li><Link href={`/${lang}/terms`} className="hover:text-emerald-400 transition-colors">{isArabic ? 'الشروط والأحكام' : 'Terms & Conditions'}</Link></li>
              <li><Link href={`/${lang}/privacy`} className="hover:text-emerald-400 transition-colors">{isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{isArabic ? 'اتصل بنا' : 'Contact'}</h4>
            <ul className="space-y-2 text-sm">
              <li>support@tadafoq.com</li>
              <li>+20 (100) 000-0000</li>
              <li className="mt-4 text-xs text-slate-600">© 2026 Tadafoq Inc. {isArabic ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.</li>
            </ul>
          </div>
        </div>
      </footer>

      <div className={`fixed bottom-6 ${isArabic ? 'left-6' : 'right-6'} z-50 flex flex-col items-end gap-4`}>
        {isChatOpen && (
          <div className="w-80 sm:w-96 bg-[#111] rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300">
            <div className="bg-black p-4 text-white flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-brand-green rounded-full animate-pulse"></div>
                <span className="font-bold text-sm">{isArabic ? 'مساعد تدفق الذكي (AI)' : 'Tadafoq AI Assistant'}</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white transition-colors"><X size={18} /></button>
            </div>
            
            <div className="p-4 h-72 bg-[#0a0a0a] flex flex-col gap-3 overflow-y-auto text-sm">
              <div className="bg-white/10 p-3.5 rounded-xl rounded-tl-none border border-white/5 text-white shadow-sm w-5/6 relative">
                {isArabic ? 'أهلاً بك يا فندم! أنا مندوب مبيعات "تدفق" الافتراضي. هل تمتلك فواتير لشركتك وتريد سيولة فورية، أم تبحث عن استثمار آمن بعوائد مجزية؟' : 'Hello! I am Tadafoq AI sales rep. Are you looking for instant liquidity for your invoices, or secure investments?'}
              </div>
            </div>
            
            <div className="p-3 bg-[#111] border-t border-white/10 flex items-center gap-2">
              <input type="text" placeholder={isArabic ? 'اكتب رسالتك هنا...' : 'Type your message...'} className="flex-1 bg-black border border-white/10 text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:border-emerald-500 transition-all" />
              <button className="bg-emerald-500 text-black p-2.5 rounded-lg hover:bg-emerald-400 transition-colors shadow-sm"><Send size={16} /></button>
            </div>
          </div>
        )}

        <div className="flex gap-4 flex-row-reverse items-center">
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-14 h-14 bg-emerald-500 text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-110 transition-transform duration-300 relative group z-50"
            aria-label="Open Chat"
          >
            {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-white border-2 border-emerald-500"></span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Wallet, ArrowDownCircle, RefreshCw, ShieldCheck, Landmark, Lock, CreditCard } from 'lucide-react';

export default function WalletPage({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === 'ar';
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [charging, setCharging] = useState(false);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from('profiles').select('wallet_balance').eq('id', user.id).single();
      if (data) setBalance(Number(data.wallet_balance));
    }
    setLoading(false);
  };

  const handleAddFunds = async () => {
    setCharging(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user && balance !== null) {
      const newBalance = balance + 250000;
      const { error } = await supabase.from('profiles').update({ wallet_balance: newBalance }).eq('id', user.id);
      if (!error) setBalance(newBalance);
    }
    setCharging(false);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-emerald-500 flex flex-col items-center gap-4">
        <RefreshCw className="animate-spin" size={40} />
        <span className="font-bold text-slate-400">{isArabic ? 'جاري الاتصال بالنظام البنكي (BaaS)...' : 'Connecting to BaaS System...'}</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto mt-8 font-sans" dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* Container - Ultra Premium Dark Glassmorphism */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Background Glow Effects */}
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-white/10 gap-4">
            <div>
              <h2 className="text-3xl font-black text-white flex items-center gap-3 mb-2">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                  <Wallet className="text-emerald-400" size={28} />
                </div>
                {isArabic ? 'محفظة الضمان (Escrow)' : 'Escrow Wallet'}
              </h2>
              <p className="text-slate-400 text-sm">{isArabic ? 'السيولة النقدية المخصصة لتمويل الفواتير المؤسسية' : 'Liquid capital allocated for institutional invoice funding'}</p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 backdrop-blur-md">
              <ShieldCheck size={16} /> {isArabic ? 'نشط ومحمي بـ 256-bit' : 'Active & 256-bit Secured'}
            </div>
          </div>

          {/* Balance Display Card */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl mb-8 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex justify-between items-start mb-6">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <CreditCard size={18} className="text-slate-500" />
                {isArabic ? 'الرصيد المتاح للاستثمار' : 'Available Balance'}
              </p>
              <div className="text-right">
                <p className="text-xs text-slate-500 mb-1">{isArabic ? 'حساب آيبان افتراضي (IBAN)' : 'Virtual IBAN'}</p>
                <p className="text-sm font-mono text-slate-300 bg-black/50 px-3 py-1 rounded-lg border border-white/5">EG92 0000 0000 0000 4829 1042</p>
              </div>
            </div>

            <div className="text-6xl md:text-7xl font-black text-white flex items-baseline gap-3 tracking-tight">
              {balance?.toLocaleString()} <span className="text-3xl text-emerald-400 font-bold">{isArabic ? 'ج.م' : 'EGP'}</span>
            </div>
          </div>

          {/* Institutional Trust Microcopy */}
          <div className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-2xl flex items-start gap-4 mb-10 backdrop-blur-md">
            <Landmark size={28} className="text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-sm text-blue-300 mb-1.5">{isArabic ? 'الفصل التام للأموال (Fund Segregation)' : 'Strict Fund Segregation'}</h4>
              <p className="text-xs text-blue-200/70 leading-relaxed max-w-2xl">
                {isArabic 
                  ? 'يتم الاحتفاظ برصيدك في حساب ضمان بنكي مجمع (BaaS) خاضع لرقابة البنك المركزي. منصة "تدفق" لا تملك صلاحية استخدام هذه الأموال في أي مصاريف تشغيلية، وتقتصر صلاحيتها على تنفيذ أوامر التمويل المعتمدة منك رقمياً.' 
                  : 'Your balance is held in a regulated BaaS escrow account. Tadafoq cannot use these funds for operational expenses; we only execute digitally approved funding orders.'}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-start">
            <button 
              onClick={handleAddFunds} 
              disabled={charging} 
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none w-full md:w-auto"
            >
              {charging ? <RefreshCw className="animate-spin text-slate-900" size={24} /> : <ArrowDownCircle className="text-slate-900" size={24} />}
              {isArabic ? 'محاكاة إيداع بنكي (250 ألف ج.م)' : 'Simulate Bank Deposit (250k EGP)'}
            </button>
          </div>
          
          <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
            <Lock size={12} />
            {isArabic ? 'جميع التحويلات تخضع لبروتوكولات مكافحة غسيل الأموال (AML) وتعرف على عميلك (KYC).' : 'All transfers are subject to AML and KYC protocols.'}
          </div>

        </div>
      </div>
    </div>
  );
}
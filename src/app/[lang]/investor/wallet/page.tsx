"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Wallet, ArrowDownCircle, RefreshCw, ShieldCheck } from 'lucide-react';

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
      // قراءة الرصيد الحقيقي من قاعدة البيانات
      const { data } = await supabase.from('profiles').select('wallet_balance').eq('id', user.id).single();
      if (data) setBalance(Number(data.wallet_balance));
    }
    setLoading(false);
  };

  const handleAddFunds = async () => {
    setCharging(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user && balance !== null) {
      // محاكاة شحن المحفظة (إضافة 250 ألف جنيه حقيقية في الداتابيز)
      const newBalance = balance + 250000;
      const { error } = await supabase.from('profiles').update({ wallet_balance: newBalance }).eq('id', user.id);
      
      if (!error) {
        setBalance(newBalance);
        alert(isArabic ? 'تم إيداع 250,000 ج.م بنجاح في حساب الضمان المستقل (Virtual IBAN).' : '250,000 EGP deposited successfully to your Escrow IBAN.');
      }
    }
    setCharging(false);
  };

  if (loading) return <div className="p-8 text-center text-slate-500 font-bold">{isArabic ? 'جاري الاتصال بالبنك...' : 'Connecting to Bank...'}</div>;

  return (
    <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-3xl mx-auto mt-10">
      
      <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
        <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
          <Wallet className="text-brand-blue" size={32} />
          {isArabic ? 'محفظة الضمان المستقلة' : 'Escrow Wallet'}
        </h2>
        <div className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-emerald-100">
          <ShieldCheck size={14} /> {isArabic ? 'حساب بنكي آمن' : 'Secured Bank Account'}
        </div>
      </div>

      <div className="bg-slate-900 p-8 rounded-2xl mb-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-brand-green/20 rounded-full blur-3xl"></div>
        <p className="text-slate-400 font-bold mb-2 uppercase tracking-widest text-sm">{isArabic ? 'الرصيد المتاح للاستثمار' : 'Available Balance for Investment'}</p>
        <div className="text-5xl font-black text-white flex items-baseline gap-2">
          {balance?.toLocaleString()} <span className="text-2xl text-brand-green">{isArabic ? 'ج.م' : 'EGP'}</span>
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={handleAddFunds}
          disabled={charging}
          className="bg-brand-green hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center gap-3 disabled:opacity-70 w-full md:w-auto justify-center"
        >
          {charging ? <RefreshCw className="animate-spin" size={24} /> : <ArrowDownCircle size={24} />}
          {isArabic ? 'إيداع أموال (محاكاة 250 ألف ج.م)' : 'Deposit Funds (Simulate 250k EGP)'}
        </button>
      </div>
      <p className="text-center text-slate-400 text-xs mt-4 font-medium">
        {isArabic ? '*الأموال تودع في حساب بنكي مجمع (BaaS) ولا تدخل حسابات المنصة التشغيلية.' : '*Funds are deposited in a BaaS pooled account, separate from operational funds.'}
      </p>

    </div>
  );
}
"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Wallet, ArrowUpCircle, ShieldCheck } from 'lucide-react';

export default function SmeWalletPage({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === 'ar';
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('wallet_balance').eq('id', user.id).single();
        if (data) setBalance(Number(data.wallet_balance) || 0);
      }
      setLoading(false);
    };
    fetchBalance();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500 font-bold">جاري تحميل بيانات المحفظة...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-3xl border border-slate-200 shadow-sm mt-10">
      <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
        <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
          <Wallet className="text-brand-blue" size={32} />
          {isArabic ? 'سيولة الشركة (محفظة الاستلام)' : 'Company Liquidity Wallet'}
        </h2>
      </div>

      <div className="bg-slate-900 p-8 rounded-2xl mb-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-brand-blue/20 rounded-full blur-3xl"></div>
        <p className="text-slate-400 font-bold mb-2 text-sm">{isArabic ? 'إجمالي السيولة المستلمة من الفواتير الممولة' : 'Total Liquidity Received from Invoices'}</p>
        <div className="text-5xl font-black text-white flex items-baseline gap-2">
          {balance.toLocaleString()} <span className="text-2xl text-brand-green">{isArabic ? 'ج.م' : 'EGP'}</span>
        </div>
      </div>

      <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2">
        <ArrowUpCircle size={20} />
        {isArabic ? 'طلب سحب الأموال للحساب البنكي' : 'Withdraw Funds to Bank Account'}
      </button>
      <p className="text-center text-slate-400 text-xs mt-4">
        <ShieldCheck size={14} className="inline mr-1" />
        {isArabic ? 'التحويل يتم عبر شبكة ACH المركزية خلال 24 ساعة عمل.' : 'Transfers are processed via ACH within 24 business hours.'}
      </p>
    </div>
  );
}
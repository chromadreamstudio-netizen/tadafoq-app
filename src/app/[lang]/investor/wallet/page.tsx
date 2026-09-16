"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Wallet, Building2, ArrowDownToLine, Info, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function InvestorWallet({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === 'ar';
  
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [depositAmount, setDepositAmount] = useState('');
  const [isDepositing, setIsDepositing] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchWallet = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from('wallets').select('*').eq('user_id', user.id).single();
      if (data) setWallet(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  // دالة محاكاة التحويل البنكي
  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!depositAmount || isNaN(Number(depositAmount))) return;
    
    setIsDepositing(true);
    const amount = Number(depositAmount);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not auth");

      // تحديث الرصيد في قاعدة البيانات
      const newBalance = (wallet?.balance || 0) + amount;
      await supabase.from('wallets').update({ balance: newBalance }).eq('user_id', user.id);

      // تحديث الواجهة
      setWallet({ ...wallet, balance: newBalance });
      setSuccessMsg(isArabic ? `تم استلام حوالتك البنكية بقيمة ${amount.toLocaleString()} ج.م بنجاح.` : `Bank transfer of ${amount.toLocaleString()} EGP received successfully.`);
      setDepositAmount('');
      
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDepositing(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">{isArabic ? 'جاري تحميل المحفظة...' : 'Loading wallet...'}</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 bg-slate-50 min-h-screen">
      
      {/* الترويسة التثقيفية */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{isArabic ? 'المحفظة الاستثمارية' : 'Investment Wallet'}</h2>
        <p className="text-slate-500 mb-6">{isArabic ? 'إدارة أرصدتك النقدية وحساباتك البنكية الافتراضية.' : 'Manage your cash balances and virtual bank accounts.'}</p>
        
        {/* البانر التثقيفي القانوني (Virtual IBAN) */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex gap-4 items-start">
          <Info size={24} className="text-indigo-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-indigo-900 mb-1">{isArabic ? 'حماية فائقة للأموال (BaaS Integration)' : 'Ultimate Fund Protection'}</h4>
            <p className="text-indigo-700 text-sm leading-relaxed">
              {isArabic 
                ? 'أموالك لا تدخل مطلقاً في الحسابات التشغيلية لمنصة "تدفق". نحن نوفر لك حساباً بنكياً افتراضياً مستقلاً (Virtual IBAN) عبر البنك الشريك. المنصة تعمل فقط كمحرك تقني لتوجيه الأموال (Escrow) بأمرك المباشر.' 
                : 'Your funds never enter Tadafoq\'s operational accounts. We provide a dedicated Virtual IBAN via our partner bank. The platform acts solely as a technical routing engine (Escrow).'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* كارت الرصيد الحالي */}
        <div className="lg:col-span-1 bg-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
          <Wallet size={32} className="text-brand-green mb-6" />
          <div className="text-slate-400 text-sm mb-1">{isArabic ? 'الرصيد المتاح للاستثمار' : 'Available Balance'}</div>
          <div className="text-4xl font-black mb-8">{Number(wallet?.balance || 0).toLocaleString()} <span className="text-lg font-medium text-slate-400">ج.م</span></div>
          
          <div className="border-t border-slate-700/50 pt-4">
            <div className="text-slate-400 text-sm mb-1">{isArabic ? 'الاستثمارات النشطة' : 'Active Investments'}</div>
            <div className="text-xl font-bold">{Number(wallet?.active_investments || 0).toLocaleString()} ج.م</div>
          </div>
        </div>

        {/* كارت الإيداع (محاكاة التحويل البنكي) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <ArrowDownToLine className="text-brand-blue" />
            {isArabic ? 'إيداع أموال (محاكاة العرض الحي)' : 'Deposit Funds (Demo Simulation)'}
          </h3>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center">
                <Building2 className="text-slate-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">{isArabic ? 'حسابك البنكي الافتراضي' : 'Your Virtual IBAN'}</div>
                <div className="text-xs text-slate-500 font-mono mt-1">EG92 0000 0000 0000 1234 5678 90</div>
              </div>
            </div>
            <span className="px-3 py-1 bg-brand-green/10 text-brand-green text-xs font-bold rounded-full">
              {isArabic ? 'نشط' : 'Active'}
            </span>
          </div>

          <form onSubmit={handleDeposit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                {isArabic ? 'المبلغ المراد إيداعه (ج.م)' : 'Amount to deposit (EGP)'}
              </label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="مثال: 100000"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isDepositing}
              className="w-full bg-brand-blue hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {isDepositing ? (isArabic ? 'جاري محاكاة التحويل...' : 'Simulating transfer...') : (isArabic ? 'تأكيد التحويل البنكي' : 'Confirm Bank Transfer')}
            </button>
          </form>

          {successMsg && (
            <div className="mt-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg flex items-center gap-3 animate-in fade-in duration-300">
              <CheckCircle2 size={20} />
              <span className="font-bold">{successMsg}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, TrendingUp, Lock, ArrowUpRight, Calculator, Info, FileText, CheckSquare, Scale } from 'lucide-react';

export default function InvestorMarketplacePage({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === 'ar';
  const [listedInvoices, setListedInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fundingInvoice, setFundingInvoice] = useState<string | null>(null);
  const [legalAccepted, setLegalAccepted] = useState<string | null>(null); // لحفظ حالة الموافقة القانونية لكل فاتورة

  useEffect(() => {
    const fetchMarket = async () => {
      const { data } = await supabase.from('invoices').select('*').eq('status', 'listed').order('created_at', { ascending: false });
      if (data) setListedInvoices(data);
      setLoading(false);
    };
    fetchMarket();
  }, []);

  const maskDebtorName = (name: string) => {
    if (name.toLowerCase().includes('vodafone')) return isArabic ? 'شركة اتصالات كبرى (تصنيف A+)' : 'Major Telecom Company (A+ Rated)';
    return isArabic ? 'شركة كبرى معتمدة' : 'Verified Enterprise';
  };

  const handleFundInvoice = async (invoiceId: string, askingPrice: number) => {
    setFundingInvoice(invoiceId);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("يجب تسجيل الدخول");
      const platformFee = askingPrice * 0.02;

      await supabase.from('invoices').update({ status: 'funded' }).eq('id', invoiceId);
      await supabase.from('transactions').insert({
        invoice_id: invoiceId, investor_id: user.id, invested_amount: askingPrice, platform_fee: platformFee, status: 'escrow_locked'
      });

      setListedInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
      alert(isArabic ? 'تم توقيع العقد الرقمي وتأمين الفاتورة بنجاح!' : 'Digital contract signed and Invoice funded successfully!');
    } catch (err) {
      alert(isArabic ? 'حدث خطأ في عملية التمويل.' : 'Funding failed.');
    } finally {
      setFundingInvoice(null);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500 font-medium">{isArabic ? 'جاري تحميل الفرص الاستثمارية...' : 'Loading market opportunities...'}</div>;

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">{isArabic ? 'سوق الفواتير (Marketplace)' : 'Invoice Marketplace'}</h2>
          <p className="text-slate-500 text-sm">{isArabic ? 'استكشف فرص تمويل قصيرة الأجل بشفافية تامة وعوائد واضحة.' : 'Explore short-term funding opportunities with absolute transparency.'}</p>
        </div>
      </div>

      {/* شريط الثقة العام للسوق (Global Trust Banner) */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
        <Scale className="text-indigo-600 hidden sm:block" size={32} />
        <div>
          <h3 className="text-indigo-900 font-bold text-sm mb-1">
            {isArabic ? 'جميع الاستثمارات محمية قانونياً بحق الرجوع (Recourse Factoring)' : 'All investments are legally protected by Recourse Factoring'}
          </h3>
          <p className="text-indigo-700/80 text-xs">
            {isArabic ? 'الفواتير المعروضة خضعت للمطابقة الثلاثية (Invoice, PO, Delivery Note). في حالة تعثر المدين، تلتزم الشركة البائعة بالسداد عبر سندات أمر موثقة.' : 'Listed invoices undergo 3-way matching. In case of debtor default, the SME is legally bound to repay via promissory notes.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {listedInvoices.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
            <TrendingUp size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-800">{isArabic ? 'السوق هادئ حالياً' : 'Market is quiet'}</h3>
          </div>
        ) : (
          listedInvoices.map((inv) => {
            const originalAmount = Number(inv.invoice_amount);
            const askingPrice = Number(inv.asking_price);
            const grossProfit = originalAmount - askingPrice;
            const platformFee = askingPrice * 0.02;
            const netProfit = grossProfit - platformFee;
            const netROI = ((netProfit / askingPrice) * 100).toFixed(2);
            const daysLeft = Math.ceil((new Date(inv.due_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
            
            const isLegalAccepted = legalAccepted === inv.id;

            return (
              <div key={inv.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col relative">
                
                <div className="bg-slate-900 px-5 py-2 flex justify-between items-center text-xs font-bold text-white">
                  <span className="flex items-center gap-1.5"><Lock size={12} className="text-emerald-400" /> {isArabic ? 'محمية بـ NDA' : 'NDA Protected'}</span>
                  <span className="flex items-center gap-1.5 text-emerald-400"><FileText size={12} /> {isArabic ? 'مطابقة ثلاثية' : '3-Way Matched'}</span>
                </div>

                <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                  <div>
                    <div className="text-xs font-bold text-slate-500 mb-1 uppercase">{isArabic ? 'الجهة المدينة (العميل)' : 'Debtor (Client)'}</div>
                    <div className="font-black text-slate-900 text-lg">{maskDebtorName(inv.debtor_name)}</div>
                  </div>
                  <div className="bg-emerald-100 text-emerald-800 px-3 py-2 rounded-xl text-center shadow-sm">
                    <div className="text-[10px] font-bold uppercase">{isArabic ? 'الصافي' : 'Net ROI'}</div>
                    <div className="font-black text-lg flex items-center justify-center gap-0.5"><ArrowUpRight size={16} /> {netROI}%</div>
                  </div>
                </div>

                <div className="p-6 flex-1 space-y-5">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-slate-500 font-bold">{isArabic ? 'المبلغ المطلوب:' : 'Capital Required:'}</div>
                    <div className="text-2xl font-black text-brand-blue">{askingPrice.toLocaleString()} <span className="text-xs text-slate-500">ج.م</span></div>
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2 text-slate-800 font-black mb-1 border-b border-slate-200 pb-2">
                      <Calculator size={16} className="text-indigo-500" />
                      <span className="text-sm">{isArabic ? 'التحليل المالي' : 'Financial Breakdown'}</span>
                    </div>
                    <div className="flex justify-between text-xs font-medium text-slate-600"><span>{isArabic ? 'القيمة الإجمالية:' : 'Total Value:'}</span><span className="text-slate-900">{originalAmount.toLocaleString()} ج.م</span></div>
                    <div className="flex justify-between text-xs font-medium text-slate-600"><span>{isArabic ? 'الربح الإجمالي:' : 'Gross Profit:'}</span><span className="text-slate-900">+{grossProfit.toLocaleString()} ج.م</span></div>
                    <div className="flex justify-between text-xs font-medium text-red-500"><span>{isArabic ? 'رسوم المنصة (2%):' : 'Platform Fee:'}</span><span>-{platformFee.toLocaleString()} ج.م</span></div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between">
                      <span className="text-sm font-black text-slate-800">{isArabic ? 'صافي الربح:' : 'Net Profit:'}</span>
                      <span className="text-lg font-black text-brand-green">+{netProfit.toLocaleString()} <span className="text-[10px]">ج.م</span></span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                  {/* محاكاة العقد الذكي (Smart Contract Simulation) */}
                  <label className="flex items-start gap-2 mb-4 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="mt-1 w-4 h-4 rounded border-slate-300 text-brand-green focus:ring-brand-green cursor-pointer"
                      checked={isLegalAccepted}
                      onChange={() => setLegalAccepted(isLegalAccepted ? null : inv.id)}
                    />
                    <span className="text-[10px] text-slate-500 leading-tight font-medium group-hover:text-slate-700 transition-colors">
                      {isArabic 
                        ? 'أوافق على توليد العقد الرقمي واتفاقية الحفاظ على السرية (NDA)، وتفويض "تدفق" بخصم المبلغ من محفظة الضمان.' 
                        : 'I agree to generate the digital contract and NDA, and authorize Tadafoq to deduct funds from Escrow.'}
                    </span>
                  </label>

                  <button 
                    onClick={() => handleFundInvoice(inv.id, askingPrice)}
                    disabled={fundingInvoice === inv.id || !isLegalAccepted}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-md flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {fundingInvoice === inv.id ? (isArabic ? 'جاري توقيع العقود...' : 'Signing Contracts...') : (isArabic ? 'توقيع إلكتروني وتأمين الفاتورة' : 'E-Sign & Secure Invoice')}
                    {isLegalAccepted ? <CheckSquare size={18} className="text-brand-green" /> : <Lock size={18} />}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
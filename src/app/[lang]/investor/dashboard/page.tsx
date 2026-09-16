"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, TrendingUp, Lock, ArrowUpRight, Search, FileText, Calculator, Info } from 'lucide-react';

export default function InvestorMarketplacePage({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === 'ar';
  const [listedInvoices, setListedInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fundingInvoice, setFundingInvoice] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarket = async () => {
      const { data } = await supabase
        .from('invoices')
        .select('*')
        .eq('status', 'listed')
        .order('created_at', { ascending: false });
        
      if (data) setListedInvoices(data);
      setLoading(false);
    };

    fetchMarket();
  }, []);

  // دالة الحجب الجزئي (NDA)
  const maskDebtorName = (name: string) => {
    if (name.toLowerCase().includes('vodafone')) return isArabic ? 'شركة اتصالات كبرى (تصنيف A+)' : 'Major Telecom Company (A+ Rated)';
    if (name.toLowerCase().includes('stc')) return isArabic ? 'شركة اتصالات كبرى (تصنيف A+)' : 'Major Telecom Company (A+ Rated)';
    return isArabic ? 'شركة كبرى معتمدة' : 'Verified Enterprise';
  };

  const handleFundInvoice = async (invoiceId: string, askingPrice: number) => {
    setFundingInvoice(invoiceId);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("يجب تسجيل الدخول");

      // عمولة المنصة المبرمجة 2% من مبلغ التمويل
      const platformFee = askingPrice * 0.02;

      const { error: updateError } = await supabase
        .from('invoices')
        .update({ status: 'funded' })
        .eq('id', invoiceId);
        
      if (updateError) throw updateError;

      await supabase.from('transactions').insert({
        invoice_id: invoiceId,
        investor_id: user.id,
        invested_amount: askingPrice,
        platform_fee: platformFee,
        status: 'escrow_locked'
      });

      setListedInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
      alert(isArabic ? 'تم تأمين الفاتورة بنجاح! تم الخصم من محفظتك ونقل الأموال لحساب الضمان.' : 'Invoice funded successfully! Funds secured in Escrow.');
    } catch (err) {
      console.error(err);
      alert(isArabic ? 'حدث خطأ في عملية التمويل. تأكد من الرصيد.' : 'Funding failed. Check balance.');
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
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
          <ShieldCheck size={18} />
          {isArabic ? 'المنصة خاضعة لرقابة الـ BaaS' : 'BaaS Monitored Platform'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {listedInvoices.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
            <TrendingUp size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">{isArabic ? 'السوق هادئ حالياً' : 'Market is quiet'}</h3>
            <p className="text-slate-500">{isArabic ? 'لا توجد فواتير مطروحة للتمويل في الوقت الحالي.' : 'No invoices listed for funding right now.'}</p>
          </div>
        ) : (
          listedInvoices.map((inv) => {
            // المعالجة المالية (Financial Calculation Engine)
            const originalAmount = Number(inv.invoice_amount);
            const askingPrice = Number(inv.asking_price);
            const grossProfit = originalAmount - askingPrice;
            const platformFee = askingPrice * 0.02; // رسوم تدفق 2% من رأس المال
            const netProfit = grossProfit - platformFee;
            const netROI = ((netProfit / askingPrice) * 100).toFixed(2);
            const daysLeft = Math.ceil((new Date(inv.due_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

            return (
              <div key={inv.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col relative group">
                
                {/* شريط علوي يوضح نوع الأمان */}
                <div className="bg-slate-900 px-5 py-2 flex justify-between items-center text-xs font-bold text-white">
                  <span className="flex items-center gap-1.5"><Lock size={12} className="text-emerald-400" /> {isArabic ? 'محمية بـ NDA' : 'NDA Protected'}</span>
                  <span className="flex items-center gap-1.5 text-emerald-400"><FileText size={12} /> {isArabic ? 'مطابقة ثلاثية' : '3-Way Matched'}</span>
                </div>

                <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                  <div>
                    <div className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">{isArabic ? 'الجهة المدينة (العميل)' : 'Debtor (Client)'}</div>
                    <div className="font-black text-slate-900 text-lg">{maskDebtorName(inv.debtor_name)}</div>
                  </div>
                  <div className="bg-emerald-100 text-emerald-800 px-3 py-2 rounded-xl text-center border border-emerald-200 shadow-sm">
                    <div className="text-[10px] font-bold uppercase">{isArabic ? 'الصافي' : 'Net ROI'}</div>
                    <div className="font-black text-lg flex items-center justify-center gap-0.5">
                      <ArrowUpRight size={16} /> {netROI}%
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 space-y-5">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-slate-500 font-bold">{isArabic ? 'المبلغ المطلوب (رأس المال):' : 'Capital Required:'}</div>
                    <div className="text-2xl font-black text-brand-blue">{askingPrice.toLocaleString()} <span className="text-xs text-slate-500 font-normal">ج.م</span></div>
                  </div>
                  
                  {/* صندوق الشفافية المالية (Financial Transparency Box) */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2 text-slate-800 font-black mb-1 border-b border-slate-200 pb-2">
                      <Calculator size={16} className="text-indigo-500" />
                      <span className="text-sm">{isArabic ? 'التحليل المالي للصفقة' : 'Financial Breakdown'}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs font-medium text-slate-600">
                      <span>{isArabic ? 'القيمة الإجمالية للفاتورة:' : 'Total Invoice Value:'}</span>
                      <span className="text-slate-900">{originalAmount.toLocaleString()} ج.م</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-medium text-slate-600">
                      <span>{isArabic ? 'الربح الإجمالي:' : 'Gross Profit:'}</span>
                      <span className="text-slate-900">+{grossProfit.toLocaleString()} ج.م</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-medium text-red-500">
                      <span className="flex items-center gap-1">
                        {isArabic ? 'رسوم منصة تدفق (2%):' : 'Tadafoq Fee (2%):'}
                        <Info size={12} className="cursor-help" title={isArabic ? 'تُخصم من الأرباح مقابل خدمات الضمان والمطابقة' : 'Deducted for escrow and verification services'} />
                      </span>
                      <span>-{platformFee.toLocaleString()} ج.م</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                      <span className="text-sm font-black text-slate-800">{isArabic ? 'صافي الربح لك:' : 'Your Net Profit:'}</span>
                      <span className="text-lg font-black text-brand-green">+{netProfit.toLocaleString()} <span className="text-[10px] text-slate-500">ج.م</span></span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm font-bold bg-indigo-50 text-indigo-800 p-3 rounded-xl border border-indigo-100">
                    <span>{isArabic ? 'مدة الاستثمار:' : 'Investment Term:'}</span>
                    <span>{daysLeft} {isArabic ? 'يوم' : 'Days'}</span>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-100">
                  <button 
                    onClick={() => handleFundInvoice(inv.id, askingPrice)}
                    disabled={fundingInvoice === inv.id}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {fundingInvoice === inv.id ? (isArabic ? 'جاري تأمين الأموال...' : 'Securing Funds...') : (isArabic ? 'إيداع وتأمين الفاتورة' : 'Fund & Secure Invoice')}
                    <Lock size={18} />
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-3 font-medium px-2 leading-relaxed">
                    {isArabic ? '*بمجرد التمويل، تُخصم الأموال من محفظتك لحساب الضمان وتوقع الـ NDA وتطلع على المستندات.' : '*Upon funding, funds are locked in Escrow, you sign NDA and view docs.'}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
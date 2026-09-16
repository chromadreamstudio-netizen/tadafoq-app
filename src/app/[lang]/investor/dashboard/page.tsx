"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, Lock, Calculator, CheckSquare, Scale, Umbrella } from 'lucide-react';

export default function InvestorMarketplacePage({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === 'ar';
  const [listedInvoices, setListedInvoices] = useState<any[]>([]);
  const [legalAccepted, setLegalAccepted] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarket = async () => {
      const { data } = await supabase.from('invoices').select('*').eq('status', 'listed').order('created_at', { ascending: false });
      if (data) setListedInvoices(data);
    };
    fetchMarket();
  }, []);

  const maskDebtorName = (name: string) => isArabic ? 'شركة كبرى (تصنيف A+)' : 'Major Company (A+ Rated)';

  return (
    <div className="space-y-8" dir={isArabic ? 'rtl' : 'ltr'}>
      <div>
        <h2 className="text-3xl font-black text-white mb-2">{isArabic ? 'سوق الفواتير المؤسسية' : 'Institutional Marketplace'}</h2>
      </div>

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-4 flex items-center gap-4 shadow-sm backdrop-blur-sm">
        <Umbrella className="text-blue-400 hidden sm:block" size={32} />
        <div>
          <h3 className="text-blue-300 font-bold text-sm mb-1">
            {isArabic ? 'حماية ثلاثية الأبعاد (صندوق الحماية + تأمين ائتماني + حق الرجوع)' : '3D Protection (Pool + Insurance + Recourse)'}
          </h3>
          <p className="text-blue-200/70 text-xs leading-relaxed max-w-4xl">
            {isArabic ? 'رأس مالك محمي استراتيجياً. المنصة تقتطع 1.5% من كل فاتورة وتوجهها مباشرة لتغطية وثائق التأمين الائتماني (Allianz Trade / EGE) وتغذية صندوق حماية المستثمرين لمواجهة أي تعثر، دون المساس بعائدك الصافي.' : 'Capital is protected via a 1.5% deduction from the SME directed to Credit Insurance policies and the Investor Protection Pool.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {listedInvoices.map((inv) => {
          const originalAmount = Number(inv.invoice_amount);
          const askingPrice = Number(inv.asking_price);
          const totalDiscount = originalAmount - askingPrice; // مثلا 12,000
          
          // الهندسة المالية الدقيقة للشفافية
          const platformFee = originalAmount * 0.025; // 2.5% ربح المنصة الصافي
          const insurancePoolFee = originalAmount * 0.015; // 1.5% صندوق حماية وتأمين
          const investorNetProfit = totalDiscount - platformFee - insurancePoolFee; // 8% الصافي للمستثمر
          
          const netROI = ((investorNetProfit / askingPrice) * 100).toFixed(2);
          const isLegalAccepted = legalAccepted === inv.id;

          return (
            <div key={inv.id} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col relative backdrop-blur-md">
              <div className="bg-slate-900/80 px-5 py-3 flex justify-between items-center text-[10px] font-bold text-white border-b border-white/5">
                <span className="flex items-center gap-1.5"><Lock size={12} className="text-cyan-400" /> {isArabic ? 'محمية بـ NDA' : 'NDA Protected'}</span>
                <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full"><Umbrella size={12} /> {isArabic ? 'مؤمنة ائتمانياً (Allianz Trade)' : 'Insured (Allianz Trade)'}</span>
              </div>

              <div className="p-6 border-b border-white/5 flex justify-between items-start">
                <div>
                  <div className="text-xs font-bold text-slate-500 mb-1">{isArabic ? 'الجهة المدينة (العميل)' : 'Debtor'}</div>
                  <div className="font-black text-white text-lg">{maskDebtorName(inv.debtor_name)}</div>
                </div>
                <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-xl text-center border border-emerald-500/20">
                  <div className="text-[10px] font-bold uppercase">{isArabic ? 'العائد الصافي' : 'Net ROI'}</div>
                  <div className="font-black text-xl">{netROI}%</div>
                </div>
              </div>

              <div className="p-6 flex-1 space-y-6">
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <div className="text-sm text-slate-400 font-bold">{isArabic ? 'رأس المال المطلوب تمويله:' : 'Capital to Fund:'}</div>
                  <div className="text-3xl font-black text-cyan-400">{askingPrice.toLocaleString()} <span className="text-xs text-slate-500">ج.م</span></div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-300 font-black mb-2"><Calculator size={16} className="text-indigo-400" /> <span className="text-sm">{isArabic ? 'تحليل العائد وحماية المخاطر' : 'Risk & Return Breakdown'}</span></div>
                  <div className="flex justify-between text-xs font-medium text-slate-400"><span>{isArabic ? 'القيمة الأصلية للفاتورة:' : 'Original Invoice Value:'}</span><span className="text-white">{originalAmount.toLocaleString()} ج.م</span></div>
                  <div className="flex justify-between text-xs font-medium text-amber-500/80"><span>{isArabic ? 'قسط التأمين الائتماني وصندوق الحماية (يتحمله المورد):' : 'Insurance & Pool Premium (Paid by SME):'}</span><span>{insurancePoolFee.toLocaleString()} ج.م</span></div>
                  <div className="flex justify-between text-xs font-medium text-slate-500"><span>{isArabic ? 'رسوم معالجة المنصة (يتحملها المورد):' : 'Platform Fee (Paid by SME):'}</span><span>{platformFee.toLocaleString()} ج.م</span></div>
                  <div className="pt-3 mt-3 border-t border-white/10 flex justify-between items-center">
                    <span className="text-sm font-black text-slate-300">{isArabic ? 'صافي ربح المستثمر المضمون:' : 'Guaranteed Investor Net Profit:'}</span>
                    <span className="text-xl font-black text-emerald-400">+{investorNetProfit.toLocaleString()} <span className="text-[10px]">ج.م</span></span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-black/40 border-t border-white/5">
                <label className="flex items-start gap-3 mb-5 cursor-pointer group">
                  <input type="checkbox" checked={isLegalAccepted} onChange={() => setLegalAccepted(isLegalAccepted ? null : inv.id)} className="mt-1 w-5 h-5 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500" />
                  <span className="text-xs text-slate-400 leading-relaxed font-medium group-hover:text-slate-200 transition-colors">
                    {isArabic ? 'أوافق على العقود الرقمية واتفاقية الـ NDA. وأفوض "تدفق" بخصم المبلغ من محفظتي، وتوكيلها بتحصيل الفاتورة وتغطيات التأمين.' : 'I agree to the Digital Contracts, NDA, and authorize Tadafoq to manage collection and insurance claims.'}
                  </span>
                </label>
                <button disabled={!isLegalAccepted} className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black py-4 rounded-xl transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:bg-slate-800 disabled:text-slate-500">
                  {isArabic ? 'تمويل الفاتورة بأمان' : 'Secure & Fund Invoice'} {isLegalAccepted ? <CheckSquare size={18} /> : <Lock size={18} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
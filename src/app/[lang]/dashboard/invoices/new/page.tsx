"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { UploadCloud, CheckCircle, Lock, Bot, Scale } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NewInvoicePage({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === 'ar';
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [aiScoring, setAiScoring] = useState(false);
  const [legalChecked, setLegalChecked] = useState(false);
  const [formData, setFormData] = useState({ debtorName: '', invoiceAmount: '', askingPrice: '', dueDate: '' });

  const handleAiScore = async () => {
    if (!formData.debtorName || !formData.invoiceAmount) return alert(isArabic ? 'أدخل اسم العميل وقيمة الفاتورة أولاً' : 'Enter debtor name and amount first');
    setAiScoring(true);
    try {
      const res = await fetch('/api/ai-scoring', {
        method: 'POST',
        body: JSON.stringify({ debtorName: formData.debtorName, amount: formData.invoiceAmount })
      });
      const data = await res.json();
      const suggestedPrice = Number(formData.invoiceAmount) - (Number(formData.invoiceAmount) * data.discountRate);
      setFormData({ ...formData, askingPrice: suggestedPrice.toString() });
      alert(isArabic ? `تم تقييم الشركة بواسطة AI. معدل الخصم المقترح: ${data.discountRate * 100}%` : `AI Scored. Suggested discount: ${data.discountRate * 100}%`);
    } catch (e) {
      console.log(e);
    }
    setAiScoring(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!legalChecked) return alert(isArabic ? 'يجب الموافقة على نقل حقوق التحصيل القانوني.' : 'You must agree to transfer collection rights.');
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('invoices').insert({
        sme_id: user.id, debtor_name: formData.debtorName, invoice_amount: formData.invoiceAmount, asking_price: formData.askingPrice, due_date: formData.dueDate, status: 'under_review'
      });
      router.push(`/${lang}/dashboard`);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl border border-slate-200 shadow-sm mt-10">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
        <UploadCloud size={32} className="text-brand-blue" />
        <h2 className="text-3xl font-black text-slate-900">{isArabic ? 'رفع فاتورة وتوكيل التحصيل' : 'Upload Invoice & Mandate'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">{isArabic ? 'اسم الجهة المدينة (العميل)' : 'Debtor Name'}</label>
          <input required type="text" value={formData.debtorName} onChange={(e) => setFormData({...formData, debtorName: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-blue" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">{isArabic ? 'القيمة الأصلية (ج.م)' : 'Original Amount'}</label>
            <input required type="number" value={formData.invoiceAmount} onChange={(e) => setFormData({...formData, invoiceAmount: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-blue" />
          </div>
          <div className="relative">
            <label className="block text-sm font-bold text-slate-700 mb-2">{isArabic ? 'المبلغ المطلوب بعد الخصم' : 'Asking Price'}</label>
            <input required type="number" value={formData.askingPrice} onChange={(e) => setFormData({...formData, askingPrice: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-blue" />
            <button type="button" onClick={handleAiScore} disabled={aiScoring} className="absolute right-2 top-[34px] bg-slate-900 text-emerald-400 text-[10px] font-bold px-2 py-1.5 rounded-lg flex items-center gap-1 hover:bg-slate-800">
              {aiScoring ? <span className="animate-pulse">...</span> : <Bot size={12} />} {isArabic ? 'تسعير AI' : 'AI Score'}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">{isArabic ? 'تاريخ الاستحقاق' : 'Due Date'}</label>
          <input required type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-blue" />
        </div>

        {/* التعهد القانوني ونقل حق التحصيل */}
        <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl mt-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={legalChecked} onChange={(e) => setLegalChecked(e.target.checked)} className="mt-1 w-5 h-5 rounded text-indigo-600 focus:ring-indigo-600" />
            <div>
              <h4 className="font-bold text-sm text-indigo-900 flex items-center gap-1.5"><Scale size={16}/> {isArabic ? 'تفويض قانوني ملزم (حق الرجوع)' : 'Binding Legal Mandate (Recourse)'}</h4>
              <p className="text-xs text-indigo-700/80 mt-1 leading-relaxed">
                {isArabic ? 'أوافق بموجب هذا العقد الرقمي على نقل حقوق الإدارة والتحصيل القانوني لهذه الفاتورة إلى منصة "تدفق" فور تمويلها، وأتعهد بالسداد الفوري في حال تعثر العميل النهائي.' : 'I agree to transfer legal collection rights to Tadafoq upon funding, and guarantee repayment in case of debtor default.'}
              </p>
            </div>
          </label>
        </div>

        <button disabled={loading || !legalChecked} type="submit" className="w-full bg-slate-900 hover:bg-brand-green text-white font-bold py-4 rounded-xl transition-all shadow-md mt-4 flex items-center justify-center gap-2 disabled:opacity-50">
          {loading ? (isArabic ? 'جاري توثيق التوكيل...' : 'Mandating...') : (isArabic ? 'اعتماد ورفع المستندات لمنصة تدفق' : 'Submit Mandate to Tadafoq')}
          <CheckCircle size={18} />
        </button>
      </form>
    </div>
  );
}
"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { UploadCloud, FileText, CheckCircle, ShieldAlert, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NewInvoicePage({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === 'ar';
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    debtorName: '',
    invoiceAmount: '',
    askingPrice: '',
    dueDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase.from('invoices').insert({
        sme_id: user.id,
        debtor_name: formData.debtorName,
        invoice_amount: formData.invoiceAmount,
        asking_price: formData.askingPrice,
        due_date: formData.dueDate,
        status: 'under_review'
      });
      if (!error) {
        alert(isArabic ? 'تم رفع الفاتورة بنجاح وهي الآن قيد المراجعة الأمنية.' : 'Invoice uploaded and is under security review.');
        router.push(`/${lang}/dashboard`);
      }
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl border border-slate-200 shadow-sm mt-10">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
        <UploadCloud size={32} className="text-brand-blue" />
        <h2 className="text-3xl font-black text-slate-900">{isArabic ? 'رفع فاتورة جديدة' : 'Upload New Invoice'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">{isArabic ? 'اسم الجهة المدينة (العميل)' : 'Debtor Name (Client)'}</label>
          <input required type="text" onChange={(e) => setFormData({...formData, debtorName: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">{isArabic ? 'القيمة الأصلية (ج.م)' : 'Original Amount (EGP)'}</label>
            <input required type="number" onChange={(e) => setFormData({...formData, invoiceAmount: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">{isArabic ? 'المبلغ المطلوب بعد الخصم' : 'Asking Price'}</label>
            <input required type="number" onChange={(e) => setFormData({...formData, askingPrice: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">{isArabic ? 'تاريخ الاستحقاق' : 'Due Date'}</label>
          <input required type="date" onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue" />
        </div>

        {/* نصوص الثقة للمورد (Security Microcopy) */}
        <div className="bg-slate-900 text-white p-4 rounded-xl flex items-start gap-3 mt-6 shadow-md border border-slate-700">
          <Lock size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-emerald-400 mb-1">{isArabic ? 'سرية تامة لأسرارك التجارية' : 'Strict Commercial Confidentiality'}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isArabic ? 'يتم حجب اسم عميلك وتفاصيل الفاتورة جزئياً في السوق (NDA Masking). لن يطلع على المستندات إلا المستثمر الذي أودع الأموال بالفعل في حساب الضمان.' : 'Client name and invoice details are masked in the marketplace. Only the investor who deposits funds in Escrow can view the documents.'}
            </p>
          </div>
        </div>

        <button disabled={loading} type="submit" className="w-full bg-brand-green hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-all shadow-md mt-4 flex items-center justify-center gap-2">
          {loading ? (isArabic ? 'جاري الرفع والأرشفة...' : 'Uploading...') : (isArabic ? 'اعتماد ورفع المستندات' : 'Submit Documents')}
          <CheckCircle size={18} />
        </button>
      </form>
    </div>
  );
}
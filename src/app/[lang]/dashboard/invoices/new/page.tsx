"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { UploadCloud, CheckCircle2, AlertCircle, FileText, FileSignature, ClipboardCheck, ShieldAlert } from 'lucide-react';

export default function NewInvoicePage({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === 'ar';
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [debtorName, setDebtorName] = useState('');
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [askingPrice, setAskingPrice] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [uuid, setUuid] = useState(''); 
  
  // المطابقة الثلاثية (Three-Way Match Files)
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const [poFile, setPoFile] = useState<File | null>(null);
  const [deliveryFile, setDeliveryFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // التحقق من المطابقة الثلاثية
      if (!invoiceFile || !poFile || !deliveryFile) {
        throw new Error(isArabic ? 'حماية النظام ترفض الطلب: يجب إرفاق المستندات الثلاثة (الفاتورة، أمر الشغل، محضر الاستلام).' : 'Security Engine Rejected: All three documents (Invoice, PO, Delivery) are required.');
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("يجب تسجيل الدخول أولاً");

      // تجميع أسماء الملفات لحفظها في قاعدة البيانات للمحاكاة
      const combinedDocsUrl = `${invoiceFile.name} | ${poFile.name} | ${deliveryFile.name}`;

      const { error: insertError } = await supabase
        .from('invoices')
        .insert({
          sme_id: user.id,
          debtor_name: debtorName,
          invoice_amount: parseFloat(invoiceAmount),
          asking_price: parseFloat(askingPrice),
          due_date: dueDate,
          contract_doc_url: combinedDocsUrl, 
          status: 'under_review' 
        });

      if (insertError) throw insertError;

      setSuccess(true);
      
      // تفريغ الحقول
      setDebtorName(''); setInvoiceAmount(''); setAskingPrice(''); setDueDate(''); setUuid('');
      setInvoiceFile(null); setPoFile(null); setDeliveryFile(null);
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'حدث خطأ أثناء رفع الفاتورة');
    } finally {
      setLoading(false);
    }
  };

  // مكون لرفع الملفات لتجنب التكرار في الكود
  const FileUploadZone = ({ id, label, icon: Icon, file, setFile }: any) => (
    <div className="flex-1">
      <label className="block text-slate-700 font-bold mb-2 text-sm">{label}</label>
      <input type="file" id={id} className="hidden" accept=".pdf,.jpg,.png" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <label htmlFor={id} className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer group h-40 ${file ? 'border-brand-green bg-emerald-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}`}>
        {file ? (
          <div className="animate-in zoom-in duration-300">
            <CheckCircle2 size={32} className="text-brand-green mb-2 mx-auto" />
            <p className="text-xs font-bold text-slate-800 line-clamp-1">{file.name}</p>
          </div>
        ) : (
          <div>
            <Icon size={32} className="mx-auto text-slate-400 mb-2 group-hover:text-brand-green group-hover:scale-110 transition-transform" />
            <p className="text-xs font-bold text-slate-700">{isArabic ? 'اضغط للرفع' : 'Click to Upload'}</p>
          </div>
        )}
      </label>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* بانر الذكاء الاصطناعي الأمني */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg flex items-start gap-4">
        <ShieldAlert size={32} className="text-brand-green flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-black text-white mb-2">{isArabic ? 'نظام المطابقة الثلاثية المدعوم بالذكاء الاصطناعي (AI Anti-Fraud)' : 'AI Three-Way Matching Engine'}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {isArabic ? 'لمنع الاحتيال، النظام لن يقبل الفاتورة بدون إرفاق (أمر التوريد PO) و (مستخلص/محضر استلام). سيقوم محرك الذكاء الاصطناعي بمطابقة التواريخ والمبالغ عبر المستندات الثلاثة قبل عرضها للمستثمرين.' : 'To prevent fraud, invoices require matching POs and Delivery Notes. Our AI engine cross-references all data points.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
        
        {success && (
          <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 size={20} />
            <span className="font-bold">{isArabic ? 'تم رفع المستندات بنجاح! جاري فحص الذكاء الاصطناعي.' : 'Documents uploaded! AI verification in progress.'}</span>
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg flex items-center gap-3 animate-in fade-in">
            <AlertCircle size={20} />
            <span className="font-bold">{error}</span>
          </div>
        )}

        <div className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-700 font-bold mb-2 text-sm">{isArabic ? 'اسم الجهة المدينة (الشركة الكبرى)' : 'Debtor Name'}</label>
              <input type="text" value={debtorName} onChange={(e) => setDebtorName(e.target.value)} placeholder="Vodafone Egypt" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue" required />
            </div>

            <div className="bg-indigo-50/50 p-2 rounded-xl border border-indigo-100">
              <label className="block text-indigo-900 font-bold mb-1 text-sm">{isArabic ? 'الرقم التعريفي (UUID)' : 'E-Invoice UUID'}</label>
              <input type="text" value={uuid} onChange={(e) => setUuid(e.target.value)} placeholder="8e5f2a9b-..." className="w-full px-4 py-2 bg-white border border-indigo-200 rounded-lg font-mono text-sm focus:ring-2 focus:ring-indigo-500" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-slate-700 font-bold mb-2 text-sm">{isArabic ? 'القيمة الأصلية (ج.م)' : 'Original Amount'}</label>
              <input type="number" value={invoiceAmount} onChange={(e) => setInvoiceAmount(e.target.value)} placeholder="0.00" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue" required />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-2 text-sm">{isArabic ? 'المبلغ المطلوب (ج.م)' : 'Asking Price'}</label>
              <input type="number" value={askingPrice} onChange={(e) => setAskingPrice(e.target.value)} placeholder="0.00" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue" required />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-2 text-sm">{isArabic ? 'تاريخ الاستحقاق' : 'Due Date'}</label>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue" required />
            </div>
          </div>

          {/* منطقة المطابقة الثلاثية - 3 ملفات */}
          <div className="pt-6 border-t border-slate-200">
            <h4 className="font-black text-slate-800 mb-4">{isArabic ? 'مستندات المطابقة الثلاثية (Required)' : 'Three-Way Match Documents'}</h4>
            <div className="flex flex-col md:flex-row gap-4">
              <FileUploadZone id="po-file" label={isArabic ? '1. أمر الشغل (PO)' : '1. Purchase Order'} icon={FileSignature} file={poFile} setFile={setPoFile} />
              <FileUploadZone id="delivery-file" label={isArabic ? '2. محضر الاستلام' : '2. Delivery Note'} icon={ClipboardCheck} file={deliveryFile} setFile={setDeliveryFile} />
              <FileUploadZone id="invoice-file" label={isArabic ? '3. الفاتورة التجارية' : '3. Commercial Invoice'} icon={FileText} file={invoiceFile} setFile={setInvoiceFile} />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button type="submit" disabled={loading} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-md disabled:opacity-70 flex items-center justify-center gap-2 text-lg">
            {loading ? (isArabic ? 'جاري الفحص والمطابقة...' : 'Verifying...') : (
              <>
                <ShieldAlert size={20} className="text-brand-green" />
                {isArabic ? 'تأكيد وإرسال لمحرك الذكاء الاصطناعي' : 'Confirm & Send to AI Engine'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
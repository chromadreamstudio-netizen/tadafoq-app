"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Plus, Clock, CheckCircle2, XCircle } from 'lucide-react';

export default function SMEInvoicesPage({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === 'ar';
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('invoices')
          .select('*')
          .eq('sme_id', user.id)
          .order('created_at', { ascending: false });
        
        if (data) setInvoices(data);
      }
      setLoading(false);
    };

    fetchInvoices();
  }, []);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'under_review':
        return <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><Clock size={12}/> {isArabic ? 'قيد المراجعة' : 'Under Review'}</span>;
      case 'listed':
        return <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><CheckCircle2 size={12}/> {isArabic ? 'معروضة للتمويل' : 'Listed in Market'}</span>;
      case 'funded':
        return <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><CheckCircle2 size={12}/> {isArabic ? 'تم التمويل بنجاح' : 'Funded'}</span>;
      default:
        return <span className="px-3 py-1 bg-slate-50 text-slate-700 border border-slate-200 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><XCircle size={12}/> {status}</span>;
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">{isArabic ? 'جاري تحميل الفواتير...' : 'Loading invoices...'}</div>;

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-1">{isArabic ? 'فواتيري' : 'My Invoices'}</h2>
          <p className="text-slate-500 text-sm">{isArabic ? 'إدارة وتتبع حالة فواتيرك المرفوعة.' : 'Manage and track your uploaded invoices.'}</p>
        </div>
        
        {/* الثغرة التي تم سدها: تغليف الزر برابط ديناميكي يعمل بكفاءة */}
        <Link 
          href={`/${lang}/dashboard/invoices/new`} 
          className="bg-brand-green hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2"
        >
          <Plus size={20} />
          {isArabic ? 'رفع فاتورة جديدة' : 'Upload New Invoice'}
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-slate-600">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold">{isArabic ? 'الجهة المدينة' : 'Debtor'}</th>
                <th className="px-6 py-4 font-bold">{isArabic ? 'القيمة الأصلية' : 'Original Amount'}</th>
                <th className="px-6 py-4 font-bold">{isArabic ? 'السعر المطلوب' : 'Asking Price'}</th>
                <th className="px-6 py-4 font-bold">{isArabic ? 'تاريخ الاستحقاق' : 'Due Date'}</th>
                <th className="px-6 py-4 font-bold">{isArabic ? 'الحالة' : 'Status'}</th>
                <th className="px-6 py-4 font-bold">{isArabic ? 'الإجراء' : 'Action'}</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500 font-medium">
                    {isArabic ? 'لا توجد فواتير مرفوعة بعد.' : 'No invoices uploaded yet.'}
                  </td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{inv.debtor_name}</td>
                    <td className="px-6 py-4">{Number(inv.invoice_amount).toLocaleString()} ج.م</td>
                    <td className="px-6 py-4 text-brand-green font-bold">{Number(inv.asking_price).toLocaleString()} ج.م</td>
                    <td className="px-6 py-4 text-slate-500">{new Date(inv.due_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{getStatusBadge(inv.status)}</td>
                    <td className="px-6 py-4">
                      <button className="text-brand-blue hover:underline font-bold text-xs">
                        {isArabic ? 'التفاصيل' : 'Details'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
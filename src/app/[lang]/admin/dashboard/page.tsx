"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { CheckCircle, Clock, ShieldAlert } from 'lucide-react';

export default function AdminDashboard({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === 'ar';
  const [pendingInvoices, setPendingInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    // جلب الفواتير قيد المراجعة فقط
    const { data } = await supabase.from('invoices').select('*').eq('status', 'under_review');
    if (data) setPendingInvoices(data);
    setLoading(false);
  };

  const approveInvoice = async (id: string) => {
    const { error } = await supabase.from('invoices').update({ status: 'listed' }).eq('id', id);
    if (!error) {
      setPendingInvoices(prev => prev.filter(inv => inv.id !== id));
      alert(isArabic ? 'تم اعتماد الفاتورة وطرحها في السوق بنجاح.' : 'Invoice approved and listed successfully.');
    }
  };

  if (loading) return <div className="p-8 text-center">جاري تحميل الفواتير...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto mt-10">
      <div className="flex items-center gap-3 mb-8 border-b pb-4">
        <ShieldAlert size={32} className="text-red-500" />
        <h1 className="text-3xl font-black text-slate-900">{isArabic ? 'إدارة تدفق - المراجعة القانونية' : 'Tadafoq Admin - Legal Review'}</h1>
      </div>

      {pendingInvoices.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
          <CheckCircle size={48} className="text-brand-green mx-auto mb-4" />
          <p className="text-xl font-bold text-slate-700">{isArabic ? 'لا توجد فواتير معلقة' : 'No pending invoices'}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingInvoices.map(inv => (
            <div key={inv.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
              <div>
                <h3 className="font-black text-lg">{inv.debtor_name}</h3>
                <p className="text-slate-500 text-sm flex items-center gap-1">
                  <Clock size={14} /> {isArabic ? 'بانتظار الموافقة والمطابقة الثلاثية' : 'Pending 3-way match'}
                </p>
                <div className="mt-2 text-sm font-bold text-brand-blue">
                  {isArabic ? 'المبلغ:' : 'Amount:'} {Number(inv.invoice_amount).toLocaleString()} ج.م
                </div>
              </div>
              
              <button 
                onClick={() => approveInvoice(inv.id)}
                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-green transition-colors flex items-center gap-2"
              >
                <CheckCircle size={18} />
                {isArabic ? 'اعتماد وطرح في السوق' : 'Approve & List'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
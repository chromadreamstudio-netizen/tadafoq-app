import React from 'react';
import Link from 'next/link';
import { DollarSign, FileText, CheckCircle, Clock } from 'lucide-react';
import { Locale } from '@/i18n-config';

export default function DashboardOverview({ params: { lang } }: { params: { lang: Locale } }) {
  const isArabic = lang === 'ar';

  const stats = [
    { title: isArabic ? 'إجمالي السيولة المتاحة' : 'Total Liquidity', value: '0.00 ج.م', icon: <DollarSign size={24} className="text-brand-green" />, bg: 'bg-emerald-50' },
    { title: isArabic ? 'إجمالي الفواتير' : 'Total Invoices', value: '0', icon: <FileText size={24} className="text-brand-blue" />, bg: 'bg-blue-50' },
    { title: isArabic ? 'فواتير ممولة' : 'Funded Invoices', value: '0', icon: <CheckCircle size={24} className="text-indigo-500" />, bg: 'bg-indigo-50' },
    { title: isArabic ? 'قيد المراجعة' : 'Under Review', value: '0', icon: <Clock size={24} className="text-amber-500" />, bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{isArabic ? 'مرحباً بعودتك، شركة المقاولات' : 'Welcome back, Construction Co.'}</h2>
          <p className="text-slate-500 mt-1">{isArabic ? 'إليك ملخص التدفق النقدي الخاص بك اليوم.' : 'Here is your cash flow summary for today.'}</p>
        </div>
        
        {/* التعديل هنا: تحويل الزر إلى Link يوجه إلى صفحة إنشاء الفاتورة الجديدة */}
        <Link 
          href={`/${lang}/dashboard/invoices/new`} 
          className="px-6 py-2.5 bg-brand-green text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all text-center"
        >
          {isArabic ? '+ رفع فاتورة جديدة' : '+ Upload New Invoice'}
        </Link>
      </div>

      {/* كروت الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg}`}>
              {stat.icon}
            </div>
            <div className="text-slate-500 font-medium mb-1">{stat.title}</div>
            <div className="text-2xl font-black text-slate-800">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* قسم الفواتير الأخيرة */}
      <div className="mt-8 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-800">{isArabic ? 'أحدث الفواتير المرفوعة' : 'Recent Invoices'}</h3>
          <button className="text-brand-blue font-medium hover:underline text-sm">
            {isArabic ? 'عرض الكل' : 'View All'}
          </button>
        </div>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={32} className="text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium mb-2">{isArabic ? 'لا توجد فواتير بعد' : 'No invoices yet'}</p>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            {isArabic ? 'قم برفع أول فاتورة لك الآن للبدء في تلقي عروض التمويل وتحويلها إلى كاش.' : 'Upload your first invoice now to start receiving funding offers.'}
          </p>
        </div>
      </div>
    </div>
  );
}
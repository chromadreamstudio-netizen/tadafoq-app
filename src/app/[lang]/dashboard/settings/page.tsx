"use client";

import React from 'react';
import { Settings, Building, Lock } from 'lucide-react';

export default function SmeSettingsPage({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === 'ar';

  return (
    <div className="max-w-4xl mx-auto space-y-6 mt-10">
      <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <Settings className="text-brand-blue" size={32} />
        {isArabic ? 'إعدادات الشركة' : 'Company Settings'}
      </h2>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Building size={20} className="text-slate-400"/> {isArabic ? 'الملف التجاري' : 'Business Profile'}</h3>
        <div className="space-y-4">
          <div><label className="text-sm font-bold text-slate-600 block mb-2">{isArabic ? 'الاسم التجاري' : 'Company Name'}</label><input type="text" disabled value="Kian Solutions" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-500" /></div>
          <div><label className="text-sm font-bold text-slate-600 block mb-2">{isArabic ? 'الرقم الضريبي' : 'Tax ID'}</label><input type="text" disabled value="123-456-789" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-500" /></div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Lock size={20} className="text-emerald-500"/> {isArabic ? 'الأمان والخصوصية' : 'Security & Privacy'}</h3>
        <p className="text-sm text-slate-600 mb-4">{isArabic ? 'نظام الحماية والمطابقة مفعل تلقائياً لجميع معاملاتك.' : 'Security and matching system is active for all transactions.'}</p>
        <button className="bg-slate-100 text-slate-500 px-6 py-2 rounded-lg font-bold text-sm cursor-not-allowed">
          {isArabic ? 'تغيير كلمة المرور' : 'Change Password'}
        </button>
      </div>
    </div>
  );
}
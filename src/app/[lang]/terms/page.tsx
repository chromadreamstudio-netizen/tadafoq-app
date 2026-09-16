"use client";

import React from 'react';
import Link from 'next/link';
import { Scale, ChevronRight } from 'lucide-react';

export default function TermsPage({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === 'ar';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-300 font-sans pt-32 pb-20" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
          <Scale size={40} className="text-emerald-500" />
          <h1 className="text-3xl md:text-4xl font-black text-white">{isArabic ? 'الشروط والأحكام' : 'Terms and Conditions'}</h1>
        </div>

        <div className="space-y-8 text-sm md:text-base leading-relaxed text-slate-400">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">{isArabic ? '1. طبيعة المنصة وعملها' : '1. Nature of the Platform'}</h2>
            <p>{isArabic ? 'تعمل منصة "تدفق" كوسيط تقني (FinTech Marketplace) يربط بين الشركات (الموردين) الباحثين عن سيولة نقدية قصيرة الأجل، وبين المستثمرين. المنصة لا تقدم قروضاً مباشرة، بل تسهل عملية "التخصيم مع حق الرجوع" (Recourse Factoring).' : 'Tadafoq acts as a technical marketplace connecting SMEs with investors. The platform does not issue direct loans, but facilitates Recourse Factoring.'}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-white mb-3">{isArabic ? '2. التزامات الشركة الموردة' : '2. SME Obligations'}</h2>
            <p>{isArabic ? 'يقر المورد بصحة جميع الفواتير وأوامر التوريد المرفوعة. في حال امتناع الجهة المدينة (العميل) عن السداد في تاريخ الاستحقاق، يلتزم المورد قانونياً برد كامل قيمة التمويل بالإضافة للرسوم المتفق عليها للمستثمر (حق الرجوع).' : 'The SME guarantees the authenticity of all uploaded invoices. In case the debtor defaults, the SME is legally bound to repay the funded amount plus agreed fees to the investor (Recourse).'}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">{isArabic ? '3. حسابات الضمان (Escrow)' : '3. Escrow Accounts'}</h2>
            <p>{isArabic ? 'تُدار جميع الأموال المودعة عبر حسابات بنكية مجمعة/مستقلة (BaaS) لا تخضع للحسابات التشغيلية للمنصة، وتقتصر صلاحية المنصة على تنفيذ أوامر الخصم والإيداع المعتمدة إلكترونياً من الأطراف.' : 'All deposited funds are managed via BaaS escrow accounts, separate from platform operational accounts.'}</p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10">
           <Link href={`/${lang}`} className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1 transition-colors">
             {isArabic ? 'العودة للصفحة الرئيسية' : 'Back to Home'} <ChevronRight size={16} className={isArabic ? 'rotate-180' : ''} />
           </Link>
        </div>
      </div>
    </div>
  );
}
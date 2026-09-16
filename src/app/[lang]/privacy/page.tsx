"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export default function PrivacyPage({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === 'ar';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-300 font-sans pt-32 pb-20" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
          <ShieldCheck size={40} className="text-cyan-500" />
          <h1 className="text-3xl md:text-4xl font-black text-white">{isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}</h1>
        </div>

        <div className="space-y-8 text-sm md:text-base leading-relaxed text-slate-400">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">{isArabic ? '1. الحجب الجزئي والأسرار التجارية (NDA)' : '1. NDA Masking & Commercial Secrets'}</h2>
            <p>{isArabic ? 'حماية الأسرار التجارية لعملائنا هي أولويتنا. تُطبق المنصة خوارزميات الحجب الجزئي (Masking) على أسماء الجهات المدينة وتفاصيل البضائع أثناء العرض في السوق. لا يتم الكشف عن المستندات الأصلية إلا للمستثمر الذي قام بإيداع كامل مبلغ التمويل في حساب الضمان وتوقيع اتفاقية السرية.' : 'Protecting trade secrets is our priority. The platform applies masking to debtor names and invoice details in the marketplace. Original documents are only revealed to the fully funded investor under NDA.'}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-white mb-3">{isArabic ? '2. التشفير ومشاركة البيانات' : '2. Encryption and Data Sharing'}</h2>
            <p>{isArabic ? 'جميع بياناتك المالية والشخصية مشفرة بتقنية 256-bit. نحن لا نبيع بياناتك لأي جهة تسويقية. يتم مشاركة بياناتك فقط مع شركائنا من مزودي الخدمات البنكية (BaaS) والجهات الحكومية لغرض المطابقة الضريبية والتحقق من الهوية (KYC/AML).' : 'All data is 256-bit encrypted. We do not sell data. Data is only shared with BaaS partners and government entities for KYC/AML and tax matching purposes.'}</p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10">
           <Link href={`/${lang}`} className="text-cyan-400 hover:text-cyan-300 font-bold inline-flex items-center gap-1 transition-colors">
             {isArabic ? 'العودة للصفحة الرئيسية' : 'Back to Home'} <ChevronRight size={16} className={isArabic ? 'rotate-180' : ''} />
           </Link>
        </div>
      </div>
    </div>
  );
}
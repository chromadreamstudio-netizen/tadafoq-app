"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TrendingUp, Building2, User, ArrowRight, ArrowLeft, ShieldCheck, Mail, Lock } from 'lucide-react';

export default function SignUpPage({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === 'ar';
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState<'sme' | 'investor'>('sme');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. تسجيل المستخدم في Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      // 2. التوجيه الذكي بناءً على نوع الحساب
      if (accountType === 'sme') {
        router.push(`/${lang}/dashboard`); // توجيه المقاول للوحة الشركات
      } else {
        router.push(`/${lang}/investor/dashboard`); // توجيه المستثمر لسوق الفواتير
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || (isArabic ? 'حدث خطأ أثناء التسجيل' : 'An error occurred during sign up'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* الجانب الأيمن: نموذج التسجيل */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-start">
            <Link href={`/${lang}`} className="text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center md:justify-start gap-2 mb-2">
              تدفق<span className="text-brand-green">.</span>
              <TrendingUp size={28} className="text-brand-green" />
            </Link>
            <p className="text-slate-500 font-medium">
              {isArabic ? 'ابدأ رحلتك نحو السيولة أو العوائد المضمونة.' : 'Start your journey towards liquidity or guaranteed returns.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 text-sm font-bold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-6">
            
            {/* اختيار نوع الحساب */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                type="button"
                onClick={() => setAccountType('sme')}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                  accountType === 'sme' ? 'border-brand-blue bg-blue-50 text-brand-blue' : 'border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                <Building2 size={28} className="mb-2" />
                <span className="font-bold text-sm">{isArabic ? 'شركة (SME)' : 'Business'}</span>
              </button>
              <button
                type="button"
                onClick={() => setAccountType('investor')}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                  accountType === 'investor' ? 'border-brand-green bg-emerald-50 text-brand-green' : 'border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                <User size={28} className="mb-2" />
                <span className="font-bold text-sm">{isArabic ? 'مستثمر' : 'Investor'}</span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">{isArabic ? 'البريد الإلكتروني' : 'Email Address'}</label>
              <div className="relative">
                <Mail className="absolute top-3.5 right-4 text-slate-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">{isArabic ? 'كلمة المرور' : 'Password'}</label>
              <div className="relative">
                <Lock className="absolute top-3.5 right-4 text-slate-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-md flex justify-center items-center gap-2 disabled:opacity-70"
            >
              {loading ? (isArabic ? 'جاري الإنشاء...' : 'Creating...') : (isArabic ? 'إنشاء حساب جديد' : 'Create Account')}
              {!loading && (isArabic ? <ArrowLeft size={20} /> : <ArrowRight size={20} />)}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500 font-medium">
            {isArabic ? 'لديك حساب بالفعل؟ ' : 'Already have an account? '}
            <Link href={`/${lang}/login`} className="text-brand-blue hover:underline font-bold">
              {isArabic ? 'سجل دخولك هنا' : 'Login here'}
            </Link>
          </div>
        </div>

        {/* الجانب الأيسر: بانر تثقيفي/جمالي */}
        <div className="hidden md:flex w-1/2 bg-slate-900 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10">
            <ShieldCheck size={48} className="text-brand-green mb-6" />
            <h3 className="text-4xl font-black text-white mb-4 leading-tight">
              {isArabic ? 'أمان بنكي لمستقبلك المالي.' : 'Bank-grade security for your financial future.'}
            </h3>
            <p className="text-slate-400 text-lg">
              {isArabic ? 'انضم إلى المنصة الأكثر أماناً لخصم الفواتير وتمويل الشركات.' : 'Join the most secure platform for invoice factoring and corporate funding.'}
            </p>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold text-xl">"</div>
              <p className="text-slate-200 italic font-medium">
                {isArabic ? 'تدفق غيرت الطريقة التي ندير بها سيولتنا النقدية بالكامل.' : 'Tadafoq completely changed the way we manage our cash flow.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
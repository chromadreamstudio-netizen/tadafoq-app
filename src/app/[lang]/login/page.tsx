"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { TrendingUp } from 'lucide-react';

export default function LoginPage({ params: { lang } }: { params: { lang: string } }) {
  const isArabic = lang === 'ar';
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // محاولة تسجيل الدخول عبر Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(isArabic ? 'بيانات الدخول غير صحيحة، يرجى المحاولة مرة أخرى.' : 'Invalid login credentials, please try again.');
      setLoading(false);
    } else {
      // عند النجاح، توجيه المستخدم إلى الداشبورد
      router.push(`/${lang}/dashboard`);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href={`/${lang}`} className="flex items-center justify-center gap-2 group mb-6">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-slate-800 shadow-lg overflow-hidden">
             <TrendingUp size={24} className="text-brand-green" />
          </div>
          <div className="text-4xl font-black tracking-tight text-brand-blue">
            تدفق<span className="text-brand-green">.</span>
          </div>
        </Link>
        <h2 className="text-center text-3xl font-extrabold text-slate-900">
          {isArabic ? 'تسجيل الدخول الآمن' : 'Secure Login'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 flex items-center justify-center gap-1">
          <ShieldCheck size={16} className="text-brand-green" />
          {isArabic ? 'مساحة عمل مشفرة ومحمية بالكامل' : 'Fully encrypted and protected workspace'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-bold text-slate-700">
                {isArabic ? 'البريد الإلكتروني' : 'Email address'}
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm transition-colors"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700">
                {isArabic ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm transition-colors"
                  dir="ltr"
                />
                <div className={`absolute inset-y-0 ${isArabic ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none`}>
                  <Lock size={18} className="text-slate-400" />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-brand-blue hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:opacity-70 transition-all"
              >
                {loading ? (isArabic ? 'جاري التحقق...' : 'Authenticating...') : (isArabic ? 'دخول آمن' : 'Secure Login')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
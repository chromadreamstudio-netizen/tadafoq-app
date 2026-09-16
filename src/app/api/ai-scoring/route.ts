import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { debtorName, amount } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // وضع احتياطي للعرض إذا لم يتم إعداد المفتاح
      return NextResponse.json({ discountRate: 0.15, recommendation: "Good" });
    }

    const prompt = `أنت محلل مخاطر مالي ائتماني في منصة تخصيم. قم بتقييم قوة الشركة التالية: "${debtorName}".
الفاتورة بقيمة ${amount}. بناءً على قوة هذه الشركة في السوق، اقترح "نسبة خصم" (Haircut) عادلة بين 0.05 (للشركات العملاقة) و 0.25 (للشركات العادية).
رد بصيغة JSON فقط بهذا الشكل بالضبط: {"discountRate": 0.15, "recommendation": "Strong / Medium / High Risk"}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    const data = await response.json();
    const aiText = data.candidates[0].content.parts[0].text;
    const result = JSON.parse(aiText);

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ discountRate: 0.15, recommendation: "Standard" }, { status: 200 });
  }
}
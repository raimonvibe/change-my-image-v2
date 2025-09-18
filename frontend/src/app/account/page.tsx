'use client';
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "../../store/useAuthStore";
import { API_URL } from "../../env";

export default function AccountPage() {
  const { data: session } = useSession();
  const setAuth = useAuthStore(s => s.setAuth);
  const email = useAuthStore(s => s.email);
  const freeRemaining = useAuthStore(s => s.freeRemaining);
  const paidCredits = useAuthStore(s => s.paidCredits);

  useEffect(() => {
    const fetchMe = async () => {
      if (!session) return;
      const token = (session as any).idToken;
      const res = await fetch(`${API_URL}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAuth({
        authenticated: data.authenticated,
        email: data.email,
        freeRemaining: data.freeRemaining,
        paidCredits: data.paidCredits
      });
    };
    fetchMe();
  }, [session, setAuth]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-sky-800">Your Account</h1>
      <div className="rounded-lg border bg-white p-4">
        <div className="text-slate-700">Email: {email || '-'}</div>
        <div className="text-slate-700">Free remaining today: {freeRemaining}</div>
        <div className="text-slate-700">Paid credits: {paidCredits}</div>
      </div>
    </div>
  );
}

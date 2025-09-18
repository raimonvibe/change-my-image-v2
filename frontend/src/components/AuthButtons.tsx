'use client';
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";

export function AuthButtons() {
  const { data } = useSession();
  return (
    <div className="flex items-center gap-3">
      {data?.user ? (
        <>
          <span className="text-sm text-slate-600">{data.user?.email}</span>
          <button onClick={() => signOut()} className="inline-flex items-center gap-1 rounded-md bg-sky-600 px-3 py-1.5 text-white hover:bg-sky-700">
            <LogOut size={16} /> Sign out
          </button>
        </>
      ) : (
        <button onClick={() => signIn('google')} className="inline-flex items-center gap-1 rounded-md bg-sky-600 px-3 py-1.5 text-white hover:bg-sky-700">
          <LogIn size={16} /> Sign in with Google
        </button>
      )}
    </div>
  )
}

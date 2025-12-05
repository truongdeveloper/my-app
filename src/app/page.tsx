'use client'
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function Home() {
  const route = useRouter();

  useEffect(() => {
    const isLogin = async () => {
      const supabase = await createClient();
      const {data, error} = await supabase.auth.getUser();
      console.log(data, error)
      if(error) {
        route.replace('/auth/sign-in')
      }
      if(data.user) {
        route.replace('/dashboard')
      }
    }
    isLogin();
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      </main>
    </div>
  );
}

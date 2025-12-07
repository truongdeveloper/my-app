'use client'
import useLoginListener from "@/hooks/useLoginState";
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
    <div className="">
      <main className="">
      </main>
    </div>
  );
}

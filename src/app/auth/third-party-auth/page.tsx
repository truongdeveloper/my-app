'use client'
import { Spinner } from "@/components/ui/spinner";
import { useLoginState } from "@/store/useLoginState"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation";
import { useEffect } from "react"
export default function ThirdPartyAuth() {

  const { setLogin , setUser } = useLoginState();
  const route = useRouter();

  useEffect(() => {
    const handleDataLogin = async () => {
      const supabase = await createClient();
      const { data, error }  = await supabase.auth.getUser();
      if(!error || data.user != null) {
        setUser(data.user);
        setLogin(true);
        route.replace('/dashboard')
      }else {
        route.replace('/auth/sign-in#error=1&error_description="Invalid User Data')
      }
    }
    handleDataLogin()
  })

  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner className="size-10" />
    </div>
  )
}
import { useLoginState } from "@/store/useLoginState";
import { createClient } from "@/utils/supabase/client";
import { Subscription } from "@supabase/supabase-js";
import { useEffect } from "react";

export default function useLoginListener() {
  const { setUser, setLogin } = useLoginState();

  useEffect(() => {
    let listener: Subscription | null;
    (async () => {
      const supabase = await createClient();
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        console.log(event, session)
        if (session?.user) {
          setUser(session.user);
          setLogin(true);
        } else {
          setUser(null);
          setLogin(false);
        }
      });
      listener = data.subscription;
    })();

    return () => listener?.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

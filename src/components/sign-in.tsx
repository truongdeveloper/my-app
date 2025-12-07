"use client";
import { Github, Eclipse, Triangle } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FieldGroup } from "./ui/field";
import InputCustom from "./common/InputCustom";
import Link from "next/link";
import React from "react";
import { Spinner } from "./ui/spinner";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Provider } from "@supabase/auth-js/dist/module/lib/types";

export default function SignInComponent() {

  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<any>({
    defaultValues: {
      email: "vanminhtruong678@gmail.com",
      password: ""
    },
  });
  const onSubmit = (data: any) => {
    setLoading(true)
    SignInUser(data)
  };

  const SignInUser = async (dataSignIn: any) => {
    const supabase = await createClient();
    const { data , error } = await supabase.auth.signInWithPassword({
      email: dataSignIn.email,
      password: dataSignIn.password
    })
    if (data) {
      toast.success("Đăng nhập thành công!", {
        description: <p className="text-stone-900">Xin chào {data.user?.user_metadata?.fistName} {data.user?.user_metadata?.lastName}.</p>,
      });
    }
    if (error) {
      toast.error("Đăng nhập thất bại", {
        description: <p className="text-red-500">{error.message}</p>
      });
    }
    setLoading(false);
  }

    const signOutByThirdParty = async (provider: Provider) => {
      setLoading(true);
      const supabase = await createClient();
      await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: "http://localhost:3000/auth/callback",
        },
      });
      setLoading(false);
    };

  return (
    <Card className="w-full shadow-xl max-w-[400px] gap-0 pb-0">
      <CardHeader className="text-center gap-0 mb-6">
        <CardTitle className="text-xl pb text-[17px]">
          Sign in to Next Agent Dashboard
        </CardTitle>
        <CardDescription className="pr-4 pl-4 text-[13px]">
          Welcome to Next Shadcn to Manage Debit of BacSongHong Agent.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full rounded-2xl shadow-md">
        <div className="flex gap-3 pl-4 pr-4">
          <Button
            variant="outline"
            onClick={() => signOutByThirdParty('github')}
            className="p-0 shadow-sm font-normal text-muted bg-zinc-900 cursor-pointer flex-1 hover:bg-zinc-900 hover:text-white"
          >
            <Github />
            Github
          </Button>
          <Button
            variant="outline"
            onClick={() => signOutByThirdParty('google')}
            className=" shadow-sm cursor-pointer flex-1 font-normal p-0"
          >
            <Eclipse />
            Google
          </Button>
        </div>
        <div className="flex flex-row items-center mt-6 mb-6">
          <div className="h-[0.4px] w-1/2 bg-muted-foreground"></div>
          <div className="text-muted-foreground pl-3 text-sm pr-3 text-center">
            or
          </div>
          <div className="h-[0.4px] w-1/2 bg-muted-foreground"></div>
        </div>
        <div className="input-field flex gap-3 flex-col">
          <form id="form-sign-in" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <InputCustom
                label="Email address"
                className={{ label: "text-[13px] text-stone-900" }}
                name="email"
                control={form.control}
              />
              <InputCustom
                label="Password"
                className={{ label: "text-[13px] text-stone-900" }}
                name="password"
                type='password'
                control={form.control}
              />
            </FieldGroup>
          </form>
          <Button
            type="submit"
            form="form-sign-in"
            disabled={loading}
            className="flex items-center  mt-6 mb-6 bg-[linear-gradient(rgba(255,255,255,0.11)_0%,transparent_100%)]"
          >
            {loading ? (
              <Spinner />
            ) : (
              <React.Fragment>
                Sign in
                <Triangle className="size-3 rotate-90" />
              </React.Fragment>
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter className=" flex flex-col text-[13px] text-muted-foreground p-0 w-full bg-stone-100">
        <div className="flex gap-2 w-full justify-center shadow-md rounded-2xl pb-4 pt-4">
          <p>Don&apos;t have an account?</p>
          <Link
            href={"/auth/sign-out"}
            className="transition-all text-black hover:underline"
          >
            Sign up
          </Link>
        </div>
        <div className=" font-bold flex gap-2 w-full justify-center shadow-md rounded-2xl pb-4 pt-4">
          <p>Secured by</p>
          <div className="rotate-15 text-stone-800">{`<MiTr>`}</div>
        </div>
      </CardFooter>
    </Card>
  );
}

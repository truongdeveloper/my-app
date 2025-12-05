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
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FieldGroup } from "./ui/field";
import InputCustom from "./common/InputCustom";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import React from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useLoginState } from "@/store/useLoginState";
import { useRouter } from "next/navigation";
import { AuthError, Provider, User } from "@supabase/supabase-js";

const signOutSchema = z.object({
  fistName: z
    .string("Bao gồm ký tự")
    .min(2, "Độ dài tên lớn hơn 2 ký tự")
    .max(50, "Độ dài tên nhỏ hơn 50 ký tự"),
  lastName: z
    .string("Bao gồm ký tự")
    .min(2, "Độ dài tên lớn hơn 2 ký tự")
    .max(50, "Độ dài tên nhỏ hơn 50 ký tự"),
  email: z.email("Đúng định dạng Email"),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*\d).{6,}$/,
      "Phải có 1 ký tự viết hoa, một số và tối thiếu 6 ký tự."
    ),
});

export default function SignOutComponent() {
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser, setLogin } = useLoginState();
  const router = useRouter();

  const form = useForm<z.infer<typeof signOutSchema>>({
    resolver: zodResolver(signOutSchema),
    defaultValues: {
      fistName: "Van",
      lastName: "Minh",
      email: "vanminhtruong678@gmail.com",
      password: "hehe@123",
    },
  });

  const onSubmit = (data: any) => {
    setLoading(true);
    SignUpNewUser(data);
  };

  const SignUpNewUser = async (dataSignOut: any) => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email: dataSignOut.email,
      password: dataSignOut.password,
      options: {
        data: {
          fistName: dataSignOut.fistName,
          lastName: dataSignOut.lastName,
        },
      },
    });
    handleDataLogin(data.user, error);
    setLoading(false);
  };

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

  const handleDataLogin = (data: any, error: any) => {
    if (data) {
      toast.success("Đăng ký thành công!", {
        description: (
          <p className="text-stone-900">
            Chúc mừng {data?.user_metadata?.fistName} đăng ký thành công!
          </p>
        ),
      });
      setUser(data);
      setLogin(true);
      router.push("/dashboard");
    }
    if (error) {
      toast.error("Đăng ký thất bại", {
        description: <p className="text-red-500">{error?.message}</p>,
      });
    }
  };

  return (
    <Card className="w-full shadow-xl max-w-[400px] gap-0 pb-0">
      <CardHeader className="text-center gap-0 mb-6">
        <CardTitle className="text-xl pb text-[17px]">
          Create your Account
        </CardTitle>
        <CardDescription className="pr-4 pl-4 text-[13px]">
          Welcome to Next Shadcn to Manage Debit of BacSongHong Agent. Get
          started?
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full rounded-2xl shadow-md">
        <div className="flex gap-3 pl-4 pr-4">
          <Button
            variant="outline"
            className="p-0 shadow-sm font-normal text-muted bg-zinc-900 cursor-pointer flex-1 hover:bg-zinc-900 hover:text-white"
            onClick={() => signOutByThirdParty('github')}
          >
            <Github />
            Github
          </Button>
          <Button
            variant="outline"
            className=" shadow-sm cursor-pointer flex-1 font-normal p-0"
            onClick={() => signOutByThirdParty('google')}
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
          <form id="sign-out-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-2">
              <div className="flex flex-row gap-3">
                <InputCustom
                  name="fistName"
                  label="Fist Name"
                  placeholder="Văn"
                  control={form.control}
                />
                <InputCustom
                  name="lastName"
                  label="Last Name"
                  placeholder="Minh Trường"
                  control={form.control}
                />
              </div>

              <InputCustom
                name="email"
                label="Email address"
                placeholder="vanminhtruong678@gmail.com"
                control={form.control}
              />
              <InputCustom
                name="password"
                label="Password"
                control={form.control}
                type={"password"}
              />
            </FieldGroup>
          </form>
          <Button
            form="sign-out-form"
            disabled={loading}
            className="flex items-center  mt-6 mb-6 bg-[linear-gradient(rgba(255,255,255,0.11)_0%,transparent_100%)]"
          >
            {loading ? (
              <Spinner />
            ) : (
              <React.Fragment>
                Register
                <Triangle className="size-3 rotate-90" />
              </React.Fragment>
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter className=" flex flex-col text-[13px] text-muted-foreground p-0 w-full bg-stone-100">
        <div className="flex gap-2 w-full justify-center shadow-md rounded-2xl pb-4 pt-4">
          <p>Have an account?</p>
          <Link
            href={"/auth/sign-in"}
            className="transition-all text-black hover:underline"
          >
            Sign in
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

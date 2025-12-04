import SignOutComponent from "@/components/sign-out";
import Link from "next/link";

export default function SignOut() {
    return (
      <div className="flex flex-row h-screen">
      <div className="lg:w-1/2 bg-zinc-900 lg:p-8 w-0 flex justify-between flex-col text-white">
        <div className="items-center flex gap-3">
          <div className="logo font-bold text-4xl">
            ⌘
          </div>
          <div className="text-xl font-semibold">Minh Trường</div>
        </div>
        <div className="text-2xl font-bold">
          Coding by @Văn Minh Trường
        </div>
      </div>
      <div className="bg-white lg:w-1/2 w-full lg:p-8 p-4 flex flex-col items-center h-full justify-center">
        <div className=" text-muted-foreground text-sm max-w-[400px]">
          Design By Shadcn/ui Dashboard and Coding By
        </div>
        <div className="pb-3 text-muted-foreground text-sm">
          @Văn Minh Trường
        </div>
        <SignOutComponent />
        <div className="text-[13px] text-muted-foreground text-md p-3 max-w-[400px] text-center">
          By clicking continue, you agree to our <Link href={'#'} className="text-stone-900 hover:underline">Terms of Service and Privacy Policy</Link>.
        </div>
      </div>
    </div>
    )
}
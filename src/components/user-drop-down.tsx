"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import {
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  Bell,
  ChevronsUpDown,
  CircleUser,
  CreditCard,
  LogOut,
} from "lucide-react";
import { useLoginState } from "@/store/useLoginState";
import { createClient } from "@/utils/supabase/client";

const listData = [
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: <CircleUser />,
  },
  {
    title: "Billing",
    url: "/dashboard/billing",
    icon: <CreditCard />,
  },
  {
    title: "Notifications",
    url: "/dashboard/notification",
    icon: <Bell />,
  },
];

export default function UserNav(props: any) {

  // TO DO: The State in there is not working right because logic of global state.
  const {setUser, user, isLogin, setLogin } = useLoginState();

  const defaultData = {
    avatar: user?.user_metadata?.picture ?? "https://github.com/shadcn.png",
    name: user?.user_metadata?.full_name ?? "Default Name",
    email: user?.user_metadata?.email ?? "Default email",
  };

  const handleLogOut = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    setUser(null);
    setLogin(false);
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size={"lg"}>
              <Avatar className="rounded-[8]">
                <AvatarImage src={defaultData.avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm">
                <div className="font-medium">{defaultData.name}</div>
                <div className=" truncate text-xs">{defaultData.email}</div>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="min-w-56 rounder-b-xl">
            <DropdownMenuLabel className=" flex items-center truncate gap-2">
              <Avatar className="rounded-[8]">
                <AvatarImage src={defaultData.avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm">
                <div className="font-medium">{defaultData.name}</div>
                <div className=" truncate text-xs">{defaultData.email}</div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {listData.map((item) => (
              <DropdownMenuItem key={item.title} className="cursor-pointer">
                {item.icon && item.icon}
                {item.title}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => handleLogOut()}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

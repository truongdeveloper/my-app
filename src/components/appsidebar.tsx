import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  ChevronRight,
  CreditCard,
  Handbag,
  LayoutDashboard,
  ListCollapse,
} from "lucide-react";
import OrgDropdown from "./org-drop-down";
import UserNav from "./user-drop-down";
import React, { ReactNode } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { stringify } from "querystring";
const routerItem = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: Handbag,
  },
  {
    title: "Account",
    url: "/dashboard/products",
    icon: CreditCard,
    isActive: true,
    children: [
      {
        title: "Profile",
        url: "/profile",
        icon: null,
      },
      {
        title: "Login",
        url: "/auth/sign-in",
        icon: null,
      },
    ],
  },
  {
    title: "Kanban",
    url: "/dashboard/products",
    icon: Handbag,
  },
];

  function NavHasChildren({item}: {item: any}){
    return (
      <Collapsible
        asChild
        defaultOpen={item.isActive}
        className="group/collapsible"
      >
        <SidebarMenuItem className="mb-2.5">
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="cursor-pointer">
              {item?.icon && <item.icon />}
              {item.title}
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {item.children?.map((subItem: any) => (
              <SidebarMenuSub key={subItem.title}>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>{subItem.title}</SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            ))}
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  };

export default function AppSideBar(props: any) {
  const { nameCompany = "BAC SONG HONG" } = props;

  return (
    <Sidebar>
      <SidebarHeader>
        <OrgDropdown />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            {routerItem.map((item) => (
              <React.Fragment key={item.title}>
                {item.children ? (
                  <NavHasChildren item={item}/>
                ) : (
                  <SidebarMenuItem className="mb-2.5">
                    <SidebarMenuButton className="cursor-pointer">
                      {item?.icon && <item.icon />}
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </React.Fragment>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserNav></UserNav>
      </SidebarFooter>
    </Sidebar>
  );
}

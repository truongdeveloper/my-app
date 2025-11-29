import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import  AppSideBar  from "@/components/appsidebar"

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return (

    <SidebarProvider>
      <AppSideBar/>
      <main>
      <SidebarTrigger/>
      {children}
      </main>
    </SidebarProvider>
  )
}
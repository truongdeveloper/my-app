import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSideBar from "@/components/appsidebar";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSideBar />
      <main>
        <SidebarTrigger />
        {children}
        <Toaster position="top-center" closeButton={true} />
      </main>
    </SidebarProvider>
  );
}

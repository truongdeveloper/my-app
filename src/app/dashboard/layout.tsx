import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSideBar from "@/components/appsidebar";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSideBar />
      <main>
        <Header />
          {children}
        <Toaster position="top-center" closeButton={true} />
      </main>
    </SidebarProvider>
  );
}

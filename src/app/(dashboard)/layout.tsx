import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="container mx-auto p-4 px-[5%]">
        <SidebarTrigger className="mb-4" />
        {children}
      </main>
    </SidebarProvider>
  );
}

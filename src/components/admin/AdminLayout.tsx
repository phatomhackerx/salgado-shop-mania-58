
import { useState, useEffect } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export const AdminLayout = () => {
  const isDesktop = !useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(isDesktop);
  
  // Adjust sidebar state when screen size changes
  useEffect(() => {
    setSidebarOpen(isDesktop);
  }, [isDesktop]);
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col">
        <AdminHeader sidebarOpen={sidebarOpen} onSidebarOpenChange={setSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

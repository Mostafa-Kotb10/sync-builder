import Navbar from "@/components/navigation/Navbar";
import React from "react";

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
      
    </div>
  );
};

export default MainLayout;

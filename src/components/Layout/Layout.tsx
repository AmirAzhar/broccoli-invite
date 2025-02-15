import React from "react";

// Components
import Header from "./Header";
import Footer from "./Footer";

// Types
import { LayoutProps } from "./Layout.d";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen text-gray-800 transition-all dark:text-gray-100">
      <Header />
      <main className="flex items-center justify-center flex-grow pt-20 pb-20 dark:bg-gray-800 ">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

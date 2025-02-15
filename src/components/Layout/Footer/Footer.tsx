import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 shadow-md w-full fixed bottom-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Broccoli &amp; Co. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

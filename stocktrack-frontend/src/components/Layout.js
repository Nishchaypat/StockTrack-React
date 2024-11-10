import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  const location = useLocation();
  
  // List of routes where we don't want to show the navbar
  const noNavbarRoutes = ['/dashboard', '/watchlist', '/profile'];

  // Check if current path matches any of the noNavbarRoutes
  const shouldShowNavbar = !noNavbarRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="relative flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 ml-64"> {/* Adjust this value based on sidebar width */}
        {/* Conditionally render Navbar */}
        {shouldShowNavbar && <Navbar />}

        {/* Page content */}
        <main className={`p-8 ${!shouldShowNavbar ? 'pt-4' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

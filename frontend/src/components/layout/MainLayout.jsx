import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '../cart/CartDrawer';

const MainLayout = () => {
  return (
    <div className="layout-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Toaster position="bottom-center" toastOptions={{ 
        style: {
          background: 'var(--color-text-main)',
          color: 'var(--color-background)',
          borderRadius: 'var(--border-radius-md)',
        }
      }} />
      <Navbar />
      <CartDrawer />
      <main className="main-content" style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

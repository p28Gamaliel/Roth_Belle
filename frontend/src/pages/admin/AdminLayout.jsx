import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Shirt, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
  const { user } = useAuth();

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">Roth Belle</div>
        
        <nav className="admin-nav">
          <NavLink 
            to="/admin" 
            end
            className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={20} />
            <span>Resumen</span>
          </NavLink>
          
          <NavLink 
            to="/admin/orders" 
            className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
          >
            <ShoppingBag size={20} />
            <span>Órdenes</span>
          </NavLink>
          
          <NavLink 
            to="/admin/products" 
            className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
          >
            <Shirt size={20} />
            <span>Productos</span>
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-back-store">
            <LogOut size={16} />
            <span>Volver a la Tienda</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-content">
        <header className="admin-header">
          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            Admin: {user?.email}
          </span>
        </header>
        
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

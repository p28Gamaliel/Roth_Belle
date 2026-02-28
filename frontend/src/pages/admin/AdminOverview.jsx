import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon, color }) => (
  <div className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
    <div style={{ 
      backgroundColor: `${color}15`, 
      color: color, 
      width: '60px', height: '60px', 
      borderRadius: '50%', 
      display: 'flex', alignItems: 'center', justifyContent: 'center' 
    }}>
      {icon}
    </div>
    <div>
      <h4 style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>{title}</h4>
      <h2 style={{ margin: 0, fontSize: '1.8rem' }}>{value}</h2>
    </div>
  </div>
);

const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch Orders
        const { data: orders, error: ordersError } = await supabase
          .from('orders')
          .select('total_amount');
        
        if (ordersError) throw ordersError;

        // Fetch Products count
        const { count: productsCount, error: productsError } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });

        if (productsError) throw productsError;

        const totalSales = orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0);

        setStats({
          totalSales: totalSales,
          totalOrders: orders.length,
          totalProducts: productsCount || 0
        });

      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Cargando estadísticas...</div>;

  return (
    <div>
      <h1 className="admin-page-title">Panel de Control</h1>
      
      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' 
      }}>
        <StatCard 
          title="Ventas Totales" 
          value={`$${stats.totalSales.toFixed(2)}`} 
          icon={<DollarSign size={28} />} 
          color="#10b981" 
        />
        <StatCard 
          title="Pedidos" 
          value={stats.totalOrders} 
          icon={<ShoppingBag size={28} />} 
          color="#3b82f6" 
        />
        <StatCard 
          title="Productos Activos" 
          value={stats.totalProducts} 
          icon={<TrendingUp size={28} />} 
          color="#8b5cf6" 
        />
      </div>

      <div className="admin-card">
        <h3>Bienvenida al Panel Roth Belle</h3>
        <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>
          Desde aquí puedes gestionar todas las operaciones de la tienda. Selecciona "Órdenes" para ver los pagos pendientes y despacharlos, o "Productos" para actualizar tu catálogo en tiempo real.
        </p>
      </div>
    </div>
  );
};

export default AdminOverview;

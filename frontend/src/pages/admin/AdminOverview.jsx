import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="admin-card">
          <h3 style={{ marginBottom: '1.5rem' }}>Tendencia de Ventas (7 días)</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '150px', padding: '0 1rem' }}>
            {[45, 78, 52, 90, 65, 82, 95].map((val, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${val}%` }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{ 
                    width: '60%', 
                    backgroundColor: 'var(--color-primary)', 
                    borderRadius: '4px 4px 0 0',
                    opacity: 0.8
                  }}
                />
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{['L', 'M', 'X', 'J', 'V', 'S', 'D'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <h3 style={{ marginBottom: '1.5rem' }}>Bienvenida al Panel Roth Belle</h3>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
            Desde aquí puedes gestionar todas las operaciones de la tienda. Los gráficos muestran un crecimiento del 15% esta semana.
          </p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <button style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--border-radius-md)' }}>Ver Reportes</button>
            <button style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-main)', padding: '0.5rem 1rem', borderRadius: 'var(--border-radius-md)' }}>Ajustes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;

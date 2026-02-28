import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // We fetch orders. Note: By default, RLS might hide other users' orders 
      // unless admin policies are applied.
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error al obtener las órdenes:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      
      // Update local state
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      console.error("Error actualizando la orden:", error);
    }
  };

  if (loading) return <div>Cargando órdenes...</div>;

  return (
    <div>
      <h1 className="admin-page-title">Gestión de Órdenes</h1>
      
      <div className="admin-card">
        {orders.length === 0 ? (
          <p>No hay órdenes registradas aún.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '1rem' }}>ID Pedido</th>
                <th style={{ padding: '1rem' }}>Cliente</th>
                <th style={{ padding: '1rem' }}>Total</th>
                <th style={{ padding: '1rem' }}>Método</th>
                <th style={{ padding: '1rem' }}>Estado</th>
                <th style={{ padding: '1rem' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    {order.id.substring(0, 8)}...
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <strong>{order.shipping_name}</strong><br/>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{order.shipping_email}</span>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>
                    ${order.total_amount}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      backgroundColor: order.payment_method === 'local' ? '#eef2ff' : '#f0fdf4',
                      color: order.payment_method === 'local' ? '#4f46e5' : '#16a34a',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }}>
                      {order.payment_method.toUpperCase()}
                    </span>
                    {order.payment_reference && (
                      <div style={{ fontSize: '0.75rem', marginTop: '0.3rem', color: 'var(--color-text-muted)' }}>
                        Ref: {order.payment_reference}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <select 
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      style={{ 
                        padding: '0.4rem', 
                        borderRadius: '4px', 
                        border: '1px solid #ddd',
                        fontFamily: 'inherit',
                        backgroundColor: order.status === 'pending' ? '#fffbeb' : '#f0fdf4'
                      }}
                    >
                      <option value="pending">Pendiente de Pago</option>
                      <option value="paid">Pagado</option>
                      <option value="shipped">Enviado</option>
                      <option value="delivered">Entregado</option>
                    </select>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {/* Botón para ver detalles (MVP simplificado) */}
                    <button 
                      onClick={() => alert(`Artículos en la orden:\n${order.order_items.map(i => `${i.quantity}x ${i.product_name}`).join('\n')}`)}
                      style={{ background: 'none', border: '1px solid #ddd', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Ver Artículos
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;

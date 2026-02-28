import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabaseClient';
import toast from 'react-hot-toast';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, cartTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: user?.email || '',
    address: '',
    paymentMethod: 'local',
    paymentReference: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, don't show checkout
  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center', minHeight: '60vh' }}>
        <h2>Tu carrito está vacío</h2>
        <p style={{ marginBottom: '2rem', color: 'var(--color-text-muted)' }}>Agrega algunos estilos antes de procesar el pago.</p>
        <Link to="/shop" className="btn btn-primary">Ir al Catálogo</Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formData.paymentMethod === 'stripe') {
        const { data, error } = await supabase.functions.invoke('stripe-checkout', {
          body: {
            items: cartItems,
            email: formData.email
          }
        });

        if (error || !data?.url) {
          throw new Error('No se pudo inicializar el pago con Stripe. Revisa la consola o las Edge Functions.');
        }

        // Redirect securely to Stripe's hosted checkout page
        window.location.href = data.url;
        return;
      }

      // If local payment (PagoMóvil):
      // 1. Create Order in Supabase
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          total_amount: cartTotalPrice,
          shipping_name: formData.name,
          shipping_email: formData.email,
          shipping_address: formData.address,
          payment_method: formData.paymentMethod,
          payment_reference: formData.paymentReference,
          status: 'pending' // pending verification
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create Order Items
      const orderItemsToInsert = cartItems.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price_at_time: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsToInsert);

      if (itemsError) throw itemsError;

      // 3. Success
      clearCart();
      toast.success('¡Pedido realizado con éxito! Lo verificaremos pronto.');
      navigate('/'); 

    } catch (error) {
      console.error("Error al procesar el pago:", error);
      toast.error(error.message || 'Hubo un error al procesar tu pedido. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-container">
      <h1 style={{ marginBottom: '2rem' }}>Finalizar Compra</h1>
      
      <div className="checkout-grid">
        
        {/* Formulario Real */}
        <form onSubmit={handleCheckout} className="checkout-form">
          <h3 style={{ marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid #eee' }}>1. Datos de Envío</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <input 
              type="text" name="name" placeholder="Nombre completo" required
              value={formData.name} onChange={handleInputChange}
              style={{ padding: '0.8rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid #ddd', fontFamily: 'inherit' }} 
            />
            <input 
              type="email" name="email" placeholder="Correo electrónico" required
              value={formData.email} onChange={handleInputChange}
              style={{ padding: '0.8rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid #ddd', fontFamily: 'inherit' }} 
            />
            <input 
              type="text" name="address" placeholder="Dirección de entrega completa" required
              value={formData.address} onChange={handleInputChange}
              style={{ padding: '0.8rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid #ddd', fontFamily: 'inherit' }} 
            />
          </div>

          <h3 style={{ marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid #eee' }}>2. Método de Pago</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="radio" name="paymentMethod" value="local" 
                checked={formData.paymentMethod === 'local'} onChange={handleInputChange}
              />
              <strong>Pago Local (PagoMóvil / Transferencia)</strong>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="radio" name="paymentMethod" value="stripe" 
                checked={formData.paymentMethod === 'stripe'} onChange={handleInputChange}
              />
              <span>Tarjeta de Crédito Internacional (Stripe)</span>
            </label>
            
            {formData.paymentMethod === 'local' && (
              <div style={{ backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid #ddd', marginTop: '0.5rem' }}>
                <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Realiza tu pago a los siguientes datos:</p>
                <ul style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--color-text-muted)', listStyle: 'inside' }}>
                  <li>Banco: Pago Móvil Roth Belle</li>
                  <li>Teléfono: 0414-1234567</li>
                  <li>RIF: J-12345678-9</li>
                </ul>
                <input 
                  type="text" name="paymentReference" placeholder="Número de Referencia de Pago" required={formData.paymentMethod === 'local'}
                  value={formData.paymentReference} onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid #ddd', fontFamily: 'inherit' }} 
                />
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Procesando...' : 'Confirmar Compra'}
          </button>
        </form>

        {/* Order Summary */}
        <div className="checkout-summary">
          <h3 style={{ marginBottom: '1.5rem' }}>Resumen del Pedido</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>{item.quantity}x {item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee', paddingTop: '1rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
            <span>Total</span>
            <span style={{ color: 'var(--color-accent)' }}>${cartTotalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

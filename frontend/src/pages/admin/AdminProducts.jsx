import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import toast from 'react-hot-toast';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_slug: 'vestidos',
    image_url: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openNewModal = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', price: '', stock: '', category_slug: 'vestidos', image_url: '' });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      stock: product.stock,
      category_slug: product.category_slug,
      image_url: product.image_url || ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Edit existing
        const { error } = await supabase
          .from('products')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
        toast.success('Producto actualizado');
      } else {
        // Create new
        const { error } = await supabase
          .from('products')
          .insert([formData]);
        if (error) throw error;
        toast.success('Producto creado exitosamente');
      }
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error('Error al guardar el producto');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) throw error;
        toast.success('Producto eliminado');
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error('Error al eliminar');
      }
    }
  };

  if (loading) return <div>Cargando productos...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 className="admin-page-title" style={{ margin: 0 }}>Catálogo de Productos</h1>
        <button onClick={openNewModal} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem' }}>
          + Agregar Producto
        </button>
      </div>
      
      <div className="admin-card">
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee', color: 'var(--color-text-muted)' }}>
              <th style={{ padding: '1rem' }}>Imagen</th>
              <th style={{ padding: '1rem' }}>Nombre</th>
              <th style={{ padding: '1rem' }}>Categoría</th>
              <th style={{ padding: '1rem' }}>Precio</th>
              <th style={{ padding: '1rem' }}>Stock</th>
              <th style={{ padding: '1rem' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '1rem' }}>
                  <img src={product.image_url} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                </td>
                <td style={{ padding: '1rem', fontWeight: '500' }}>{product.name}</td>
                <td style={{ padding: '1rem', textTransform: 'capitalize' }}>{product.category_slug}</td>
                <td style={{ padding: '1rem' }}>${product.price}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    color: product.stock <= 5 ? 'var(--color-accent)' : 'inherit',
                    fontWeight: product.stock <= 5 ? 'bold' : 'normal'
                  }}>
                    {product.stock}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <button onClick={() => openEditModal(product)} style={{ marginRight: '0.5rem', background: 'none', border: '1px solid #ddd', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer' }}>Editar</button>
                  <button onClick={() => handleDelete(product.id)} style={{ background: 'none', border: '1px solid var(--color-accent)', color: 'var(--color-accent)', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer' }}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="admin-card" style={{ width: '100%', maxWidth: '500px' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>{editingId ? 'Editar Producto' : 'Nuevo Producto'}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" name="name" placeholder="Nombre completo" value={formData.name} onChange={handleInputChange} required style={inputStyle} />
              <textarea name="description" placeholder="Descripción física material/estilo" value={formData.description} onChange={handleInputChange} style={{ ...inputStyle, minHeight: '80px' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input type="number" name="price" placeholder="Precio ($)" value={formData.price} onChange={handleInputChange} required style={inputStyle} min="0" step="0.01" />
                <input type="number" name="stock" placeholder="Cantidad disponible" value={formData.stock} onChange={handleInputChange} required style={inputStyle} min="0" />
              </div>
              <select name="category_slug" value={formData.category_slug} onChange={handleInputChange} required style={inputStyle}>
                <option value="vestidos">Vestidos</option>
                <option value="tops">Tops</option>
                <option value="sets">Sets y Conjuntos</option>
                <option value="casual">Casual</option>
              </select>
              <input type="url" name="image_url" placeholder="URL de la Foto (https://...)" value={formData.image_url} onChange={handleInputChange} required style={inputStyle} />
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.6rem 1rem' }}>Cancelar</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 2rem' }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  padding: '0.8rem',
  borderRadius: '4px',
  border: '1px solid #ddd',
  fontFamily: 'inherit',
  width: '100%',
  boxSizing: 'border-box'
};

export default AdminProducts;

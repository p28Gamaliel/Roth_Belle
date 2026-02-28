-- 1. CREACIÓN DE LA TABLA DE ÓRDENES
CREATE TABLE IF NOT EXISTS orders (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  total_amount numeric(10,2) NOT NULL,
  shipping_name text NOT NULL,
  shipping_email text NOT NULL,
  shipping_address text NOT NULL,
  payment_method text NOT NULL, -- 'stripe' o 'local'
  payment_reference text,       -- Referencia de pago móvil/transferencia
  status text DEFAULT 'pending', -- 'pending', 'paid', 'shipped', 'delivered'
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CREACIÓN DE LA TABLA DE ITEMS POR ORDEN (Para saber qué prendas se compraron)
CREATE TABLE IF NOT EXISTS order_items (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  product_name text NOT NULL,
  quantity integer NOT NULL,
  price_at_time numeric(10,2) NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. POLÍTICAS DE SEGURIDAD (Row Level Security)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Los usuarios solo pueden ver y crear sus propias órdenes
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
CREATE POLICY "Users can view their own orders" ON orders FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own orders" ON orders;
CREATE POLICY "Users can insert their own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Los usuarios solo pueden ver y crear items de sus propias órdenes
DROP POLICY IF EXISTS "Users can view their own order items" ON order_items;
CREATE POLICY "Users can view their own order items" ON order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Users can insert their own order items" ON order_items;
CREATE POLICY "Users can insert their own order items" ON order_items FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
  )
);

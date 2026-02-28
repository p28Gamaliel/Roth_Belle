-- 4. POLÍTICAS DE ADMINISTRADOR TEMPORALES PARA EL DASHBOARD
-- Esto permite que cualquier usuario que haya iniciado sesión (autenticado)
-- pueda operar como "Administrador" para probar el Panel de Control.
-- IMPORTANTE: En producción, esto debe limitarse solo a `user_id = tu_id_real`

-- Habilitar ver todas las órdenes a los admins (autenticados)
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
CREATE POLICY "Admins can view all orders" ON orders FOR SELECT USING (auth.role() = 'authenticated');

-- Habilitar actualizar estado de órdenes (pending -> paid) a los admins
DROP POLICY IF EXISTS "Admins can update orders" ON orders;
CREATE POLICY "Admins can update orders" ON orders FOR UPDATE USING (auth.role() = 'authenticated');

-- Habilitar a los admins hacer todo con los productos (Insertar, Actualizar, Borrar)
DROP POLICY IF EXISTS "Admins can insert products" ON products;
CREATE POLICY "Admins can insert products" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update products" ON products;
CREATE POLICY "Admins can update products" ON products FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete products" ON products;
CREATE POLICY "Admins can delete products" ON products FOR DELETE USING (auth.role() = 'authenticated');

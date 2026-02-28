-- ESTE SCRIPT ES SEGURO PARA CORRER MÚLTIPLES VECES
-- Evita el error "la relación ya existe"

-- 1. CREACIÓN DE LA TABLA DE CATEGORÍAS (Solo si no existe)
CREATE TABLE IF NOT EXISTS categories (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug text UNIQUE NOT NULL, 
  name text NOT NULL,        
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CREACIÓN DE LA TABLA DE PRODUCTOS (Solo si no existe)
CREATE TABLE IF NOT EXISTS products (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  stock integer DEFAULT 0,
  image_url text,
  category_slug text REFERENCES categories(slug),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. POLÍTICAS DE SEGURIDAD (Row Level Security)
-- Habilitamos RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Evitamos el error si las políticas ya existen eliminándolas primero
DROP POLICY IF EXISTS "Allow public read access to categories" ON categories;
DROP POLICY IF EXISTS "Allow public read access to products" ON products;

-- Las volvemos a crear
CREATE POLICY "Allow public read access to categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to products" ON products FOR SELECT USING (true);


-- 4. INSERTAR DATOS DE PRUEBA (MOCK DATA)
-- Usamos "ON CONFLICT DO NOTHING" para evitar duplicados infinitos si corres esto varias veces

-- Insertar Categorías
INSERT INTO categories (slug, name) VALUES 
  ('dresses', 'Vestidos'),
  ('tops', 'Blusas & Tops'),
  ('bottoms', 'Pantalones & Faldas'),
  ('accessories', 'Accesorios')
ON CONFLICT (slug) DO NOTHING;

-- Nota: Como 'products' no tiene un campo UNIQUE aparte del ID, no podemos usar ON CONFLICT fácil aquí.
-- Si vuelves a correr este código, podrías ver productos duplicados. Si eso pasa, avísame y te armo un script para limpiarlos.
INSERT INTO products (name, description, price, stock, image_url, category_slug) VALUES 
  (
    'Vestido Midi Floral Elegance', 
    'Vestido de corte midi con estampado floral sutil, cuello en V y ajuste en la cintura. Perfecto para eventos de día o salidas casuales con estilo.',
    45.99, 12, 
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'dresses'
  ),
  (
    'Blusa de Seda Champagne', 
    'Blusa fluida de seda pura en tono champagne. Diseño minimalista con mangas abullonadas, ideal para la oficina o una cena elegante.',
    32.50, 8, 
    'https://images.unsplash.com/photo-1551139158-a968600a7ddf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'tops'
  ),
  (
    'Pantalón Palazzo Negro Mate', 
    'Pantalones de tiro alto con pierna ultra ancha. Confeccionados en tela de caída pesada que estiliza la figura y brinda máxima comodidad.',
    38.00, 15, 
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'bottoms'
  ),
  (
    'Bolso de Cuero Minimalista', 
    'Bolso estructurado de cuero vegano con herrajes dorados. Tamaño perfecto para llevar tus esenciales del día a día.',
    55.00, 5, 
    'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'accessories'
  ),
  (
    'Top Corset Satén Rosa', 
    'Top estilo corset en satén color rosa empolvado. Detalle de varillas suaves que moldean la silueta y tirantes finos ajustables.',
    28.99, 20, 
    'https://images.unsplash.com/photo-1621072156002-e2f526040473?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'tops'
  ),
  (
    'Falda Plisada Dorada', 
    'Falda midi con pliegues definidos y un ligero acabado metalizado en tono dorado. Una pieza statement para cualquier guardarropa.',
    42.00, 10, 
    'https://images.unsplash.com/photo-1583496661160-c5dcb40f6b53?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'bottoms'
  );

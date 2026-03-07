# Plan de Implementación: Elevando 'Roth_Belle' a Nivel de Agencia

Este plan detalla las mejoras necesarias para transformar el MVP actual en un caso de estudio de alto impacto que demuestre habilidades técnicas y visión de negocio.

## User Review Required

> [!IMPORTANT]
> Proponemos instalar `framer-motion` para animaciones premium.
> También sugerimos integrar una pequeña interfaz de Chatbot IA (OpenAI) para atención al cliente personalizada.

## Proposed Changes

### 🎨 Diseño y UX (Visual Excellence)
- **[MODIFY] [index.css](file:///c:/Users/PC/Roth_Belle/frontend/src/index.css)**: Refinar el sistema de diseño con más variables para espaciado y sombras suaves.
- **[MODIFY] [Home.jsx](file:///c:/Users/PC/Roth_Belle/frontend/src/pages/Home.jsx)**: Añadir animaciones de entrada a las secciones destacadas.
- **[MODIFY] [Navbar.jsx](file:///c:/Users/PC/Roth_Belle/frontend/src/components/layout/Navbar.jsx)**: Hacerlo "Sticky" con un efecto de desenfoque (backdrop-filter) premium.

### ⚙️ Funcionalidades de Negocio (Conversion Focus)
- **[NEW] [AIAssistant.jsx](file:///c:/Users/PC/Roth_Belle/frontend/src/components/chat/AIAssistant.jsx)**: Mini chat flotante para consultas rápidas sobre productos.
- **[MODIFY] [ProductCard.jsx](file:///c:/Users/PC/Roth_Belle/frontend/src/components/products/ProductCard.jsx)**: Añadir efectos "hover" avanzados y carga progresiva de imágenes.

### 📊 Dashboard Administrativo (SaaS Level)
- **[MODIFY] [AdminOverview.jsx](file:///c:/Users/PC/Roth_Belle/frontend/src/pages/admin/AdminOverview.jsx)**: Añadir gráficos visuales (usando una librería ligera o CSS puro) para mostrar métricas de ventas irreales (demo data).

---

## Verification Plan

### Automated Tests
- Ejecutar `npm run lint` para asegurar calidad de código.
- Verificar tiempos de carga en el navegador usando la herramienta de auditoría de Chrome (Lighthouse).

### Manual Verification
1.  **Flujo de Compra**: Verificar que el botón de añadir al carrito tenga feedback visual inmediato.
2.  **Responsividad**: Probar el menú de navegación en resoluciones móviles.
3.  **Chatbot UI**: Asegurar que la burbuja del chat no obstruya elementos críticos de la tienda.

# Roth Belle Backend

Este directorio contiene toda la configuración, scripts y lógica relacionada con el backend del proyecto (Supabase).
Al mantener esto separado del `frontend`, logramos una arquitectura modular, más limpia y lista para escalar.

## Estructura

- `/supabase/setup`: Contiene los scripts SQL necesarios para inicializar la base de datos.
- `/supabase/functions` (Próximamente): Aquí vivirán las _Edge Functions_ de Supabase (por ejemplo, para procesar pagos con Stripe de forma segura sin exponer las API keys de la tienda).

## Primeros Pasos

Si acabas de clonar este proyecto, debes correr el script de inicialización en tu panel de Supabase:

1. Abre el archivo `./supabase/setup/01_initial_schema.sql`
2. Cópialo completo y pégalo en el "SQL Editor" de tu proyecto (https://mkleuhekyjbggrbbeokx.supabase.co)
3. Haz clic en "Run".

Una vez completado, el frontend ya podrá conectarse usando las variables de entorno (`.env`).

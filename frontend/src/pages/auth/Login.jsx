import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../services/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect them to the home page or dashboard
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h2>Bienvenido a Roth Belle</h2>
          <p>Inicia sesión o regístrate para guardar tu carrito y realizar pedidos.</p>
        </div>
        
        <div className="auth-wrapper">
          <Auth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'var(--color-primary)',
                    brandAccent: '#b08188',
                  }
                }
              }
            }}
            theme="light"
            providers={[]}
            magicLink={false}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Correo Electrónico',
                  password_label: 'Contraseña',
                  button_label: 'Iniciar Sesión',
                  loading_button_label: 'Iniciando sesión...',
                  social_provider_text: 'Iniciar sesión con {{provider}}',
                  link_text: '¿Ya tienes una cuenta? Inicia sesión'
                },
                sign_up: {
                  email_label: 'Correo Electrónico',
                  password_label: 'Contraseña',
                  button_label: 'Registrarse',
                  loading_button_label: 'Registrando...',
                  link_text: '¿No tienes cuenta? Regístrate'
                },
                magic_link: {
                  button_label: 'Enviar Enlace Mágico',
                  link_text: '¿Problemas con contraseña? Enviar enlace mágico',
                }
              },
            }}
            redirectTo={window.location.origin}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

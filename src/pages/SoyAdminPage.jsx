import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Key, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';

const SoyAdminPage = () => {
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5094';

    const handleMasterLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(`${API_URL}/api/auth/master-login`, { password });
            
            // Save to sessionStorage (Master mode is session-only for safety)
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('user', JSON.stringify(response.data.user));
            sessionStorage.setItem('isMaster', 'true');

            // Also sync to localStorage if the POS depends on it for 'admin' role
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Redirect to admin panel
            // Note: Since this is a separate app, we use absolute path or window.location if necessary,
            // but usually in this mono-repo /admin is the route for the admin panel.
            window.location.href = '/admin'; 
        } catch (err) {
            setError('PIN Técnico Incorrecto. Acceso denegado.');
            console.error('Master Login Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div style={headerStyle}>
                    <ShieldAlert size={48} color="#F1C40F" />
                    <h1 style={titleStyle}>ACCESO TÉCNICO</h1>
                    <p style={subtitleStyle}>Modo de Recuperación de Emergencia</p>
                </div>

                <form onSubmit={handleMasterLogin} style={formStyle}>
                    <div style={inputContainerStyle}>
                        <Key size={20} color="#F1C40F" style={iconStyle} />
                        <input
                            type="password"
                            placeholder="Introduce PIN Maestro"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={inputStyle}
                            autoFocus
                        />
                    </div>

                    {error && <p style={errorStyle}>{error}</p>}

                    <button 
                        type="submit" 
                        disabled={isLoading || !password}
                        style={isLoading ? {...buttonStyle, ...disabledButtonStyle} : buttonStyle}
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : <>ACCEDER <ArrowRight size={20} /></>}
                    </button>
                </form>

                <div style={footerStyle}>
                    <p>SNACK TANGER • SOPORTE DE SISTEMAS</p>
                </div>
            </div>
        </div>
    );
};

// --- STYLES (En-linea para máxima compatibilidad y simplicidad) ---
const containerStyle = {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#0a160d', // Very dark green
    fontFamily: "'Black Ops One', cursive",
    color: '#fff'
};

const cardStyle = {
    background: '#142818',
    padding: '3rem',
    borderRadius: '24px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(241, 196, 15, 0.1)',
    border: '2px solid #F1C40F',
    width: '100%',
    maxWidth: '450px',
    textAlign: 'center'
};

const headerStyle = {
    marginBottom: '2.5rem'
};

const titleStyle = {
    fontSize: '2rem',
    color: '#F1C40F',
    margin: '1rem 0 0.5rem 0',
    letterSpacing: '2px'
};

const subtitleStyle = {
    fontSize: '0.9rem',
    color: '#bbb',
    textTransform: 'uppercase',
    letterSpacing: '1px'
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
};

const inputContainerStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
};

const iconStyle = {
    position: 'absolute',
    left: '15px'
};

const inputStyle = {
    width: '100%',
    padding: '18px 18px 18px 50px',
    borderRadius: '12px',
    border: '1px solid rgba(241, 196, 15, 0.3)',
    background: 'rgba(0,0,0,0.3)',
    color: '#F1C40F',
    fontSize: '1.2rem',
    outline: 'none',
    transition: 'border 0.3s'
};

const buttonStyle = {
    padding: '18px',
    borderRadius: '12px',
    border: 'none',
    background: '#F1C40F',
    color: '#142818',
    fontSize: '1.2rem',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.3s',
    fontWeight: 'bold',
    fontFamily: 'inherit'
};

const disabledButtonStyle = {
    opacity: 0.6,
    cursor: 'not-allowed'
};

const errorStyle = {
    color: '#ff4d4d',
    fontSize: '0.9rem',
    margin: '-0.5rem 0 0'
};

const footerStyle = {
    marginTop: '3rem',
    fontSize: '0.7rem',
    color: '#666',
    letterSpacing: '3px'
};

export default SoyAdminPage;

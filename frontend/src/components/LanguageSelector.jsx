
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import '../index.css';

const LANGUAGES = [
    { code: 'es', label: 'Castellano', flag: '/icons/es.svg' },
    { code: 'ca', label: 'Català', flag: '/icons/ca.svg' },
    { code: 'fr', label: 'Français', flag: '/icons/fr.svg' },
    { code: 'en', label: 'English', flag: '/icons/en.svg' },
    { code: 'ar', label: 'العربية', flag: '/icons/ar.svg' },
    { code: 'de', label: 'Deutsch', flag: '/icons/de.svg' },
    { code: 'nl', label: 'Nederlands', flag: '/icons/nl.svg' },
];

const LanguageSelector = ({ currentLang, onLanguageChange, isWelcomeScreen = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const current = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`lang-selector-container ${isWelcomeScreen ? 'welcome-mode' : ''}`} ref={containerRef}>
            <button
                className={`lang-toggle-btn ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Select Language"
            >
                <img src={current.flag} alt={current.label} className="current-flag-img" />
                <span className="current-code user-select-none">{current.code.toUpperCase()}</span>
                <ChevronDown size={16} className={`chevron-icon ${isOpen ? 'rotate' : ''}`} />
            </button>

            {isOpen && (
                <div className="lang-dropdown-menu animate-fade-in-fast">
                    {LANGUAGES.map(lang => (
                        <button
                            key={lang.code}
                            className={`lang-option ${currentLang === lang.code ? 'active' : ''}`}
                            onClick={() => {
                                onLanguageChange(lang.code);
                                setIsOpen(false);
                            }}
                        >
                            <img src={lang.flag} alt={lang.label} className="option-flag-img" />
                            <span className="option-label">{lang.label}</span>
                            {currentLang === lang.code && <div className="active-dot"></div>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;

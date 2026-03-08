
import React, { createContext, useContext, useState, useEffect } from 'react';
import { resources } from '../data/locales';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Default to Spanish, try to read from localStorage if you want persistence
    const [language, setLanguage] = useState(localStorage.getItem('snack_lang') || 'es');

    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('snack_lang', lang);
    };

    const t = (key) => {
        const langData = resources[language]?.ui;
        // Search in UI keys
        if (langData && langData[key]) return langData[key];

        // Fallback to ES
        return resources['es']?.ui[key] || key;
    };

    // Helper to get translated category name
    const getCategoryName = (category) => {
        if (!category) return "";
        return category.name; // REFLEJO 100% DINÁMICO DEL TPV (IGNORA LOCALES)
    };

    // Helper to translate product properties overlaying them on top of original
    const getTranslatedProduct = (product) => {
        if (!product) return null;
        return { ...product }; // REFLEJO 100% DINÁMICO DEL TPV (IGNORA LOCALES)
    };

    // Direction (rtl/ltr)
    const dir = resources[language]?.direction || 'ltr';

    return (
        <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t, getCategoryName, getTranslatedProduct, dir }}>
            <div dir={dir} style={{ height: '100%', width: '100%' }}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);


import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSiteConfig } from '../api';

const SiteConfigContext = createContext();

export const SiteConfigProvider = ({ children }) => {
    const [siteConfig, setSiteConfig] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadConfig = async () => {
        try {
            setIsLoading(true);
            const data = await getSiteConfig();
            setSiteConfig(data);
        } catch (err) {
            console.error("Failed to load site config:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadConfig();
    }, []);

    return (
        <SiteConfigContext.Provider value={{ siteConfig, isLoading, error, refreshConfig: loadConfig }}>
            {children}
        </SiteConfigContext.Provider>
    );

};

export const useSiteConfig = () => useContext(SiteConfigContext);

import React from 'react';
import { useTenant } from '../../context/TenantContext';
import { useLanguage } from '../../context/LanguageContext';

const DeliverySection = () => {
    const { theme } = useTenant();
    const { t } = useLanguage();

    if (!theme) return null;

    const uberEatsLink = theme.socials.uberEats || "#";
    const phoneNumber = theme.contact.phone || "";

    return (
        <section id="delivery" className="delivery-section">
            <div className="delivery-wrapper">
                <div className="section-head mb-12">
                    <h2>{t('delivery_title')}</h2>
                    <div className="section-divider"></div>
                </div>

                <div className="delivery-container">
                    {(uberEatsLink && uberEatsLink !== "#") && (
                        <a 
                            href={uberEatsLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="delivery-card uber-eats"
                        >
                            <div className="delivery-logo-wrapper">
                                <img src="/images/ubereats.webp" alt="Uber Eats" className="delivery-brand-logo" />
                            </div>
                            <div className="delivery-text-info">
                                <span className="delivery-btn-text">{t('order_ubereats')}</span>
                                <span className="delivery-note">{t('ubereats_note')}</span>
                            </div>
                            <div className="delivery-arrow">➔</div>
                        </a>
                    )}

                    {(glovoLink && glovoLink !== "#") && (
                        <a 
                            href={glovoLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="delivery-card glovo"
                        >
                            <div className="delivery-logo-wrapper">
                                <img src="/images/glovo.webp" alt="Glovo" className="delivery-brand-logo" />
                            </div>
                            <div className="delivery-text-info">
                                <span className="delivery-btn-text">Pide en Glovo</span>
                                <span className="delivery-note">Recíbelo en casa</span>
                            </div>
                            <div className="delivery-arrow">➔</div>
                        </a>
                    )}

                    <a 
                        href={`tel:${phoneNumber.replace(/\s+/g, '')}`} 
                        className="delivery-card local"
                    >
                        <div className="delivery-logo-wrapper">
                            <img src={theme.brand.logoHeader || theme.brand.logoFallback} alt="Snack Tanger" className="delivery-brand-logo" />
                        </div>
                        <div className="delivery-text-info">
                            <span className="delivery-btn-text">{t('local_order_label')}</span>
                            <span className="delivery-note">{t('delivery_fee_note')}</span>
                        </div>
                        <div className="delivery-arrow">➔</div>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default DeliverySection;

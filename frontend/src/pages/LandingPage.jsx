
import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import FeaturedMenu from '../components/landing/FeaturedMenu';
import ReviewsSection from '../components/landing/ReviewsSection';
import HoursCard from '../components/landing/HoursCard';
import DeliverySection from '../components/landing/DeliverySection';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import './LandingPage.css';
import { useTenant } from '../context/TenantContext';
import { useLanguage } from '../context/LanguageContext';
import { useSiteConfig } from '../context/SiteConfigContext';

const LandingPage = () => {
    const { theme } = useTenant();
    const { t } = useLanguage();
    const { siteConfig, isLoading: configLoading } = useSiteConfig();
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [currentBanner, setCurrentBanner] = useState(0);

    const heroMedia = siteConfig?.hero || [];
    const socialVideos = siteConfig?.social_videos || [];
    const contact = siteConfig?.contact || theme.contact || {};
    const socials = siteConfig?.contact || theme.socials || {}; 
    // site_config uses same object for socials inside contact for simplicity in SyncSiteConfig

    // Auto-slide Hero Media Logic (4s interval for images, videos handle their own onEnded)
    useEffect(() => {
        if (heroMedia.length === 0) return;
        const currentItem = heroMedia[currentBanner];
        // If it's an image, slide after 4 seconds
        if (!currentItem?.url.endsWith('.mp4')) {
            const timeout = setTimeout(() => {
                nextHeroMedia();
            }, 4000);
            return () => clearTimeout(timeout);
        }
    }, [currentBanner, heroMedia]);

    const handleHeroVideoEnd = () => {
        nextHeroMedia();
    };

    const nextHeroMedia = () => {
        setCurrentBanner((prev) => (prev + 1) % heroMedia.length);
    };

    const prevHeroMedia = () => {
        setCurrentBanner((prev) => (prev - 1 + heroMedia.length) % heroMedia.length);
    };

    const nextSocialVideo = () => {
        setCurrentVideoIndex((prev) => (prev + 1) % socialVideos.length);
    };

    const prevSocialVideo = () => {
        setCurrentVideoIndex((prev) => (prev - 1 + socialVideos.length) % socialVideos.length);
    };

    if (configLoading) return null;

    return (
        <div className="landing-page">
            <Navbar />

            <section id="hero" className="hero-section">
                <div className="hero-bg"></div>

                <div className="hero-content landing-grid">
                    {/* Left: Text & Image Slider */}
                    <div className="text-center">


                        <h1 className="hero-title">{theme.restaurantName.toUpperCase()}<br /><span>{theme.restaurantSuffix}</span></h1>

                        <div className="hero-slider-container">
                            {heroMedia.length > 0 ? (
                                <>
                                    {heroMedia.map((item, index) => (
                                        item.url.endsWith('.mp4') ? (
                                            <video
                                                key={index}
                                                src={item.url}
                                                autoPlay
                                                muted
                                                playsInline
                                                onEnded={handleHeroVideoEnd}
                                                className={`hero-slide ${currentBanner === index ? 'active' : ''}`}
                                                {...(index === 0 ? { fetchpriority: "high" } : { loading: "lazy" })}
                                            />
                                        ) : (
                                            <img
                                                key={index}
                                                src={item.url}
                                                alt="Hero Slide"
                                                className={`hero-slide ${currentBanner === index ? 'active' : ''}`}
                                                {...(index === 0 ? { fetchpriority: "high" } : { loading: "lazy" })}
                                            />
                                        )
                                    ))}
                                    
                                    {/* Navigation Arrows */}
                                    <button onClick={(e) => { e.stopPropagation(); prevHeroMedia(); }} className="hero-arrow-btn hero-arrow-prev" aria-label={t('hero_prev')}>
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); nextHeroMedia(); }} className="hero-arrow-btn hero-arrow-next" aria-label={t('hero_next')}>
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            ) : (
                                <div className="flex-center w-full h-full bg-black/20">Cargando...</div>
                            )}
                        </div>

                        <p className="hero-subtitle">
                            {t('hero_subtitle')}
                        </p>

                        <div className="hero-buttons">
                            <Link to="/menu" style={{ textDecoration: 'none', width: '100%', maxWidth: '350px' }}>
                                <button className="hero-main-btn">
                                    {t('view_menu_btn')}
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Social Video Player */}
                    <div className="video-card-container">
                        <div className="video-card">
                            <div className="video-frame-overlay"></div>

                            <div className="video-inner-container">
                                {socialVideos.length > 0 && (
                                    <video
                                        key={socialVideos[currentVideoIndex]?.url}
                                        src={socialVideos[currentVideoIndex]?.url}
                                        autoPlay
                                        muted
                                        playsInline
                                        loop
                                        onEnded={nextSocialVideo}
                                        loading="lazy"
                                    />
                                )}
                            </div>

                            <div className="video-gradient-overlay"></div>

                            <div className="video-controls-layer">
                                <button onClick={(e) => { e.stopPropagation(); prevSocialVideo(); }} className="arrow-btn arrow-prev">
                                    <ChevronLeft size={24} />
                                </button>

                                <button onClick={(e) => { e.stopPropagation(); nextSocialVideo(); }} className="arrow-btn arrow-next">
                                    <ChevronRight size={24} />
                                </button>

                                <div className="video-info-overlay">
                                    <p className="video-title">
                                        {socialVideos[currentVideoIndex]?.title}
                                    </p>

                                    <div className="dots-container">
                                        {socialVideos.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentVideoIndex(idx)}
                                                className={`dot ${idx === currentVideoIndex ? 'active' : ''}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturedMenu />

            <ReviewsSection reviews={siteConfig?.reviews} />

            <section id="location" className="location-section">
                <div className="max-w-[1200px] mx-auto">
                    <div className="section-head mb-12">
                        <h2>{t('location_title')}</h2>
                        <div className="section-divider"></div>
                    </div>

                    <div className="location-stack-container">
                        <div className="map-frame">
                            <iframe
                                title="Mapa" width="100%" height="100%" frameBorder="0"
                                style={{ border: 0 }}
                                src={contact.mapsIframe || theme.contact.mapsIframe}
                                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>

                            <div className="map-overlay">
                                <div className="map-pin-badge">
                                    <MapPin size={22} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: '0.85rem', color: '#555', margin: 0 }}>{contact.address || theme.contact.address}</p>
                                </div>
                                <a href={contact.mapsIframe || theme.contact.mapsIframe} target="_blank" rel="noreferrer" className="map-view-btn">
                                    {t('view_map_btn')} ➔
                                </a>
                            </div>
                        </div>

                        <div id="hours" style={{ width: '100%', padding: '20px 0' }}>
                            <div className="section-head" style={{ marginBottom: '15px' }}>
                                <h2>{t('hours_title')}</h2>
                            </div>
                            <HoursCard />
                        </div>
                    </div>
                </div>
            </section>

            <DeliverySection />

            <footer id="contact" className="landing-footer">
                <div className="max-w-[1200px] mx-auto flex flex-col items-center">
                    <div className="social-links">
                        {socials.instagram && <a href={socials.instagram.startsWith('http') ? socials.instagram : `https://instagram.com/${socials.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="social-btn"><Instagram size={22} /></a>}
                        {socials.tiktok && (
                            <a href={socials.tiktok.startsWith('http') ? socials.tiktok : `https://tiktok.com/@${socials.tiktok.replace('@', '')}`} target="_blank" rel="noreferrer" className="social-btn">
                                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </a>
                        )}
                        {contact.whatsapp && (
                            <a href={contact.whatsapp.startsWith('http') ? contact.whatsapp : `https://wa.me/${contact.whatsapp.replace(/[\s+]/g, '')}`} target="_blank" rel="noreferrer" className="social-btn" aria-label="WhatsApp">
                                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.015c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                                </svg>
                            </a>
                        )}
                        {contact.phone && <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="social-btn" aria-label="Llamar"><Phone size={22} /></a>}
                    </div>

                    <div className="text-center">
                        <div className="footer-brand-container">
                            <span className="footer-brand-name">{theme.restaurantName} <span className="footer-brand-suffix">{theme.restaurantSuffix}</span></span>
                            <img src={theme.brand.logoHeader || theme.brand.logoFallback} alt={theme.restaurantName} className="footer-logo" onError={(e) => e.target.src = theme.brand.logoFallback} />
                        </div>

                        <p className="m-0">{theme.brand.footerText}</p>
                        <p className="footer-dev-text">
                            <a href="https://ayoubjerari.com" target="_blank" rel="noreferrer" className="dev-link">
                                {t('footer_dev_by')} AYOUBDEV
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;

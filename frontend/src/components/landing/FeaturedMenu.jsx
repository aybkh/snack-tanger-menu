
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const FeaturedCard = ({ item }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % item.images.length);
    };

    const prevSlide = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % item.images.length);
        }, 4000 + Math.random() * 1000);
        return () => clearInterval(interval);
    }, [item.images.length]);

    return (
        <div className="featured-card">
            <div className="card-image-container">
                {item.images.map((img, idx) => (
                    <div key={idx} style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        opacity: idx === currentIndex ? 1 : 0, transition: 'opacity 0.8s ease-in-out'
                    }}>
                        <img
                            src={img.src}
                            alt={img.label}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div className="card-badge">
                            {img.label}
                        </div>
                    </div>
                ))}
                <button onClick={prevSlide} className="card-arrow prev"><ChevronLeft size={16} /></button>
                <button onClick={nextSlide} className="card-arrow next"><ChevronRight size={16} /></button>
            </div>

            <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
            </div>
        </div>
    );
};

const FeaturedMenu = () => {
    const { t } = useLanguage();

    const featuredData = [
        {
            title: t('feat_tacos'),
            subtitle: t('feat_tacos_sub'),
            images: [
                { src: "/products/taco-s.webp", label: "S" },
                { src: "/products/taco-m.webp", label: "M" },
                { src: "/products/taco-l.webp", label: "L" },
                { src: "/products/taco-xl.webp", label: "XL" }
            ]
        },
        {
            title: t('feat_pizzas'),
            subtitle: t('feat_pizzas_sub'),
            images: [
                { src: "/products/pizza-margarita.webp", label: "Margarita" },
                { src: "/products/pizza-tanger-303.webp", label: "Tanger 303" },
                { src: "/products/pizza-atun.webp", label: "Atún" },
                { src: "/products/pizza-marisco.webp", label: "Marisco" }
            ]
        },
        {
            title: t('feat_plats'),
            subtitle: t('feat_plats_sub'),
            images: [
                { src: "/products/pollo-plato.webp", label: "Pollo" },
                { src: "/products/maxi-tenders-plato.webp", label: "Maxi Tenders" },
                { src: "/products/emince-de-pollo-plato.webp", label: "Emincé Pollo" },
                { src: "/products/plato-de-marisco.webp", label: "Plato Marisco" }
            ]
        },
        {
            title: t('feat_batits'),
            subtitle: t('feat_batits_sub'),
            images: [
                { src: "/products/aguacate-batido.webp", label: "Aguacate" },
                { src: "/products/fresa-batido.webp", label: "Fresa" },
                { src: "/products/platano-batido.webp", label: "Plátano" },
                { src: "/products/tropical.webp", label: "Tropical" }
            ]
        }
    ];

    return (
        <section className="featured-section">
            <div className="section-head" style={{ marginBottom: '30px' }}>
                <h2>{t('featured_title')}</h2>
                <h3 style={{ display: 'block', fontSize: '0.9rem', color: '#F1C40F', marginTop: '5px', fontFamily: "'Montserrat', sans-serif" }}>
                    {t('featured_subtitle')}
                </h3>
            </div>

            <div className="featured-grid">
                {featuredData.map((item, idx) => (
                    <FeaturedCard key={idx} item={item} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedMenu;

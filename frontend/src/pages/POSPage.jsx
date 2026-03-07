import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getMenu } from '../api';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';
import { useTenant } from '../context/TenantContext';

// Modular Components
import WelcomeScreen from '../components/pos/WelcomeScreen';
import CategorySidebar from '../components/pos/CategorySidebar';
import ProductCard from '../components/pos/ProductCard';
import ProductModal from '../components/pos/ProductModal';

const POSPage = () => {
    const { t, getCategoryName, getTranslatedProduct, language, setLanguage } = useLanguage();
    const { theme } = useTenant();

    // App Flow State
    const [step, setStep] = useState('welcome');

    // UI State
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null); // Used for Sidebar Highlight & Modal Logic
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({ product: null, category: null });

    // Refs for Scroll Spy
    const mainContainerRef = useRef(null);

    useEffect(() => {
        loadMenu();
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [step]);

    const loadMenu = async () => {
        try {
            const data = await getMenu();
            setCategories(data);
            if (data.length > 0) setSelectedCategory(data[0]);
        } catch (err) {
            console.error("Failed to load menu", err);
        }
    };

    // --- SCROLL SPY LOGIC ---
    useEffect(() => {
        if (step !== 'pos') return;

        const handleScroll = () => {
            let currentCatId = null;
            // Check explicit elements relative to viewport
            for (const cat of categories) {
                const el = document.getElementById(`category-${cat.id}`);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        currentCatId = cat.id;
                        break;
                    }
                }
            }

            if (currentCatId && (!selectedCategory || selectedCategory.id !== currentCatId)) {
                const matchedCat = categories.find(c => c.id === currentCatId);
                if (matchedCat) setSelectedCategory(matchedCat);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [categories, step, selectedCategory]);


    const scrollToCategory = (cat) => {
        setSelectedCategory(cat);
        setIsMobileMenuOpen(false);
        const el = document.getElementById(`category-${cat.id}`);
        if (el) {
            const yOffset = -20;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const handleProductClick = (prodOriginal, prodCategory) => {
        // Crucial: Update selected category to ensure Modal Logic works correctly
        setSelectedCategory(prodCategory);
        setModalData({ product: prodOriginal, category: prodCategory });
        setIsModalOpen(true);
    };

    const handleScrollToSauces = () => {
        const salsasCat = categories.find(c => c.name === "Salsas");
        if (salsasCat) {
            setIsModalOpen(false);
            scrollToCategory(salsasCat);
        } else {
            console.warn("Category 'Salsas' not found");
        }
    };

    if (step === 'welcome') {
        return <WelcomeScreen onStart={() => setStep('pos')} />;
    }

    return (
        <div className="app-container">
            <header className="mobile-header">
                <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
                <div className="mobile-logo-container">
                    <Link to="/">
                        <img src={theme.brand.logoFallback} alt={theme.restaurantName} className="mobile-logo"
                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                    </Link>
                </div>
                <LanguageSelector currentLang={language} onLanguageChange={setLanguage} />
            </header>

            <CategorySidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={scrollToCategory}
                isMobileVisible={isMobileMenuOpen}
            />

            <main className="product-area" ref={mainContainerRef}>
                {categories.map((category) => (
                    <section key={category.id} id={`category-${category.id}`} className="mb-8 p-4">
                        {/* Sticky Header */}
                        <div className="sticky top-0 bg-[var(--bg-base)]/95 backdrop-blur-md z-20 py-4 mb-8 text-center border-y-4 border-[#F1C40F] shadow-lg">
                            <h2 className="font-black font-black-ops tracking-widest m-0 uppercase" style={{ fontSize: '1.8rem', color: '#F1C40F', textShadow: '4px 4px 0px #000' }}>
                                | {getCategoryName(category)}
                            </h2>
                        </div>

                        {/* Products Grid */}
                        <div className="product-grid">
                            {category.products.length === 0 ? (
                                <div className="col-span-full text-center text-white/50 italic py-10">
                                    {t('empty_category')}
                                </div>
                            ) : (
                                category.products.map((originalProd, index) => (
                                    <ProductCard
                                        key={originalProd.id || `${category.id}-${index}`}
                                        originalProd={originalProd}
                                        category={category}
                                        onClick={() => handleProductClick(originalProd, category)}
                                    />
                                ))
                            )}
                        </div>
                    </section>
                ))}

                {/* Footer Spacer */}
                <div style={{
                    width: '100%', textAlign: 'center', padding: '40px 0',
                    color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.7rem', fontFamily: 'Montserrat, sans-serif'
                }}>
                    Dev by <a href="https://ayoubjerari.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>AyoubDev</a>
                </div>
            </main>

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                originalProduct={modalData.product}
                category={modalData.category}
                onScrollToSauces={handleScrollToSauces}
            />
        </div>
    );
};

export default POSPage;

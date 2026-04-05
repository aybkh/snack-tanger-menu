import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTenant } from '../../context/TenantContext';

const CategorySidebar = ({ categories, selectedCategory, onSelectCategory, isMobileVisible }) => {
    const { getCategoryName } = useLanguage();
    const { theme } = useTenant();

    return (
        <aside className={`category-sidebar ${isMobileVisible ? 'mobile-visible' : ''}`} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', paddingBottom: '30px' }}>
                <div className="brand-title">
                    <img src={theme.brand.logoFallback} alt={theme.restaurantName} className="brand-logo"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                </div>

                {categories.map(cat => {
                    const cleanCatName = (cat.name || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');

                    const getCategoryIcon = (name) => {
                        const lowerName = (name || "").toLowerCase();
                        if (lowerName.includes('taco')) return 'categories/taco.webp';
                        if (lowerName.includes('burger') || lowerName.includes('hamburguesa')) return 'categories/burger.webp';
                        if (lowerName.includes('pizza')) return 'categories/pizza.webp';
                        if (lowerName.includes('postre') || lowerName.includes('batido')) return 'categories/postres-y-batidos.webp';
                        if (lowerName.includes('refresco') || lowerName.includes('agua') || lowerName.includes('bebida')) return 'categories/bebidas.webp';
                        if (lowerName.includes('plato')) return 'categories/platos.webp';
                        if (lowerName.includes('ensalada')) return 'categories/ensaladas.webp';
                        if (lowerName.includes('salsa')) return 'categories/salsas.webp';
                        if (lowerName.includes('tajin')) return 'categories/tajin.webp';
                        if (lowerName.includes('suplemento') || lowerName.includes('extra')) return 'categories/suplementos.webp';
                        return 'categories/platos.webp';
                    };

                    return (
                        <div key={cat.id} className={`cat-btn ${selectedCategory?.id === cat.id ? 'active' : ''}`}
                            onClick={() => onSelectCategory(cat)}
                            style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0', height: '80px', borderRadius: '8px', overflow: 'hidden' }}>

                            <img src={cat.image || getCategoryIcon(cat.name)} alt={getCategoryName(cat)} className="cat-img-webp"
                                style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.15)' }}
                                onError={(e) => { e.target.src = 'categories/platos.webp'; }} />
                        </div>
                    );
                })}

                <div style={{ padding: '20px 10px', textAlign: 'center', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: 'auto' }}>
                    Dev by <a href="https://ayoubjerari.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>AyoubDev</a>
                </div>
            </div>
        </aside>
    );
};

export default CategorySidebar;

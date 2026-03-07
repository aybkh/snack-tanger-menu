import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTenant } from '../../context/TenantContext';

const CategorySidebar = ({ categories, selectedCategory, onSelectCategory, isMobileVisible }) => {
    const { getCategoryName } = useLanguage();
    const { theme } = useTenant();

    return (
        <aside className={`category-sidebar ${isMobileVisible ? 'mobile-visible' : ''}`} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, overflowY: 'auto' }}>
                <div className="brand-title desktop-only">
                    <img src={theme.brand.logoFallback} alt={theme.restaurantName} className="brand-logo"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                </div>

                {categories.map(cat => (
                    <div key={cat.id} className={`cat-btn ${selectedCategory?.id === cat.id ? 'active' : ''}`}
                        onClick={() => onSelectCategory(cat)}>
                        <img src={`/categories/${(cat.image || 'default.webp').replace('.jpg', '.webp').replace('.png', '.webp')}`} alt={cat.name} className="cat-img"
                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                        <span className="cat-text-fallback" style={{ display: 'none' }}>{getCategoryName(cat)}</span>
                    </div>
                ))}

                <div style={{ padding: '20px 10px', textAlign: 'center', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: 'auto' }}>
                    Dev by <a href="https://ayoubjerari.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>AyoubDev</a>
                </div>
            </div>
        </aside>
    );
};

export default CategorySidebar;

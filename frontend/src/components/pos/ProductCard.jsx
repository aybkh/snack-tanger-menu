import React from 'react';
import { ChefHat } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import AllergenIcons from '../landing/AllergenIcons';
import '../../styles/pos/PosComponents.css';

const ProductCard = ({ originalProd, category, onClick }) => {
    const { getTranslatedProduct, t } = useLanguage();

    if (!originalProd) return null;
    const prod = getTranslatedProduct(originalProd);

    // Reuse the image logic
    const renderProductImage = () => {
        return (
            <div className="product-image-container">
                <img
                    src={originalProd.image ? `products/${originalProd.image}` : ""}
                    alt={originalProd.name}
                    className="product-image"
                    loading="lazy"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }}
                />
                <div className="product-fallback-icon" style={{ display: 'none' }}>
                    <ChefHat size={48} />
                </div>
            </div>
        );
    };

    const isProductAvailable = originalProd.is_available !== false && originalProd.isAvailable !== false;

    return (
        <div
            className={`product-card ${!isProductAvailable ? 'sold-out' : ''}`}
            onClick={() => { if (isProductAvailable) onClick(); }}>
            
            {!isProductAvailable && (
                <div className="sold-out-badge">
                    {t('sold_out')}
                </div>
            )}

            {renderProductImage()}

            {/* Ocultar alérgenos en Combos y Menús (Excepto Combo Box) */}
            {originalProd.alergenos && originalProd.alergenos.length > 0 && 
             !( (category?.name?.toLowerCase().includes('combo') || category?.name?.toLowerCase().includes('menú') || category?.name?.toLowerCase().includes('menu')) 
                && !category?.name?.toLowerCase().includes('box') ) && (
                <div className="product-allergens-strip">
                    <AllergenIcons allergenIds={originalProd.alergenos} />
                </div>
            )}

            <div className="product-info">
                <h3 className="product-name">{prod.name}</h3>
                <div className="product-price">
                    {(prod.variants || []).length > 0
                        ? `${Math.min(...prod.variants.map(v => v.price))}€`
                        : `${(prod.price || prod.base_price || 0).toFixed(2)}€`}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

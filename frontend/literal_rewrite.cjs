const fs = require('fs');

const literalMap = {
    "Pizza Margarita": { es: "Pizza Margarita", fr: "Pizza Margarita", en: "Margarita Pizza", ar: "بيتزا مارغريتا", de: "Pizza Margarita", nl: "Pizza Margarita" },
    "Pizza Atún": { es: "Pizza Atún", fr: "Pizza au Thon", en: "Tuna Pizza", ar: "بيتزا التونة", de: "Thunfisch Pizza", nl: "Pizza Tonijn" },
    "Pizza Pollo": { es: "Pizza Pollo", fr: "Pizza au Poulet", en: "Chicken Pizza", ar: "بيتزا الدجاج", de: "Hähnchen Pizza", nl: "Pizza Kip" },
    "Pizza Carne Picada": { es: "Pizza Carne Picada", fr: "Pizza Viande Hachée", en: "Minced Meat Pizza", ar: "بيتزا اللحم المفروم", de: "Hackfleisch Pizza", nl: "Pizza Gehakt" },
    "Pizza Marisco": { es: "Pizza Marisco", fr: "Pizza Fruits de Mer", en: "Seafood Pizza", ar: "بيتزا فواكه البحر", de: "Meeresfrüchte Pizza", nl: "Pizza Zeevruchten" },
    "Pizza Tanger 303": { es: "Pizza Tanger 303", fr: "Pizza Tanger 303", en: "Tanger 303 Pizza", ar: "بيتزا طنجة 303", de: "Pizza Tanger 303", nl: "Pizza Tanger 303" },
    "Taco de Nuggets": { es: "Taco de Nuggets", fr: "Tacos Nuggets", en: "Nuggets Taco", ar: "تاكوس ناغتس", de: "Nuggets Taco", nl: "Nuggets Taco" },
    "Taco Cordon Bleu": { es: "Taco Cordon Bleu", fr: "Tacos Cordon Bleu", en: "Cordon Bleu Taco", ar: "تاكوس كوردون بلو", de: "Cordon Bleu Taco", nl: "Cordon Bleu Taco" },
    "Taco Maxi Tenders": { es: "Taco Maxi Tenders", fr: "Tacos Maxi Tenders", en: "Maxi Tenders Taco", ar: "تاكوس ماكسي تندرز", de: "Maxi Tenders Taco", nl: "Maxi Tenders Taco" },
    "Tajin de Kefta": { es: "Tajin de Kefta", fr: "Tajine de Kefta", en: "Kefta Tajine", ar: "طاجن كفتة", de: "Kefta Tajine", nl: "Kefta Tajine" },
    "Tajin de Gambas 'Pil Pil'": { es: "Tajin de Gambas 'Pil Pil'", fr: "Tajine de Crevettes 'Pil Pil'", en: "Shrimp Tajine 'Pil Pil'", ar: "طاجن جمبري بيل بيل", de: "Garnelen Tajine 'Pil Pil'", nl: "Garnelen Tajine 'Pil Pil'" },
    "Kapsalon": { es: "Kapsalon", fr: "Kapsalon", en: "Kapsalon", ar: "كبسالون", de: "Kapsalon", nl: "Kapsalon" },
    "Pinchos de Pollo": { es: "Pinchos de Pollo", fr: "Brochettes de Poulet", en: "Chicken Skewers", ar: "قطبان دجاج", de: "Hähnchenspieße", nl: "Kipspiesjes" },
    "Pinchos Ternera": { es: "Pinchos Ternera", fr: "Brochettes de Bœuf", en: "Beef Skewers", ar: "قطبان لحم", de: "Rinderspieße", nl: "Runderspiesjes" },
    "Salchichas": { es: "Salchichas", fr: "Saucisses", en: "Sausages", ar: "نقانق", de: "Würstchen", nl: "Worstjes" },
    "Vegetal": { es: "Vegetal", fr: "Végétarien", en: "Vegetarian", ar: "نباتي", de: "Vegetarisch", nl: "Vegetarisch" },
    "Gambas": { es: "Gambas", fr: "Crevettes", en: "Shrimp", ar: "جمبري", de: "Garnelen", nl: "Garnalen" },
    "Mixto (2 carnes)": { es: "Mixto (2 carnes)", fr: "Mixte (2 viandes)", en: "Mixed (2 meats)", ar: "مشكل (لحمين)", de: "Gemischt (2 Fleischsorten)", nl: "Gemengd (2 vleessoorten)" },
    "Hamburguesa Ternera": { es: "Hamburguesa Ternera", fr: "Burger Bœuf", en: "Beef Burger", ar: "برجر لحم", de: "Rindfleisch Burger", nl: "Runderburger" },
    "Hamburguesa Pollo": { es: "Hamburguesa Pollo", fr: "Burger Poulet", en: "Chicken Burger", ar: "برجر دجاج", de: "Hähnchen Burger", nl: "Kipburger" },
    "Hamburguesa Tenders": { es: "Hamburguesa Tenders", fr: "Burger Tenders", en: "Tenders Burger", ar: "برجر تندرز", de: "Tenders Burger", nl: "Tenders Burger" },
    "Plato de Pollo": { es: "Plato de Pollo", fr: "Assiette de Poulet", en: "Chicken Platter", ar: "طبق دجاج", de: "Hähnchenteller", nl: "Kipschotel" },
    "Plato Carne Picada": { es: "Plato Carne Picada", fr: "Assiette Viande Hachée", en: "Minced Meat Platter", ar: "طبق لحم مفروم", de: "Hackfleischteller", nl: "Gehaktschotel" },
    "Plato Gambas": { es: "Plato Gambas", fr: "Assiette Crevettes", en: "Shrimp Platter", ar: "طبق جمبري", de: "Garnelenteller", nl: "Garnalenschotel" },
    "Plato de Calamares": { es: "Plato de Calamares", fr: "Assiette Calamars", en: "Calamari Platter", ar: "طبق كلمار", de: "Tintenfischteller", nl: "Inktvisschotel" },
    "Plato Maxi Tenders": { es: "Plato Maxi Tenders", fr: "Assiette Maxi Tenders", en: "Maxi Tenders Platter", ar: "طبق ماكسي تندرز", de: "Maxi Tenders Teller", nl: "Maxi Tenders Schotel" },
    "Ensalada Pequeña": { es: "Ensalada Pequeña", fr: "Petite Salade", en: "Small Salad", ar: "سلطة صغيرة", de: "Kleiner Salat", nl: "Kleine Salade" },
    "Ensalada Familiar": { es: "Ensalada Familiar", fr: "Salade Familiale", en: "Family Salad", ar: "سلطة عائلية", de: "Familiensalat", nl: "Familiesalade" },
    "Wrap de Pollo": { es: "Wrap de Pollo", fr: "Wrap au Poulet", en: "Chicken Wrap", ar: "راب دجاج", de: "Hähnchen Wrap", nl: "Kip Wrap" },
    "Wrap Carne Picada": { es: "Wrap Carne Picada", fr: "Wrap Viande Hachée", en: "Minced Meat Wrap", ar: "راب لحم مفروم", de: "Hackfleisch Wrap", nl: "Gehakt Wrap" },
    "Café solo": { es: "Café solo", fr: "Café Noir", en: "Black Coffee", ar: "قهوة سوداء", de: "Schwarzer Kaffee", nl: "Zwarte Koffie" },
    "Cortado": { es: "Cortado", fr: "Noisette", en: "Macchiato", ar: "قهوة كورتادو", de: "Espresso Macchiato", nl: "Koffie Verkeerd" },
    "Café con leche": { es: "Café con leche", fr: "Café au Lait", en: "Coffee with Milk", ar: "قهوة بالحليب", de: "Milchkaffee", nl: "Koffie met Melk" },
    "Naranja": { es: "Naranja", fr: "Orange", en: "Orange", ar: "برتقال", de: "Orange", nl: "Sinaasappel" },
    "Plátano": { es: "Plátano", fr: "Banane", en: "Banana", ar: "موز", de: "Banane", nl: "Banaan" },
    "Aguacate": { es: "Aguacate", fr: "Avocat", en: "Avocado", ar: "أفوكادو", de: "Avocado", nl: "Avocado" },
    "Fresa": { es: "Fresa", fr: "Fraise", en: "Strawberry", ar: "فراولة", de: "Erdbeere", nl: "Aardbei" },
    "Dragón": { es: "Dragón", fr: "Fruit du Dragon", en: "Dragon Fruit", ar: "فاكهة التنين", de: "Drachenfrucht", nl: "Drakenfruit" },
    "Mango": { es: "Mango", fr: "Mangue", en: "Mango", ar: "مانجو", de: "Mango", nl: "Mango" },
    "Copa de Tiramisú": { es: "Copa de Tiramisú", fr: "Coupe Tiramisu", en: "Tiramisu Cup", ar: "كوب تيراميسو", de: "Tiramisu Becher", nl: "Tiramisu Coupe" },
    "Flan Casero": { es: "Flan Casero", fr: "Flan Maison", en: "Homemade Flan", ar: "فلان منزلي", de: "Hausgemachter Flan", nl: "Huisgemaakte Flan" },
    "Helado '3 bolas'": { es: "Helado '3 bolas'", fr: "Glace '3 boules'", en: "'3 Scoops' Ice Cream", ar: "آيس كريم '3 كرات'", de: "Eis '3 Kugeln'", nl: "Ijs '3 bollen'" },
    "Tarta": { es: "Tarta", fr: "Tarte", en: "Cake", ar: "كعكة", de: "Kuchen", nl: "Taart" },
    "Tajin Marisco": { es: "Tajin Marisco", fr: "Tajine Fruits de Mer", en: "Seafood Tajine", ar: "طاجن فواكه البحر", de: "Meeresfrüchte Tajine", nl: "Zeevruchten Tajine" },
    "Sopa de pescado": { es: "Sopa de pescado", fr: "Soupe de poisson", en: "Fish soup", ar: "شوربة سمك", de: "Fischsuppe", nl: "Vissoep" },
    "Emince de Pollo": { es: "Emince de Pollo", fr: "Émincé de Poulet", en: "Chicken Emincé", ar: "إيمنسي دجاج", de: "Hähnchengeschnetzeltes", nl: "Kip Emincé" },
    "Emince de Carne": { es: "Emince de Carne", fr: "Émincé de Viande", en: "Meat Emincé", ar: "إيمنسي لحم", de: "Fleischgeschnetzeltes", nl: "Vlees Emincé" },
    "Plato de Marisco": { es: "Plato de Marisco", fr: "Assiette Fruits de Mer", en: "Seafood Platter", ar: "طبق فواكه البحر", de: "Meeresfrüchteplatte", nl: "Zeevruchtenschotel" },
    "Tropical": { es: "Tropical", fr: "Tropical", en: "Tropical", ar: "استوائي", de: "Tropisch", nl: "Tropisch" },
    "Huevo Frito": { es: "Huevo Frito", fr: "Œuf Au Plat", en: "Fried Egg", ar: "بيض مقلي", de: "Spiegelei", nl: "Spiegelei" },
    "Huevo Duro": { es: "Huevo Duro", fr: "Œuf Dur", en: "Hard Boiled Egg", ar: "بيض مسلوق", de: "Gekochtes Ei", nl: "Hardgekookt Ei" },
    "Lonchas de Queso": { es: "Lonchas de Queso", fr: "Tranches de Fromage", en: "Cheese Slices", ar: "شرائح جبن", de: "Käsescheiben", nl: "Plakjes Kaas" },
    "Mortadela": { es: "Mortadela", fr: "Mortadelle", en: "Mortadella", ar: "مرتديلا", de: "Mortadella", nl: "Mortadella" },
    "Salsa Algerian": { es: "Salsa Algerian", fr: "Sauce Algérienne", en: "Algerian Sauce", ar: "صلصة جزائرية", de: "Algerische Sauce", nl: "Algerijnse Saus" },
    "Salsa Andaluza": { es: "Salsa Andaluza", fr: "Sauce Andalouse", en: "Andalusian Sauce", ar: "صلصة أندلسية", de: "Andalusische Sauce", nl: "Andalusische Saus" },
    "Salsa Barbacoa": { es: "Salsa Barbacoa", fr: "Sauce Barbecue", en: "BBQ Sauce", ar: "صلصة باربيكيو", de: "Barbecue Sauce", nl: "Barbecuesaus" },
    "Salsa Biggie": { es: "Salsa Biggie", fr: "Sauce Biggie", en: "Biggie Sauce", ar: "صلصة بيجي", de: "Biggie Sauce", nl: "Biggie Saus" },
    "Salsa Brazil": { es: "Salsa Brazil", fr: "Sauce Brazil", en: "Brazil Sauce", ar: "صلصة برازيل", de: "Brazil Sauce", nl: "Brazil Saus" },
    "Salsa Chilli Thai": { es: "Salsa Chilli Thai", fr: "Sauce Chili Thai", en: "Thai Chili Sauce", ar: "صلصة تشيلي تاي", de: "Thai Chili Sauce", nl: "Thai Chili Saus" },
    "Salsa Curry": { es: "Salsa Curry", fr: "Sauce Curry", en: "Curry Sauce", ar: "صلصة كاري", de: "Curry Sauce", nl: "Currysaus" },
    "Salsa Ketchup": { es: "Salsa Ketchup", fr: "Sauce Ketchup", en: "Ketchup Sauce", ar: "كاتشب", de: "Ketchup", nl: "Ketchup" },
    "Salsa Marocaine": { es: "Salsa Marocaine", fr: "Sauce Marocaine", en: "Moroccan Sauce", ar: "صلصة مغربية", de: "Marokkanische Sauce", nl: "Marokkaanse Saus" },
    "Salsa Mayonesa": { es: "Salsa Mayonesa", fr: "Sauce Mayonnaise", en: "Mayonnaise Sauce", ar: "مايونيز", de: "Mayonnaise", nl: "Mayonaise" },
    "Salsa Pita Kebab": { es: "Salsa Pita Kebab", fr: "Sauce Pita Kebab", en: "Pita Kebab Sauce", ar: "صلصة بيتا كباب", de: "Pita Kebab Sauce", nl: "Pita Kebab Saus" },
    "Salsa Samurai": { es: "Salsa Samurai", fr: "Sauce Samouraï", en: "Samurai Sauce", ar: "صلصة ساموراي", de: "Samurai Sauce", nl: "Samurai Saus" }
};

let localesContent = fs.readFileSync('c:/Users/ayoub/Documents/snack_tanger/snack_tanger_menu/frontend/locales_backup.js', 'utf8');

// We perform a safe regex replace utilizing the AST-like structure in text.
// The structure is `"KeyName": { name: "Something", description: "..." }`
const langs = ['es', 'fr', 'en', 'ar', 'de', 'nl'];

for (const lang of langs) {
    // we find the block for the language
    const langStartMatch = new RegExp(`\\s${lang}:\\s*{`, 'g').exec(localesContent);
    if (!langStartMatch) continue;

    // Quick regex replacement pass inside the string
}

// Since regex across nested objects is hard, let's just do a global replace for each string inside `products: { ... }` that matches our keys.
// For each key, we will replace the `name: "..."` with `name: "${literalMap[key][lang]}"`
// But we need to know WHICH language block we are in.
// Better approach: Since locales_backup.js exports a JS object, let's parse it, mutate it, and rewrite it. But wait! We can't require it directly because it uses `export const resources`.
// Let's strip `export const resources =` and parse it:

const stripped = localesContent.replace('export const resources = ', '').replace(/;\s*$/, '');

// Wait, JSON.parse won't work because keys aren't quoted always, wait, in locales_backup.js, the keys for ui, direction, etc., are unquoted!
// So we use eval

let parsedObj;
eval(`parsedObj = ${stripped};`);

for (const lang of Object.keys(parsedObj)) {
    if (parsedObj[lang] && parsedObj[lang].products) {
        for (const [productKey, translationValue] of Object.entries(literalMap)) {
            if (parsedObj[lang].products[productKey]) {
                const newLiteralName = translationValue[lang];
                if (newLiteralName) {
                    parsedObj[lang].products[productKey].name = newLiteralName;
                } else {
                    // fallback to the exact key literal
                    parsedObj[lang].products[productKey].name = translationValue['es'] || productKey;
                }
            }
        }
    }
}

// Now stringify it back
const newContent = 'export const resources = ' + JSON.stringify(parsedObj, null, 4) + ';';

fs.writeFileSync('c:/Users/ayoub/Documents/snack_tanger/snack_tanger_menu/frontend/src/data/locales.js', newContent);
console.log('locales.js updated successfully with direct literal mappings.');

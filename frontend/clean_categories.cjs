const fs = require('fs');

const shortCategoriesMap = {
    // ES (Default fallbacks for logic flow)
    "Pizzas": { es: "Pizzas", fr: "Pizzas", en: "Pizzas", ar: "بيتزا", de: "Pizzas", nl: "Pizza's" },
    "Tacos 303": { es: "Tacos 303", fr: "Tacos 303", en: "Tacos 303", ar: "تاكوس 303", de: "Tacos 303", nl: "Tacos 303" },
    "Tajins": { es: "Tajines", fr: "Tajines", en: "Tajines", ar: "طواجن", de: "Tajines", nl: "Tajines" },
    "Bocadillos Tanger": { es: "Bocadillos", fr: "Sandwichs", en: "Sandwiches", ar: "سندويشات", de: "Sandwiches", nl: "Broodjes" },
    "Hamburguesas": { es: "Hamburguesas", fr: "Burgers", en: "Burgers", ar: "برجر", de: "Burgers", nl: "Burgers" },
    "Platos Combinados": { es: "Platos", fr: "Assiettes", en: "Platters", ar: "أطباق", de: "Teller", nl: "Schotels" },
    "Ensaladas": { es: "Ensaladas", fr: "Salades", en: "Salads", ar: "سلطات", de: "Salate", nl: "Salades" },
    "Wraps": { es: "Wraps", fr: "Wraps", en: "Wraps", ar: "لفائف", de: "Wraps", nl: "Wraps" },
    "Refrescos": { es: "Refrescos", fr: "Boissons", en: "Drinks", ar: "مشروبات", de: "Getränke", nl: "Drankjes" },
    "Café": { es: "Café", fr: "Café", en: "Coffee", ar: "قهوة", de: "Kaffee", nl: "Koffie" },
    "Batidos": { es: "Batidos", fr: "Milkshakes", en: "Shakes", ar: "عصائر", de: "Shakes", nl: "Shakes" },
    "Postres": { es: "Postres", fr: "Desserts", en: "Desserts", ar: "حلويات", de: "Desserts", nl: "Desserts" },
    "Suplementos": { es: "Extras", fr: "Extras", en: "Extras", ar: "إضافات", de: "Extras", nl: "Extra's" },
    "Salsas": { es: "Salsas", fr: "Sauces", en: "Sauces", ar: "صلصات", de: "Saucen", nl: "Sauzen" }
};

let localesContent = fs.readFileSync('c:/Users/ayoub/Documents/snack_tanger/snack_tanger_menu/frontend/src/data/locales.js', 'utf8');

// The file exports `export const resources = { ... };` We will read it purely via JS evaluation/JSON parse.
const rawObjectStr = localesContent.replace('export const resources = ', '').replace(/;\s*$/, '');

let parsedObj;
eval(`parsedObj = ${rawObjectStr};`);

const langs = ['es', 'fr', 'en', 'ar', 'de', 'nl'];

for (const lang of langs) {
    if (parsedObj[lang] && parsedObj[lang].categories) {
        for (const [catKey, _] of Object.entries(parsedObj[lang].categories)) {
            if (shortCategoriesMap[catKey]) {
                parsedObj[lang].categories[catKey] = shortCategoriesMap[catKey][lang];
            }
        }
    }
}

const newContent = 'export const resources = ' + JSON.stringify(parsedObj, null, 4) + ';';

fs.writeFileSync('c:/Users/ayoub/Documents/snack_tanger/snack_tanger_menu/frontend/src/data/locales.js', newContent);
console.log('Categories compacted successfully.');

const fs = require('fs');
let data = fs.readFileSync('src/data/locales.js', 'utf8');

// Replace standard keys for Pizzas
data = data.replace(/"Margarita":/g, '"Pizza Margarita":');
data = data.replace(/"Atún":/g, '"Pizza Atún":');
data = data.replace(/"Pollo":/g, '"Pizza Pollo":');
data = data.replace(/"Carne Picada":/g, '"Pizza Carne Picada":');
data = data.replace(/"Marisco":/g, '"Pizza Marisco":');
data = data.replace(/"Tanger 303":/g, '"Pizza Tanger 303":');

// Replace standard keys for Tacos
data = data.replace(/"Nuggets":/g, '"Taco de Nuggets":');
data = data.replace(/"Cordon Bleu":/g, '"Taco Cordon Bleu":');
data = data.replace(/"Maxi TENDERS":/g, '"Taco Maxi Tenders":');

fs.writeFileSync('src/data/locales.js', data);
console.log('locales.js updated');

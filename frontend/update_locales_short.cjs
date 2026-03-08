const fs = require('fs');
let data = fs.readFileSync('src/data/locales.js', 'utf8');

// Pizzas
data = data.replace(/name: "Pizza de /g, 'name: "');
data = data.replace(/name: "Pizza /g, 'name: "');

// Tacos
data = data.replace(/name: "Taco de /g, 'name: "');
data = data.replace(/name: "Taco /g, 'name: "');

// Platos
data = data.replace(/name: "Plato Completo de /g, 'name: "');
data = data.replace(/name: "Plato de /g, 'name: "');
data = data.replace(/name: "Plato /g, 'name: "');

// Bocadillos
data = data.replace(/name: "Bocadillo de /g, 'name: "');
data = data.replace(/name: "Bocadillo /g, 'name: "');

// Burgers
data = data.replace(/name: "Burger de /g, 'name: "');
data = data.replace(/name: "Hamburguesa de /g, 'name: "');
data = data.replace(/name: "Burger /g, 'name: "');

// Batidos
data = data.replace(/name: "Batido de /g, 'name: "');
data = data.replace(/name: "Batido /g, 'name: "');

// Dutch / French / German specifiers just in case
data = data.replace(/name: "Broodje /g, 'name: "');
data = data.replace(/name: "Assiette de /g, 'name: "');
data = data.replace(/name: "Assiette /g, 'name: "');
data = data.replace(/name: "Sandwich au /g, 'name: "');
data = data.replace(/name: "Sandwich /g, 'name: "');
data = data.replace(/name: "Teller /g, 'name: "');
data = data.replace(/name: "Smoothie /g, 'name: "');

fs.writeFileSync('src/data/locales.js', data);
console.log('locales.js updated');

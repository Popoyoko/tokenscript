"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function filterColors(data) {
    if (data && typeof data === 'object') { //data est-il un object
        if (data.type === 'color') {
            // si le type est color = objet vide
            return {};
        }
        else {
            // applique la fonction de manière récursive, permet de traiter chaque niveau de l'objet
            var result = {};
            for (var key in data) {
                result[key] = filterColors(data[key]);
            }
            return result;
        }
    }
    else {
        // si data n'est pas un objet, renvoie la valeur de data
        return data;
    }
}
// Lit token.json et le parse en un objet JS
var tokenFilePath = 'token.json';
var tokenData = JSON.parse(fs.readFileSync(tokenFilePath, 'utf-8'));
// Appel de la fonction 
var filteredTokenData = filterColors(tokenData);
// Écrit le nouvel objet filtré variables.json
var variablesFilePath = 'variables.json';
fs.writeFileSync(variablesFilePath, JSON.stringify(filteredTokenData, null, 2));
console.log('Script executed successfully!');

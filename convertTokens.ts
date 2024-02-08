import * as fs from 'fs';

function filterColors(data: any): any {
  if (data && typeof data === 'object') { //data est-il un object
    if (data.type === 'color') {
      // si le type est color = objet vide
      return {};
    } else {
      // applique la fonction de manière récursive, permet de traiter chaque niveau de l'objet
      const result: any = {};
      for (const key in data) {
        result[key] = filterColors(data[key]);
      }
      return result;
    }
  } else {
    // si data n'est pas un objet, renvoie la valeur de data
    return data;
  }
}

// Lit token.json et le parse en un objet JS
const tokenFilePath = 'token.json';
const tokenData = JSON.parse(fs.readFileSync(tokenFilePath, 'utf-8'));

// Appel de la fonction 
const filteredTokenData = filterColors(tokenData);

// Écrit le nouvel objet filtré variables.json
const variablesFilePath = 'variables/token.json';
fs.writeFileSync(variablesFilePath, JSON.stringify(filteredTokenData, null, 2));

console.log('Script executed successfully!');
